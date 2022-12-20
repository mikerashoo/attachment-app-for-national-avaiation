import { Col, Divider, Table, Row, Card, Form, Radio, Input, Button, InputNumber, Select, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { createNewDepartement, getAllDepartements } from '../../services/handlers/departement-handler'
import { getAllPaymentTypes } from '../../services/handlers/payment-handlers'
import ErrorAlert from '../small_components/error_alert'
import { CustomPageHeader } from '../small_components/page_header'

const {ColumnGroup, Column} = Table;
const formLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  }
function DepartementManagement() {
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [departements, setDepartements] = useState([])  
    const [paymentTypes, setPaymentTypes] = useState([])
    const [form,] = Form.useForm(); 
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: '#Credit hrs',
            dataIndex: 'totalCreditHour'
        },
        {
            title: 'Price per credit hr',
            dataIndex: 'pricePerCreditHour',
            render: price => <>{price} birr</>
        },
        {
            title: 'Payment type',
            dataIndex: 'paymentWay',
            render: paymentWay => <>{paymentWay.name}</>
        }
    ]
     const fetch = async ()  => {
        try {
            setHasError(false)
            setLoading(true)
            const resp = await getAllDepartements(); 
          
            const _paymentTypes = await getAllPaymentTypes();
            if(_paymentTypes && resp){
                setDepartements(resp); 
                setPaymentTypes(_paymentTypes);
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

    const onSubmit = async (values) => { 
            try{
                setLoading(true) 
                const data = {
                    ...values
                }

                const newDepartement = await createNewDepartement(data);
                const _departements = [...departements, newDepartement]
                setDepartements(_departements)
                setTimeout(function() {
                    setLoading(false)
                    message.success("Departement information saved successfully")
                    form.resetFields()
                }, 1000);
                
                
            }
            catch(e){
                console.log("Saving departement errror: ", e)
                message.error("Can't save departement information please try again")
                setLoading(false)
            }
           
         
    }
  return (
    <div>
         
        <CustomPageHeader title="Departements"/>
       {hasError && <ErrorAlert className="my-4" />  }
       <Row >
            <Col span={14}>
                <Table loading={loading} key="id" bordered size='sm' dataSource={departements} >
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Price per credit hr." dataIndex="pricePerCreditHour" key="pricePerCreditHour" />
                    <Column title="Registration fee" dataIndex="departementPaymentPrices" key="registrationDepPayment" render={(departementPaymentPrices) => { 
                        console.log("Registration")
                        const regIds = paymentTypes.filter(pType => pType.code === "REGISTRATION");
                        console.log("regIds: ", regIds);
                        
                        if(regIds.length > 0) {
                            const pays = departementPaymentPrices.filter(dep => dep.paymentTypeId === regIds[0].id);
                            console.log("pays: ", pays);

                            if(pays.length > 0){
                                return <>{pays[0].price} birr</>
                            }
                            
                        }
                        return <>-</>
                    }}  />
                    <ColumnGroup title="Payment Way">
                        <Column title="Name" dataIndex="paymentWay" key="paymentWayName" render={(paymentWay) => <>{paymentWay.name}</>}/>
                        <Column title="Credit hr" dataIndex="creditHoursPerPaymentWay" key="creditHoursPerPaymentWay" />
                        <Column title="Total"  key="totalPaymentOnPaymentWay" dataIndex="paymentWay" render={(paymentWay, dep) => <>{dep.creditHoursPerPaymentWay * dep.pricePerCreditHour} </>} />
                    </ColumnGroup>
                </Table>

            </Col>
            <Col offset={1} span={9}>
                <Card title="Add new departement" loading={loading} hoverable bordered>
                    <Form  
                        form={form}
                        size="middle"
                        layout="vertical" 
                        onFinish={onSubmit} 
                        >
                        
                        <Form.Item label="Name" name='name' rules={[{required: true}]}>
                            <Input placeholder="Enter name here" />
                        </Form.Item>  
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label="Total Credit Hr" name='totalCreditHour' rules={[{required: true, message:"# of credit hr is required"}]}>
                                    <InputNumber placeholder="0" className='w-full' />
                                </Form.Item> 
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Price per Credit Hr" name='pricePerCreditHour' rules={[
                                    {required: true, message:"Price/credit hr is required"}]}>
                                    <InputNumber placeholder="0" className='w-full' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={16}>
                                <Form.Item label="Payment Type" name="paymentTypeId" rules={[{required: true, message:"Payment type is required"}]}>
                                    <Select>
                                        {
                                            paymentTypes.filter(paymentType => paymentType.isPaymentWay).map(paymentType => <Select.Option value={paymentType.id}> {
                                                    paymentType.name
                                                } </Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="#credit hours" name='creditHoursPerPaymentWay' rules={[{required: true, message:"Required"}]}>
                                    <InputNumber placeholder="0" />
                                </Form.Item> 
                            </Col>
                        </Row>
                        
                        <Form.Item label="Registration fee" name='registrationPrice' rules={[{required: true, message: "Registration can't be empty"}]}>
                            <InputNumber placeholder="0" />
                        </Form.Item> 

                        
                        <Form.Item >
                            <Button className='bg-primary' type='primary' htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
       </Row>
    </div>
  )
}

export default DepartementManagement