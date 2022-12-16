import Button from 'react-bootstrap/Button';
import React, { useEffect, useState, useRef } from 'react'
import RecietForm from '../components/reciet/receit-form';
import { api } from '../api';
import RecietList from '../components/reciet/receit-list'; 
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import {RecietToPrint} from '../components/reciet/reciet-to-print';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Home = () => {
    
     
    const [formData, setData] = useState({
        student: null,
        attachment: '',
        departement: null,
        price: 0,
        form: null,
        departement: null,
    }) 

    const onNewReciet = (reciet) => {
     
    }

    const onDataChange = (_data) => {
        const newData = {...formData, ..._data}; 
        setData(newData)
    }

   


  return (
        <div class="container">
           <p> <b>Home Page</b></p> 
           <div className="row">
                <div className="col-md-6" >
                <RecietForm onDataChange={onDataChange} formData={formData} onNewReciet={onNewReciet}/>
 
                </div>
                <div className="col-md-5 offset-1">
                    
                    <RecietToPrint data={formData} hideSignature={true} />

                   
                </div>
           </div>
        </div> 
    )
}

export default Home