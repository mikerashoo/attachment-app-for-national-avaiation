const {ipcMain, app} = require('electron');
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
        name: 'Quarter fee',
        code: 'QUARTER',
        isPaymentWay: true,
    } 
]

ipcMain.on(PAYMENT_CRUD_CALLS.checkAndInitializePaymentTypesCall, async (event) => { 
    try{
        const _paymentTypes = await appPrisma.paymentType.findMany();
       
        if(_paymentTypes.length === 0){
            for(const _paymentType of defaultPaymentTypes) {
                await appPrisma.paymentType.create({
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
            event.returnValue = JSON.stringify(await appPrisma.paymentType.findMany());

        }
    }
    catch(e){
        event.returnValue = JSON.stringify({'Error': e.message});
    } // event.sender.send('prisma-button-response', JSON.stringify(await prisma.user.findMany({})))
})

ipcMain.on(PAYMENT_CRUD_CALLS.fetchPaymentTypesCall, async (event, args) => {
    try{
        const pTypes = await appPrisma.paymentType.findMany();
        event.returnValue = JSON.stringify(pTypes)
    }
    catch(e){
        event.returnValue = e.message
    }
})

//Update status of payment types
ipcMain.on(PAYMENT_CRUD_CALLS.changePaymentTypeStatusCall, async (event, args) => {
    try{
        const {id} = args; 
        const currentStatus = await appPrisma.paymentType.findUnique({
            where: {
                id: id,
              }
        })
        const updatePtype = await appPrisma.paymentType.update({
            where: {
              id: id,
            },
            data: {
              isActive: !currentStatus.isActive,
            },
          }) 
        event.returnValue = JSON.stringify(updatePtype)
    }
    catch(e){
        event.returnValue = e.message
    }
})


ipcMain.on(PAYMENT_CRUD_CALLS.createPaymentTypeCall, async (event, args) => {
    try{
         const paymentData = JSON.parse(args); 
        const payment = await appPrisma.paymentType.create({
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


ipcMain.on(PAYMENT_CRUD_CALLS.addPaymentCall, async (event, args) => {
    try{
        const {title, studentId, attachmentNo, checkNo, total, payments} = args; 
         

        const payment = await appPrisma.payment.create({
            data: { 
                title, studentId, attachmentNo, checkNo, total
            }
        });
        payments.forEach(async (typePrice) => {
 
             await appPrisma.paymentTypePrice.create({
                data: {
                    ...typePrice
                }
             })
        });

        const paymentResponse = await appPrisma.payment.findUnique({
            where: {
                id: payment.id
            }
        })
        event.returnValue = JSON.stringify(payment)
    }
    catch(e){
        event.returnValue = e.message
    }

})

ipcMain.on(PAYMENT_CRUD_CALLS.fetchPaymentFormsCall, async (event, args) => {
    try{
        const paymentForms = await appPrisma.paymentForm.findMany();
        event.returnValue = paymentForms
    }
    catch(e){
        event.returnValue = e.message
    }
})

ipcMain.on(PAYMENT_CRUD_CALLS.fetchPaymentFormDataCall, async (event, args) => {
    try{
        
        const paymentForms = await appPrisma.paymentForm.findMany({
            include: {
                paymentType: true
            },
            orderBy: [
                {
                    id: 'desc',
                }
            ]
        });

        event.returnValue = JSON.stringify(paymentForms)
    }
    catch(e){
        event.returnValue = e.message
    }
})
 
ipcMain.on(PAYMENT_CRUD_CALLS.createPaymentFormCall, async (event, args) => {
    try{
        const newForm = await appPrisma.paymentForm.create({
            data: {...args}
        })
        const paymentForm = await appPrisma.paymentForm.findUnique({
            where: {
                id: newForm.id
            },
            include: {
                paymentType: true
            }
        });

        event.returnValue = JSON.stringify(paymentForm) 
    }
    catch(e){
        event.returnValue = e.message
    }
})

ipcMain.on(PAYMENT_CRUD_CALLS.changePaymentFormStateCall, async (event, args) => {
    try{
        const {id, status} = args
        const updatedForm = await appPrisma.paymentForm.update({
            where: {
                id: id
            },
            data: {
                isActive: status
            },
            include: {
                paymentType: true
            }
        })
        event.returnValue = JSON.stringify(updatedForm) 
    }
    catch(e){
        event.returnValue = e.message
    }
})