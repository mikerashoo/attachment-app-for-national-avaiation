import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';  
import osApi from '../services/osapi';

function Manage() {
    const fetch = () => {
        const payments = osApi.sendSync('all-payments');
        console.log("payments", payments);
    }
    useEffect(() => {
        fetch();
    }, [])

    const onCreatePayment = () => {
        console.log("OnCreatePay called")
        const data = {
            name: "Registration Payments", 
        }
        const payment = osApi.sendSync('create-payment', JSON.stringify(data) );
        console.log("ADded user: ", payment);
      };
  return (
    <React.Fragment>
      <Head>
        <title>Manage - Data management</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
        <span>⚡ Manageron ⚡</span>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/home'>
          <a className='btn-blue'>Go to home page</a>
        </Link>
        <button onClick={onCreatePayment} className='text-red-500'>Add Here</button>
      </div>
    </React.Fragment>
  )
}

export default Manage;
