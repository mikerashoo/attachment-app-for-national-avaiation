const {ipcMain} = require('electron');
const { USER_CRUD_CALLS } = require('../ipc_calls');
const { default: appPrisma } = require('../my-prisma');
ipcMain.on(USER_CRUD_CALLS.getAll, async (event) => { 
    try{
        event.returnValue = JSON.stringify(await appPrisma.departement.findMany({}))
    }
    catch(e){
        event.returnValue = e.message
    }
})

ipcMain.on(USER_CRUD_CALLS.create, async (event, arg) => {
    try{
        const userData = JSON.parse(arg); 
        const user = await appPrisma.user.create({
            data: {
                email: userData.email,
                name: userData.name
            }
        });
        event.returnValue = JSON.stringify(user)
    }
    catch(e){
        event.returnValue = e.message
    }
    

})