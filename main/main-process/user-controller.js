const {ipcMain} = require('electron');
const { USER_CRUD_CALLS } = require('../ipc_calls');
const { default: appPrisma } = require('../my-prisma');

const userRoles = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    CASHIER: 'CASHIER',
}

const defaultPasswords = {
    SUPER_ADMIN: '1234@super',
    ADMIN: 'admin@1234',
    CASHIER: 'cashier@1234'
}
ipcMain.on(USER_CRUD_CALLS.getAllUsersCall, async (event, args) => { 
    try{ 
        event.returnValue = JSON.stringify(await appPrisma.user.findMany({}));
         
    }
    catch(e){
        event.returnValue = e.message
    }
}) 

ipcMain.on(USER_CRUD_CALLS.userRegisterCall, async (event, args) => {
    try{
        const {name, username, role} = args; 
        

        let password = "";
        switch (role) {
            case userRoles.CASHIER:
                password = defaultPasswords.CASHIER
                break;
                case userRoles.ADMIN:
                password = defaultPasswords.ADMIN
                break;
                case userRoles.SUPER_ADMIN:
                password = defaultPasswords.SUPER_ADMIN
                break;
        
            default:
                break;
        }
        const user = await appPrisma.user.create({
            data: {
               name,
               username, 
               role,
               password: password
            }
        });
        event.returnValue = JSON.stringify(user)
    }
    catch(e){
        event.returnValue = e.message
    }
  
}) 

ipcMain.on(USER_CRUD_CALLS.userLoginCall, async (event, args) => {
    try{
        const {username, password} = args;  
        const userData = await appPrisma.user.findFirst({
            where: {
                username: username,
                password: password
            },
        });
        event.returnValue = JSON.stringify(userData)
    }
    catch(e){
        event.returnValue = e.message
    }
})

/**
 * 
 * change password 
 * 
 */
ipcMain.on(USER_CRUD_CALLS.changePasswordCall, async (event, args) => {
    try{
        const {id, password} = args;  
        const userData = await appPrisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        });
        event.returnValue = JSON.stringify(userData)
    }
    catch(e){
        event.returnValue = e.message
    }
})