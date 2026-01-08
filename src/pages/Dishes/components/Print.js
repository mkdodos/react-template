import { Button } from "semantic-ui-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import font from "../../../components/font/msjhbd-normal";

export default function Print({ data, columns }) {
  const print = () => {
    var doc = new jsPDF("p", "mm"); // l 橫印 p 直印
    doc.setFontSize(20);
    // 中文字型
    doc.addFileToVFS("name-for-addFont-use", font);
    doc.addFont("name-for-addFont-use", "name-for-setFont-use", "normal");
    doc.setFont("name-for-setFont-use");

    // 依日期群組資料
    const groupedData = Object.groupBy(data, (obj) => obj.date);
    // 所有日期
    const keys = Object.keys(groupedData);

    columns = [
      {
        dataKey: "date",
        title: "日期",
      },
      {
        dataKey: "items",
        title: "食材",
      },
    ];

    const newData = [];
    keys
      .sort((a, b) => (a > b ? 1 : -1))
      .map((date) => {
        // 篩選待購欄位有內容的資料
        const temp = groupedData[date].filter((obj) => obj.tobuy);
        // 陣列資料用 , 連接成為字串
        const items = temp.map((item) => item.tobuy).join(", ");
        newData.push({ date, items });
      });

    // console.log(keys)
    // return

    autoTable(doc, {
      // theme: "grid", // 格線
      theme: "plain", // 格線
      columns: columns, //欄位

      // body: [...data], //資料
      body: [...newData], //資料

      // {欄位名稱:{halign(水平對齊): 'left center right'}}
      columnStyles: {
        date: {
          halign: "left",
          cellWidth: 35,
          lineWidth: {
            // top: 0.6,
            bottom: 0.4,
          },
          lineColor: "gray",
        },
        items: {
          halign: "left",         
          lineWidth: {
            // top: 0.6,
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
        // 標題
        // doc.text('採購清單',left,top);
        doc.text("採購清單", 15, 20);
      },
    });

    doc.save("tobuy.pdf");
  };
  return (
    <Button primary basic onClick={print}>
      採購清單
    </Button>
  );
}
