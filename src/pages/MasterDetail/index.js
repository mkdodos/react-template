import  { useState, useEffect } from "react";
import useAsyncReducer from "../../utils/asyncReducer";
import schema from "./data/schema.json";
import { reducer } from "./data/reducer";
import SearchBar from "./components/SearchBar";
import TableView from "./components/TableView";

import MasterAddForm from "./master/components/AddForm"


export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    loading: true,
  };

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD" });
  }, []);

  // 欄位預設值
  const defaultRow = {};
  const { columns } = schema;
  columns.map((obj) => {
    defaultRow[obj.dataKey] = "";
  });
 
  
  // const [row, setRow] = useState(defaultRow);

  const handleAdd = () => {
    dispatch({ type: "ADD_MASTER" });
    // setRow(defaultRow);
  };

  // const handleEdit = (row, index) => {
  //   dispatch({ type: "EDIT", payload: { index } });
  //   setRow(row);
  // };

  return (
    <>
      <SearchBar dispatch={dispatch} />
      <TableView state={state} columns={columns} handleAdd={handleAdd}/>
      <MasterAddForm state={state}/>
    </>
  );
}
