// Retrieve all messages from the database.
export function findAll(req, res) {
    try {
        res.status(200).send('get all!')
    }
    catch(e){
        res.status(500).send('error!') 
    }
      
  }