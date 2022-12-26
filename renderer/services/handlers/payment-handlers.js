import { PAYMENT_CRUD_CALLS } from "../ipc_calls";
import osApi from "../osapi"
import responseModifier from "../response_modifier";


export const checkAndInitializePaymentTypes = async () => {
    try{
        const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.checkAndInitializePaymentTypesCall);
        return responseModifier(response)
    }catch(e){
        return e;
    }
    
}

export const fetchPaymentTypes = async () => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.fetchPaymentTypesCall);
    return responseModifier(response)
}

export const fetchPaymentFormsData = async () => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.fetchPaymentFormDataCall);
    return responseModifier(response)
}

export const changePaymentTypeStatus = async (data) => { 
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.changePaymentTypeStatusCall, data); 
    return responseModifier(response)
}

const createPaymentType = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.createPaymentTypeCall, JSON.stringify(data));
    return responseModifier(response)
     
}

export const addPaymentHandler = async () => {
    const title = "Test payment";
    const studentId = 1;
    const attachmentNo = "attachment"
    const checkNo = "null";
    const total = 1000;
    const payments = [
        {
            paymentId: 1,
            paymentTypeId: 1,
            price: 1000,
            month: 2,
            year: 2020,
        }
    ]
         const data =  {title, studentId, attachmentNo, checkNo, total, payments}; 
         const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.addPaymentCall, data);
         console.log("**********************", response)
        return responseModifier(response)
}

export const fetchPaymentForms = async () => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.fetchPaymentFormsCall)
    return response 
}

export const createPaymentForm = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.createPaymentFormCall, data)
    return responseModifier(response)

}

//     paymentId Int
//     payment   Payment @relation(fields: [paymentId], references: [id], onDelete: Cascade)
//     paymentTypeId Int
//     paymentType   PaymentType @relation(fields: [paymentTypeId], references: [id], onDelete: Cascade)
//     price Decimal
//     month Int
//     year Int 
const userOperations = {
    checkAndInitializePaymentTypes,
    fetchPaymentTypes,
    createPaymentType,
    addPaymentHandler
}

export default userOperations;