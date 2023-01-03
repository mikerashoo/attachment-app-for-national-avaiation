import React, { Component } from "react"; 
import { Menu } from "antd"; 
import Link from "next/link";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


function NavLink({to, children}) {
    return <span className="px-4 hover:bg-indigo-800"><Link href={to} className="">
        {children}
    </Link>
    </span>
}

export default function Navbar() { 
    return (
        <nav className="flex filter drop-shadow-sm bg-primary px-4 py-4 h-10 items-center">
            
            <div className="w-3/12 flex items-center">
                <a className="text-2xl font-semibold" href="/home">NACA</a>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                 

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
                </div>
            </div>
        </nav>  
    )
}
 