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
 

export const fetchPaymentForms = async () => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.fetchPaymentFormsCall)
    return response 
}

export const createPaymentForm = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.createPaymentFormCall, data)
    return responseModifier(response)
}

export const updatePaymentFormStatus = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.changePaymentFormStateCall, data)
    return responseModifier(response)
}

export const fetchPaymentFormsForDepartement = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.fetchPaymentFormsForDepartementCall, data)
    return responseModifier(response)
}

export const savePaymentHandler = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.savePaymentCall, data)
    return responseModifier(response)
}



export const fetchPaymentsHandler = async () => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.fetchPaymentsCall)
    return responseModifier(response)
}


export const getPaymentDetailHandler = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.getPaymentDetailsCall, data)
    return responseModifier(response)
}
 

export const fetchMonthlyPaymentReports = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.getMonthlyPaymentResports, data)
    return responseModifier(response)
}


const userOperations = {
    checkAndInitializePaymentTypes,
    fetchPaymentTypes,
    createPaymentType, 
}

export default userOperations;