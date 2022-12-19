import { PrismaClient } from "@prisma/client";
const { join } = require('path'); 
const path = require('path')
const isDev = require('electron-is-dev');
import { app, ipcMain } from 'electron';


const dbPath = isDev ? join(__dirname, './prisma/dev.db') : path.join(app.getPath("userData"), "database.db")


let appPrisma = isDev ? new PrismaClient() : new PrismaClient({
    datasources: {
        db: {
            url: `file:${dbPath}`,
        },
    },
});

export default appPrisma;