import React, { useEffect, useState } from 'react'; 

import { Button, Checkbox, Form, Input, Layout, Select, Skeleton } from 'antd'; 
import PageLayout from '../components/layouts/PageLayout';
import { addPaymentHandler, checkAndInitializePaymentTypes } from '../services/handlers/payment-handlers';
import { getAllStudentsHandler } from '../services/handlers/student-handler';
import { getAllDepartementsHandler } from '../services/handlers/departement-handler';
import FormCreate from '../components/payments/payment-form-create';
const { Content } = Layout; 
 
const formItemLayout = {
	labelCol: {
	  span: 6,
	},
	wrapperCol: {
	  span: 14,
	},
  };
const Home = () => { 

    const [students, setStudents] = useState([]) 
    const [paymentTypes, setPaymentTypes] = useState([])
    const [hasError, sethasError] = useState(null) 
    const [isStudentsLoading, setIsStudentLoading] = useState(false) 
    const [isPaymentTypeLoading, setIsPaymentTypeLoading] = useState(false)
    const [paymentForm, setPaymentForm] = useState([])
 
    const [student, setStudent] = useState(null)   
    const [form,] = Form.useForm(); 
    
    useEffect(() => { 
        checkForPaymentTypes();  
        // fetchStudents(); 
     }, [])
     

     const checkForPaymentTypes = async () => {
        try {
            setIsPaymentTypeLoading(true)
            const _paymentTypes = await checkAndInitializePaymentTypes(); 
        
            
            if(_paymentTypes){
              setPaymentTypes(_paymentTypes)
              setIsPaymentTypeLoading(false)
            }
        } catch (error) {
          console.log(error)
          setIsPaymentTypeLoading(false)
          sethasError(true)
        }
     }

     const fetchStudents = async () => {
      try {
        setIsStudentLoading(true)
        const students = await getAllStudentsHandler(); 
        console.log("students", students)
        if(students){
          setStudents(students)
          setIsStudentLoading(false)
        }
      } catch (error) {
        console.log(error)
        setIsStudentLoading(false)
        sethasError(true)
      }
     }
 

     const addTest = async () => {
        try {
          const res = await addPaymentHandler()
        } catch (error) {
          console.log(error)
        }
     }
     
     const onSubmit = async (values) => {
		console.log("Values", values)
     }

	 const getStudentId = () => {

	 }

     const onStudentSelected = (sId) => {
		const student = students.find(stu => stu.id === sId);
		setStudentId(sId)
		setStudent(student)
		console.log(student)	  
     }

    return (
   <PageLayout>
		<Layout className='mx-8 px-8 py-4 h-full my-4'>
			 
			<Content className='p-4 bg-white ml-2'> 
					<Skeleton loading={isPaymentTypeLoading || isStudentsLoading}>
						 
					{/* <div>
									<h1>New Student</h1>
						<Form  
						  {...formItemLayout}
								form={form}
								size="middle"
								layout="vertical" 
								onFinish={onSubmit} 
								>
								
								<Form.Item label="Title" name='title' rules={[{required: true}]}>
									<Input placeholder="Enter title here" />
								</Form.Item> 
								<Form.Item  label="Student" name='studentId' rules={[{required: true}]}>

									<Select className='w-full' onChange={onStudentSelected} placeholder="Select student"> 
									{students.map(student => <Select.Option value={student.id}>{student.collageId} | {student.name}</Select.Option>)}
									</Select>
								</Form.Item>
								{
									student && <Form.Item label="Select payments" name="selected-payments">
										  <Checkbox.Group>
											{student.departement.departementPaymentPrices.map(dPrice =>{ 
												const payType = paymentTypes.find((pt) => pt.id === dPrice.paymentTypeId);
													return <Checkbox value={payType.id}> {payType.name} <b className='txt-primary'>{dPrice.price} birr</b></Checkbox> 
													
												return (
												 <div className='w-full'>
													<Checkbox value={payType.id}> {payType.name} <b className='txt-primary'>{dPrice.price} birr</b></Checkbox> 
													{
													<Form.Item label="Year" name={`year${payType.id}`} rules={[{required: true}]}>
														<Input placeholder="Enter year here" />

													</Form.Item>
													
													}
													{
														<Form.Item label="Month" name={`month${payType.id}`} rules={[{required: true}]}>
														<Input placeholder="Enter month here" />

													</Form.Item>
													}

												 </div>
											)}) }
										</Checkbox.Group>

									</Form.Item>
								}
									<Form.Item >
                          <Button className='bg-primary' type='primary' htmlType='submit'>Save</Button>
                      </Form.Item>
						</Form> 
					
						</div> */}
					</Skeleton>
					
			</Content> 
		</Layout> 
    </PageLayout>
  );
}

export default Home;
// 