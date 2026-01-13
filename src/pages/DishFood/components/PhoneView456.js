import { Fragment } from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Label,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { getWeekday } from "../../../utils/date";
import index from "..";

export default function PhoneView456({
  data,
  dataDetail,
  handleAdd,
  handleAddDetail,
  handleEdit,
  handleEditDetail,
}) {
  // console.log(data);
  const groupedData = Object.groupBy(data, (obj) => obj.date);

  const getColor = (date) => {
    const weekday = getWeekday(date);
    if (weekday == "六") return "teal";
    if (weekday == "日") return "pink";
  };

  const detail = (masterID, column, text, color) => {
    const temp = dataDetail.filter(
      (objDetail) => objDetail.masterID === masterID
    );
    // console.log(temp);
    const tempJoin = temp.map((item) => item[column]).join("");

    //  有資料才顯示
    if (tempJoin === "") {
      return;
    }
    return (
      <TableRow>
        <TableCell>
          <Label color={color}>{text}</Label>
        </TableCell>
        <TableCell >
          
          <ListItem key={uuidv4()}>
            <List divided horizontal>
              {/* 該日資料 */}
              {temp.map((obj, index) => {
                return (
                  <ListItem
                    onClick={() => handleEditDetail(obj, index)}
                    key={uuidv4()}
                  >
                    {obj[column]}
                  </ListItem>
                );
              })}
            </List>
          </ListItem>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table  unstackable celled>
      <TableHeader>
        <TableRow>
          <TableHeaderCell colSpan="3">
            {/* 新增鈕 */}
            <Button icon onClick={handleAdd}>
              <Icon name="plus" />
            </Button>
          </TableHeaderCell>
         
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((obj,index) => {
          return (
            <Fragment key={uuidv4()}>
              {/* 日期 */}
              <TableRow>
                <TableCell>
                  <Label basic color={getColor(obj.date)} size="large">
                    {obj.date} ({getWeekday(obj.date)}) {obj.section}
                  </Label>
                </TableCell>
                <TableCell>
                  <Button icon onClick={() => handleAddDetail(obj.id)}>
                    <Icon name="plus" />
                  </Button>
                  <Button icon onClick={() => handleEdit(obj,index)}>
                    <Icon name="pencil" />
                  </Button>
                </TableCell>
              </TableRow>
              {detail(obj.id, "dish", "佳餚", "pink")}
              {detail(obj.id, "fridge", "冰箱", "teal")}
              {detail(obj.id, "tobuy", "待購", "olive")}
              {/* 有資料才顯示 */}
              {/* {listItem2(obj, "dish", "佳餚", "pink")} */}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
  //   return <div>{JSON.stringify(data)}</div>;
}
