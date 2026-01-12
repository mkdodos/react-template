// 取得日期的中文星期幾
const getWeekday = (date) => {
  const day = new Date(date).getDay();
  switch (day) {
    case 0:
      return "日";
    case 1:
      return "一";
    case 2:
      return "二";
    case 3:
      return "三";
    case 4:
      return "四";
    case 5:
      return "五";
    case 6:
      return "六";
  }
};


// 傳回當天日期 yyyy-mm-dd
const today = new Date().toISOString().substring(0,10);


export { getWeekday };
