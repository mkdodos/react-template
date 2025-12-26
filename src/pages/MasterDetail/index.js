import { useState, useEffect } from "react";
import useAsyncReducer from "../../utils/asyncReducer";
import schema from "./data/schema.json";
import { reducer } from "./data/reducer";
import SearchBar from "./components/SearchBar";
import TableView from "./components/TableView";

import MasterAddForm from "./master/components/AddForm";
import DetailView from "./components/DetailView";
import ScrollTopButton from "../../components/ScrollTopButton";

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    dataDetail:[],
    loading: true,
  };

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD" });
  }, []);

  // 欄位預設值

  const defaultMasterRow = {
    custID: "",
    caseNo: "",
    contactor: "",
  };

  const [masterRow, setMasterRow] = useState(defaultMasterRow);

  const handleAdd = () => {
    dispatch({ type: "ADD_MASTER" });
    setMasterRow(defaultMasterRow);
  };

   

  // const handleEdit = (row, index) => {
  //   dispatch({ type: "EDIT", payload: { index } });
  //   setRow(row);
  // };

  return (
    <>
      <SearchBar dispatch={dispatch} />
      <TableView state={state} dispatch={dispatch} columns={schema.columns} handleAdd={handleAdd} />
      <MasterAddForm
        state={state}
        dispatch={dispatch}
        row={masterRow}
        setRow={setMasterRow}
      />
      <DetailView state={state} dispatch={dispatch}  />
      <ScrollTopButton/>
      
    </>
  );
}
