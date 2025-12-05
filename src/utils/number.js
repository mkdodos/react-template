const numberFormat = (total) => {
  var formatter = new Intl.NumberFormat("en-US", {
    currency: "USD", // 2,500
    /* style: "currency"  $2,500.00 */
  });
  return formatter.format(total);
};

// 用正規表達式篩選符合結尾.0的字串
// 將金額去掉 .0
const removeDotZero = (str) => {
  if (str.match(/.0$/)) {
    return str.substring(0, str.length - 2);
  }
  return str;
};

export { numberFormat, removeDotZero };
