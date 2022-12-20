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
        } = args;
        
        const registrationPayment = await appPrisma.paymentType.findFirst({
            where: {
                code: 'REGISTRATION'
            }
        })      
        const departement = await appPrisma.departement.create({
            data: {
                name, 
                totalCreditHour,
                pricePerCreditHour,
                paymentTypeId,
                creditHoursPerPaymentWay
              }, 
        });

        const depPayPrice = pricePerCreditHour * creditHoursPerPaymentWay;
        const depPayment = await appPrisma.departementPaymentPrice.create({
            data: {
                paymentTypeId, 
                departementId: departement.id,
                price: depPayPrice
            }
        })

        const regPayment = await appPrisma.departementPaymentPrice.create({
            data: {
                paymentTypeId: registrationPayment.id, 
                departementId: departement.id,
                price: registrationPrice
            }
        })
 
        event.returnValue = JSON.stringify(departement)
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
 