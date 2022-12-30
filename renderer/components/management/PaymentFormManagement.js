import { Form, Layout, Row, Col, Card, Input, Table, Modal, Button, message, Popconfirm } from 'antd' 
import React, { useEffect, useState } from 'react'
import PageLayout from '../layouts/PageLayout'
import PaymentFormCreate from '../payments/payment-form-create'
import { fetchPaymentForms, fetchPaymentFormsData, fetchPaymentTypes, updatePaymentFormStatus } from '../../services/handlers/payment-handlers'
import { ManagementHeading } from '../small_components/page_header' 
import ErrorAlert from '../small_components/error_alert'

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
        handleCancel()
    }

    const onStatusChange = async (id, status) => {
        try { 
            const data = {id, status} 
            setLoading(true)
            const resp = await updatePaymentFormStatus(data);
            console.log(resp)
            if(resp){
                const newForms = paymentForms.map(payForm => payForm.id === id ? resp : payForm)
                setPaymentForms(newForms)
                message.success("Status of payment form is updated successfully!")
                setLoading(false)
            }
        }
       catch(e){ 
           console.log(e);
           message.error("Couldn't update form status please try again")
           handleCancel();
           setLoading(false)
       }
    }
  return (
    <div>
        
        <Modal title="Add new payment form" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
        <PaymentFormCreate onNewForm={onNewForm}/>
        
        </Modal>
        <ManagementHeading title={"Payment forms"} actionButtons={ [
                          <Button className='bg-primary' type='primary' onClick={showModal}>New Form</Button>
 
        ]} /> 
        {hasError && <ErrorAlert className="my-4" />  } 
        <Table className="pt-4" pagination={{ pageSize: 10}} rowClassName='group' loading={isLoading} key="id" bordered size='xs' dataSource={paymentForms} >
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Payment Type" dataIndex="paymentType" key="paymentType" render={_paymentType => <>{_paymentType.name} </>} />
            <Column title="Month" dataIndex="month" key="month" render={_month => <>{_month ?? '-'} </>} />
            <Column title="Semister" dataIndex="semister" key="semister" render={semister => <>{semister ?? '-'} </>} />
            <Column title="Quarter" dataIndex="quarter" key="quarter" render={quarter => <>{quarter ?? '-'} </>} />
            <Column title="Year" dataIndex="year" key="year" render={year => <>{year ?? '-'} </>} />
            <Column title="Status" dataIndex="isActive" key="isActive" render={isActive => <>{isActive ? <span className="txt-warning">Active</span> : <span className="txt-success">Completed</span> } </>} />
            <Column title="Actions" dataIndex="isActive" key="action" render={(isActive, paymentType) => <>{isActive ? <>
                <Popconfirm
                    title={`Are you sure you want to mark : \n ${paymentType.title} as completed`}
                    description="Are you sure to mark this payment form?"
                    okText="Yes mark!"
                    okButtonProps={{classnames: "!bg-danger", danger: true}}
                    
                    placement="topRight"
                    cancelText="Cancel"
                    onConfirm={() => onStatusChange(paymentType.id, false)}
                        >
                        <Button className="bg-success transition ease-in-out" size='small'>Done</Button> 
                    </Popconfirm>
            </> : <Popconfirm
                    title={`Are you sure you want to activate : \n ${paymentType.title} as completed`}
                    description="Are you sure to activate this payment form?"
                    okText="Yes activate!"
                    okButtonProps={{classnames: "!bg-danger", danger: true}}
                    
                    placement="topRight"
                    cancelText="Cancel"
                    onConfirm={() => onStatusChange(paymentType.id, true)}
                        >
                        <Button className="bg-warning transition ease-in-out" size='small'>Activate</Button> 
                    </Popconfirm>
            } </>} />
        </Table>
                     
    </div>
  )
}

export default PaymentFormManagement