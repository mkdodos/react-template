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
  Icon,
  Label,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";
import { getWeekday } from "../../../utils/date";

export default function Text({
  data,
  dataDetail,
  handleAdd,
  handleAddDetail,
  handleEdit,
  handleEditDetail,
}) {
  const getColor = (date) => {
    const weekday = getWeekday(date);
    if (weekday == "六") return "teal";
    if (weekday == "日") return "pink";
  };

  const row = (text, masterID, column, color) => {
    const temp = dataDetail.filter(
      (objDetail) => objDetail.masterID === masterID
    );

    const tempJoin = temp.map((item) => item[column]).join("");

    //  有資料才顯示
    if (tempJoin === "") {
      return;
    }

    const findedIndex = () => {
      return dataDetail.findIndex((obj) => obj.masterID === masterID);
    };

    return (
      <TableRow verticalAlign="middle">
        <TableCell width={3}>
          <Label color={color}>{text}</Label>
        </TableCell>
        <TableCell colSpan="2">
          <List celled horizontal>
            {/* 欄位項目 */}

            {temp.map((obj, index) => {
              return (
                <ListItem
                  onClick={() => handleEditDetail(obj, findedIndex())}
                  key={uuidv4()}
                >
                  {obj[column]}
                </ListItem>
              );
            })}
          </List>
        </TableCell>
      </TableRow>
    );
  };

  const table = (obj, index) => {
    return (
      <Table unstackable key={uuidv4()}>
        <TableHeader>
          <TableRow verticalAlign="middle">
            <TableHeaderCell colSpan="2">
              <Label
                onClick={() => handleEdit(obj, index)}
                color={getColor(obj.date)}
                size="large"
                basic
              >
                {obj.date} ({getWeekday(obj.date)}) {obj.section}
              </Label>
            </TableHeaderCell>
            <TableHeaderCell>
              <Button
                floated="right"
                icon
                onClick={() => handleAddDetail(obj.id)}
              >
                <Icon name="plus" />
              </Button>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {row("料理", obj.id, "dish", "pink")}
          {row("冰箱", obj.id, "fridge", "teal")}
          {row("待購", obj.id, "tobuy", "olive")}
          {/*
           {row("B")}
          {row("C")} */}
        </TableBody>
      </Table>
    );
  };
  return (
    <>
      {/* 新增鈕 */}
      <Button primary icon onClick={handleAdd}>
        <Icon name="plus" />
      </Button>
      {data.map((obj, index) => {
        return table(obj, index);
      })}
    </>
  );
}
