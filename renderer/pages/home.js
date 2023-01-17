
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import companyInformations from '../utils/company_information'
import logo from '../imgs/logo.png' 
import { Button, Card, Form, Input, message } from 'antd';
import { USER_LOGGIN_KEY } from '../utils/constants';
import {  useRouter } from 'next/router';
import { GENERAL_ERROR_MESSAGE } from '../utils/error_messages';
import { loginUserHandler } from '../services/handlers/user-handler';
import ErrorAlert from '../components/small_components/error_alert';
import { loginUser, useAuthDispatch, useAuthState } from '../auth';
function home() { 
  // const [isLoggedIn, setIsLoggedIn] = useState(false) 
  const [isLoading, setIsLoading] = useState(false) 
  const [hasLoginError, setHasLoginError] = useState(false) 
  const [form,] = Form.useForm(); 
  const router = useRouter();

  const userAuth = useAuthState();
  const dispatch = useAuthDispatch();
   

  useEffect(() => {
    
      let user = localStorage.getItem(USER_LOGGIN_KEY)
      ? JSON.parse(localStorage.getItem(USER_LOGGIN_KEY))
      : null;
      console.log(user);
      if(user){
         loginUser(dispatch, user) 

      }

  }, [])
  

  const onSubmit =  async (values) => { 
    try { 
      setIsLoading(true) 
      setHasLoginError(false)
      const data = {...values};
      const loginData = await loginUserHandler(data)
    if(loginData == null){
        setHasLoginError(true)
      }else {
         await loginUser(dispatch, loginData) 
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      message.error(GENERAL_ERROR_MESSAGE);
    }
    
  }
  
  return (  
	<div className={`grid justify-items-center items-center h-full mx-4 `}>
    <div className='w-full text-center'>
      <div>
       <Image src={logo} width="400" height="300" />
            <div className="text-6xl font-bold"> {companyInformations.name}</div>
            <div className="text-3xl font-bold txt-success"> Attachment management software </div>
    </div>
    {
          !userAuth.user ? <Card loading={userAuth.loading} className='m-auto w-1/4 mt-4 box-border shadow-lg' title="Login"> 
              <Form
                        form={form}
                        size="middle"
                        layout="vertical" 
                        onFinish={onSubmit} 
                        >
                        {hasLoginError && <ErrorAlert message='Invalid username/password'/>} 
                        <Form.Item label="User Name" name='username' rules={[{required: true}]}>
                            <Input placeholder="Enter user name " />
                        </Form.Item> 
                        <Form.Item label="Password" name='password' rules={[{required: true}]}>
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>   
                        <Form.Item >
                            <Button className='bg-primary w-full' type='primary' htmlType='submit'>Login</Button>
                        </Form.Item>
            </Form>
          </Card> : <>
              <p className='text-center text-8xl mt-4'>Welcome <span className='text-green-600'>{userAuth.user.name}</span></p>
          </>
        }
        </div>
       </div> 
  )
}

export default home