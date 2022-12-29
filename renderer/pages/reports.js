import { PrinterFilled } from '@ant-design/icons'
import { Button, Table } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ManagementHeading } from '../components/small_components/page_header'
import { fetchPaymentsHandler } from '../services/handlers/payment-handlers'
const { Column, ColumnGroup } = Table
function Home() {

	const [isLoading, setIsLoading] = useState(false) 
	const [hasError, setHasError] = useState(false)
	const [payments, setPayments] = useState([])  
	const fetch = async ()  => {
		try {
			setHasError(false)
			setIsLoading(true)
			const resp = await fetchPaymentsHandler();
			if(resp){
				setPayments(resp);
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
	<div className='mx-8 my-4 bg-white h-full px-8 py-4'>
		<ManagementHeading title="Recent Payments" /> 
		<Table rowKey="id" className="pt-4" pagination={{ pageSize: 10}} rowClassName='group' loading={isLoading} key={"id"} bordered size='xs' dataSource={payments} >
            <Column title="Title" dataIndex="title" key="title" />
            <ColumnGroup title="Student">
                <Column title="ID" dataIndex="student" key="studentId" render={(student) => <>{student.collageId}</>}/>
                <Column title="Name" dataIndex="student" key="studentName" render={(student) => <>{student.name}</>}/> 
			</ColumnGroup>
            <Column title="Attachment No" dataIndex="attachmentNo" key="attachmentNo" />
            <Column title="Payment way" dataIndex="paymentWay" key="paymentWay" />
            <Column title="Total payment" dataIndex="total" key="total" />
            <Column title="Saved at" dataIndex="createdAT" key="createdAT" render={createdAT => <> { moment(createdAT).format("D/MM/YYYY") } </>}/>

            <Column title="Actions" dataIndex="id" key="id" render={id => <> <Link href={`/print/${id}`} className="!text-red-500 border-2"> Print </Link> </>} />

        </Table>
	</div>
  )
}

export default Home