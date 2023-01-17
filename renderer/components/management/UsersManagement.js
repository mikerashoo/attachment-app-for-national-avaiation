import { Button, Divider, Popconfirm, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllUsersHandler } from '../../services/handlers/user-handler'
import ErrorAlert from '../small_components/error_alert'
import { ManagementHeading } from '../small_components/page_header'
const {Column} = Table

function UsersManagement () {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])

  const fetch = async ()  => {
    try {
        setHasError(false)
        setIsLoading(true) 
        const users = await getAllUsersHandler(); 
        setUsers(users);
        setIsLoading(false)
        
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

const deleteUser = (id) => {}

  return (
    <div>
         <ManagementHeading title={"Users"} actionButtons={ [
                          <Button className='bg-primary' key="new_user" type='primary' >New User</Button>,
        ]} /> 
        <Divider />
        {hasError && <ErrorAlert className="my-4" />  }

        <Table className="pt-4" rowKey="id" pagination={{ pageSize: 5}} rowClassName='group' loading={isLoading} key="id" bordered size='xs' dataSource={users} >
            
            <Column title="ID" dataIndex="username" key="username" render={(username, user) => <>
                {username } 
                <Popconfirm
                    title={`Are you sure you want to delete user : ${user.name}`}
                    description="Are you sure to delete this user?"
                    okText="Yes delete!"
                    okButtonProps={{classnames: "!bg-danger", danger: true}}
                    placement="topRight"
                    cancelText="Cancel"
                    onConfirm={() => deleteUser(user.id)}
                        >
                        <a href="#" className="!txt-danger pl-2 opacity-0 group-hover:opacity-100 transition ease-in-out">Delete</a> 
                    </Popconfirm>
                    
                </> 
                }/>
            <Column title="Full Name" dataIndex="name" key="name" />
            <Column title="Role" dataIndex="role" key="name" />
           
        </Table>
    </div>
  )
}

export default UsersManagement  