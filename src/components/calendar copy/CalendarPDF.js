import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Calendar.css";
import { Button, Icon } from "semantic-ui-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null); // 用來抓取要輸出的 DOM

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 導出 PDF 的邏輯
  const exportPDF = async () => {
    const element = calendarRef.current;
    if (!element) return;

    element.style.borderRadius = "0px"; // 導出前改為直角
    element.style.border = "none"; // 導出前改為直角

    // 將 HTML 轉為 Canvas
    const canvas = await html2canvas(element, {
      scale: 3, // 提高解析度
      useCORS: true,
      backgroundColor: "#ffffff", // 確保背景不是透明
      //   logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    // 建立 jsPDF 實例 (方向 p: portrait, 單位 mm, 格式 a4)
    // const pdf = new jsPDF("p", "mm", "a4");
    // 2. 初始化 PDF：'l' 代表 landscape (橫式)，單位 'mm'，尺寸 'a4'
    // A4 橫式尺寸為 297mm x 210mm
    const pdf = new jsPDF("l", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = pdf.internal.pageSize.getHeight();

    // 計算 PDF 寬度下的圖片高度，保持比例
    // const imgProps = pdf.getImageProperties(imgData);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 3. 計算圖片比例以達到滿版
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth; // 寬度強制等於 A4 的長邊 (297mm)
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 將圖片加入 PDF (x, y, width, height)
    // pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    // pdf.save(`calendar-${year}-${month + 1}.pdf`);

    // 4. 加入圖片並儲存
    // 如果圖片高度超過 A4 高度，會被裁切；若要完全貼合可以調整 y 座標
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`calendar-landscape-${year}-${month + 1}.pdf`);
    element.style.borderRadius = "12px"; // 導出後恢復圓角
    element.style.border = "1px solid #e0e0e0"; // 導出後恢復圓角
  };

  // ... (保留之前的日期計算邏輯 days 陣列)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const thisMonth = () => setCurrentDate(new Date());

  return (
    <div>
      {/* 操作按鈕 */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={exportPDF}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          輸出成 PDF
        </button>
      </div>

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

        <Button circular icon onClick={nextMonth}>
          <Icon name="chevron right" />
        </Button>
      </div>

      {/* 加上 ref 以便選取 */}
      <div ref={calendarRef} className="calendar-container">
        <div className="calendar-header">
          <div className="header-left">
            <span className="year-label">{year}</span>
          </div>

          <strong className="month-label">{month + 1}月</strong>

          <div className="header-right"></div>
        </div>

        <div className="calendar-grid">
          {["日", "一", "二", "三", "四", "五", "六"].map((d) => {
            let className = "weekday-header";
            // if (d === "日") className += " sunday";
            return (
              <div key={d} className={className}>
                {d}
              </div>
            );
          })}
          {days.map((day, index) => {
            // 判斷是否為星期日 (index 0, 7, 14...)
            const isSunday = index % 7 === 0;
            const isSaturday = index % 7 === 6;
            const classes = [
              "day-cell",
              day ? "" : "empty",
              isSunday ? "sunday" : "", // 加入紅色類別
              isSaturday ? "saturday" : "", // 加入紅色類別
            ].join(" ");
            return (
              <div
                key={day ? `${year}-${month}-${day}` : `empty-${index}`}
                className={classes}
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
