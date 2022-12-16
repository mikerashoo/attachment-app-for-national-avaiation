import appModulePath from 'app-module-path';
import path, { join } from 'path';
 
const { PrismaClient } = require('@prisma/client');
// const electron = require('electron');
// appModulePath.addPath(`${__dirname}`); 
// const dbPath = isDev ? join(__dirname, './prisma/dev.db') : path.join(electron.app.getPath("userData"), "database.db")
// const dbPath =  path.join(electron.app.getPath('userData'), 'database.db');
let prisma = new PrismaClient();
export const test = async (req, res)  => {
    try {
        const students = await prisma.studentaa.findMany({
            include: {
                departement: true, // Return all fields
              },
        })
        res.status(200).json(students)
    }
    catch(e){
      
          res.status(500).json({"error": e.message}) 

    }
      
  }

export const getAllStudents = async (req, res)  => {
    try {
        const students = await prisma.student.findMany({
            include: {
                departement: true, // Return all fields
              },
        })
        res.status(200).json(students)
    }
    catch(e){
        res.status(500).json({"error": e.message}) 
    }
      
  }

  export const addStudent = async (req, res) => {
    try { 

        const {name, studentId, departementId} = req.body;
        const create = await prisma.student.create({
            data: {
                name: name, 
                studentId: studentId, 
                departementId: departementId, 
            }
          });
          const student = await prisma.student.findUnique({
            where: {
              id: create.id,
            },
            include: {
                departement: true, // Return all fields
              },
          })
        res.status(200).json(student)
    }
    catch(e){
        res.status(500).json({"error": e.message}) 
    }
  }