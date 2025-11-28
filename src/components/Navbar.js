import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <Menu>
        <Menu.Item as={Link} to="/table">表格</Menu.Item>
        
        <Menu.Item>C</Menu.Item>
      </Menu>
    </div>
  );
}
