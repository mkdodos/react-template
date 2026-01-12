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

export default function PhoneView({ data, dataDetail, handleAdd, handleEdit }) {
  console.log(data);
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
    console.log(temp);
    return (
      <TableRow>
        <TableCell>
          <Label color={color}>{text}</Label>
        </TableCell>
        <TableCell>
          <ListItem key={uuidv4()}>
            <List divided horizontal>
              {/* 該日資料 */}
              {temp.map((obj) => {
                return <ListItem key={uuidv4()}>{obj[column]}</ListItem>;
              })}
            </List>
          </ListItem>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table basic="very" unstackable padded>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>
            {/* 新增鈕 */}
            <Button icon onClick={handleAdd}>
              <Icon name="plus" />
            </Button>
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((obj) => {
          return (
            <Fragment key={uuidv4()}>
              {/* 日期 */}
              <TableRow>
                <TableCell colSpan="2">
                  <Label basic color={getColor(obj.date)} size="large">
                    {obj.date} ({getWeekday(obj.date)})
                  </Label>
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
