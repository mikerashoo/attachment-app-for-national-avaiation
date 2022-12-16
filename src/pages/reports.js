import React, { useEffect, useState } from 'react'
import { api } from '../api'
import RecietList from '../components/reciet/receit-list'

const Reports = () => {
    const [reciets, setReciets] = useState([])

    useEffect(() => {
        api.get('/payment/all')
            .then((res) => {
                setReciets(res.data)
            })
            .catch(err => console.error(err));
    }, [])
  return (
    <div className="container"> 
        <RecietList reciets={reciets} />
    </div>
  )
}

export default Reports