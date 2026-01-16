import { useRef } from "react";
import { useExportPDF } from "./useExportPDF";

import ExportButton from "./ExportButton"; // 引入剛才寫好的按鈕

export default function Grid({ data,calendarRef }) {
  // const calendarRef = useRef(null);
  // const { exportPDF } = useExportPDF(); // 引入工具

  return (
    <div>
      {/* <button onClick={() => exportPDF(calendarRef.current, "我的月曆.pdf")}>
        下載 PDF
      </button> */}
      {/* <ExportButton
        targetRef={calendarRef}
        fileName="2026-一月月曆.pdf"
        label="點我匯出月曆"
      /> */}
      <div ref={calendarRef} className="grid-table">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="test-grid-weekday">
            {d}
          </div>
        ))}
        {data.map((obj, index) => {
          return (
            <div key={index} className="test-grid-cell">
              {obj}
            </div>
          );
        })}
      </div>
    </div>
  );
}
