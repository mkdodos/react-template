import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const useExportPDF = () => {
  const exportPDF = async (element, fileName = "download.pdf") => {
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    // const imgData = canvas.toDataURL("image/png");
    const imgData = canvas.toDataURL("image/jpeg", 0.5);
    // 橫式 A4
    // const pdf = new jsPDF("l", "mm", "a4");
    const pdf = new jsPDF({
      orientation: "l",
      unit: "mm",
      format: "a4",
      compress: true, // 啟用內部壓縮
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 自動處理分頁或縮放
    const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;
    const finalWidth =
      imgHeight > pdfHeight
        ? (imgProps.width * pdfHeight) / imgProps.height
        : pdfWidth;
    const xOffset = (pdfWidth - finalWidth) / 2;

    // pdf.addImage(imgData, "PNG", xOffset, 0, finalWidth, finalHeight);
    pdf.addImage(imgData, "JPEG", xOffset, 0, finalWidth, finalHeight);
    pdf.save(fileName);
  };

  return { exportPDF };
};
