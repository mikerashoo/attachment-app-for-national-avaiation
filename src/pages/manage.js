import React, { useEffect, useState } from 'react'
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { api } from '../api';
import DepartementCrud from '../components/management_components/departement_crud'
import FormCrud from '../components/management_components/form_crud';
import StudentCrud from '../components/management_components/student_crud'

const ManagePage = () => {
    const [departements, setDepartements] = useState([]);
    useEffect(() => {
        api.get('/departement/all')
            .then((res) => {
                setDepartements(res.data)
            })
            .catch(err => console.error(err));
    }, [])

    const onNewDepartement = (departement) => {
         
            const newdepartements = [...departements, departement];
            setDepartements(newdepartements)
        
    }
  return (
<div className="container-fluid">
<Tab.Container id="left-tabs-example" defaultActiveKey="form">
      <Row>
        <Col sm={2} className="pt-4" style={{backgroundColor: '#eee', minHeight: '100vh'}}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="form">Manage Forms</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="departement">Manage Departements</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="student">Manage Students</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9} className="p-4">
          <Tab.Content>
          <Tab.Pane eventKey="form"> 
            <FormCrud />
            </Tab.Pane>
            <Tab.Pane eventKey="departement">
           
            <DepartementCrud onNewDepartement={onNewDepartement} departements={departements} />


            </Tab.Pane>
            <Tab.Pane eventKey="student">
                <StudentCrud  departements={departements} />
            </Tab.Pane>
            
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
     
</div>
  )
}

export default ManagePage