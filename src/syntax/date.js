// 傳回當天日期 yyyy-mm-dd (會有時差問題)
const today = new Date().toISOString().substring(0,10);


// 輸出: "2026-01-22" (排除時差問題)
const date = new Date().toLocaleDateString("en-CA", {
  timeZone: "Asia/Taipei",
});
