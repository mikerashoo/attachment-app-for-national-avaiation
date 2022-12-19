import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'; 
import osApi from '../services/osapi'; 
import userOperations from '../services/users';
import { Breadcrumb, Button, Card, DatePicker, Layout, Menu } from 'antd'; 
import { CalendarOutlined, DollarOutlined, LaptopOutlined, MailOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import ManageMenu from '../components/manage_menus';
import UsersComponent from '../components/users';
import PaymentManagement from '../components/payments';
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

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  } 

  const onClick = (item) => {
	setSelectedKey(item.key);
  }
 
    return (
    <Layout className="layout h-screen" >
		<Header>
		<div className="logo" />
		<Menu
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={['2']}
			items={new Array(3).fill(null).map((_, index) => {
			const key = index + 1;
			return {
				key,
				label: `nav ${key}`,
			};
			})}
		/>
		</Header>
		
		<Layout className='mx-8 px-8 py-4 h-full my-4'>
			<Sider className='bg-white pt-4' style={{backgroundColor: 'white'}} width={250}> 
					<Menu
					onClick={onClick}
					style={{
					width: 250,
					}}
				items={myItems.map(_item => getItem(_item.label, _item.key, _item.icon))}
				/>
			</Sider> 
			<Layout>
					<Content> 
					{selectedKey === menuKeys.user && <UsersComponent />}
					{selectedKey === menuKeys.payments && <PaymentManagement />}
					</Content>
			</Layout> 
		</Layout>
	</Layout>
  );
}

export default Home;
// 