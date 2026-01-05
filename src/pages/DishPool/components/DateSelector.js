import { useState } from "react";
import { Button, Label } from "semantic-ui-react";

export default function DateSelector({ row, setRow }) {
  const selectLable = (text) => {
    setRow({ ...row, date: text });
  };

  // 加天數的函數
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  // 當天日期
  var date = new Date();

  // 日期只取年月日 (例 : 2026-01-05)
  const convertDate = (plusDay) => {
    return date.addDays(plusDay).toISOString().substring(0, 10);
  };

  // 每個選取項給最近幾天日期,方便使用者選取
  // 選取到的項目,改變 basic 樣式

  return (
    <>
      <Label
        onClick={() => selectLable(convertDate(0))}
        size="large"
        color="teal"
        basic={row.date !== convertDate(0)}
      >
        今日 ({convertDate(0).substring(5, 10)})
      </Label>
      <Label
        onClick={() => selectLable(convertDate(1))}
        size="large"
        color="teal"
        basic={row.date !== convertDate(1)}
      >
        明日 ({convertDate(1).substring(5, 10)})
      </Label>
      <Label
        onClick={() => selectLable(convertDate(2))}
        size="large"
        color="teal"
        basic={row.date !== convertDate(2)}
      >
        後天 ({convertDate(2).substring(5, 10)})
      </Label>
     
    </>
  );
}
