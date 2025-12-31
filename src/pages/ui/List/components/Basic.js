import { ListItem, List, Label } from "semantic-ui-react";

export default function Basic() {
  return (
    <div>
      <List link>
        <ListItem as="a">
          <List bulleted horizontal link>
            <ListItem as="a">
              <Label size="large"> 2025-12-31</Label>
            </ListItem>
            <ListItem as="a">咖啡</ListItem>
            <ListItem as="a">Contact Us</ListItem>
            <ListItem as="a">Contact Us</ListItem>
          </List>
        </ListItem>
        <ListItem as="a">
          <List bulleted horizontal link>
            <ListItem as="a">
              <Label size="large"> 2025-12-31</Label>
            </ListItem>
            <ListItem as="a">咖啡</ListItem>
            <ListItem as="a">Contact Us</ListItem>
          </List>
        </ListItem>
        <ListItem as="a">
          <List bulleted horizontal link>
            <ListItem as="a">
              <Label size="large"> 2025-12-31</Label>
            </ListItem>
            <ListItem as="a">咖啡</ListItem>
            <ListItem as="a">Contact Us</ListItem>
            <ListItem as="a">咖啡</ListItem>
            <ListItem as="a">Contact Us</ListItem>
          </List>
        </ListItem>
      </List>
      {/* <List bulleted horizontal link>
        <ListItem as="a">
          <Label size="large"> 2025-12-31</Label>
        </ListItem>
        <ListItem as="a">咖啡</ListItem>
        <ListItem as="a">Contact Us</ListItem>
      </List> */}
    </div>
  );
}
