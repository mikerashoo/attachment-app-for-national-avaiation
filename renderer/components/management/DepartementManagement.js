import { Col, Divider, Table, Row, Card, Form, Radio, Input, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { getAllDepartements } from '../../services/handlers/departement-handler'
import { getAllPaymentTypes } from '../../services/handlers/payment-handlers'
import ErrorAlert from '../small_components/error_alert'
import { CustomPageHeader } from '../small_components/page_header'
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
    const [form] = Form.useForm(); 
    const onFormLayoutChange = (data) => {
        console.log("FORM DATA", data)
      };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
         
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

    const onSubmit = () => {
        console.log("Data", form.getFieldsValue())
    }
  return (
    <div>
          <Row>
            <Col span={12}>
              <CustomPageHeader title="Departements"/>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Divider className="bg-primary w-full" />

       {hasError && <ErrorAlert className="my-4" />  }
       <Row >
        <Col span={14}>
        <Table loading={loading} key="id" columns={columns} bordered size='sm' dataSource={departements} />

        </Col>
        <Col offset={1} span={9}>
            <Card title="Add new departement">
            <Form 
                // layout={formLayout}
                form={form}
                layout="vertical"
                // initialValues={{
                //     layout: formLayout,
                // }}
                onFinish={onSubmit}
                onValuesChange={onFormLayoutChange}
                >
                 
                <Form.Item label="Name">
                    <Input placeholder="Enter name here" name='name' />
                </Form.Item>
                <Form.Item label="Field B">
                    <Input placeholder=" " />
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