import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 1. 計算日期邏輯
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // 2. 輸出 PDF 邏輯 (A4 橫式滿版)
  const exportPDF = async () => {
    const element = calendarRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3, // 高解析度
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4");
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 如果高度超出 A4 比例，則改以高度為基準縮放
    if (imgHeight > pdfHeight) {
      const scaledWidth = (imgProps.width * pdfHeight) / imgProps.height;
      pdf.addImage(imgData, "PNG", (pdfWidth - scaledWidth) / 2, 0, scaledWidth, pdfHeight);
    } else {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }

    pdf.save(`Calendar-${year}-${month + 1}.pdf`);
  };

  return (
    <div className="app-container">
      {/* 操作按鈕 (不包含在 PDF 內) */}
      <div className="controls">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>上個月</button>
        <button className="download-btn" onClick={exportPDF}>輸出 A4 橫式 PDF</button>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>下個月</button>
      </div>

      {/* 月曆主體 */}
      <div ref={calendarRef} className="calendar-container">
        <div className="calendar-header">
          <div className="header-left">
            <span className="year-label">{year}</span>
          </div>
          
          <strong className="month-label">{month + 1}月</strong>
          
          <div className="header-right">
            {/* 保持平衡用的空白區塊 */}
          </div>
        </div>

        <div className="calendar-grid">
          {["日", "一", "二", "三", "四", "五", "六"].map((d, idx) => (
            <div key={d} className={`weekday-header ${idx === 0 ? 'sunday' : idx === 6 ? 'saturday' : ''}`}>
              {d}
            </div>
          ))}
          
          {days.map((day, index) => {
            const isSunday = index % 7 === 0;
            const isSaturday = index % 7 === 6;
            return (
              <div
                key={day ? `${year}-${month}-${day}` : `empty-${index}`}
                className={`day-cell ${day ? "" : "empty"} ${isSunday ? "sunday" : ""} ${isSaturday ? "saturday" : ""}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;