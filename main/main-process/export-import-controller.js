const { join } = require('path');

const isDev = require('electron-is-dev');  
const initSqlJs = require('sql.js');
var fs = require('fs');
const path = require('path') 

import { app, ipcMain, dialog } from "electron";
import { EXPORT_IMPORT_CALLS } from "../ipc_calls";
const dbFilePath =isDev ?  './prisma/dev.db': path.join(app.getPath("userData"), "database.db") 


ipcMain.on(EXPORT_IMPORT_CALLS.exportDbCalls, async (event, args) => {
   
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
            }
        
        }).catch(err => {
            console.log(err)
        });
    });
        


})



ipcMain.on(EXPORT_IMPORT_CALLS.importDbCalls, async (event, args) => {
    dialog.showOpenDialog((fileNames) => {
        // fileNames is an array that contains all the selected
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }
    
        
    }).then(file => {
        if (!file.canceled) {
           
            const filebuffer = fs.readFileSync(file.filePaths[0].toString());
            initSqlJs().then(function(SQL){
                // Load the db
                
                const db = new SQL.Database(filebuffer);
                const data = db.export();
                const buffer = Buffer.from(data);
                fs.writeFileSync(dbFilePath, buffer);
            })
            // fs.writeFileSync(file.filePath.toString(), buffer);
        }
    }).catch(err => {
        console.log(err)
    });
});
     