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
  HeaderSubheader
} from "semantic-ui-react";
import People from "../Label";

import "./style.css";
import { data } from "react-router-dom";

export default function index() {
  const data1 = [
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
  ];
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
    <Table className="basic" unstackable striped padded>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>日期</TableHeaderCell>
          <TableHeaderCell>地點</TableHeaderCell>
          {/* <TableHeaderCell>人員</TableHeaderCell> */}
          <TableHeaderCell>人員</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>11-15</TableCell>
          <TableCell>瑞復</TableCell>
          {/* <TableCell>4</TableCell> */}
          <TableCell>
            {/* <People data={data1} /> */}
          </TableCell>
        </TableRow>
        <TableRow className="abc" top aligned>
          <TableCell>11-08</TableCell>
          <TableCell>舟屋</TableCell>
          {/* <TableCell>5</TableCell> */}
          <TableCell>
            <Header as="h4" >
              {/* <Image src="/images/avatar/small/lena.png" rounded size="mini" /> */}
              <HeaderContent>
                Lena
                {/* <HeaderSubheader>Human Resources</HeaderSubheader> */}
              </HeaderContent>
            </Header>
             
          
            {/* <People data={data2} /> */}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>10-06</TableCell>
          <TableCell>瑞復</TableCell>
          {/* <TableCell>8</TableCell> */}
          <TableCell>
            <Rating icon="star" defaultRating={3} maxRating={3} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>08-23</TableCell>
          <TableCell>瑞復</TableCell>
          {/* <TableCell>4</TableCell> */}
          <TableCell>
            100% <br />
            <a href="#">65 studies</a>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
