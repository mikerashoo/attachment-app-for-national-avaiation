import { PAYMENT_CRUD_CALLS } from "../ipc_calls";
import osApi from "../osapi"
import responseModifier from "../response_modifier";


export const checkAndInitializePaymentTypes = async () => {
    try{
        const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.checkAndInitializePaymentTypesCall);
        
        return response;
    }catch(e){
        return e;
    }
    
}

export const getAllPaymentTypes = async () => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.getAllPaymentTypesCall);
    return responseModifier(response)
}

export const changePaymentTypeStatus = async (data) => {
    console.log("====================", data)
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.changePaymentTypeStatusCall, data);
    console.log("Response: ", response);
    return responseModifier(response)
}

const createPaymentType = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.createPaymentTypeCall, JSON.stringify(data));
    return response;
     
}
const userOperations = {
    checkAndInitializePaymentTypes,
    getAllPaymentTypes,
    createPaymentType,
}

export default userOperations;