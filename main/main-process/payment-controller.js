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
 

ipcMain.on(PAYMENT_CRUD_CALLS.fetchPaymentFormsForDepartementCall, async (event, args) => {
    try{
        const {id} = args
        const departement = await appPrisma.departement.findUnique({
            where: {
                id
            },
            include: {
                departementPaymentPrices: true
            }
        })

        const pTypes= [];
        for(const p of departement.departementPaymentPrices){
            pTypes.push(p.paymentTypeId)
        }

        const paymentForms = await appPrisma.paymentForm.findMany({
            
            where: {
                paymentTypeId: { in: pTypes },
            },
            include: {
                paymentType: true
            }
        })
        event.returnValue = JSON.stringify(paymentForms) 
    }
    catch(e){
        event.returnValue = e.message
    }
})
 
 
ipcMain.on(PAYMENT_CRUD_CALLS.savePaymentCall, async (event, args) => {
    try{
        const {title, studentId, userId, attachmentNo, paymentWay, checkNo, penality, total, selectedPaymentForms} = args;
        const payment = await appPrisma.payment.create({
            data: {title: title, studentId: parseInt(studentId), attachmentNo, paymentWay, checkNo, penality: penality, total, userId}
        }) 
 
        //GET STUDENT 
        const student = await appPrisma.student.findUnique({
            where: {id: studentId}
        })

        //GET DEPARTEMENT WITH PAYMENTS
        const departement = await appPrisma.departement.findUnique({
            where: {id: student.departementId},
            include: {
                departementPaymentPrices: true
            }
        })

        //FOREACH PAYMENT FORMS MAP IT WITH DEPARTEMENT PAYMENTS
        for(const paymentFormId of selectedPaymentForms){ 
            const paymentForm = await appPrisma.paymentForm.findUnique({
                where: {
                    id: paymentFormId
                },
                include: {
                    paymentType: true
                }
            })
            const depPayment = departement.departementPaymentPrices.find(dP => dP.paymentTypeId === paymentForm.paymentTypeId);
            let price = depPayment.price;
            if(student.discount != null && student.discount > 0 && paymentForm.paymentType.isPaymentWay) {
               
                let discountAmount = 100 - parseInt(student.discount);
                let percentMultiplier = discountAmount / 100;
                price = price * percentMultiplier;  
              }
            await appPrisma.paymentFormPayment.create({
                data: {
                    paymentFormId: paymentForm.id,
                    paymentId: payment.id,
                    price: price
                }
            })
        }

        const paymentResponse = await appPrisma.payment.findUnique({
            where: {
                id: payment.id
            },
            include: {
                formPayments: true,
                user: true
            }
        })

        event.returnValue = JSON.stringify(paymentResponse) 
         
    }
    catch(e){
        event.returnValue = e.message
    }
})


ipcMain.on(PAYMENT_CRUD_CALLS.fetchPaymentsCall, async (event, args) => {
    try{
        const payments = await appPrisma.payment.findMany({
            include: {
                formPayments: true,
                student: true,
                user: true
            },
            orderBy: [
                {
                    id: 'desc',
                }
            ]
        })
        event.returnValue = JSON.stringify(payments) 

    }
    catch(e){
        event.returnValue = e.message
    }
})

ipcMain.on(PAYMENT_CRUD_CALLS.getPaymentDetailsCall, async (event, args) => {
    const paymentId = parseInt(args.id)
    try{
        const payment = await appPrisma.payment.findUnique({
            where: {
                id: paymentId
            },
            include: {
                formPayments: {
                     
                    include: { 
                        paymentForm: {
                            select: {
                                paymentType: true,
                                title: true
                            }
                        }
                    }
                },
                student: {                    
                    
                    select: {
                        name: true,
                        collageId: true,
                        discount: true,
                        departement: {
                            include: {
                                departementPaymentPrices: true
                            }
                        }
                    }
                },
                user: true
            },
        })
        event.returnValue = JSON.stringify(payment) ;
    }
    catch(e){
        event.returnValue = e.message
    }
})
 


ipcMain.on(PAYMENT_CRUD_CALLS.fetchPaymentsCall, async (event, args) => {
    try{
        const payments = await appPrisma.payment.findMany({
            include: {
                formPayments: true,
                student: true,
                user: true
            },
            orderBy: [
                {
                    id: 'desc',
                }
            ]
        })
        event.returnValue = JSON.stringify(payments) 

    }
    catch(e){
        event.returnValue = e.message
    }
})




ipcMain.on(PAYMENT_CRUD_CALLS.getMonthlyPaymentResports, async (event, args) => {
    try{
        const { monthYear, studentId } = args;
       

        if(studentId == null) {
            studentId == ""
        }
        if(monthYear != null && monthYear.length >= 1){
            const dateParsed = monthYear.split('-');
            
            date = new Date(dateParsed[0], dateParsed[1] - 1, 1); 
            const maxDate =  new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const payments = await appPrisma.payment.findMany({
                where: {
                    createdAT: {
                        gte: date,
                        lte: maxDate
                    },
                    student: {
                        collageId: {
                            startsWith: studentId
                        }
                    }
                },
                include: {
                    formPayments: true,
                    student: true,
                    user: true
                },
                orderBy: [
                    {
                        id: 'desc',
                    }
                ]
            })
            event.returnValue = JSON.stringify(payments) 
        } 
        else if(studentId.length > 0){
         
            const payments = await appPrisma.payment.findMany({
                where: {
                    
                    student: {
                        collageId: {
                            startsWith: studentId
                        }
                    }
                },
                include: {
                    formPayments: true,
                    student: true,
                    user: true
                },
                orderBy: [
                    {
                        id: 'desc',
                    }
                ]
            })
            event.returnValue = JSON.stringify(payments) 
        }
        else {
            var dateObj = new Date(); 
            var date = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1); 
            const payments = await appPrisma.payment.findMany({
                where: {
                    createdAT: {
                        gte: date, 
                    },
                    student: {
                        collageId: {
                            startsWith: studentId
                        }
                    }
                },
                include: {
                    formPayments: true,
                    student: true,
                    user: true
                },
                orderBy: [
                    {
                        id: 'desc',
                    }
                ]
            })
            event.returnValue = JSON.stringify(payments) 
        }
         
       

   

    }
    catch(e){
        event.returnValue = e.message
    }
})