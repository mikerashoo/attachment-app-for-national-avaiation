import React, { useEffect, useState } from 'react'; 

import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Layout, message, Radio, Row, Select, Skeleton } from 'antd'; 
import PageLayout from '../components/layouts/PageLayout';
import { addPaymentHandler, checkAndInitializePaymentTypes, fetchPaymentFormsForDepartement, savePaymentHandler } from '../services/handlers/payment-handlers';
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
  const plainOptions = ['CASH', 'BANK', 'CHECK'];

const Home = () => { 

    const [students, setStudents] = useState([]) 
    const [paymentTypes, setPaymentTypes] = useState([])
    const [hasError, sethasError] = useState(null) 
    const [isStudentsLoading, setIsStudentLoading] = useState(false) 
    const [isLoading, setIsLoading] = useState(false) 
    const [isPaymentTypeLoading, setIsPaymentTypeLoading] = useState(false)
    const [paymentForms, setPaymentForms] = useState([]) 
    const [student, setStudent] = useState(null)   
    const [form,] = Form.useForm();  
    const [title, setTitle] = useState("")
    const [paymentWay, setPaymentWay] = useState('BANK');

    useEffect(() => { 
        //TODO CHECK PAYMENTS
        // checkForPaymentTypes();  
        fetchStudents(); 
        form.setFieldsValue({
            paymentWay: 'BANK'
        })
     }, [])
      

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
        console.log(values)
         
        try {
            if(values.selectedPaymentForms === undefined || values.selectedPaymentForms.length === 0){
                message.error("Please select atleast one payment")
                return;
            }
            setIsLoading(true);  
        const response = await savePaymentHandler({...values, penality: values.penality ?? 0});
 
        if(response){
            message.success("Payment saved succesfully")
            setIsLoading(false)
        }

        } catch (e) {
            console.log(e);
            setIsLoading(false); 
            message.error("Something went wrong please try again");
        }

		console.log("Values", values)
     }
 

     const onStudentSelected = async (sId) => {
		const student = students.find(stu => stu.id === sId);
		const data = {id: student.departementId}
        try {
            setIsLoading(true)
            const _paymentForms = await fetchPaymentFormsForDepartement(data); 
            console.log("_paymentForms", _paymentForms)
            if(_paymentForms){
              setPaymentForms(_paymentForms)
              setIsLoading(false)
            }
          } catch (error) {
            console.log(error)
            setIsLoading(false)
            sethasError(true)
          }
        
		setStudent(student)
		console.log(student)	  
     } 

     const onPaymentFormChange = selectedForms => {
        const penality = form.getFieldValue('penality') ? parseFloat(form.getFieldValue('penality')) : 0
        const _title = "";
        for(const pFormId of selectedForms){
            const paymentF = paymentForms.find(pForm => pForm.id === pFormId); 
             if(_title.length == 0){
                _title += paymentF.title 
             }
             else {
                _title += ` & ${paymentF.title}`
             }
        }

        setTitle(_title)
        calculateTotal(selectedForms, penality)
        console.log(selectedForms)
     }

     const onPenalityChange = penality => {
        const selectedForms = form.getFieldValue('selectedPaymentForms')
        calculateTotal(selectedForms, penality)
     }

     const calculateTotal = (selectedForms, penality) => {
        const _total = penality;

        for(const pFormId of selectedForms){
            const paymentF = paymentForms.find(pForm => pForm.id === pFormId);
            const depPayment = student.departement.departementPaymentPrices.find(dP => dP.paymentTypeId === paymentF.paymentTypeId);
            _total += parseFloat(depPayment.price)
        }
     

        form.setFieldsValue({
            total: _total 
        })
     }

     const onPaymentWayChange = ({ target: { value } }) => {
        
        setPaymentWay(value);
      };
    return (
   <PageLayout>
		<Layout className='mx-8 px-8 py-4 h-full my-4'>
			 
			<Content className='p-4 bg-white ml-2 px-8'> 
					<Skeleton loading={isPaymentTypeLoading || isStudentsLoading}>
                   
					<div>
						{/* <h1>New Attachment</h1> */}
						<Form  
						  {...formItemLayout}
								form={form}
								size="middle"
								layout="vertical" 
								onFinish={onSubmit} 
								>
                                    <h2 className='text-bold'> Title : {title}</h2>
 
                                     <Row>
                        <Col span={14}>
                                <Form.Item  label="Student" name='studentId' rules={[{required: true}]}>
									<Select className='w-full' onChange={onStudentSelected} placeholder="Select student"> 
									{students.map(student => <Select.Option value={student.id}>{student.collageId} | {student.name}</Select.Option>)}
									</Select>
								</Form.Item>
								{
									student && <>
                                     <Form.Item required label="Select payments" id="payment-forms-group" name="selectedPaymentForms">
										  <Checkbox.Group onChange={onPaymentFormChange} className='w-full vertical-checkbox'>
                                            {
                                                paymentForms.map(paymentF => {
                                                    const depPayment = student.departement.departementPaymentPrices.find(dP => dP.paymentTypeId === paymentF.paymentTypeId);
                                                    return depPayment && <Row>
                                                        <Checkbox name={paymentF.id} value={paymentF.id}> {paymentF.title} <b className='txt-primary'>{depPayment.price} birr</b></Checkbox> 
                                                        </Row> 
                                                })
                                            }
											 
										</Checkbox.Group>

									</Form.Item>
                                    <Form.Item label="Penality" name="penality">
                                        <InputNumber placeholder="0" onChange={onPenalityChange} className='w-full' />

                                    </Form.Item>
                                            
                    <Form.Item label="Total" name="total">
                                <Input type="text" defaultValue={0} />
                            </Form.Item>
                                    </>
								}
                        </Col>
                        <Col span={10} className='border-l-2 px-2'>
                            <Form.Item label="Attachment No." name="attachmentNo" rules={[{required: true}]}>
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item rules={[{required: true}]} label="Payment way" id="payment-radio-group" name="paymentWay">

                                <Radio.Group options={plainOptions} onChange={onPaymentWayChange} value={paymentWay} />
                            </Form.Item>
                            {
                           
                                paymentWay == 'CHECK' &&  <Form.Item rules={[{required: true}]} label="Check No" id="payment-radio-group" name="checkNo">
                                        <Input placeholder="Enter check no" />
                                    </Form.Item>
                            }
                  

                        </Col>
                    </Row>
								
							
								

                    <Row>
                                                <Col span={10} offset={14}>
                                                    <Divider />
                                                  <Form.Item>
                          <Button className='bg-primary w-full' type='primary' htmlType='submit'>Save</Button>
                      </Form.Item>   
      
                                                </Col>
                                            </Row>
                   
						</Form> 
					
						</div>
					</Skeleton>
					
			</Content> 
		</Layout> 
    </PageLayout>
  );
}

export default Home;
// 