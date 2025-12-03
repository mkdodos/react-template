import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Label,
  Rating,
  Header,
  HeaderContent,
  HeaderSubheader,
  Button,
  Icon,
} from "semantic-ui-react";
// import People from "../Label";

import "./style.css";
// import { data } from "react-router-dom";

export default function index() {
  
  const data2 = [
    {
      name: "馬克",
    },
    {
      name: "宜君",
    },
    {
      name: "愷軒",
    },
    {
      name: "欣妤",
    },
    {
      name: "子晉",
    },
  ];
  return (
    // basic='very' 無外框
    <Table basic='very' className="basic" unstackable striped padded>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>日期</TableHeaderCell>
          <TableHeaderCell>地點</TableHeaderCell>         
          <TableHeaderCell>人員</TableHeaderCell>
          <TableHeaderCell>
            <Button primary icon>
              <Icon  name="plus" />
            </Button>
          </TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>11-15</TableCell>
          <TableCell>瑞復</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow className="abc" top aligned>
          <TableCell>11-08</TableCell>
          <TableCell>舟屋</TableCell>
          <TableCell>
            <Header as="h4">
              <HeaderContent>Lena</HeaderContent>
            </Header>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>10-06</TableCell>
          <TableCell>瑞復</TableCell>
          <TableCell>
            <Rating icon="star" defaultRating={3} maxRating={3} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>08-23</TableCell>
          <TableCell>瑞復</TableCell>
          <TableCell>
            100% <br />
            <a href="#">65 studies</a>
          </TableCell>
          <TableCell> </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
