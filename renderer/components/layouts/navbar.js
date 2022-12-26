import React, { Component } from "react"; 
import { Menu } from "antd"; 
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


function NavLink({to, children}) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

export default function Navbar() { 
    return (
        <nav className="flex filter drop-shadow-sm bg-white px-4 py-4 h-10 items-center">
            
            <div className="w-3/12 flex items-center">
                <a className="text-2xl font-semibold" href="/home">NACA</a>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                 

                <div className="hidden md:flex">
                    <NavLink to="/home">New attachement</NavLink>
                 
                    <NavLink to="/report">
                        Report
                    </NavLink>
                    <NavLink to="/manage">
                        Managements
                    </NavLink>
                </div>
            </div>
        </nav>  
    )
}
 