import { Popconfirm, Table, Card, Form, Input, PageHeader, Row, Modal, InputNumber, Select, Button, DatePicker, message, Checkbox, Descriptions } from 'antd' 
import React, { useEffect, useState } from 'react'
import { createStudentHandler, deleteStudentHandler, getAllStudentsHandler, importStudentsCall } from '../../services/handlers/student-handler'
import ErrorAlert from '../small_components/error_alert'
import { CustomPageHeader, HeadingTail, ManagementHeading } from '../small_components/page_header'
import moment from 'moment/moment'
import { getAllDepartementsHandler } from '../../services/handlers/departement-handler'
import { exportToExcel } from '../../utils/export_functionalities'
import { GENERAL_ERROR_MESSAGE } from '../../utils/error_messages'
import readXlsxFile from 'read-excel-file'
import { WarningFilled, WarningOutlined, ClearOutlined, CloseOutlined } from '@ant-design/icons'
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
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [hasDiscount, setHasDiscount] = useState(false);
    const [studentsToImport, setStudentsToImport] = useState([]); 
    const [failedRows, setFailedRows] = useState([]);
    const [saveImportFailedRows, setSaveImportFailedRow] = useState([]);

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

      const handleOnImportModalOk = () => {
        setIsImportModalOpen(false);
        setSaveImportFailedRow([]);
 
        setStudentsToImport([])
        setFailedRows([])
        form.resetFields();
      }

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

    const deleteStudent = async (id) => {
        try {
            setLoading(true)
            const deleteStudentResponse = await deleteStudentHandler({id});
            console.log("DELETE STUDENT RESPONSE", deleteStudentResponse)
           
            message.success("Student deleted successfully");
            const _students = students.filter((_student) => _student.id != id);
            setStudents(_students)
            setLoading(false)
            
        } catch (error) {
            setLoading(false);
            message.error(GENERAL_ERROR_MESSAGE)
        }
    } 
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

      const downloadExcel = () => {
        const fileName = 'student reports ' + moment().format('DD-MM-YYYY') + '.xlsx'
        const data = [];
        for (const student of students) { 
             let _row = { 
                studentId: student.collageId,
                name: student.name,
                departement: student.departement.name,
                registeredAt: moment(student.registeredAt).format("D/MM/YYYY"),
                discount: parseInt(student.discount) > 0 ? student.discount : "-",
                isActive: student.isActive ? 'Active' : 'Inactive',
             }
             data.push(_row)
        }
        let headings = ['Student Id', 'Full Name', 'Departement', 'Registered at', 'Discount % ', 'Status']
        exportToExcel(fileName, headings, data)
      };


      const importExcel =  () =>{
        setIsImportModalOpen(true);
      }

      const onImportFileChanged = async (e) => {
        try {
            console.log(e)
        const file = e.target.files[0]; 
        readXlsxFile(file).then((rows) => {
            setFailedRows([])
            setStudentsToImport([])
            setSaveImportFailedRow([])
            if(rows.length == 0){
                message.error("No rows found")
                return;
            }
            let _students = []; 
            let _failedRows = [];
            for(const row of rows){
                try {
                    
                    if(rows.indexOf(row) == 0) continue;

                    const studentId = row[0];
                    const name = row[1];
                    const code = row[2]; 
                    let discount = 0; 


                    let currentRow = {
                        studentId: studentId,
                        name: name,
                        depCode: code,
                        discount:  discount,
                        departement: departements.find(dep => dep.code.toLowerCase() == code.toLowerCase()) ?? null,
                        errors: []
                    } 
                    let hasError = false;
                    if(row[3] != null){ 
                        try {
                            const _discount = parseInt(row[3])
                            if(_discount < 0 || _discount > 100){
                                currentRow.errors.push("Invalid value for discount percent");
                                _failedRows.push(currentRow)

                                hasError = true;
                            }
                            else {
                                currentRow.discount = _discount;
                            }
                        } catch (error) {
                            currentRow.errors.push("Invalid value for discount percent");
                        _failedRows.push(currentRow)
                        hasError = true;
                            
                        } 
                    }

                    console.log("Discount", currentRow);
                    if(students.find((_st) => _st.collageId.toLowerCase() == studentId.toLowerCase() || rows.filter(_row => _row[0].toLowerCase() == studentId.toLowerCase()).length > 1) != null){
                        currentRow.errors.push("StudentId is already taken")
                        _failedRows.push(currentRow)
                        hasError = true;
                    }
                    console.log("StudentId", currentRow)
                    if( departements.find(dep => dep.code.toLowerCase() == code.toLowerCase()) == null){
                        currentRow.errors.push("Departement code not found")

                        _failedRows.push(currentRow)
                        hasError = true;
                    }
                    console.log("departement", currentRow)

                if(hasError) continue;
                    _students.push(currentRow)
                } catch (error) {
                    console.log("error : ", error)
                    if(failedRows.indexOf(currentRow) == -1){
                        failedRows.push(currentRow);

                    }
                }
                
            }
            console.log("students : ", _students)
            console.log("failedRows : ", _failedRows)
            setStudentsToImport(_students); 
            setFailedRows(_failedRows);
            // `rows` is an array of rows
            // each row being an array of cells.
          }).catch((e) =>{
            setFailedRows([])
            setStudentsToImport([]); 

            console.log("--------------------------------")
            message.error("Failed to read a file. Please make sure you selected valid excel file")
            console.log(e);
          });
        }catch(e){
            console.log(e);
        }
        
      } 

      const saveImportToDb = async () => {
        try {
            setLoading(true);
              const data = {
                    students: [...studentsToImport.map(((_st, index) =>  {
                        return {
                            index: index,
                            name: _st.name,
                            departementId: _st.departement.id,
                            collageId: _st.studentId,
                            discount: _st.discount ?? 0,
                        }

                    }))]
                }
                console.log("data", data);
                const importCall = await importStudentsCall(data);
                console.log(importCall)
                setLoading(false);
                message.success(`${importCall.savedCount} imported successfully!`)
                let importedStudents = []
                importCall.savedRows.every((_student) => {
                    importedStudents.push(_student);

                });
                const withNewStudents = [...students, ...importedStudents];
                setStudents(withNewStudents)
                if(importCall.failedRows.length == 0){

                    handleOnImportModalOk();
                    return; 
                }
                let _failedRows = [];
                importCall.failedRows.every((failedIndex) => {
                    _failedRows.push(studentsToImport[failedIndex]);

                })
               
                console.log("_failedRows", _failedRows);
                setSaveImportFailedRow(_failedRows);
 
                setStudentsToImport([])
                setFailedRows([])

        } catch (error) {
            console.log(error);
            message.error(GENERAL_ERROR_MESSAGE)
        }
      
      }  
  return (
    
    <div>
        <Modal title="Import Student Data" width={1000} open={isImportModalOpen} footer={null} onOk={handleOnImportModalOk} onCancel={handleOnImportModalOk} destroyOnClose={true}>
            <Card>
            <Input type='file' placeholder='Import Excel' onChange={onImportFileChanged} />
            {
                (studentsToImport.length > 0 || failedRows.length > 0 ) && <>
                    <div className="lg:flex lg:items-center lg:justify-between mb-4">
                        <div className="min-w-0 flex-1 mt-4">
                            <h2 className="text-lg font-bold leading-7 txt-primary">
                            Students to be imported
                            </h2>
                            
                            <Popconfirm
                            title={`Save students to DB`}
                            description="Are you sure you want to import these rows to database"
                            okText="Yes save!"
                            okButtonProps={{classnames: "!bg-danger", danger: true}}
                            placement="topRight"
                            cancelText="Cancel"
                            onConfirm={() => saveImportToDb()}
                                >
                            
                            <Button className='bg-success'>Save Imports</Button>
                            </Popconfirm>
                        
                            <div className='grid grid-cols-3'>
                                <div>   Total rows : </div>
                                <div className='text-green-600 pr-2'>    {studentsToImport.length}  : Valid rows </div>
                                <div className='text-red-600 pr-2'> {failedRows.length} Rows has error  </div>

                            </div>
                        </div>
                 </div></>
            }

{
                    saveImportFailedRows.length > 0 && <> 
                   <ErrorAlert message="This rows are failed to be saved! Please check and try again this rows" />
                    <Table className="pt-4" rowKey="studentId"  pagination={{ pageSize: 5}}  rowClassName='text-red-600' loading={loading} key="id" bordered size='xs' dataSource={saveImportFailedRows} >
                            <Column title="Student ID" dataIndex="studentId" key="studentId" />
                            <Column title="Full Name" dataIndex="name" key="name" />
                            <Column title="Departement code" dataIndex="depCode" key="depCode"  />
                            <Column title="Discount" dataIndex="discount" key="discount" render={discount => parseInt(discount) > 0 ? discount : '-' } />
                            
                            <Column title="Reason" dataIndex="errors" key="errors" render={errors => <>
                                { errors.map(e => <p key={e} className='text-danger'><CloseOutlined/> {e}</p>)}
                            </>} />

                        </Table>
                    </>
                }

                {
                    failedRows.length > 0 && <> 
                    <b>
                        This rows have an issue
                    </b>
                    <Table className="pt-4" rowKey="studentId"  pagination={{ pageSize: 5}}  rowClassName='text-red-600' loading={loading} key="id" bordered size='xs' dataSource={failedRows} >
                            <Column title="Student ID" dataIndex="studentId" key="studentId" />
                            <Column title="Full Name" dataIndex="name" key="name" />
                            <Column title="Departement code" dataIndex="depCode" key="depCode"  />
                            <Column title="Discount" dataIndex="discount" key="discount" render={discount => parseInt(discount) > 0 ? discount : '-' } />
                            
                            <Column title="Reason" dataIndex="errors" key="errors" render={errors => <>
                                { errors.map(e => <p key={e} className='text-danger'><CloseOutlined/> {e}</p>)}
                            </>} />

                        </Table>
                    </>
                }
                   {
                     studentsToImport.length > 0 && <> 
                        <b>Passed rows</b>
                        <Table className="pt-4" rowKey="studentId"  pagination={{ pageSize: 5}}  loading={loading} key="id" bordered size='xs' dataSource={studentsToImport} >
                            <Column title="Student ID" dataIndex="studentId" key="studentId" />
                            <Column title="Full Name" dataIndex="name" key="name" />
                            <Column title="Departement" dataIndex="departement" key="departement" render={departement => departement != null ? departement.name : '-' } />
                            <Column title="Discount" dataIndex="discount" key="discount" render={discount => parseInt(discount) > 0 ? discount : '-' } />
                            
                        </Table>
                        </>
                    }   
                  
               

                   
                    

           
            </Card>
        </Modal>
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
                          <Button className='bg-primary' key="register" type='primary' onClick={showModal}>Register</Button>,
                          <Button className="bg-warning" key="export" onClick={()=>downloadExcel()}>Export to Excel</Button>,
                         
                          <Button className="bg-success" key="import" onClick={()=>importExcel()}>Import from Excel</Button>
        ]} /> 
        {hasError && <ErrorAlert className="my-4" />  }
    
        <Table className="pt-4" rowKey="id" pagination={{ pageSize: 5}} rowClassName='group' loading={loading} key="id" bordered size='xs' dataSource={students} >
            
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