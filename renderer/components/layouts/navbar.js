import React, { Component, useEffect, useState } from "react"; 
import { Button, Dropdown, Menu, Space } from "antd"; 
import Link from "next/link";
import { USER_LOGGIN_KEY } from "../../utils/constants";
import { useRouter } from "next/router";
import { DownOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { logoutUser, useAuthDispatch, useAuthState } from "../../auth";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


function NavLink({to, children}) {
    return <span className="px-4 hover:bg-indigo-800"><Link href={to} className="">
        {children}
    </Link>
    </span>
}

export default function Navbar() {  
    const [isLoggedIn, setIsLoggedIn] = useState(false) 
    const userDetails = useAuthState();
    const dispatch = useAuthDispatch();

  const logout = () => {
    logoutUser(dispatch)
  } 

  
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Change Password</Menu.Item> 
      <Menu.Divider />
      <Menu.Item key="4"></Menu.Item>
    </Menu>
  );
    return (
        <nav className="flex filter drop-shadow-sm bg-primary px-4 py-4 h-10 items-center">
            
            <div className="w-3/12 flex items-center">
                <a className="text-2xl font-semibold" href="/home">NACA</a>
            </div>
            {userDetails.user && <div className="w-9/12 flex justify-end items-center">

                 

                <div className="hidden md:flex">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/attachment">New attachement</NavLink>
                 
                    <NavLink to="/reports">
                        Reports
                    </NavLink>
                    <NavLink to="/manage">
                        Managements
                    </NavLink>
                    <NavLink to="/backup">
                        Backups
                    </NavLink>
                    <Button type="link" className="text-white" onClick={logout}>Logout </Button>
                    
                </div>
            </div> }
        </nav>  
    )
}
 