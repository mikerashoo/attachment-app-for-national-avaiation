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
        name: 'Term fee',
        code: 'TERM',
        isPaymentWay: true,
    }
    ,
    {
        name: 'Penality',
        code: 'PENALITY',
        isPaymentWay: false,
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

ipcMain.on(PAYMENT_CRUD_CALLS.getAllPaymentTypesCall, async (event, args) => {
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



// model Payment {
//     id            Int         @id @default(autoincrement())
//     title          String
//     collageId     String      @unique
//     studentId Int
//     student   Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
//     attachmentNo String
//     checkNo String
//     paymentTypes PaymentTypePrice[]
//     total Decimal
//     createdAT DateTime  @default(now())
// }

// model PaymentTypePrice {
//     id            Int         @id @default(autoincrement())
//     paymentId Int
//     payment   Payment @relation(fields: [paymentId], references: [id], onDelete: Cascade)
//     paymentTypeId Int
//     paymentType   PaymentType @relation(fields: [paymentTypeId], references: [id], onDelete: Cascade)
//     price Decimal
//     month Int
//     year Int 
// }
