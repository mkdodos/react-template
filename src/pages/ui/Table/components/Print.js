import { Button } from "semantic-ui-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import font from "../../../../components/font/msjhbd-normal";
import { getWeekday } from "../../../../utils/date";

export default function Print({ data, columns }) {
  const print = () => {
    var doc = new jsPDF("p", "mm"); // l 橫印 p 直印
    doc.setFontSize(20);
    // 中文字型
    doc.addFileToVFS("name-for-addFont-use", font);
    doc.addFont("name-for-addFont-use", "name-for-setFont-use", "normal");
    doc.setFont("name-for-setFont-use");

    columns = [
      {
        dataKey: "name",
        title: "姓名",
      },
      {
        dataKey: "score",
        title: "分數",
      },
    ];

    autoTable(doc, {
      theme: "grid", // 格線
      // theme: "plain", // 格線
      columns: columns, //欄位
      body: [...data], //資料

      // {欄位名稱:{halign(水平對齊): 'left center right'}}
      columnStyles: {
        name: {
          halign: "left",
          cellWidth: 40,
          lineWidth: {
            bottom: 0.4,
          },
          lineColor: "gray",
        },
        score: {
          halign: "left",
          lineWidth: {
            bottom: 0.4,
          },
          lineColor: "gray",
        },
      }, //

      margin: { top: 30 },
      styles: {
        font: "name-for-setFont-use",
        fontSize: 12,
      },

      // 標題列樣式
      headStyles: {
        fillColor: "#FFF",
        textColor: "#000",
        // fontSize: 12,
        lineColor: "black",
        lineWidth: {
          top: 0.6,
          bottom: 0.6,
        },
      },

      // 標題設定在此函數內,會每一頁都出現
      didDrawPage: function () {
        //
        // doc.text('標題文字',left,top);
        doc.text("分數表", 15, 20);
      },
    });

    doc.save("tobuy.pdf");
  };
  return (
    <Button primary basic onClick={print}>
      列印
    </Button>
  );
}
