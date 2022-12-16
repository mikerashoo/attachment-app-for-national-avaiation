import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
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
    <div className="row">
        <div className="col-md-8">
            <h2>Departements: </h2>
            <Table striped hover>
            <thead>
                <tr>
                <th>#</th> 

                <th> Name</th> 
                </tr>
            </thead>
            <tbody>
            {
                    departements.map((departement) => <tr key={departement.id}>
                        <td>{departement.id}</td> 
                    <td >{departement.name}</td> 
                    </tr>)
                }
                <tr>
                
                </tr>
            </tbody>
        </Table>
        </div>
        <div className="col-md-4 pr-4"> 
            <Card bg='Light' > 
            <Card.Header>New Departement</Card.Header>
          <Card.Body> 
            <Form style={{paddingLeft: 20, paddingRight: 20}} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Departement</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />    
                </Form.Group>
        
                <Button variant="primary" type="button" onClick={saveDepartement}>
                    Save Departement
                </Button>
            
            </Form>
          </Card.Body>
            
            </Card>
        </div>
    </div> 
  )
}

export default DepartementCrud