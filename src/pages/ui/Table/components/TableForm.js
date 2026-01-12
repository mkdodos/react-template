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
  Input,
} from "semantic-ui-react";
// import People from "../Label";

import Dropdown from "../../../ui/Dropdown";

import "./style.css";
// import { data } from "react-router-dom";

export default function index() {
  return (
    // basic='very' 無外框
    <Table basic="very" className="basic" unstackable striped>
      <TableBody>
        <TableRow>
          <TableCell>客戶</TableCell>
          <TableCell>
            <Dropdown />
          </TableCell>
          <TableCell>案號</TableCell>
          <TableCell>
            <Input />
          </TableCell>
          <TableCell>品名</TableCell>
          <TableCell>
            <Input />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>尺寸1</TableCell>
          <TableCell>
            <Input />
          </TableCell>
          <TableCell>尺寸2</TableCell>
          <TableCell>
            <Input />
          </TableCell>
          <TableCell>尺寸3</TableCell>
          <TableCell>
            <Input />
          </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>說明</TableCell>
            <TableCell colSpan="5">
              <Input fluid />
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  );
}
