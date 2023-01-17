const { join } = require('path');
const fs = require('fs')
const glob = require('glob');
const path = require('path')
const isDev = require('electron-is-dev'); 
import { app, ipcMain } from 'electron';

import serve from 'electron-serve';

import { createWindow } from './helpers';
import appPrisma from './my-prisma';
export const latestMigration = "20221217183943_payment_table_added";
const dbPath = isDev ? join(__dirname, './prisma/dev.db') : path.join(app.getPath("userData"), "database.db")

if (!isDev) {
    try {
        fs.copyFileSync(join(process.resourcesPath, 'prisma/dev.db'), dbPath, fs.constants.COPYFILE_FICLONE)
       
    } catch (err) {
        if (err.code != "EEXIST") {
            console.error(`Failed creating sqlite file.`, err)
        } else {
            console.log("Database file detected")
        }
    }
}
 

console.log(`Is Production?: ${!isDev}`)

const isProd = !isDev;

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {  
  await app.whenReady();
  await checkPaymentTypeIsSetted();
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  }); 

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});


ipcMain.on('ping-pong', (event, arg) => {
    event.sender.send('ping-pong', `[ipcMain] "${arg}" received asynchronously.`);
  });
  
  ipcMain.on('ping-pong-sync', (event, arg) => {
    event.returnValue = `"${arg}" mike synchronously.`;
  });

  


// Import all the IPC sender from Main Process
function loadMainProcess() {
    const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'));
    files.forEach((file) => require(file));
  } 

  async function checkPaymentTypeIsSetted  () {
    try {
      const defaultPaymentTypes = [
        {
            name: 'Registration fee',
            code: 'REGISTRATION',
            isPaymentWay: false,
        },
        {
            name: 'Monthly fee',
            code: 'MONTHLY',
            isPaymentWay: true,
        },
        {
            name: 'Semister fee',
            code: 'SEMISTER',
            isPaymentWay: true,
        },
        {
            name: 'Quarter fee',
            code: 'QUARTER',
            isPaymentWay: true,
        } 
    ]
      const _paymentTypes = await appPrisma.paymentType.findMany();
       
    if(_paymentTypes.length === 0){
        for(const _paymentType of defaultPaymentTypes) {
            await appPrisma.paymentType.create({
                data: {
                    name: _paymentType.name,
                    code: _paymentType.code,
                    isPaymentWay: _paymentType.isPaymentWay,
                }

            })
        };
    }

    const _users = await appPrisma.user.findMany();
    if(_users.length === 0){
      await appPrisma.user.create({
        data: {
          name: 'Mikiyas Birhanu',
          username: 'mkbirhanu',
          password: 'mike@1234',
          role: 'SUPER_ADMIN'
        }
      })
    }
        
    }
    catch (error) {
      console.log(error);
    }
  }

require('./main-process/user-controller')
require('./main-process/payment-controller')
require('./main-process/departement-controller')
require('./main-process/student-controller')
require('./main-process/export-import-controller')
 