import React, { useEffect, useState } from 'react'
import { Card, Col, Divider, message, PageHeader, Radio, Row, Switch, Table } from 'antd';
import { CustomPageHeader } from '../small_components/page_header';
import {  changePaymentTypeStatus, fetchPaymentTypes } from '../../services/handlers/payment-handlers';
import ErrorAlert from '../small_components/error_alert';
import { GENERAL_ERROR_MESSAGE } from '../utils/error_messages';

 
function PaymentTypeManagement() {


    console.log('PaymentTypeManagement ***************************************************88')
    const columns = [
        {
            title: 'Payment type',
            dataIndex: 'name'
        },
        {
            title: 'Code',
            dataIndex: 'code'
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            render: (isActive, pType) => <Switch checked={isActive} onChange={() => onStatusChange(pType)}/>
        }
    ]
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [paymentTypes, setPaymentTypes] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

  const fetch = async ()  => {
    try {
        setHasError(false)
        setLoading(true)
        const _paymentTypes = await fetchPaymentTypes();
        if(_paymentTypes){
            setPaymentTypes(_paymentTypes);
            setLoading(false)
        }
    }
    catch(e){ 
    console.log('%c updated response ', 'background: red; color: #fff', e);

        setHasError(true)
        setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const onStatusChange = async (pType) => {
    try{
        setLoading(true);
        const data = {
            id : pType.id,
        }
        const updatedPtype = await changePaymentTypeStatus(data);
         
        const _updatedList = paymentTypes.map((type) => type.id === updatedPtype.id ? updatedPtype : type);
        setPaymentTypes(_updatedList)
        message.success('Status updated successfully!')
        setLoading(false);
    }
    catch(e) {
        console.log('%c e ', 'background: red; color: #fff', e);
        setLoading(false);
        message.error(GENERAL_ERROR_MESSAGE)
    }
     }

  return (
    <div>
        <Row>
            <Col span={12}>
              <CustomPageHeader title="Payment Types"/>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Divider className="bg-primary w-full" />

       {hasError && <ErrorAlert className="my-4" />  }
       <Table loading={loading} key="id" columns={columns} bordered size='sm' dataSource={paymentTypes} />
    </div>
  )
}

export default PaymentTypeManagement