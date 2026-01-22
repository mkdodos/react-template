import React from "react";

export default function DishCopy() {
  //   const date = new Date().toLocaleDateString("en-CA");
  // 輸出: "2026-01-22"
  const date = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Taipei",
  });
  console.log(date);
  return <div>DishCopy</div>;
}
