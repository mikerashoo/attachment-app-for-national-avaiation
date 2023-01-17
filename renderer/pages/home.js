
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import companyInformations from '../utils/company_information'
import logo from '../imgs/logo.png' 
import { Button, Card, Form, Input, message, Modal, Skeleton } from 'antd';
import { USER_LOGGIN_KEY } from '../utils/constants';
import {  useRouter } from 'next/router';
import { GENERAL_ERROR_MESSAGE } from '../utils/error_messages';
import { changePasswordHandler, loginUserHandler } from '../services/handlers/user-handler';
import ErrorAlert from '../components/small_components/error_alert';
import { loginUser, logoutUser, useAuthDispatch, useAuthState } from '../auth';
import { KeyOutlined } from '@ant-design/icons';
function home() { 
  // const [isLoggedIn, setIsLoggedIn] = useState(false) 
  const [isLoading, setIsLoading] = useState(false) 
  const [hasLoginError, setHasLoginError] = useState(false) 
  const [form,] = Form.useForm();  
  const userAuth = useAuthState();
  const dispatch = useAuthDispatch();
   
  //change password hooks
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false)
  const [changePasswordFormError, setChangePasswordError] = useState(null)
  const hideChangePassModal = () => {
	setIsChangePassModalOpen(false)
	form.resetFields();

  }

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
		setIsLoading(false)

      }else {
		setTimeout(() => {
			 loginUser(dispatch, loginData) 
			setIsLoading(false)
			form.resetFields();
			 
		}, 1000);
         
      }
    } catch (error) {
      setIsLoading(false)
      message.error(GENERAL_ERROR_MESSAGE);
    }
    
  }

  const onChangePasswordSubmit =  async(values)  => {
    try {
		console.log(values);
		setChangePasswordError(null)

		if(values.currentPassword != userAuth.user.password){
			form.setFields([ 
			{
				name: 'currentPassword',
				errors: ['Incorrect password']
			}
			])
		}
		else if(values.newPassword !== values.confirmation){
			form.setFields([ 
				{
					name: 'confirmation',
					errors: ['New password and confirmation should be same']
				}
			])
			
		}
		else if(values.newPassword === values.currentPassword){
			message.success("Password changed succesfully!")
			hideChangePassModal();
			form.resetFields();

		}
		else {
			setIsLoading(true)
			const data = {
				id: userAuth.user.id,
				password: values.newPassword
			} 

			const changedData = await changePasswordHandler(data) 
			setTimeout(() => {
				loginUser(dispatch, changedData)
				setIsLoading(false)
				message.success("Password changed succesfully!")
				hideChangePassModal();
			form.resetFields();

			}, 1000);
			
		}
		

	} catch (error) {
		console.log(error)
		setChangePasswordError(GENERAL_ERROR_MESSAGE)
	}
  }

  const onLogout = () => {
	logoutUser(dispatch);
  }
  
  return (  
	<Skeleton loading={isLoading} className={`grid justify-items-center items-center h-full mx-4 `}>
    <Modal title="Change Password " open={isChangePassModalOpen} footer={null} onOk={hideChangePassModal} onCancel={hideChangePassModal} destroyOnClose={true}>
        
        <Card loading={isLoading} >
            <Form  
              form={form}
              size="middle"
              layout="vertical" 
              onFinish={onChangePasswordSubmit} 
              >
                  <Form.Item label="Current Password" name='currentPassword' rules={[{required: true},
     
       ]}>
                        <Input.Password placeholder="Enter current password" />
                    </Form.Item> 
                    <Form.Item label="New Password" name='newPassword' rules={[{required: true}, {min: 8}]}>
                        <Input.Password placeholder="Enter new password" />
                    </Form.Item> 
                    <Form.Item label="Confirm Password" name='confirmation' rules={[{required: true}]}>
                        <Input.Password placeholder="Confirm new password" />
                    </Form.Item> 
                   
                        {
                          changePasswordFormError && <ErrorAlert message={changePasswordFormError} className="mb-4"/>
                        }
                         <Form.Item >
                            <Button className='bg-primary w-full' type='primary' htmlType='submit'>Save changes</Button>
                        </Form.Item>
                </Form>
                </Card>
                </Modal>
    <div className='w-full text-center'>
      <div>
       <Image src={logo} width="400" height="300" />
            <div className="text-6xl font-bold"> {companyInformations.name}</div>
            <div className="text-3xl font-bold txt-success"> Attachment management software </div>
    </div>
    {
          !userAuth.user ? <Card loading={isLoading} className='m-auto w-1/4 mt-4 box-border shadow-lg' title="Login"> 
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
              <p className='text-center text-6xl mt-4'>Welcome <span className='text-green-600'>{userAuth.user.name}</span></p>
              <b className=''>@{userAuth.user.username}</b>
              <div className='justify-items-center mt-4'>
                <Button className='w-fit ' onClick={()=> setIsChangePassModalOpen(true)}><KeyOutlined /> Change password</Button>
                <Button className='w-fit ml-4 bg-warning hover:text-white' onClick={onLogout}><KeyOutlined /> Logout </Button>
              </div>
          </>
        }
        </div>
       </Skeleton> 
  )
}

export default home