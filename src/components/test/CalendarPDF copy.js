import React, { useState, useEffect } from 'react';

const CalendarPDF = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [status, setStatus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // 動態載入 jsPDF 腳本以避免編譯錯誤
  const loadJsPDF = () => {
    return new Promise((resolve, reject) => {
      if (window.jspdf) {
        resolve(window.jspdf);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => resolve(window.jspdf);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // 將文字轉換為圖片（解決 PDF 中文字體問題）
  const textToImage = (text, fontSize, isBold = false, color = [30, 41, 59]) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 4;
    const font = `${isBold ? 'bold' : ''} ${fontSize * scale}px "Noto Sans TC", sans-serif`;
    ctx.font = font;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize * scale * 1.5;

    canvas.width = textWidth;
    canvas.height = textHeight;

    ctx.font = font;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.fillText(text, 0, textHeight / 2);

    return {
      data: canvas.toDataURL('image/png'),
      width: textWidth / scale,
      height: textHeight / scale
    };
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setStatus('正在準備檔案...');

    try {
      // 確保載入 jsPDF
      const jspdfLib = await loadJsPDF();
      const { jsPDF } = jspdfLib;

      await document.fonts.ready;

      const doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 10;
      const gridTop = 34;
      const headerHeight = 16;
      const colWidth = (pageWidth - margin * 2) / 7;
      const rowHeight = 26;
      const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];

      // 1. 繪製標題
      const titleFontSize = 16;
      const yearImg = textToImage(`${selectedYear}年`, titleFontSize, true);
      const monthImg = textToImage(`${selectedMonth + 1}月`, titleFontSize, true);
      const gap = 4;
      const totalWidth = yearImg.width + gap + monthImg.width;
      const startX = (pageWidth / 2) - (totalWidth / 2);
      const titleY = 8;

      doc.addImage(yearImg.data, 'PNG', startX, titleY, yearImg.width, yearImg.height);
      doc.addImage(monthImg.data, 'PNG', startX + yearImg.width + gap, titleY, monthImg.width, monthImg.height);

      // 2. 繪製星期表頭
      daysOfWeek.forEach((day, i) => {
        const x = margin + i * colWidth;
        doc.setDrawColor(200);
        doc.setFillColor(248, 250, 252);
        doc.rect(x, gridTop, colWidth, headerHeight, 'FD');

        const headerColor = [30, 41, 59]; 
        const dayImg = textToImage(day, 9, true, headerColor);
        const posX = x + (colWidth / 2) - (dayImg.width / 2);
        const posY = gridTop + (headerHeight / 2) - (dayImg.height / 2);
        doc.addImage(dayImg.data, 'PNG', posX, posY, dayImg.width, dayImg.height);
      });

      // 3. 繪製日期網格
      const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let dateCounter = 1;

      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
          const x = margin + col * colWidth;
          const y = gridTop + headerHeight + (row * rowHeight);

          if (y + rowHeight > pageHeight - 5) continue;

          doc.setDrawColor(226, 232, 240);
          doc.rect(x, y, colWidth, rowHeight);

          const cellIndex = row * 7 + col;
          if (cellIndex >= firstDay && dateCounter <= daysInMonth) {
            let color = [71, 85, 105]; 
            if (col === 0) color = [239, 68, 68]; // 週日紅
            else if (col === 6) color = [16, 185, 129]; // 週六綠

            const dateImg = textToImage(dateCounter.toString(), 18, false, color);
            const posX = x + (colWidth / 2) - (dateImg.width / 2);
            const posY = y + (rowHeight / 2) - (dateImg.height / 2);

            doc.addImage(dateImg.data, 'PNG', posX, posY, dateImg.width, dateImg.height);
            dateCounter++;
          }
        }
        if (dateCounter > daysInMonth) break;
      }

      doc.save(`橫式閱歷_${selectedYear}_${selectedMonth + 1}.pdf`);
      setStatus(`🎉 已成功下載橫式閱歷！`);
    } catch (error) {
      console.error(error);
      setStatus('載入 PDF 庫或產生檔案時發生錯誤。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">橫式月份閱歷產生器</h1>
        <p className="text-slate-500 mb-6 text-sm">請選擇年份與月份，產出 A4 橫式 PDF 閱歷。</p>

        <div className="flex gap-3 justify-center mb-6">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="p-2 border border-slate-300 rounded-lg text-slate-800 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {Array.from({ length: 16 }, (_, i) => currentYear - 5 + i).map(year => (
              <option key={year} value={year}>{year} 年</option>
            ))}
          </select>

          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="p-2 border border-slate-300 rounded-lg text-slate-800 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {Array.from({ length: 12 }, (_, i) => i).map(month => (
              <option key={month} value={month}>{month + 1} 月</option>
            ))}
          </select>
        </div>

        <button 
          onClick={generatePDF}
          disabled={isGenerating}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-95'
          }`}
        >
          {isGenerating ? '產生中...' : '產生橫式 PDF'}
        </button>

        <div className="mt-5 text-sm font-medium text-indigo-600 h-5">
          {status}
        </div>
      </div>
    </div>
  );
};

export default CalendarPDF;