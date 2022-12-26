import { Skeleton, Form, Input, Button, Select, DatePicker } from 'antd'
import moment from 'moment';
import React, {useState, useEffect} from 'react'
import { getAllPaymentTypes } from '../../services/handlers/payment-handlers';

function FormCreate() {
  const [form,] = Form.useForm(); 
  const [isPaymentTypeLoading, setIsPaymentTypeLoading] = useState(false)
  const [paymentTypes, setPaymentTypes] = useState([])
  const [selectedPaymentType, setSelectedPaymentType] = useState(null)


  const [loading, setLoading] = useState(false) 
  const [hasError, setHasError] = useState(false)
  const [, ] = useState([])  
  const fetch = async ()  => {
      try {
        setHasError(false)
        setLoading(true)
        const resp = await getAllPaymentTypes();
        console.log("response : ", resp)
        if(resp){
            setPaymentTypes(resp)
            setLoading(false)
        }
      }
        catch(e){ 
            console.log(e);
            setHasError(true)
            setLoading(false)
      }
  }
  useEffect(() => {
    fetch()
  }, [])  

  const onPaymentTypeSelected = (ptypeId) => {
      const paymentType = paymentTypes.find(ptype => ptype.id === ptypeId);
      setSelectedPaymentType(paymentType)
  }

  const onSubmit = values => {
    console.log(values.quarter.toISOString())
    console.log(values);
  }
  return (
    <Skeleton loading={loading}>
      <h5>Create payment form</h5>
      <Form  
                      form={form}
                      size="middle"
                      layout="vertical" 
                      onFinish={onSubmit} 
                      >
                      
                      <Form.Item label="Title of the payment" name='title' rules={[{required: true}]}>
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
                       
                        <Form.Item label="Year" name="year" required>
                            <DatePicker.YearPicker />
                        </Form.Item>

                        <Form.Item label="Month" name="month" required>
                            <DatePicker.MonthPicker />
                        </Form.Item>


                        <Form.Item label="Quarter" name="quarter" required>
                            <DatePicker.QuarterPicker />
                        </Form.Item>
                      
                      <Form.Item >
                          <Button className='bg-primary' type='primary' htmlType='submit'>Save</Button>
                      </Form.Item>
                  </Form>
    </Skeleton>
  )
}

export default FormCreate