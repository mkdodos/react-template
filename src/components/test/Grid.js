import { useRef, forwardRef } from "react";
import { useExportPDF } from "./useExportPDF";

import ExportButton from "./ExportButton"; // 引入剛才寫好的按鈕

function Grid({ data, year, month }, ref) {
  // const calendarRef = useRef(null);
  // const { exportPDF } = useExportPDF(); // 引入工具

  return (
    <div ref={ref} className="test-grid-container">
      <div className="test-grid-header">
        <div>
          {year}年 {month}月
        </div>
      </div>
      <div className="grid-table">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="test-grid-weekday">
            {d}
          </div>
        ))}
        {data.map((day, index) => {
          const isSunday = index % 7 === 0;
          const isSaturday = index % 7 === 6;
          return (
            <div
              key={index}
              className={`test-grid-cell ${day ? "" : "empty"} ${
                isSunday ? "test-grid-cell-sunday" : ""
              }
            ${isSaturday ? "test-grid-cell-saturday" : ""}`}
              // className="test-grid-cell"
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default forwardRef(Grid);
