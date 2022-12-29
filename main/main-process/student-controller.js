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