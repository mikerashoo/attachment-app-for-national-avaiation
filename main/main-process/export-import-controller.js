const { join } = require('path');

const isDev = require('electron-is-dev');  
const initSqlJs = require('sql.js');
var fs = require('fs');
const path = require('path') 

import { app, ipcMain, dialog } from "electron";
import { EXPORT_IMPORT_CALLS } from "../ipc_calls";
const dbFilePath =isDev ?  './prisma/dev.db': path.join(app.getPath("userData"), "database.db") 


ipcMain.on(EXPORT_IMPORT_CALLS.exportDbCalls, async (event, args) => {
    try {
        
    const filebuffer = fs.readFileSync(dbFilePath);

    initSqlJs().then(function(SQL){
    // Load the db
    
        const db = new SQL.Database(filebuffer);
        const data = db.export();
        const buffer = Buffer.from(data);
        dialog.showSaveDialog({
            title: 'Select the File Path to save',
            defaultPath: 'test-db-export.db',
            // defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Save',
            // Restricting the user to only Text Files.
            filters: [{
                name: 'sqlite',
                extensions: ['db']
            }],
            properties: []
        }).then(file => {
            // Stating whether dialog operation was cancelled or not.
            console.log(file.canceled);
            if (!file.canceled) {
                console.log(file.filePath.toString());
                
                fs.writeFileSync(file.filePath.toString(), buffer);
                const mess = {
                    message: 'success'
                }
                event.returnValue = JSON.stringify(mess)
            }
        
        }).catch(err => {
            console.log(err) 
            event.returnValue = err.message

        });
    });
        

} catch (error) {
    console.log(error) 
    event.returnValue = error.message
}


})



ipcMain.on(EXPORT_IMPORT_CALLS.importDbCalls, async (event, args) => {
    try {
        
    dialog.showOpenDialog((fileNames) => { 
        filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
             
          ]
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }
    
        
    }).then(file => {
        if (!file.canceled) {
            let _paths = file.filePaths[0].toString();
         
            const filebuffer = fs.readFileSync(file.filePaths[0].toString());
            initSqlJs().then(function(SQL){
                // Load the db
                
                const db = new SQL.Database(filebuffer);
                const data = db.export();
                const buffer = Buffer.from(data);
                fs.writeFileSync(dbFilePath, buffer);

 
app.relaunch()
app.exit()
                const mess = {
                    message: 'success'
                }
                event.returnValue = JSON.stringify(mess)
            }) 
        }
    }).catch(err => {
        console.log(err)
        event.returnValue = err.message 
    });

} catch (error) {
    event.returnValue = error.message;
        
}
});
     