import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {api} from '../../api';

const StudentCrud = ({departements}) => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [selectedDepartementId, setSelectedDepartementId] = useState(null);

    useEffect(() => {
        api.get('/student/all')
            .then((res) => {
        console.log("student", res.data);

                setStudents(res.data)
            })
            .catch(err => console.error(err));
    }, [])

    const saveStudent = () => {
        if(name === "" || selectedDepartementId == null){
            return;
        }
        const data = {name: name, departementId: Number(selectedDepartementId), studentId: studentId};
        api.post('/student/add', data).then((res) => {
            console.log("add student response: ", res)
            const newStudents = [...students, res.data];
            setStudents(newStudents)
            setName('')
            setStudentId('')
        }) 
        .catch(err => console.error(err));
    }
  return (

    <div className="row">
        <div className="col-md-8">
            <h2>Students: </h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th> Student Id</th>

                <th> Name</th>
                <th>Departement</th> 
                </tr>
            </thead>
            <tbody>
            {
                    students.map((student) => <tr key={student.id}>
                        <td>{student.id}</td>
                    <td >{student.studentId}</td>
                    <td >{student.name}</td>
                    <td>{student.departement.name}</td>
                    </tr>)
                }
                <tr>
                
                </tr>
            </tbody>
        </Table>
        </div>
        <div className="col-md-4 pr-4"> 
              <Card bg='Light' > 
        <Card.Header>Add Student</Card.Header>
          <Card.Body> 
            <Form style={{paddingLeft: 20, paddingRight: 20}} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Name</Form.Label> */}
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />    
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Student Id</Form.Label> */}
                    <Form.Control value={studentId} onChange={(e) => setStudentId(e.target.value)} type="text" placeholder="Enter ID" />    
                </Form.Group>
                <Form.Select
                    id="selectToastPlacement"
                    className="mt-2 mb-2  "
                    onChange={(e) => setSelectedDepartementId(e.currentTarget.value)}
                    >
                        <option>Select Departement</option>
                    {
                    departements.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                        {dep.name}
                        </option>
                    ))}
                    </Form.Select >
                    <div className="text-right">
                <Button variant="primary" type="button" onClick={saveStudent}>
                    Save Student Information
                </Button></div>
            
            </Form>
          </Card.Body>
         
        </Card>
        </div>
    </div>
 
  )
}

export default StudentCrud 