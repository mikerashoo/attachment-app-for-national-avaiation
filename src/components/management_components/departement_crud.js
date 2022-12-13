import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {api} from '../../api';
function DepartementCrud({departements, onNewDepartement}) {
   
    const [name, setName] = useState("");

     

    const saveDepartement = () => {
        if(name === ""){
            return;
        }
        const data = {name: name}
        api.post('/departement/add', data).then((res) => {  
            onNewDepartement(res.data)
            setName('')
        })
        .catch(err => console.error(err));
    }
  return (
    <div>
        <Card className="mb-2 mt-4 pl-4 pr-4" bg='Light' > 
        <Card.Header>New Departement</Card.Header>
          <Card.Body> 
            <Form style={{paddingLeft: 20, paddingRight: 20}} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Departement</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />    
                </Form.Group>
        
                <Button variant="primary" type="button" onClick={saveDepartement}>
                    Submit
                </Button>
            
            </Form>
          </Card.Body>
         
        </Card>
          {
            departements.map((student) => <p>{student.name}</p>)
          }
    </div>
  )
}

export default DepartementCrud