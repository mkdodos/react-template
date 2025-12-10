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

import Dropdown from "../../Dropdown"

import "./style.css";
// import { data } from "react-router-dom";

export default function index() {
  return (
    // basic='very' 無外框
    <Table  basic="very" className="basic" unstackable striped>
      {/* <TableHeader>
        <TableRow>
          <TableHeaderCell width={3}>日期</TableHeaderCell>
          <TableHeaderCell>地點</TableHeaderCell>
          <TableHeaderCell>人員</TableHeaderCell>
          <TableHeaderCell>人員</TableHeaderCell>
          <TableHeaderCell>人員</TableHeaderCell>
          <TableHeaderCell>人員</TableHeaderCell>
          <TableHeaderCell>人員</TableHeaderCell>
          <TableHeaderCell>
            <Button primary icon>
              <Icon name="plus" />
            </Button>
          </TableHeaderCell>
        </TableRow>
      </TableHeader> */}

      <TableBody>
        <TableRow>
          <TableCell>客戶</TableCell>
          <TableCell>
            <Dropdown/>
          </TableCell>
          <TableCell>案號</TableCell>
          <TableCell >
            <Input  />
          </TableCell>
          <TableCell>品名</TableCell>
          <TableCell>
            <Input  />
          </TableCell>
          {/* <TableCell>加工說明</TableCell>
          <TableCell>
            <Input />
          </TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell >尺寸1</TableCell>
          <TableCell>
            <Input />
          </TableCell>

          <TableCell>尺寸2</TableCell>
          <TableCell>
            <Input  />
          </TableCell>
          <TableCell>尺寸3</TableCell>
          <TableCell>
            <Input  />
          </TableCell>
          {/* <TableCell>按鈕</TableCell>
          <TableCell></TableCell> */}
        </TableRow>
      </TableBody>
    </Table>
  );
}
