import React, { useState, useRef } from "react";
import Grid from "./Grid";
import SwitchBtn from "./SwitchBtn";
import ExportExample from "./Pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import "./grid.css";

export default function Test() {
  const [currentDate, setCurrentDate] = useState(new Date());

  //   1. 日期邏輯函數：計算月曆格子
  const year = currentDate.getFullYear();
  // 月份 0-11
  const month = currentDate.getMonth();
  // 月份天數
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // 找出當月第一天是「星期幾」。
  const weekday = new Date(year, month, 1).getDay();
  // 產生陣列
  let days = [];
  // 補null
  for (let i = 1; i <= weekday; i++) days.push(null);
  // 數字
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // 列印

  const calendarRef = useRef(null);

  return (
    <div>
      {/* <ExportExample /> */}
      {/* <Column /> */}
      <SwitchBtn
        targetRef={calendarRef}
        setCurrentDate={setCurrentDate}
        year={year}
        month={month}
      />
      <hr></hr>

      <Grid ref={calendarRef} data={days} year={year} month={month + 1} />
    </div>
  );
}
