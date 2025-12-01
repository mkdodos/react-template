import { MenuItem, Input, Label, Menu } from "semantic-ui-react";

export default function Vertical() {
  const handleItemClick = () => {};
  return (
    <Menu vertical>
      <MenuItem onClick={handleItemClick}>A</MenuItem>
      <MenuItem onClick={handleItemClick}>B</MenuItem>
      <MenuItem onClick={handleItemClick}>C</MenuItem>
    </Menu>
  );
}
