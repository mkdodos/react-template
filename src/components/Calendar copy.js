import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 取得當前年份與月份
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 計算當月第一天是星期幾 (0 = 星期日, 6 = 星期六)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // 計算當月共有幾天 (getDate() 傳回 1 到 31 的數字.)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 產生日期陣列
  const days = [];
  // 補足第一天之前的空白
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // 填入實際日期
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const thisMonth = () => {
    setCurrentDate(new Date());
    // console.log(currentDate);
  };
  //   const thisMonth = () => setCurrentDate(new Date(year, month, 1));

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div
      style={{
        width: "350px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {/* 標題與切換按鈕 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button circular icon onClick={prevMonth}>
          <Icon name="chevron left" />
        </Button>

        <Button onClick={thisMonth}>當月</Button>

        {/* <button onClick={prevMonth}>&lt;</button> */}
        <strong style={{ fontSize: "1.2rem" }}>
          {year}年 {month + 1}月
        </strong>
        <Button circular icon onClick={nextMonth}>
          <Icon name="chevron right" />
        </Button>
        {/* <button onClick={nextMonth}>&gt;</button> */}
      </div>

      {/* 星期表頭 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {weekDays.map((d) => (
          <div key={d} style={{ padding: "5px" }}>
            {d}
          </div>
        ))}
      </div>

      {/* 日期網格 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
        }}
      >
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => day && alert(`你點擊了 ${year}/${month + 1}/${day}`)}
            style={{
              padding: "10px",
              //   cursor: day ? "pointer" : "default",
              cursor: day ? "pointer" : "wait",
              backgroundColor: isToday(day) ? "#ffeb3b" : "white", // 今天顯示黃色
              fontWeight: isToday(day) ? "bold" : "normal",
              border: "1px solid #f0f0f0",
            }}
            // style={{
            //   padding: "10px",
            //   border: "1px solid #f0f0f0",
            //   backgroundColor: day ? "white" : "transparent",
            // }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
