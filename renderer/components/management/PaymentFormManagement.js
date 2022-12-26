import { Form, Layout, Row, Col, Card, Input, Table, Modal, Button, message } from 'antd' 
import React, { useEffect, useState } from 'react'
import PageLayout from '../layouts/PageLayout'
import PaymentFormCreate from '../payments/payment-form-create'
import { fetchPaymentForms, fetchPaymentFormsData, fetchPaymentTypes } from '../../services/handlers/payment-handlers'
import { ManagementHeading } from '../small_components/page_header'
const {Column} = Table
function PaymentFormManagement() {

    const [isLoading, setLoading] = useState(false) 
    const [hasError, setHasError] = useState(false) 
    const [paymentForms, setPaymentForms] = useState([])  
 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      }; 

    const fetch = async ()  => {
        try {
            setHasError(false)
            setLoading(true)
            const resp = await fetchPaymentFormsData();
            console.log(resp)
            if(resp){
                setPaymentForms(resp);
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
 
    const onNewForm = newForm =>{
        const _paymentForms = [...paymentForms, newForm]
        setPaymentForms(_paymentForms)
        message.success("New form added successfully")
        handleOk()
    }
  return (
    <div>
        
        <Modal title="Add new payment form" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <PaymentFormCreate onNewForm={onNewForm}/>
        
        </Modal>
        <ManagementHeading title={"Payment forms"} actionButtons={ [
                          <Button className='bg-primary' type='primary' onClick={showModal}>New Form</Button>
 
        ]} /> 
        {hasError && <ErrorAlert className="my-4" />  } 
        <Table className="pt-4" pagination={{ pageSize: 5}} rowClassName='group' loading={isLoading} key="id" bordered size='xs' dataSource={paymentForms} >
        
                            <Column title="Title" dataIndex="title" key="title" />
                            <Column title="Payment Type" dataIndex="paymentType" key="paymentType" render={_paymentType => <>{_paymentType.name} </>} />
                            <Column title="Month" dataIndex="month" key="month" render={_month => <>{_month ?? '-'} </>} />
                            <Column title="Semister" dataIndex="semister" key="semister" render={semister => <>{semister ?? '-'} </>} />
                            <Column title="Quarter" dataIndex="quarter" key="quarter" render={quarter => <>{quarter ?? '-'} </>} />
                            <Column title="Year" dataIndex="year" key="year" render={year => <>{year ?? '-'} </>} />
                            <Column title="Status" dataIndex="isActive" key="isActive" render={isActive => <>{isActive ? 'Active' : 'InActive'} </>} />
                        </Table>
                     
                    </div>
  )
}

export default PaymentFormManagement