import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { RecietToPrint } from '../components/reciet/reciet-to-print'

const PrintPage = () => {
    let recietRef = useRef();
    const location = useLocation(); 
    const [formData, setFormData] = useState({
        student: null,
        attachment: '',
        departement: null,
        price: 0,
        form: null
    })
    useEffect(() => { 
        if(location.state != null) { 
            setFormData({...formData, ...location.state});
        }
    }, []);

    const handlePrint =  useReactToPrint({
      content: () => recietRef.current,
    });
 
  return (
    <div className="container"> 
    <div className="row">
        <div className="col-md-8 offset-2">
        <RecietToPrint ref={recietRef} data={formData} />
        <div className="text-center">
        <Button onClick={handlePrint}>Print this out </Button>

        </div>

        </div>
    </div>
       
        
    </div>
  )
}

export default PrintPage