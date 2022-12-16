import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {api} from '../../api';
function FormCrud() {
   
    const [name, setName] = useState("");
    const [forms, setForms] = useState([]);
    useEffect(() => {
        api.get('/payment-form/all')
            .then((res) => { 

                setForms(res.data)
            })
            .catch(err => console.error(err));
    }, [])

    const onSaveForm = () => {
        if(name === ""){
            return;
        }
        const data = {name: name};
        api.post('/payment-form/add', data).then((res) => { 
            const newForms = [...forms, res.data];
            setForms(newForms)
            setName('') 
        }) 
        .catch(err => console.error(err));
    }
 
  return (
    <div className="row">
        <div className="col-md-8">
            <h2>Existing Forms: </h2>
            <Table size='small'  striped hover>
            <thead>
                <tr>
                <th>#</th> 
                <th> Title</th>  
                </tr>
            </thead>
            <tbody>
            {
                    forms.map((_form) => <tr key={_form.id}>
                        <td>{_form.id}</td> 
                    <td >{_form.name}</td> 
                    </tr>)
                }
                <tr>
                
                </tr>
            </tbody>
            </Table>
        </div>
        <div className="col-md-4 pr-4"> 
            <Card bg='Light' > 
                <Card.Header>New Payment Form</Card.Header>
                <Card.Body> 
                    <Form style={{paddingLeft: 20, paddingRight: 20}} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter title of form here" />    
                        </Form.Group>
                
                        <Button variant="primary" type="button" onClick={onSaveForm}>
                            Save Payment Form
                        </Button>
                    
                    </Form>
                </Card.Body>
            
            </Card>
        </div>
    </div>
  )
}

export default FormCrud