import React, { useState, useEffect } from "react";
import useAsyncReducer from "../../utils/asyncReducer";
import schema from "./data/schema.json";
import { reducer } from "./data/reducer";
// import { reducer } from "./data/reducerPdo";
import TableView from "./components/TableView";
import EditForm from "./components/EditForm";


export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    options: [],
    loading: true,
  };

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD", params: {} });
  }, []);

  // 欄位預設值
  const defaultRow = {};
  const { columns } = schema;
  columns.map((obj) => {
    defaultRow[obj.dataKey] = "";
  });

  // 預設當日
  // defaultRow.date = new Date().toISOString().substring(0, 10);

  // 原本 row 放在 useAsyncReducer 會出現無法輸入中文的問題
  // 將其獨立出來處理
  const [row, setRow] = useState(defaultRow);

  const handleAdd = () => {
    dispatch({ type: "ADD" });
    setRow(defaultRow);
  };

  const handleEdit = (row, index) => {
    dispatch({ type: "EDIT", payload: { index } });
    console.log(row);
    setRow(row);
  };

  const handleChange = (e, { value }) => {
    // console.log(value);
    dispatch({ type: "LOAD", params: { workName: value } });
  };

  return (
    <>
      {Array.isArray(state.data) && (
        <TableView
          state={state}
          dispatch={dispatch}
          columns={columns}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
        />
      )}

      <EditForm
        columns={columns}
        row={row}
        setRow={setRow}
        state={state}
        dispatch={dispatch}
      />
    </>
  );
}
