const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Retrieve all messages from the database.
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
        res.status(500).json({"error": e}) 
    }
      
  }

  export const addStudent = async (req, res) => {
    try { 

        const {name, departement_id} = req.body;
        const create = await prisma.student.create({
            data: {
                name: name, 
                departementId: departement_id, 
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
        res.status(500).json({"error": e}) 
    }
  }