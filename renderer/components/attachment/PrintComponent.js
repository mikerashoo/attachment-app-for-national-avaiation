import { Card, Col, Divider, Row, Skeleton, Table } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ManagementHeading } from '../../components/small_components/page_header'
import companyInformations from '../../utils/company_information'
import { getPaymentDetailHandler } from '../../services/handlers/payment-handlers'
import logo from '../../imgs/logo.png'
import ErrorAlert from '../../components/small_components/error_alert'
import { generatePaymentNo } from '../../utils/helpers'

const {Column} = Table;
const PrintComponent = React.forwardRef((props, ref) => {
  const router = useRouter()
  const { pid } = router.query

  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [payment, setPayment] = useState(null)  
  const fetch = async ()  => {
      try {
        setHasError(false)
        setIsLoading(true)
        const resp = await getPaymentDetailHandler({id: pid});
        console.log(resp)
        if(resp){
            setPayment(resp);
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
 
  return (
  <div className='px-8' ref={ref}>
  <Skeleton loading={isLoading} className="px-8 h-full">
  {hasError && <ErrorAlert className="my-4" />  }
    <div className='px-16 mx-16'>
    {


        payment && <Card className='my-2 px-8 text-center'>
        <div className='text-end mb-2'>
            <p className='text-l'>Date : {moment(payment.createdAt).format('DD-MM-YYYY')}</p>
            <p className='text-l'>No : {generatePaymentNo(payment.id)}</p>
        </div>
        <div className='mb-4'>
            <Image src={logo} width="50" height="50" />
            <div className="text-2xl font-bold"> {companyInformations.name}</div>
            <b> {payment.title}</b>

        </div>
        <Divider />

        <div className=''>
    
         <Row>
            <Col span={10} offset={2} className="text-left">
                <p><b>Student Name :</b> {payment.student.name}</p>
                <p><b>Student ID :</b> {payment.student.collageId}</p>
                <p><b>Department :</b> {payment.student.departement.name}</p>
            </Col>
            <Col span={8} offset={4} className="text-end">
                <div className="text-start w-fit">
                    <p><b>Attachment No :</b> {payment.attachmentNo} </p>
                    <p><b>Payment way :</b> {payment.paymentWay} </p>
                    {
                        payment.paymentWay == 'CHECK' && <p><b>Check No :</b> {payment.checkNo} </p>
                    }
                </div>
              
            </Col>
            
        </Row>
        </div>
        <Table rowKey="id" className="pt-4" key={"id"} bordered pagination={false} size='xs' dataSource={payment.formPayments} 
        summary={(pageData) => {
            const unitQuantity = 0;
            const pricePerUnit = 0;
            pageData.forEach((formPayment) => {
                if(formPayment.paymentForm.paymentType.isPaymentWay){
                    unitQuantity += parseInt(payment.student.departement.creditHoursPerPaymentWay)
                    pricePerUnit += parseInt(payment.student.departement.pricePerCreditHour)
                }
                else {
                    unitQuantity += 1;
                    pricePerUnit += parseFloat(formPayment.price)
                }
                 
              });

              if(payment.penality && payment.penality > 0){
                unitQuantity += 1;
              }

              return (
                <>
                {
                    payment.penality && payment.penality > 0 && <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>{pageData.length + 1}</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>Penality</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>-</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>1</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>{payment.penality}</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>{payment.penality}</Table.Summary.Cell>
                     
                  </Table.Summary.Row>
                }
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>#</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>-</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>{unitQuantity}</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>-</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>{payment.total}</Table.Summary.Cell>
                     
                  </Table.Summary.Row>
                 
                </>
              );
      
        }}
        
        >
            <Column title="No" dataIndex="id" key="paymentFormTitle" render={(id, pForm, key) => <>{key + 1}</>} />
            <Column title="Title" dataIndex="paymentForm" key="paymentFormTitle" render={(paymentForm) => <>{paymentForm.title}</>} />
            <Column title="Unit" dataIndex="paymentForm" key="paymentFormTitle" render={(paymentForm) => paymentForm.paymentType.isPaymentWay ? <>Credit hour</> : <>-</>} />
            <Column title="Quatity" dataIndex="paymentForm" key="paymentFormTitle" render={(paymentForm) => {
                    if(!paymentForm.paymentType.isPaymentWay){
                        return <>1</>
                    }    
                    return <>{payment.student.departement.creditHoursPerPaymentWay}</>
                }
                } />
            <Column title="Price/unit" dataIndex="paymentForm" key="paymentFormTitle"  render={(paymentForm, pForm) => {
                    if(!paymentForm.paymentType.isPaymentWay){
                        return <>{pForm.price}</>
                    }     
            
                    return <>{payment.student.departement.pricePerCreditHour}  </>
                }
                } />
            <Column title="Total" dataIndex="paymentForm" key="paymentFormTitle" render={(paymentForm, pForm) => <>{pForm.price} {paymentForm.paymentType.isPaymentWay && payment.student.discount != null && payment.student.discount > 0 && <> ({payment.student.discount}% discount) </>}</>} />
             
        </Table>
        
        <Divider />
            <Row>
                <Col span={10} offset={2} className="text-left">
                    <div>Payer name and signature </div>
                    <div className="my-2">Name ______________________________</div>
                    <div>Signiture ______________________</div>
                     
                </Col>
                <Col span={8} offset={4} className="text-end">
                <div className="text-start w-fit">

                    <div>Reciever name and signature </div>
                    <div className="my-2">Name ______________________________</div>
                    <div>Signiture ______________________</div>
                     </div>
                </Col>
                 
            </Row>
        <Divider />
        <div className=" grid grid-cols-5 gap-4">
                <div className="text-sm font-bold"> {companyInformations.name}</div>
                
                <div className="text-sm font-bold "> {companyInformations.phoneNumbers.map(phone => <div key={phone} className="">{phone}</div>)}</div>
                <div className="text-sm font-bold"> {companyInformations.email}</div>
                <div className="text-sm font-bold "> {companyInformations.website}</div>
                <div className="text-sm font-bold"> {companyInformations.address}</div>
        </div>
        
        
    
        </Card>
    }
    </div>
    
    </Skeleton>
    </div>)
})

export default PrintComponent 