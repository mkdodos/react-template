import React, { useState, useEffect } from "react";

const CalendarPDF = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [status, setStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // 定義固定日期的公曆國定假日 (月:日)
  const fixedHolidays = {
    "0:1": "元旦",
    "1:28": "二二八",
    "3:4": "兒童節",
    "3:5": "清明節",
    "4:1": "勞動節",
    "9:10": "國慶日",
    "11:25": "行憲紀念日",
  };

  // 手動維護 2024-2026 農曆重要假期
  const lunarHolidays = {
    // 2024
    "2024:1:8": "除夕",
    "2024:1:9": "春節",
    "2024:1:10": "初二",
    "2024:1:11": "初三",
    "2024:5:10": "端午節",
    "2024:8:17": "中秋節",
    // 2025
    "2025:0:28": "除夕",
    "2025:0:29": "春節",
    "2025:0:30": "初二",
    "2025:0:31": "初三",
    "2025:4:31": "端午節",
    "2025:9:6": "中秋節",
    // 2026
    "2026:1:16": "除夕",
    "2026:1:17": "春節",
    "2026:1:18": "初二",
    "2026:1:19": "初三",
    "2026:5:19": "端午節",
    "2026:8:25": "中秋節",
  };

  const getHolidayName = (year, month, day) => {
    const dateKey = `${month}:${day}`;
    const fullDateKey = `${year}:${month}:${day}`;
    let name = fixedHolidays[dateKey] || lunarHolidays[fullDateKey] || null;
    if (name && name.length > 5) return name.substring(0, 5);
    return name;
  };

  const loadJsPDF = () => {
    return new Promise((resolve, reject) => {
      if (window.jspdf) {
        resolve(window.jspdf);
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = () => resolve(window.jspdf);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const textToImage = (
    text,
    fontSize,
    isBold = false,
    color = [30, 41, 59],
    maxWidth = 0,
  ) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const scale = 4;

    let currentFontSize = fontSize;
    const getFont = (size) =>
      `${isBold ? "bold" : ""} ${size * scale}px "Noto Sans TC", sans-serif`;

    ctx.font = getFont(currentFontSize);
    let metrics = ctx.measureText(text);

    if (maxWidth > 0) {
      const maxPxWidth = maxWidth * scale;
      while (metrics.width > maxPxWidth && currentFontSize > 4) {
        currentFontSize -= 0.5;
        ctx.font = getFont(currentFontSize);
        metrics = ctx.measureText(text);
      }
    }

    const textWidth = metrics.width;
    const textHeight = currentFontSize * scale * 1.5;

    canvas.width = textWidth;
    canvas.height = textHeight;

    ctx.font = getFont(currentFontSize);
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.fillText(text, 0, textHeight / 2);

    return {
      data: canvas.toDataURL("image/png"),
      width: textWidth / scale,
      height: textHeight / scale,
    };
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setStatus("正在調整數字與排版...");

    try {
      const jspdfLib = await loadJsPDF();
      const { jsPDF } = jspdfLib;

      await document.fonts.ready;

      const doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 10;
      //   const gridTop = 34;
      const gridTop = 40;
      const headerHeight = 16;
      const colWidth = (pageWidth - margin * 2) / 7;
      const rowHeight = 26;
      const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];

      // 標題
      const titleFontSize = 16;
      const yearImg = textToImage(`${selectedYear}年`, titleFontSize, true);
    //   const yearImg = "";
      const monthImg = textToImage(
        `${selectedMonth + 1}月`,
        titleFontSize,
        true,
      );
      const gap = 4;
      const totalWidth = yearImg.width + gap + monthImg.width;
    // 計算置中位置：(頁面寬度 / 2) - (圖片寬度 / 2)
      const startX = (pageWidth / 2) - (monthImg.width / 2);
      //   const startX = pageWidth / 2 - totalWidth / 2;
    //   doc.addImage(
    //     yearImg.data,
    //     "PNG",
    //     startX,
    //     8,
    //     yearImg.width,
    //     yearImg.height,
    //   );
      doc.addImage(
        monthImg.data,
        "PNG",
        // startX + yearImg.width + gap,
          startX  + gap,
        8,
        monthImg.width,
        monthImg.height,
      );

      // 星期表頭
      daysOfWeek.forEach((day, i) => {
        const x = margin + i * colWidth;
        doc.setDrawColor(200);
        doc.setFillColor(248, 250, 252);
        doc.rect(x, gridTop, colWidth, headerHeight, "FD");
        const dayImg = textToImage(day, 9, true, [30, 41, 59]);
        doc.addImage(
          dayImg.data,
          "PNG",
          x + (colWidth / 2 - dayImg.width / 2),
          gridTop + (headerHeight / 2 - dayImg.height / 2),
          dayImg.width,
          dayImg.height,
        );
      });

      // 日期網格
      const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0,
      ).getDate();
      let dateCounter = 1;

      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
          const x = margin + col * colWidth;
          const y = gridTop + headerHeight + row * rowHeight;
          if (y + rowHeight > pageHeight - 5) continue;

          doc.setDrawColor(226, 232, 240);
          doc.rect(x, y, colWidth, rowHeight);

          const cellIndex = row * 7 + col;
          if (cellIndex >= firstDay && dateCounter <= daysInMonth) {
            const holidayName = getHolidayName(
              selectedYear,
              selectedMonth,
              dateCounter,
            );

            let color = [71, 85, 105];
            let dateFontSize = 14; // 預設字體大小
            // let dateFontSize = 18; // 預設字體大小

            if (holidayName || col === 0) {
              color = [239, 68, 68];
              dateFontSize = 14; // 假日數字縮小，騰出空間給名稱
            } else if (col === 6) {
              color = [16, 185, 129];
            }

            // 繪製日期數字
            const dateImg = textToImage(
              dateCounter.toString(),
              dateFontSize,
              false,
              color,
            );
            const dateYOffset = holidayName ? -4 : 0;
            doc.addImage(
              dateImg.data,
              "PNG",
              x + (colWidth / 2 - dateImg.width / 2),
              y + (rowHeight / 2 - dateImg.height / 2) + dateYOffset,
              dateImg.width,
              dateImg.height,
            );

            // 繪製假日名稱
            if (holidayName) {
              const maxNameWidth = colWidth * 0.9;
              const nameImg = textToImage(
                holidayName,
                7,
                false,
                [239, 68, 68],
                maxNameWidth,
              );
              doc.addImage(
                nameImg.data,
                "PNG",
                x + (colWidth / 2 - nameImg.width / 2),
                // y + (rowHeight / 2 + 6.5),
                 y + (rowHeight / 2 + 3.5),
                nameImg.width,
                nameImg.height,
              );
            }

            dateCounter++;
          }
        }
        if (dateCounter > daysInMonth) break;
      }

      doc.save(`橫式閱歷_${selectedYear}_${selectedMonth + 1}.pdf`);
      setStatus(`🎉 下載完成！假日數字已縮小以優化排版。`);
    } catch (error) {
      console.error(error);
      setStatus("產生檔案時發生錯誤。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          橫式月份閱歷產生器
        </h1>
        <p className="text-slate-500 mb-6 text-sm">
          縮小假日數字大小，讓版面更美觀。
        </p>

        <div className="flex gap-3 justify-center mb-6">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => (
              <option key={y} value={y}>
                {y} 年
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {Array.from({ length: 12 }, (_, i) => i).map((m) => (
              <option key={m} value={m}>
                {m + 1} 月
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${isGenerating ? "bg-slate-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
        >
          {isGenerating ? "正在最佳化排版..." : "產生橫式 PDF"}
        </button>
        <div className="mt-5 text-sm font-medium text-indigo-600 h-5">
          {status}
        </div>
      </div>
    </div>
  );
};

export default CalendarPDF;
