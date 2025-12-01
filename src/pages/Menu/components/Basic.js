import { Menu,MenuItem } from "semantic-ui-react";

export default function Basic() {
  const handleItemClick = () => {};
  return (
    <div>
      <Menu>
        <MenuItem onClick={handleItemClick}>A</MenuItem>
        <MenuItem onClick={handleItemClick}>B</MenuItem>
        <MenuItem onClick={handleItemClick}>C</MenuItem>
      </Menu>
    </div>
  );
}
