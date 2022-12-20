import { DEPARTEMENT_CRUD_CALLS } from "../ipc_calls";
import osApi from "../osapi"
import responseModifier from "../response_modifier";

export const getAllDepartementsHandler = async () => {
    const response = await osApi.sendSync(DEPARTEMENT_CRUD_CALLS.getAllDepartementsCall); 
    return responseModifier(response)
}

export const createNewDepartementHandler = async ( data) => {
    const response = await osApi.sendSync(DEPARTEMENT_CRUD_CALLS.createDepartementCall, data);
    console.log("Create response", response);
    return responseModifier(response)
}


export const deleteDepartementHandler = async ( id) => { 
    const response = await osApi.sendSync(DEPARTEMENT_CRUD_CALLS.deleteDepartementCall, {id});
    console.log("delete response", response);
    return responseModifier(response)
}