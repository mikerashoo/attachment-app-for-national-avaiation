import { Popconfirm, Table, Column, Card, Form, Input, Col, Row, Modal, InputNumber, Select, Button, DatePicker, message } from 'antd' 
import React, { useEffect, useState } from 'react'
import { createStudentHandler, getAllStudentsHandler } from '../../services/handlers/student-handler'
import ErrorAlert from '../small_components/error_alert'
import { CustomPageHeader, HeadingTail, ManagementHeading } from '../small_components/page_header'
import moment from 'moment/moment'
import { getAllDepartementsHandler } from '../../services/handlers/departement-handler'

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
                form.resetFields()
                handleOk()
            }, 1000);
            
            
        }
        catch(e){
            console.log("Saving student errror: ", e)
            message.error("Can't save student information please try again")
            setLoading(false)
        }   
    }


  return (
    
    <div>
        <Modal title="Register New Student" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
        
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
                                        departements.map(departement => <Select.Option value={departement.id}> {
                                                departement.name
                                            } </Select.Option>)
                                    }
                                </Select>
                            </Form.Item>
                        
                            <Form.Item label="Registered at" name="registeredAt" required>
                                <DatePicker  format="YYYY-MM-DD HH:mm:ss"  />
                            </Form.Item>
                        
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
              
        </Table>
        
    </div>
  )
}

export default StudentManagement