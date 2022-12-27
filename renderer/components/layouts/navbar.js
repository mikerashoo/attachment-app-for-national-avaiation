import React, { Component } from "react"; 
import { Menu } from "antd"; 
import Link from "next/link";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


function NavLink({to, children}) {
    return <span className="px-4"><Link href={to} className={`!mx-4`}>
        {children}
    </Link>
    </span>
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
 