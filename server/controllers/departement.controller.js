const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Retrieve all messages from the database.
export const all = async (req, res)  => {
    try {
        const departements = await prisma.departement.findMany()
        res.status(200).json( departements)
    }
    catch(e){
        res.status(500).json({"error": e.message}) 
    }
      
  }

  export const add = async (req, res) => {
    try { 

        const {name} = req.body;
        const departement = await prisma.departement.create({
            data: {
                name: name, 
            }
          });
        res.status(200).json(departement)
    }
    catch(e){
        res.status(500).json({"error": e.message}) 
    }
  }