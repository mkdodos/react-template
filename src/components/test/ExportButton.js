import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button,Icon } from "semantic-ui-react";

const ExportButton = ({
  targetRef,
  fileName = "download.pdf",
  label = "下載 PDF",
}) => {
  const handleExport = async () => {
    // console.log("props內容:", props); // 看看 targetRef 有沒有在裡面
    console.log("targetRef內容:", targetRef);

    const element = targetRef.current;
    if (!element) {
      console.error("找不到目標元素");
      return;
    }

    try {
      // 1. 執行截圖
      const canvas = await html2canvas(element, {
        scale: 3, // 高解析度
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. 建立 PDF (預設橫式 A4)
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // 3. 計算比例
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // 4. 判斷是否超出高度並加入圖片
      if (imgHeight > pdfHeight) {
        const scaledWidth = (imgProps.width * pdfHeight) / imgProps.height;
        pdf.addImage(
          imgData,
          "PNG",
          (pdfWidth - scaledWidth) / 2,
          0,
          scaledWidth,
          pdfHeight
        );
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }

      // 5. 儲存
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF 導出失敗", error);
    }
  };

  return (
    <Button basic icon onClick={handleExport}>
      <Icon name="print" />
    </Button>
    // <button
    //   onClick={handleExport}
    //   className="universal-export-btn"
    //   style={{
    //     padding: "8px 16px",
    //     backgroundColor: "#4CAF50",
    //     color: "white",
    //     border: "none",
    //     borderRadius: "4px",
    //     cursor: "pointer",
    //   }}
    // >
    //   {label}
    // </button>
  );
};

export default ExportButton;
