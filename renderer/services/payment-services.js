import { PAYMENT_CRUD_CALLS } from "./ipc_calls";
import osApi from "./osapi"


export const checkAndInitializePaymentTypes = async () => {
    try{
        const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.checkAndInitializePaymentTypes);
        console.log("Does payment types exist?", response);
        return response;
    }catch(e){
        return e;
    }
    
}

export const allPaymentTypes = async () => {
    try{
        const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.getAllPaymentTypes);
        return response;
    }catch(e){
        return e;
    }
    
}

const createPaymentType = async (data) => {
    const response = await osApi.sendSync(PAYMENT_CRUD_CALLS.createPaymentType, JSON.stringify(data));
    return response;
     
}
const userOperations = {
    checkAndInitializePaymentTypes,
    allPaymentTypes,
    createPaymentType,
}

export default userOperations;