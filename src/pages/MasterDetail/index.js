import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TableView from "./components/TableView";
import DetailView from "./components/DetailView";
import useAsyncReducer from "../../utils/asyncReducer";
import schema from "./data/schema.json";
import { reducer } from "./data/reducer";
import ScrollTopButton from "../../components/ScrollTopButton";

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    dataDetail:[],
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
    dispatch({ type: "ADD" });
    setRow(defaultRow);
  };

  const handleEdit = (row, index) => {
    dispatch({ type: "EDIT", payload: { index } });
    setRow(row);
  };


  
   const showDetail = (quoteID) => {
    // console.log(quoteID);
    dispatch({ type: "SHOW_DETAIL", quoteID });
  };

  return (
    <div>
      {/* {state.quoteID} */}
      <DetailView quoteID={state.quoteID} state={state}
       columns={columns}
      />
      <SearchBar state={state} dispatch={dispatch} />
      <TableView
        state={state}
        columns={columns}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        showDetail={showDetail}
        // dispatch={dispatch}
      />
     
      <ScrollTopButton/>
    </div>
  );
}
