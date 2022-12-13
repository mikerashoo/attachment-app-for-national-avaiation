
 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Retrieve all messages from the database.
export const findAll = async (req, res)  => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json({data: users})
    }
    catch(e){
        res.status(500).json({"error": e}) 
    }
      
  }

  export const addUser = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: 'Api Test',
              email: 'mkbirhan23u@gmail.com'
            }
          });
        res.status(200).json({data: user})
    }
    catch(e){
        res.status(500).json({"error": e}) 
    }
  }