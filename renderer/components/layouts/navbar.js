import React, { Component } from "react"; 
import { Menu } from "antd"; 
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navbar extends Component {
  render() {
    return (
      <nav className="menuBar bg-white" >
        <div className="logo">
          <a href="/home">logo</a>
        </div>
        <div className="menuCon">
        <div className="rightMenu">
          <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="/home">Report</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/manage">Manage</a>
        </Menu.Item>
      </Menu> 
      </div>
          </div>

      </nav>
    );
  }
}
export default Navbar;
