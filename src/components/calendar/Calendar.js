import React, { useState } from "react";
import "./Calendar.css"; // 引入外部 CSS

export default function Calendar() {
  // Wed Jan 14 2026 09:29:33 GMT+0800 (台北標準時間)
  const [currentDate, setCurrentDate] = useState(new Date());
  // 2026
  const year = currentDate.getFullYear();
  // 月份 0-11
  const month = currentDate.getMonth();

  const today = new Date();
  // getDay 星期幾 0-6
  // 當月第一天是星期幾
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // 當月最後一天的日期(當月有幾天)
  // new Date(年, 本月, 0) : 本月最後一天
  // new Date(年, 本月, 1) : 本月第一天
  // new Date(年, 本月+1, 0) : 本月最後一天
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  // 第一天之前都補空白
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  // 跑日期(從1到最後一天)
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  console.log(days);
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();
  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {days.map((day, index) => {
          const classes = [
            "day-cell",
            day ? "" : "empty",
            isToday(day) ? "today" : "",
          ].join(" ");
          return (
            <div key={index} className={classes}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
