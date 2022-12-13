import React, { useEffect, useState } from 'react'
import { api } from '../api';
import DepartementCrud from '../components/management_components/departement_crud'
import StudentCrud from '../components/management_components/student_crud'

const ManageStudentPage = () => {
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
<div className="container">
    <div className="row">
        <div className="col-sm-9">
            <StudentCrud  departements={departements} />
        </div>
        <div className="col-sm-3">
            <DepartementCrud onNewDepartement={onNewDepartement} departements={departements} />
        </div>
    </div>
</div>
  )
}

export default ManageStudentPage