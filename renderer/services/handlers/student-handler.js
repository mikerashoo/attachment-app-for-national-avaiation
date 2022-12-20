import { STUDENT_CRUD_CALLS } from "../ipc_calls";
import osApi from "../osapi";
import responseModifier from "../response_modifier";


export const getAllStudentsHandler = async () => {
    const response = await osApi.sendSync(STUDENT_CRUD_CALLS.getAllStudentsCall);
    console.log("Response ", response);
    return responseModifier(response)
} 


export const createStudentHandler = async ( data) => {
    const response = await osApi.sendSync(STUDENT_CRUD_CALLS.createStudentCall, data);
    console.log("Create response", response);
    return responseModifier(response)
}
