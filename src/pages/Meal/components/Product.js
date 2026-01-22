import React from "react";
import "./style.css";

export default function Product({ meal }) {
  const { name, date } = meal;
  return (
    <li className="product-card">
      <div className="product-info">
        <h3>{name}</h3>
        <p>捕捉生活中的每一個瞬間，內建多款膠卷濾鏡。 內建多款膠卷濾鏡 </p>
        <div className="product-footer">
          <span className="price">{date}</span>
          <button className="buy-btn">加入購物車</button>
        </div>
      </div>
    </li>
  );
}
