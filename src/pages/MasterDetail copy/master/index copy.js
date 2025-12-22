import React, { useState, useEffect } from "react";

import useAsyncReducer from "../../../utils/asyncReducer";
import schema from "./data/schema.json";

import { reducer } from "./data/reducer";

import RowView from "./components/RowView";
import EditForm from "./components/EditForm";

export default function index({ data,dispatch,state }) {
  // 從外部傳進來資料
  // 在 LOAD 用 state 儲存

  // 預設資料物件
  // const initState = {
  //   data: [], //資料
  //   dataDetail: [],
  //   loading: true,
  // };
  // const [state, dispatch] = useAsyncReducer(reducer, initState);

  const { columns } = schema;

  // 欄位預設值
  // const defaultRow = {};
  // columns.map((obj) => {
  //   defaultRow[obj.dataKey] = "";
  // });

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(data);

  useEffect(() => {
    // 讀取資料
    // dispatch({ type: "LOAD", payload: data });
    // dispatch({ type: "LOAD_MASTER" });
  }, []);

  // const handleAdd = () => {
  //   dispatch({ type: "ADD" });
  //   setRow(defaultRow);
  // };

  const handleEdit = (row) => {
    // console(row)
    // console.log(row);
    dispatch({ type: "EDIT", payload: { index } });
    // setRow(row);
  };

  return (
    <div>
      <RowView row={state.data} handleEdit={handleEdit} />
      <EditForm
        row={row}
        setRow={setRow}
        dispatch={dispatch}
        // data={data}
        state={state}
      />
    </div>
  );
}
