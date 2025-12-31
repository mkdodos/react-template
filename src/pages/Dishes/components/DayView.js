import {
  Segment,
  SegmentGroup,
  Button,
  Label,
  Divider,
  Icon,
  List,
  ListItem,
} from "semantic-ui-react";

import { v4 as uuidv4 } from "uuid";

export default function DayView({ data, handleAdd, handleEdit }) {
  const groupedData = Object.groupBy(data, (obj) => obj.date);
  // 所有日期
  const keys = Object.keys(groupedData);

  // 預期輸出：2

  const getWeekday = (date) => {
    const birthday = new Date(date);
    const day1 = birthday.getDay();
    console.log(day1);

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

  //   getWeekday("2025-12-31");

  const listItem = (date) => {
    return (
      <ListItem key={uuidv4()}>
        <List divided horizontal size="large">
          {/* 日期 */}
          <ListItem>
            <Label color={getColor(date)} size="large">
              {date} ({getWeekday(date)})
            </Label>
          </ListItem>

          {/* 該日資料 */}
          {groupedData[date].map((dayData) => {
            return (
              <ListItem
                // as="a"
                onClick={() => handleEdit(dayData, itemIndex(dayData.id))}
                key={uuidv4()}
              >
                {dayData.dish}
                {/* {dayData.id} */}
                {/* {itemIndex(dayData.id)} */}
              </ListItem>
            );
          })}
        </List>
      </ListItem>
    );
  };

  const itemIndex = (id) => {
    const isLargeNumber = (element) => element.id == id;

    // console.log(array1.findIndex(isLargeNumber));

    return data.findIndex(isLargeNumber);
  };

  return (
    <div>
      <Button icon onClick={handleAdd}>
        <Icon name="plus" />
      </Button>
      <Divider />
      <List>
        {keys.map((date) => {
          return listItem(date, groupedData[date]);
          // <div key={uuidv4()}>
          //   <SegmentGroup horizontal>
          //     <Label color={getColor(date)} size="large">
          //       {date} ({getWeekday(date)})
          //     </Label>
          //     {groupedData[date].map((dayData) => {
          //       return <Segment key={uuidv4()}>{dayData.dish}</Segment>;
          //     })}
          //   </SegmentGroup>
          // </div>
        })}
      </List>
    </div>
  );
}
