import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'; 
import osApi from '../services/osapi'; 
import userOperations from '../services/users';
import { Button, Card, DatePicker, Tag } from 'antd';

const Home = () => { 
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const onCreateUser = async () => {
        try{
            const data = {
                name: "Mikiysda",
                email: "mkds@test.com"
            }
            const addUser = await userOperations.create(data); 
            console.log("addUser", addUser)
            const user = JSON.parse(addUser); 
            const _users = [...users, user]
            setUsers(_users)
        }catch(e){ 
            console.log("Ee", e)
            setError("Something went wrong. Please try again");
        } 
      };
      
 
      const fetchUser = async () => { 
        try{
            const response = await userOperations.all(); 
            const users =  JSON.parse(response);
            console.log(users);
            setUsers(users);
        }catch(e){
            console.log("e====================> : ", e)
            setError("Something went wrong. Please try again");
        } 
      }
     
 
      useEffect(() => {
       fetchUser();

      }, [])

  const btnClassName = "bg-indigo-500 inline-flex items-center justify-center py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10";
  return (
    <div className="m-4">
      <Head>
        <title>Home - Nextron (with-javascript-tailwindcss)</title>
      </Head>

      {error.length > 0 && <h1 className="bg-white text-red-500 p-4">{error}</h1>}
      <Card>
      <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
        <DatePicker />
        </Card>
      <div className='mt-1 w-full justify-center'>
        {
            users.map((user) => <p>{user.name}</p>)
        } 
        <div className="m-4">
        <Link href='/next'>
          <a className='btn-blue'>Go to next page</a>
        </Link>
            </div>
        
        <button className={btnClassName} onClick={onCreateUser}>CreateUser</button>
        </div>
        <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
      <div>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </div>
    </Card>
    </div>
  );
}

export default Home;
