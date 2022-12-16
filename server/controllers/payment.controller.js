const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Retrieve all messages from the database.
export const getForms = async (req, res)  => {
    try { 
        const forms = await prisma.PaymentForm.findMany()
        res.status(200).json(forms)
    }
    catch(e){
        res.status(500).json({"error": e.message}) 
    }
      
  }

  export const addForm = async (req, res) => {
    try { 

        const {name} = req.body;
        const form = await prisma.PaymentForm.create({
            data: {
                name: name,  
            }
          });
          
        res.status(200).json(form)
    }
    catch(e){
        res.status(500).json({"error": e.message}) 
    }
  }

  export const getPayments = async (req, res)  => {
    try { 
        const payments = await prisma.Payment.findMany({
            include: {
                student: true, // Return all fields
                form: true, // Return all fields
              },
        })
        res.status(200).json(payments)
    }
    catch(e){
        res.status(500).json({"error": e.message}) 
    }
      
  }

  export const addPayment = async (req, res) => {
    try { 

        const {studentId, departementId, formId, attachment, price} = req.body;
        const _payment = await prisma.Payment.create({
            data: {
                studentId, departementId, formId, attachment, price
            }
          });
        const newPayment = await prisma.Payment.findUnique({
            where : {
                id: _payment.id
            },
            include: {
                student: true, // Return all fields
                form: true,
                departement: true // Return all fields
              },
        })
        res.status(200).json(newPayment)
    }
    catch(e){
        res.status(500).json({"error": e.message}) 
    }
  }

  