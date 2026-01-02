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

export default function PhoneView({ data, handleAdd, handleEdit }) {
  const groupedData = Object.groupBy(data, (obj) => obj.date);
  // 所有日期
  const keys = Object.keys(groupedData);

  const itemIndex = (id) => {
    const elem = (element) => element.id == id;
    return data.findIndex(elem);
  };

  const getWeekday = (date) => {
    const birthday = new Date(date);
    const day1 = birthday.getDay();

    switch (day1) {
      case 0:
        return "日";
      case 1:
        return "一";
      case 2:
        return "二";
      case 3:
        return "三";
      case 4:
        return "四";
      case 5:
        return "五";
      case 6:
        return "六";
    }
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

  const listItem2 = (date, column) => {
    return (
      <ListItem key={uuidv4()}>
        <List
          divided
          horizontal
          //  size="large"
        >
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
    );
  };

  return (
    <Table basic="very" unstackable padded>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>
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
              <TableRow>
                <TableCell colSpan="2">{listItem(obj)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Label color="pink">佳餚</Label>
                </TableCell>
                <TableCell>{listItem2(obj, "dish")}</TableCell>
              </TableRow>

              <TableRow>
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
              </TableRow>
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
  //   return <div>{JSON.stringify(data)}</div>;
}
