import { Menu, MenuItem } from "semantic-ui-react";
import DdMenu from "./DdMenu";

export default function Basic() {
  const handleItemClick = () => {};
  return (
    <div>
      <Menu>
        <DdMenu />
        <MenuItem onClick={handleItemClick}>A</MenuItem>
        <MenuItem onClick={handleItemClick}>B</MenuItem>
        <MenuItem onClick={handleItemClick}>C</MenuItem>
      </Menu>
    </div>
  );
}
