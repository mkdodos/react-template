import React, { useState, useEffect } from "react";


import useAsyncReducer from "../../../utils/asyncReducer";
import schema from "./data/schema.json";

import { reducer } from "./data/reducer";

import TableView from "./components/TableView";
import EditForm from "./components/EditForm";

export default function index({data}) {
  // 預設資料物件
  const initState = {
    data: [], //資料
    dataDetail: [],
    loading: true,
  };
  const [state, dispatch] = useAsyncReducer(reducer, initState);

  const { columns } = schema;

  // 欄位預設值
  const defaultRow = {};
  columns.map((obj) => {
    defaultRow[obj.dataKey] = "";
  });

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(defaultRow);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD" });
  }, []);

  const handleAdd = () => {
    console.log('detail add')
    dispatch({ type: "ADD" });
    setRow(defaultRow);
  };

  const handleEdit = (row) => {
    console.log('detail edit')
    // console.log(row)
    dispatch({ type: "EDIT", payload: { index } });
    // setRow(row);
  };

  


  return (
    <div>
      <TableView handleAdd={handleAdd} data={data} columns={columns} handleEdit={handleEdit} />
      <EditForm  dispatch={dispatch} data={data} state={state} />
    </div>
  );
}
