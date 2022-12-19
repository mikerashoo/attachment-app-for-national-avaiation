import { DEPARTEMENT_CRUD_CALLS } from "../ipc_calls";
import osApi from "../osapi"
import responseModifier from "../response_modifier";

export const getAllDepartements = async () => {
    const response = await osApi.sendSync(DEPARTEMENT_CRUD_CALLS.getAllDepartementsCall);
    console.log("Response ", response);
    return responseModifier(response)
}