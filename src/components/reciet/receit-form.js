import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

const RecietForm = ({onNewReciet, formData, onDataChange}) => {
    const {
        student,
        attachment,
        departement,
        price,
        form
    } = formData; 
    
    const [students, setStudents] = useState([]); 
    // const [selectedStudent, setSelectedStudent] = useState(null);    
    const [forms, setForms] = useState([]); 
    // const [selectedForm, setSelectedForm] = useState(null);  
    // const [price, setPrice] = useState(null); 
    // const [attachment, setAttachment] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(null); 
    const navigate = useNavigate();
    useEffect(() => { 
        api.get('/student/all')
            .then((res) => { 
                setStudents(res.data)
            })
            .catch(err => console.error(err));
            api.get('/payment-form/all')
            .then((res) => { 
                setForms(res.data)
            })
            .catch(err => console.error(err));
    }, [])
 
    const handleSubmit = (e) => { 
        e.preventDefault();
        if(form == null || student == null || price === 0 || attachment === ''){
            setErrorMessage("Please fill all fields and try again.");
            return;
        }
        setErrorMessage(null);
        const data = {
            studentId: student.id,
            formId: form.id,
            departementId: student.departement.id,
            price: Number(price),
            attachment: attachment
        } 

        console.log("data", data);
 
        api.post('/payment/add', data).then((res) => { 
          
            onDataChange({
                student: null,
                attachment: '',
                departement: null,
                price: 0,
                form: null
            });

            // console.log("response : ", res);
            navigate('/print',{state:res.data});
        }) 
        .catch(err => {
            console.log("Error: " + err)
            setErrorMessage("Something went wrong please try again!")
        });
      };

    
  return ( 
    <div> 
        <p>Save Reciet </p>
        <Form style={{paddingLeft: 20, paddingRight: 20}} >
        <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Select student</Form.Label>
            <Typeahead
                size="sm"
                className="mb-2"
                onChange={(_student) => { 
                    onDataChange({student: _student[0], departement: _student[0].departement});
                }}
                placeholder="Select student" 
                options={students} 
                value={student}
                labelKey={(_student) => `${_student.studentId} ${_student.name}`}
                />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Select title of the payment</Form.Label>

            <Typeahead
            size="sm"
            className="mb-2"
                onChange={(_form) => {
                    console.log("onChange form: ", _form)
                    onDataChange({form: _form[0]});

                }}
                placeholder="Select title of the payment" 
                options={forms}
                required
                labelKey={(_form) => `${_form.name}`}
                />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control required size='sm' value={price} min="0" onChange={(e) => onDataChange({price:e.target.value})} type="number" placeholder="Enter price here" />    
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAttachment">
            <Form.Label>Attachement Number</Form.Label>
            <Form.Control required size='sm' value={attachment} onChange={(e) => onDataChange({attachment:e.target.value})} type="text" placeholder="Enter attachment here" />    
        </Form.Group>
        {errorMessage != null && <Alert variant="danger">{errorMessage}</Alert>}

        <Button variant="primary" type="button" onClick={handleSubmit} className="btn btn-sm" >
                Save and Print
            </Button>
            
        </Form>
    </div>
  )
}

export default RecietForm