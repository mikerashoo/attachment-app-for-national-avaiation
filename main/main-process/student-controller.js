const {ipcMain} = require('electron');
const { default: appPrisma } = require('../my-prisma');
import { STUDENT_CRUD_CALLS } from "../ipc_calls"; 

ipcMain.on(STUDENT_CRUD_CALLS.getAllStudentsCall, async (event, args) => {
    try{
        const students = await appPrisma.student.findMany({
            include: {
                departement: {
                    include: {
                        departementPaymentPrices: true
                    }
                }, 
              }, 
        });
        event.returnValue = JSON.stringify(students)
    }
    catch(e){
        event.returnValue = e.message
    }
})


ipcMain.on(STUDENT_CRUD_CALLS.createStudentCall, async (event, args) => {
    try{
        const {name, departementId, registeredAt, collageId, discount } = args;
        const student = await appPrisma.student.create({
            data: {name, departementId, registeredAt, collageId, discount: discount }
        })

        const studentToReturn = await appPrisma.student.findUnique({
            where: {
                id: student.id
            },
            include: {
                departement: true
            }
        })
        event.returnValue = JSON.stringify(studentToReturn)
    }
    catch(e){
        event.returnValue = e.message
    }
})

ipcMain.on(STUDENT_CRUD_CALLS.getStudentsWithLessData, async (event, args) => {
    try{
        const students = await appPrisma.student.findMany({
            select: {
                id: true,
                name: true,
                departementId: true,
                collageId: true,
                discount: true,
                departement: {
                    select: {
                        departementPaymentPrices: true
                    }
                }
            }
        }); 
        event.returnValue = JSON.stringify(students)
    }
    catch(e){
        event.returnValue = e.message  
    }
})

ipcMain.on(STUDENT_CRUD_CALLS.searchStudentsById, async (event, args) => {

    try{
        const students = await appPrisma.student.findMany({
            where: {
                collageId: {
                    startsWith: args.searchId
                }
            },
            select: {
                id: true,
                name: true,
                departementId: true,
                collageId: true,
                discount: true,
                departement: {
                    select: {
                        departementPaymentPrices: true
                    }
                }
            }
        }); 
        event.returnValue = JSON.stringify(students)
    }catch(e){
        event.returnValue = e.message
    }
})


ipcMain.on(STUDENT_CRUD_CALLS.getStudentPaymentFormInformation, async (event, args) => {
    try{
         
        const student = await appPrisma.student.findUnique({
            where: {
                id: args.studentId
            },
            select: {
                id: true,
                name: true,
                departementId: true,
                collageId: true,
                discount: true,
                departement: {
                    select: {
                        departementPaymentPrices: true,
                    }
                },
                payments: {
                    select: {
                        formPayments: {
                            include: {
                                paymentForm: {
                                    select: {
                                        id: true, 
                                    }
                                }, 
                            }
                        }
                    }
                }
            }
        }); 
      
        const pTypes= [];
        for(const p of student.departement.departementPaymentPrices){
            pTypes.push(p.paymentTypeId)
        }

        const existingFormIds = [];
        const existingFormPayments = [];
        // event.returnValue = JSON.stringify(student.payments)

        for(const _payment of student.payments){
            existingFormPayments.push(_payment.formPayments)
 
        }
        for(const _existingForm of existingFormPayments){ 
            for(const _formIn of _existingForm){
                existingFormIds.push(_formIn.paymentFormId)
            }
        }
         

        const paymentForms = await appPrisma.paymentForm.findMany({
            
            where: {
                paymentTypeId: { in: pTypes },
                id: {notIn: existingFormIds},
                isActive: true
            },
            include: {
                paymentType: true
            }
        })

        student.paymentForms = paymentForms
        event.returnValue = JSON.stringify(student)
    }
    catch(e){
        event.returnValue = e.message  
    }
})