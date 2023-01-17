import { PrinterFilled } from '@ant-design/icons'
import { Button, Card, DatePicker, Form, Input, Space, Table, Tooltip } from 'antd' 
import moment from 'moment' 
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ManagementHeading } from '../components/small_components/page_header'
import { fetchMonthlyPaymentReports, fetchPaymentsHandler } from '../services/handlers/payment-handlers'
import { exportToExcel } from '../utils/export_functionalities'
import { generatePaymentNo } from '../utils/helpers'
const { Column, ColumnGroup } = Table
function Home() {
	const router = useRouter()
    const [form] = Form.useForm(); 

	const [isLoading, setIsLoading] = useState(false) 
	const [hasError, setHasError] = useState(false)
	const [payments, setPayments] = useState([])  

	const [studentId, setStudentId] = useState("")	
	const [monthYear, setMonthYear] = useState(null)
	const fetch = async ()  => {
	
		try {
			const data = {
				studentId: studentId,
				monthYear: monthYear
			}

			console.log(data)
			setHasError(false)
			setIsLoading(true)
			const resp = await fetchMonthlyPaymentReports(data);
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
	}, [studentId, monthYear])

	useEffect(() => {
		setMonthYear(moment().format('YYYY-MM'))
		fetch()
	  }, [])
  
	const goToPrint = (id) => {
		const path = `/print/${id}`
		router.push(path)
	} 

	const onStudentIdChange = (event) => {
		 
		setStudentId(event.target.value) 
	}
	
 

	const onMonthChanged = (date, dateString) => { 
		setMonthYear(dateString)
		console.log(dateString.split('-'))

	}
    const downloadExcel = () => {
        const fileName = 'payment reports ' + moment().format('DD-MM-YYYY') + '.xlsx'
        const data = [];
        for (const _payment of payments) {
             let _row = {
                print_no: generatePaymentNo(_payment.id),
                title: _payment.title,
                studentId: _payment.student.collageId,
                name: _payment.student.name,
                attachment: _payment.attachmentNo,
                paymentWay: _payment.paymentWay,
                total: _payment.total,
                date: moment(_payment.createdAT).format("D/MM/YYYY"),
             }
             data.push(_row)
        }
        let headings = ['Print No', 'Payment title' ,'Student Id', 'Student Name', 'Attachment No', 'Payment way', 'Payed', 'Date']
        exportToExcel(fileName, headings, data)
      };
 
  return (
	<div className='mx-8 my-4 bg-white h-full px-8 py-4'>
		<ManagementHeading title="Recent Payments" actionButtons={[
            <Button className="bg-warning" onClick={()=>downloadExcel()}>Export</Button>
        ]}/> 
    
	   
	   <Card title={`Payment reports : ${monthYear != null && monthYear.length > 0 ? moment(monthYear.split('-')[1], 'M').format('MMM') + ", " +  monthYear.split('-')[0] : ''}` }>
		<div className="text-right">
	   <Space style={{ marginBottom: 16, textAlign: 'end' }}>
	   <Input placeholder="Search by student Id" onChange={onStudentIdChange}/>
	   <DatePicker.MonthPicker className='w-full' onChange={onMonthChanged}/>

		</Space>
		</div>
		<Table rowKey="id" className="pt-4" pagination={{ pageSize: 10}} rowClassName='group' loading={isLoading} key={"id"} bordered size='xs' dataSource={payments} >
            <Column title="Payment No" dataIndex="id" key="id" render={(id) => <>{generatePaymentNo(id)} </> } />
            <Column title="Title" dataIndex="title" key="title" />
            <ColumnGroup title="Student">
                <Column title="ID" dataIndex="student" key="studentId" render={(student) => <>{student.collageId}</>}/>
                <Column title="Name" dataIndex="student" key="studentName" render={(student) => <>{student.name}</>}/> 
			</ColumnGroup>
            <Column title="Attachment No" dataIndex="attachmentNo" key="attachmentNo" />
            <Column title="Payment way" dataIndex="paymentWay" key="paymentWay" />
            <Column title="Total payment" dataIndex="total" key="total" />
            <Column title="Saved at" dataIndex="createdAT" key="createdAT" render={createdAT => <> { moment(createdAT).format("D/MM/YYYY") } </>}/>
            <Column title="Recieved By" dataIndex="user" key="user" render={user => <> { user.name } </>}/>

            <Column title="Actions" dataIndex="id" key="id" render={id => <> 
				<Tooltip title="Print">
					<Button type="default" onClick={(e) => goToPrint(id)} shape="circle" icon={<PrinterFilled />} />
				</Tooltip>
			 </>} />

        </Table>
		</Card>
	</div>
  ) 
}

export default Home