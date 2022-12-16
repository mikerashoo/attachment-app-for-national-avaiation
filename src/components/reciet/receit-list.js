import React from 'react'
import { Table } from 'react-bootstrap'

const RecietList = ({reciets}) => {
  return (
    <div>
        <h1>Recent reciets</h1>
        <Table striped bordered size='sm' hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Payment Type</th>

                <th>Payed in birr</th> 
                </tr>
            </thead>
            <tbody>
            {
                    reciets.map((reciet) => <tr key={reciet.id}>
                        <td>{reciet.id}</td>
                    <td >{reciet.student.name}</td>

                    <td >{reciet.form.name}</td>
                    <td>{reciet.price}</td>
                    </tr>)
                }
                <tr>
                
                </tr>
            </tbody>
        </Table>
    </div>
  )
}

export default RecietList