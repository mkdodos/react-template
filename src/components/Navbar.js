import React from "react";
import { Menu, Dropdown, DropdownMenu } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <Menu>
        {/* <Dropdown item text="UI">
          <DropdownMenu>
            <Menu.Item as={Link} to="/list">
              List
            </Menu.Item>
            <Menu.Item as={Link} to="/segment">
              Segment
            </Menu.Item>
            <Menu.Item as={Link} to="/dropdown">
              Dropdown
            </Menu.Item>
            <Menu.Item as={Link} to="/table">
              Table
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
          </DropdownMenu>
        </Dropdown> */}

        {/* <Menu.Item as={Link} to="/crud">
          Crud
        </Menu.Item> */}
        <Menu.Item as={Link} to="/dish-food">
          菜單料理
        </Menu.Item>
        <Menu.Item as={Link} to="/calendar">
          Calendar
        </Menu.Item>
        {/* <Menu.Item as={Link} to="/dish">
          Dish
        </Menu.Item>
        <Menu.Item as={Link} to="/dish-cate">
          DishCate
        </Menu.Item> */}
         {/* <Menu.Item as={Link} to="/dish-pool">
          DishPool
        </Menu.Item> */}
         {/* <Menu.Item as={Link} to="/dishes">
          Dishes
        </Menu.Item> */}
        {/* <Menu.Item as={Link} to="/master-detail">
          MasterDetail
        </Menu.Item> */}
        {/* <Menu.Item
          position="right"
          as={Link}
          to="http://localhost:8888/react-template/pdo/"
        >
          PDO
        </Menu.Item> */}
      </Menu>
    </div>
  );
}
