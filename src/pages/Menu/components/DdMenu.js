import { Dropdown, DropdownMenu, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function DdMenu() {
  return (
    <Dropdown item text="Manager">
      <DropdownMenu>
        <Menu.Item as={Link} to="/manager-worker-amt">
          A
        </Menu.Item>
        <Menu.Item as={Link} to="/manager-acc-income">
          B
        </Menu.Item>
      </DropdownMenu>
    </Dropdown>
  );
}
