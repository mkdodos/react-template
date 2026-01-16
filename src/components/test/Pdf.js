import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ExportExample = () => {
  // 1. 使用 useRef 標記想要導出的 DOM 元素
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current; // 取得該 HTML 元素
    
    // 2. 使用 html2canvas 將 HTML 轉換為 Canvas 畫布
    const canvas = await html2canvas(element, {
      scale: 2, // 提高解析度（數字越大越清晰，但檔案越大）
    });

    // 3. 將畫布轉換為圖片編碼 (Base64)
    const data = canvas.toDataURL('image/png');

    // 4. 初始化 jsPDF ('l' = 橫式, 'p' = 直式)
    const pdf = new jsPDF('l', 'mm', 'a4');
    
    // 5. 計算圖片在 PDF 中的寬度與高度 (讓寬度填滿 A4)
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    // 6. 將圖片放入 PDF 並下載
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('example-document.pdf');
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleDownloadPdf} style={{ marginBottom: '20px', padding: '10px' }}>
        點我導出下方內容為 PDF
      </button>

      {/* 這裡是你想要導出的內容範圍 */}
      <div 
        ref={printRef} 
        style={{ 
          padding: '40px', 
          backgroundColor: '#f9f9f9', 
          border: '2px solid #333',
          width: '600px' 
        }}
      >
        <h1 style={{ color: 'blue' }}>這是 PDF 標題</h1>
        <p>這是一段測試文字，導出時會保留這個藍色標題與灰色背景。</p>
        <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}>紅色方塊</div>
      </div>
    </div>
  );
};

export default ExportExample;