import React, { useEffect, useState } from 'react'; 
import {Layout, Menu } from 'antd'; 
import { UserOutlined, DollarOutlined, BookOutlined } from '@ant-design/icons'; 
import UsersComponent from '../components/management/users'; 
import PageLayout from '../components/layouts/PageLayout';
import PaymentTypeManagement from '../components/management/PaymentTypesManagement';
import DepartementManagement from '../components/management/DepartementManagement';
const { Header, Content, Sider } = Layout; 
const menuKeys = {
	'user': 'user',
    'payments': 'payments',
    'departement': 'departement',
}

const ManagementPage = () => { 
   
  const [selectedKey, setSelectedKey] = useState(menuKeys.user);
   

  const myItems = [
    {
      key: menuKeys.user,
      label: "Users",
      icon: <UserOutlined />,

    },
    {
      key: menuKeys.payments,  
      label: "Payments ",
      icon: <DollarOutlined />,

    },
    {
        key: menuKeys.departement,  
        label: "Departement ",
        icon: <BookOutlined />,
  
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
                     
                        {selectedKey === menuKeys.user && <UsersComponent />}
                        {selectedKey === menuKeys.payments && <PaymentTypeManagement />}
                        {selectedKey === menuKeys.departement && <DepartementManagement />}
					</Content>
			</Layout>  
	</PageLayout>
  );
}

export default ManagementPage;
// 