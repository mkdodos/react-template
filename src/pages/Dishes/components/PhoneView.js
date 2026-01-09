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

export default function PhoneView({ data, handleAdd, handleEdit }) {
  console.log(data);
  const groupedData = Object.groupBy(data, (obj) => obj.date);
  // 所有日期
  const keys = Object.keys(groupedData);

  const itemIndex = (id) => {
    const elem = (element) => element.id == id;
    return data.findIndex(elem);
  };

  const getColor = (date) => {
    const weekday = getWeekday(date);
    if (weekday == "六") return "teal";
    if (weekday == "日") return "pink";
  };
  const listItem = (date) => {
    return (
      <ListItem key={uuidv4()}>
        <List divided horizontal size="large">
          {/* 日期 */}
          <ListItem>
            <Label basic color={getColor(date)} size="large">
              {date} ({getWeekday(date)})
            </Label>
          </ListItem>
        </List>
      </ListItem>
    );
  };

  const listItem2 = (date, column, text, color) => {
    const temp = groupedData[date].map((item) => item[column]).join("");

    //  有資料才顯示
    if (temp === "") {
      return;
    }

    return (
      <TableRow>
        <TableCell>
          <Label color={color}>{text}</Label>
        </TableCell>
        <TableCell>
          <ListItem key={uuidv4()}>
            <List divided horizontal>
              {/* 該日資料 */}
              {groupedData[date].map((dayData) => {
                return (
                  <ListItem
                    onClick={() => handleEdit(dayData, itemIndex(dayData.id))}
                    key={uuidv4()}
                  >
                    {dayData[column]}
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
        {keys.map((obj) => {
          return (
            <Fragment key={uuidv4()}>
              {/* 日期 */}
              <TableRow>
                <TableCell colSpan="2">{listItem(obj)}</TableCell>
              </TableRow>

              {/* 有資料才顯示 */}
              {listItem2(obj, "dish", "佳餚", "pink")}
              {listItem2(obj, "fridge", "冰箱", "teal")}
              {listItem2(obj, "tobuy", "待購", "olive")}
              {/* <TableRow>
                <TableCell>
                  <Label color="pink">佳餚</Label>
                </TableCell>
                <TableCell>{listItem2(obj, "dish")}</TableCell>
              </TableRow> */}

              {/* <TableRow>
                <TableCell width={3}>
                  <Label color="teal">冰箱</Label>
                </TableCell>
                <TableCell>{listItem2(obj, "fridge")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label color="olive">待購</Label>
                </TableCell>
                <TableCell>{listItem2(obj, "tobuy")}</TableCell>
              </TableRow> */}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
  //   return <div>{JSON.stringify(data)}</div>;
}
