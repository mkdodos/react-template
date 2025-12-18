import React, { useState } from "react";
import { Button } from "semantic-ui-react";

export default function ScrollTopButton() {
  // 控制按鈕顯示
  const [visible, setVisible] = useState(false);

  // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

  // 視窗滑動事件
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    // scrollTop 屬性代表該元素和文件上方距離
    // 距離超過設定值將按鈕設為顯示
    const top = document.documentElement.scrollTop;
    // const top = document.body.scrollTop; //For Safari
    if (top > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  // 將和上方距離設為 0 , 代表回到頂端
  function topFunction() {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  // 設定按鈕固定在某個位置
  const style1 = {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    zIndex: "99" /* Make sure it does not overlap */,
  };

  // 在滑到某個高度時出現
  return (
    visible && (
      <Button
        size="small"
        color="pink"
        style={style1}
        onClick={topFunction}
        icon="arrow up"
      ></Button>
    )
  );
}
