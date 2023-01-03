import { EXPORT_IMPORT_CALLS } from "../ipc_calls";
import osApi from "../osapi";
import responseModifier from "../response_modifier";


export const exportDbHandler = async () => {
    const response = await osApi.sendSync(EXPORT_IMPORT_CALLS.exportDbCalls); 
    // return responseModifier(response)
} 



export const importDBHandler = async () => {
    const response = await osApi.sendSync(EXPORT_IMPORT_CALLS.importDbCalls); 
    // return responseModifier(response)
} 
