import { USER_CRUD_CALLS } from "./ipc_calls";
import osApi from "./osapi"

export const all = async () => {
    try{
        const response = await osApi.sendSync(USER_CRUD_CALLS.getAll);
        return response;
    }catch(e){
        return e;
    }
    
}

const create = async (data) => {
    const response = await osApi.sendSync(USER_CRUD_CALLS.create, JSON.stringify(data));
    return response;
     
}
const userOperations = {
    all,
    create,
}

export default userOperations;