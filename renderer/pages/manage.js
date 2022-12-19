import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'; 
import osApi from '../services/osapi'; 
import userOperations from '../services/users';
import { Breadcrumb, Button, Card, DatePicker, Layout, Menu } from 'antd'; 
import { CalendarOutlined, DollarOutlined, LaptopOutlined, MailOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import ManageMenu from '../components/manage_menus';
import UsersComponent from '../components/management/users'; 
import PageLayout from '../components/layouts/PageLayout';
import PaymentTypeManagement from '../components/management/payment_types';
const { Header, Content, Sider } = Layout; 
const menuKeys = {
	'user': 'user',
    'payments': 'payments',
}

const Home = () => { 
   

    const topics = ["First topic", "Second topic", "Third topic"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState(menuKeys.user);
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };

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
		 
		 
			<Sider className='pt-4' id='managementSideBar' width={250} style={{backgroundColor: 'transparent'}}> 
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
			<Layout>
					<Content className='p-4 bg-white ml-2 border-t-4 border-purple-900'> 
					{selectedKey === menuKeys.user && <UsersComponent />}
					{selectedKey === menuKeys.payments && <PaymentTypeManagement />}
					</Content>
			</Layout>  
	</PageLayout>
  );
}

export default Home;
// 