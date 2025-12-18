import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <Menu>
        <Menu.Item as={Link} to="/dropdown">
          Dropdown
        </Menu.Item>
        <Menu.Item as={Link} to="/table">
          表格
        </Menu.Item>
        <Menu.Item as={Link} to="/button">
          按鈕
        </Menu.Item>
         <Menu.Item as={Link} to="/menu">
          選單
        </Menu.Item>
        <Menu.Item as={Link} to="/grid">
          Grid
        </Menu.Item>
        <Menu.Item as={Link} to="/tab">
          Tab
        </Menu.Item>
        <Menu.Item as={Link} to="/form">
          Form
        </Menu.Item>
        <Menu.Item as={Link} to="/modal">
          Modal
        </Menu.Item>
        <Menu.Item as={Link} to="/crud">
          Crud
        </Menu.Item>
        <Menu.Item as={Link} to="/master-detail">
          MasterDetail
        </Menu.Item>
        <Menu.Item position="right" as={Link} to="http://localhost:8888/react-template/pdo/">
          PDO
        </Menu.Item>
      </Menu>
    </div>
  );
}
