import React, { useEffect, useState } from 'react'; 
import {Layout, Menu } from 'antd'; 
import { UserOutlined, DollarOutlined, BookOutlined, AlignRightOutlined } from '@ant-design/icons'; 
import UsersComponent from '../components/management/UsersManagement'; 
import PageLayout from '../components/layouts/PageLayout';
import PaymentTypeManagement from '../components/management/PaymentTypesManagement';
import DepartementManagement from '../components/management/DepartementManagement';
import StudentManagement from '../components/management/StudentManagement';
import PaymentFormManagement from '../components/management/PaymentFormManagement';
import UsersManagement from '../components/management/UsersManagement';
const { Header, Content, Sider } = Layout; 
const menuKeys = {
	'users': 'users', 
	'students': 'students', 
    'payments': 'payments',
    'departement': 'departement',
    'paymentForms': 'paymentForms',
}

const ManagementPage = () => { 
   
  const [selectedKey, setSelectedKey] = useState(menuKeys.users);
   

  const myItems = [ 
    {
      key: menuKeys.users,  
      label: "Users ",
      icon: <UserOutlined />,

    },
    {
        key: menuKeys.departement,  
        label: "Departement ",
        icon: <BookOutlined />,
  
      },
    {
      key: menuKeys.students,
      label: "Students",
      icon: <UserOutlined />,

    },
    {
      key: menuKeys.payments,  
      label: "Payments types ",
      icon: <DollarOutlined />,

    },
     {
        key: menuKeys.paymentForms,  
        label: "Payment Forms ",
        icon: <AlignRightOutlined />,
  
      },
      
  ]
  const style = {backgroundColor: 'transparent'}
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
      style
    };
  } 

  const onMenuItemClick = (item) => {
	  setSelectedKey(item.key);
  }
 
    return (
    <PageLayout >
		 
		 
			<Sider className='pt-4 !bg-white' id='managementSideBar' width={250} > 
					<Menu
					onClick={onMenuItemClick}        
					selectedKeys={[selectedKey]}  
					style={{
					    width: 250,
                        backgroundColor: 'transparent'
					}}
				items={myItems.map(_item => getItem(_item.label, _item.key, _item.icon))}
				/>
			</Sider> 
			<Layout className='w-full'>
					<Content className='p-4 bg-white ml-2 border-1 w-full'> 
                     
                        {selectedKey === menuKeys.users && <UsersManagement />}
                        {selectedKey === menuKeys.students && <StudentManagement />}
                        {selectedKey === menuKeys.payments && <PaymentTypeManagement />}
                        {selectedKey === menuKeys.departement && <DepartementManagement />}
                        {selectedKey === menuKeys.paymentForms && <PaymentFormManagement />}
					</Content>
			</Layout>  
	</PageLayout>
  );
}

export default ManagementPage;
// 