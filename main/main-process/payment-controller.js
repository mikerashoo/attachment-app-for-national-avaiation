const {ipcMain} = require('electron');
const { default: appPrisma } = require('../my-prisma');
ipcMain.on('all-payments', async (event) => { 
    try{
        event.returnValue = JSON.stringify(await appPrisma.payment.findMany())
    }
    catch(e){
        event.returnValue = e.message
    } // event.sender.send('prisma-button-response', JSON.stringify(await prisma.user.findMany({})))
})

ipcMain.on('create-payment', async (event, arg) => {
    try{
         const paymentData = JSON.parse(arg); 
        const payment = await appPrisma.payment.create({
            data: { 
                name: paymentData.name
            }
        });
        event.returnValue = JSON.stringify(payment)
    }
    catch(e){
        event.returnValue = e.message
    }
   

})