import React from 'react'
import { Card, Table } from 'react-bootstrap';

export const RecietToPrint = React.forwardRef((props, ref) =>  {
    const {
        student,
        attachment,
        departement,
        price,
        form
    } = props.data;  
  return (
    <Card className="p-4 m-4" ref={ref}>
        <div className="text-right">
            <div className="text-end">Date: 22/1/2020</div>
            <div className="text-end">No: 211212</div>
        </div>
        <h1 className="text-center">Nationa Aviation Collage</h1>
        <h2 className="text-center">{form != null ? form.name : '-'} Title of the form</h2>
        <Table bordered hover>
            
            <tbody>
                <tr>
                    <td>Student Name</td>
                    <td>{student != null ? student.name : '-'}</td>
                </tr>  
                <tr>
                    <td>Departement</td>
                    <td>{departement != null ? departement.name : '-'}</td>
                </tr>  
                <tr>
                    <td>Attachement number</td>
                    <td>{attachment}</td>
                </tr>
                <tr>
                    <td>Total payment</td>
                    <td>{price} birr</td>
                </tr>
            </tbody>
        </Table>

        <div className="row">
            <div className="col-md-6">
                Cashier name and signature: ______________________________
            </div>  
            <div className="col-md-6">
                Customer Signature: ______________________________
                
            </div>
             </div>
    </Card>
  )
});