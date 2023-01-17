import { USER_CRUD_CALLS } from "../ipc_calls";
import osApi from "../osapi"
import responseModifier from "../response_modifier";

export const getAllUsersHandler = async () => {
    const response = await osApi.sendSync(USER_CRUD_CALLS.getAllUsersCall); 
    return responseModifier(response)
}

export const createUserHandler = async ( data) => {
    const response = await osApi.sendSync(USER_CRUD_CALLS.createUserCall, data); 
    return responseModifier(response)
}

 

export const loginUserHandler = async ( data) => {
    const response = await osApi.sendSync(USER_CRUD_CALLS.userLoginCall, data); 
    return responseModifier(response)
}