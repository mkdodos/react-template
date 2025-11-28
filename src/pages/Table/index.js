import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "semantic-ui-react";

import "./style.css";

export default function index() {
  return (
    <Table celled className="basic" striped columns={3}>
   
      <TableHeader>
        <TableRow>
          <TableHeaderCell>日期</TableHeaderCell>
          <TableHeaderCell>地點</TableHeaderCell>
          <TableHeaderCell>人員</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2025-11-15</TableCell>
          <TableCell>瑞復</TableCell>
          <TableCell>4</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2025-11-08</TableCell>
          <TableCell>舟屋</TableCell>
          <TableCell>5</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2025-10-06</TableCell>
          <TableCell>瑞復</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2025-08-23</TableCell>
          <TableCell>瑞復</TableCell>
          <TableCell>4</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
