import { Col, Form, Input, Button, Select, DatePicker, Card, Row } from 'antd'
import moment from 'moment';
import React, {useState, useEffect} from 'react'
import { createPaymentForm, createPaymentForms, fetchPaymentTypes } from '../../services/handlers/payment-handlers';
import payment_type_codes, { PaymentTypeCodes } from '../utils/payment_type_codes';
// import moment from 'moment';
function PaymentFormCreate({onNewForm}) {
    const [form] = Form.useForm(); 
    
    const [isLoading, setIsLoading] = useState(false) 
    const [hasError, setHasError] = useState(false) 
    const [paymentTypes, setPaymentTypes] = useState([])
    const [selectedPaymentType, setSelectedPaymentType] = useState(null) 
    const fetch = async ()  => {
        try {
            setHasError(false)
            setIsLoading(true)
            const resp = await fetchPaymentTypes();
            console.log("response : ", resp)
            if(resp){
                setPaymentTypes(resp)
                setIsLoading(false)
            }
        }
        catch(e){ 
            console.log(e);
            setHasError(true)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetch()
    }, [])  
    
    const onPaymentTypeSelected = (ptypeId) => {
        const paymentType = paymentTypes.find(ptype => ptype.id === ptypeId);
        setSelectedPaymentType(paymentType)
    }
    
    const onSubmit = async (values) => {
        try {
            console.log(values)
            setIsLoading(true)
             const data = {...values};
            if(selectedPaymentType.code === PaymentTypeCodes.MONTHLY){
                const _month = values.month.month();
                    const _year = values.month.year();
                    data = {...values, month: _month, year: _year};
            }
            else {
                const _year = values.year.year();
                    data = {...values,year: _year};
            } 
            const saveResponse = await createPaymentForm(data);
            onNewForm(saveResponse);
            setIsLoading(false);
        }
        catch(e){
            console.log(e);
            setIsLoading(false);

            setHasError(true)
        }

    } 

    const todaysData = moment.now();
    return (
        <Card loading={isLoading}  > 
        
        <Form  
        form={form}
        size="middle"
        layout="vertical" 
        onFinish={onSubmit} 
        >
        
        <Form.Item label="Title of the payment" name='title' rules={[{required: true, message: 'Title of the payment is required'}]}>
        <Input placeholder="ex. monthly payment for aug 2023" />
        </Form.Item> 
        
        <Form.Item label="Payment type" name="paymentTypeId" rules={[{required: true, message:"Payment type is required"}]}>
        <Select placeholder="Select payment type" onChange={onPaymentTypeSelected}>
        
        {
            paymentTypes.map(paymentType => <Select.Option key={paymentType.id} value={paymentType.id}> {
                paymentType.name
            } </Select.Option>)
        }
        </Select>
        </Form.Item>
        {
            selectedPaymentType && <> 
            
         
                {
                selectedPaymentType.code === 'MONTHLY' && <Form.Item className='w-full' label="Month & Year" name="month" required>
                <DatePicker.MonthPicker   className='w-full' />
                </Form.Item>
                
            }

            {
                selectedPaymentType.code === 'SEMISTER' && (
                
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item className='w-full' label="Semister" name="semister" required>
                            <Select placeholder="Select semister" className='w-full' >
                                <Select.Option key={1} value={1}>1</Select.Option>
                                <Select.Option key={2} value = {2}>2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item className='w-full' label="Year" name="year" required>
                            <DatePicker.YearPicker  className='w-full' />
                        </Form.Item> 
                    </Col>
                </Row>
                )
            }
            
            {
                selectedPaymentType.code === 'QUARTER' && (
                    
                
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                            <Form.Item className='w-full' label="Quarter" name="quarter" required>
                            <Select placeholder="Select quarter" className='w-full' >
                            <Select.Option key={1} value={1}>1</Select.Option>
                            <Select.Option key={2} value = {2}>2</Select.Option>
                            <Select.Option key={3} value={3}>3</Select.Option>
                            <Select.Option key={4} value = {4}>4</Select.Option>
                            </Select>
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item className='w-full' label="Year" name="year" required>
                                    <DatePicker.YearPicker  className='w-full' />
                                </Form.Item> 
                            </Col>
                        </Row>
                        
                )
                
            }  
            {
                selectedPaymentType.code === 'REGISTRATION' && (
                    
                    <Form.Item className='w-full' label="Year" name="year" required>
                        <DatePicker.YearPicker  className='w-full'  />
                    </Form.Item> 
                )
            }
          
            </>
        }
        
        
        <Form.Item >
            <Button className='bg-primary' type='primary' htmlType='submit'>Save payment form</Button>
            </Form.Item>
        </Form>
        </Card>
        )
    }
    
    export default PaymentFormCreate