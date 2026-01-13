import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  Table,
  ListItem,
  List,
  Button,
} from "semantic-ui-react";

export default function PhoneView(data, dataDetail, loading) {
  console.log(data);
  const row = (text) => {
    return (
      <TableRow>
        <TableCell width={2}>{text}</TableCell>
        <TableCell>
          <List celled horizontal>
            {/* 欄位項目 */}
            <ListItem as="a">About Us</ListItem>
            <ListItem as="a">Sitemap</ListItem>
            <ListItem as="a">Contact</ListItem>
            <ListItem as="a">About Us</ListItem>
            <ListItem as="a">Sitemap</ListItem>
            <ListItem as="a">Contact</ListItem>
          </List>
        </TableCell>
      </TableRow>
    );
  };

  const table = (text) => {
    return (
      <Table unstackable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell colSpan="2">1/13</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {row("A")}
          {row("B")}
          {row("C")}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      {data.map((obj) => {
        console.log(obj);
      })}
    </>
  );
}
