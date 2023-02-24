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


ipcMain.on(STUDENT_CRUD_CALLS.deleteStudentCall, async (event, args) => {
    try{
        const { id} = args;
        const deleteStudent = await appPrisma.student.delete({
            where: {
              id: id,
            },
          })
        event.returnValue = JSON.stringify(deleteStudent)
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




ipcMain.on(STUDENT_CRUD_CALLS.importStudentsCall, async (event, args) => {
    try{
        let savedRows = [];
        let failedRows = [];
       

        const { students } = args 
       
        for (const student of students){
       
        
    
            const {index, name, departementId, collageId, discount} = student;
            try {
                const newStudent = await appPrisma.student.create({
                    data: {name, departementId, collageId, discount: discount }
                })
               
               savedRows.push(newStudent)
            } catch (error) { 
                failedRows.push(index)
                console.log(error)
            }
        }
       
        const resp = {
            savedRows,
            failedRows
        }
      
        event.returnValue = JSON.stringify(resp) 
    }
    catch(e){
        event.returnValue = e.message
    }
})

// Invalid `appPrisma.student.create()` invocation in
// /Users/mikiasbirhanu/projects/attachment-app-for-national-avaiation/app/background.js:1127:33

//   1124   discount
//   1125 } = student;
//   1126 try {
// → 1127   await appPrisma.student.create({
//            data: {
//          +   name: String,
//              departementId: undefined,
//          +   collageId: String,
//          ?   discount?: Int | null,
//          +   departement: {
//          +     create?: DepartementCreateWithoutStudentsInput | DepartementUncheckedCreateWithoutStudentsInput,
//          +     connectOrCreate?: DepartementCreateOrConnectWithoutStudentsInput,
//          +     connect?: DepartementWhereUniqueInput
//          +   },
//          ?   registeredAt?: DateTime,
//          ?   payments?: {
//          ?     create?: PaymentCreateWithoutStudentInput | PaymentCreateWithoutStudentInput | PaymentUncheckedCreateWithoutStudentInput | PaymentUncheckedCreateWithoutStudentInput,
//          ?     connectOrCreate?: PaymentCreateOrConnectWithoutStudentInput | PaymentCreateOrConnectWithoutStudentInput,
//          ?     connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput
//          ?   },
//          ?   isActive?: Boolean
//            }
//          })

// Argument name for data.name is missing.
// Argument collageId for data.collageId is missing.
// Argument departement for data.departement is missing.

// Note: Lines with + are required, lines with ? are optional.
