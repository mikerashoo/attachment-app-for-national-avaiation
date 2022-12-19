const {ipcMain} = require('electron');
const { default: appPrisma } = require('../my-prisma');
const { PAYMENT_CRUD_CALLS } = require('../ipc_calls');

const defaultPaymentTypes = [
    {
        name: 'Registration fee',
        code: 'REGISTRATION',
        isPaymentWay: false,
    },
    {
        name: 'Monthly fee',
        code: 'MONTHLY',
        isPaymentWay: true,
    },
    {
        name: 'Semister fee',
        code: 'SEMISTER',
        isPaymentWay: true,
    },
    {
        name: 'Term fee',
        code: 'TERM',
        isPaymentWay: true,
    }
]

ipcMain.on(PAYMENT_CRUD_CALLS.checkAndInitializePaymentTypes, async (event) => { 
    try{
        const _paymentTypes = await appPrisma.ptype.findMany();
       
        if(_paymentTypes.length === 0){
            for(const _paymentType of defaultPaymentTypes) {
                await appPrisma.ptype.create({
                    data: {
                        name: _paymentType.name,
                        code: _paymentType.code,
                        isPaymentWay: _paymentType.isPaymentWay,
                    }

                })
            };
           
            event.returnValue = JSON.stringify({message: `success payment types`});
        }
        else {
            event.returnValue = JSON.stringify(await appPrisma.ptype.findMany());

        }
    }
    catch(e){
        event.returnValue = JSON.stringify({'Error': e.message});
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