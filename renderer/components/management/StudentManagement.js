import { Popconfirm, Table, Card, Form, Input, Col, Row, Modal, InputNumber, Select, Button, DatePicker, message, Checkbox } from 'antd' 
import React, { useEffect, useState } from 'react'
import { createStudentHandler, getAllStudentsHandler } from '../../services/handlers/student-handler'
import ErrorAlert from '../small_components/error_alert'
import { CustomPageHeader, HeadingTail, ManagementHeading } from '../small_components/page_header'
import moment from 'moment/moment'
import { getAllDepartementsHandler } from '../../services/handlers/departement-handler'
const {Column} = Table

const formLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  }
const StudentManagement = () => {

    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [students, setStudents] = useState([])  
    const [departements, setDepartements] = useState([])  

    const [form,] = Form.useForm(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasDiscount, setHasDiscount] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
        form.resetFields();
        setHasDiscount(false) 
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setHasDiscount(false) 
      }; 

    const fetch = async ()  => {
        try {
            setHasError(false)
            setLoading(true)
            const resp = await getAllStudentsHandler();
            const deps = await getAllDepartementsHandler(); 

            if(resp && deps){
                setStudents(resp);
                setDepartements(deps);

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

    const deleteStudent = (id) => {}
    const onStatusChange = (student) => {}
    const onSubmit = async (values) => { 
        try{
            if(students.filter(student => student.collageId.toLowerCase() === values.collageId.toLowerCase()).length > 0){
                message.error("Student with the same id already exists!");
                return;
            }
            setLoading(true) 
            const data = {
                ...values,
                registeredAt: values.registeredAt.toISOString()
            }

            const newStudent = await createStudentHandler(data);
            const _students = [...students, newStudent]
            setStudents(_students)
            setTimeout(function() {
                setLoading(false)
                message.success("Student information saved successfully")
                 
                handleOk()
            }, 1000);
            
            
        }
        catch(e){
            console.log("Saving student errror: ", e)
            message.error("Can't save student information please try again")
            setLoading(false)
        }   
    }


	  const onHasDiscount = ({ target: { checked } }) => {
		setHasDiscount(checked);
	  }


  return (
    
    <div>
        <Modal title="Register New Student" open={isModalOpen}   footer={null} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
        
            <Card loading={loading} >
                    <Form  
                        form={form}
                        size="middle"
                        layout="vertical" 
                        onFinish={onSubmit} 
                        >
                        
                        <Form.Item label="Full Name" name='name' rules={[{required: true}]}>
                            <Input placeholder="Enter full name here" />
                        </Form.Item> 
                        <Form.Item label="ID" name='collageId' rules={[{required: true, message: "Student id can't be empty"}]}>
                            <Input placeholder="Enter student ID" />
                        </Form.Item>  
                        <Form.Item label="Departement" name="departementId" rules={[{required: true, message:"Student departement is required"}]}>
                            <Select placeholder="Select departement">
                                
                                {
                                    departements.map(departement => <Select.Option key={departement.id} value={departement.id}> {
                                            departement.name
                                        } </Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        
                        <Form.Item label="Registered at" name="registeredAt" required>
                            <DatePicker  format="YYYY-MM-DD HH:mm:ss"  />
                        </Form.Item>
                    
              
                        <Checkbox name="hasPenality" onChange={onHasDiscount} value={hasDiscount} className='mb-2'> Has Discount</Checkbox> 
                        
                        {hasDiscount && <Form.Item label="Discount" name="discount" className='w-full' rules={[{required: true}, {type: 'number', max: 100, min: 1}]} >
                            <InputNumber prefix={"%"}/>
                        </Form.Item> }
                        <Form.Item >
                            <Button className='bg-primary' type='primary' htmlType='submit'>Save</Button>
                        </Form.Item>
                    </Form>
                </Card>
        </Modal>
        <ManagementHeading title={"Students"} actionButtons={ [
                          <Button className='bg-primary' type='primary' onClick={showModal}>Register</Button>
 
        ]} /> 
        {hasError && <ErrorAlert className="my-4" />  }
    
        <Table className="pt-4" pagination={{ pageSize: 5}} rowClassName='group' loading={loading} key="id" bordered size='xs' dataSource={students} >
            
            <Column title="ID" dataIndex="collageId" key="collageId" render={(collageId, student) => <>
                {collageId } 
                <Popconfirm
                    title={`Are you sure you want to delete student : ${student.name}`}
                    description="Are you sure to delete this student?"
                    okText="Yes delete!"
                    okButtonProps={{classnames: "!bg-danger", danger: true}}
                    placement="topRight"
                    cancelText="Cancel"
                    onConfirm={() => deleteStudent(student.id)}
                        >
                        <a href="#" className="!txt-danger pl-2 opacity-0 group-hover:opacity-100 transition ease-in-out">Delete</a> 
                    </Popconfirm>
                    
                </> 
                }/>
            <Column title="Full Name" dataIndex="name" key="name" />
            <Column title="Departement" dataIndex="departement" key="departement" render={departement => departement.name } />
            <Column title="Registered at" dataIndex="registeredAt" key="registeredAt" render={registeredAt => <> { moment(registeredAt).format("D/MM/YYYY") } </>}/>

            <Column title="Status" dataIndex="isActive" key="isActive" render={(isActive, student) => <> {isActive ? <p className='text-green-500'>Active</p> : <p className='text-red-500'>Inactive</p>}</>} />
            <Column title="Discount" dataIndex="discount" key="discount" render={(discount, student) => <> {discount ? <p className='text-primary'>{discount}%</p> : <p className='text-red-500'>-</p>}</>} />
              
        </Table>
        
    </div>
  )
}

export default StudentManagement