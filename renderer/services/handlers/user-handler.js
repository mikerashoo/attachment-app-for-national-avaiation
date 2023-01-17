import { USER_CRUD_CALLS } from "../ipc_calls";
import osApi from "../osapi"
import responseModifier from "../response_modifier";

export const getAllUsersHandler = async (data) => {
    const response = await osApi.sendSync(USER_CRUD_CALLS.getAllUsersCall, data); 
    return responseModifier(response)
}

export const registerUserHandler = async (data) => {
    const response = await osApi.sendSync(USER_CRUD_CALLS.userRegisterCall, data);  
    return responseModifier(response)
}


export const loginUserHandler = async ( data) => {
    const response = await osApi.sendSync(USER_CRUD_CALLS.userLoginCall, data); 
    return responseModifier(response)
}


export const changePasswordHandler = async ( data) => {
    const response = await osApi.sendSync(USER_CRUD_CALLS.changePasswordCall, data); 
    return responseModifier(response)
}