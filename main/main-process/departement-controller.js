const {ipcMain} = require('electron');
const { default: appPrisma } = require('../my-prisma');
const { DEPARTEMENT_CRUD_CALLS } = require('../ipc_calls');  
 

ipcMain.on(DEPARTEMENT_CRUD_CALLS.getAllDepartementsCall, async (event, args) => {
    try{
        const departements = await appPrisma.departement.findMany({
            include: {
                paymentWay: true,
                departementPaymentPrices: true, 
              }, 
        });
        event.returnValue = JSON.stringify(departements)
    }
    catch(e){
        event.returnValue = e.message
    }
})

ipcMain.on(DEPARTEMENT_CRUD_CALLS.createDepartementsCall, async(event, args) => {
    try{
        const {
            name, 
            totalCreditHour,
            pricePerCreditHour,
            paymentTypeId,
            creditHoursPerPaymentWay,
            registrationPrice,
            paymentPrice,
        } = args;
         
        const deprtement = await appPrisma.create({
            data: {
                name, 
                totalCreditHour,
                pricePerCreditHour,
                paymentTypeId,
                creditHoursPerPaymentWay,
                registrationPrice,
                paymentPrice
              }, 
        });
        event.returnValue = JSON.stringify(deprtement)
    }
    catch(e){
        event.returnValue = e.message
    }
})

//CREATE CONTROLLER
ipcMain.on(DEPARTEMENT_CRUD_CALLS.createDepartementsCall, async (event, args) => {
    try{
        
    }
    catch(e){
        event.returnValue = e.message
    }
})
 