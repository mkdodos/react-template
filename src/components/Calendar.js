import React, { useState } from 'react';
import './Calendar.css'; // 引入外部 CSS

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isToday = (day) => 
    day === today.getDate() && 
    month === today.getMonth() && 
    year === today.getFullYear();

  const isSelected = (day) =>
    selectedDate &&
    day === selectedDate.day &&
    month === selectedDate.month &&
    year === selectedDate.year;

  const handleDateClick = (day) => {
    if (!day) return;
    setSelectedDate({ year, month, day });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>&lt;</button>
        <strong>{year}年 {month + 1}月</strong>
        <button className="nav-btn" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {['日', '一', '二', '三', '四', '五', '六'].map(d => (
          <div key={d} className="weekday-header">{d}</div>
        ))}
        
        {days.map((day, index) => {
          const classes = [
            'day-cell',
            day ? '' : 'empty',
            isToday(day) ? 'today' : '',
            isSelected(day) ? 'selected' : ''
          ].join(' ');

          return (
            <div 
              key={index} 
              className={classes}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;