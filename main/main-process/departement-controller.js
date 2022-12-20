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

ipcMain.on(DEPARTEMENT_CRUD_CALLS.createDepartementCall, async(event, args) => {
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

        const departementToReturn = await appPrisma.departement.findFirst({
            where: {
                id: departement.id
            },
            include: {
                paymentWay: true,
                departementPaymentPrices: true, 
              }, 
        })
 
        event.returnValue = JSON.stringify(departementToReturn)
    }
    catch(e){
        event.returnValue = e.message
    }
})

//Delete departement
ipcMain.on(DEPARTEMENT_CRUD_CALLS.deleteDepartementCall, async (event, args) => {
    try{
        const {id} = args;
        const deleteDep = await appPrisma.departement.delete({
            where: {id: id}
        })
        event.returnValue = JSON.stringify(deleteDep)
    }
    catch(e){
        event.returnValue = e.message
    }
})
 