import { useState, useEffect } from "react";
import useAsyncReducer from "../../utils/asyncReducer";
import schema from "./data/schema.json";
import schemaDetail from "./detail/data/schema.json";
import { reducer } from "./data/reducer";

import PhoneView from "./components/PhoneView";
import TableViewDetail from "./detail/components/TableView";
import TableView from "./master/components/TableView";

import MasterAddForm from "./master/components/AddForm";

import EditFormDetail from "./detail/components/EditForm";

import ScrollTopButton from "../../components/ScrollTopButton";

export default function index() {
  // 預設資料物件
  const initState = {
    data: [], //資料
    dataDetail: [],
    loading: true,
  };

  const [state, dispatch] = useAsyncReducer(reducer, initState);

  useEffect(() => {
    // 讀取資料
    dispatch({ type: "LOAD" });
  }, []);

  // 欄位預設值

  const defaultMasterRow = {
    date: new Date().toISOString().substring(0, 10),
    section: "",
  };

  const [masterRow, setMasterRow] = useState(defaultMasterRow);

  const defaultDetailRow = {
    date: new Date().toISOString().substring(0, 10),
    section: "",
  };

  const [detailRow, setDetailRow] = useState(defaultDetailRow);

  const handleAdd = () => {
    dispatch({ type: "ADD_MASTER" });
    setMasterRow(defaultMasterRow);
  };
  const handleAddDetail = (masterID) => {
    // console.log(masterID)
    dispatch({ type: "ADD_DETAIL", payload: { masterID } });
    // dispatch({ type: "ADD_DETAIL", payload: { masterID } });
    setDetailRow(defaultDetailRow);
  };

  const handleEdit = (row, index) => {
    dispatch({ type: "EDIT_MASTER", payload: { index } });
    setMasterRow(row);
  };

  const handleEditDetail = (row, index) => {
    dispatch({ type: "EDIT_DETAIL", payload: { index } });
    setDetailRow(row);
  };

  return (
    <>
      <PhoneView
        data={state.data}
        dataDetail={state.dataDetail}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleAddDetail={handleAddDetail}
        handleEditDetail={handleEditDetail}
      />
      {/* 顯示主表 */}
      <TableView
        data={state.data}
        dispatch={dispatch}
        columns={schema.columns}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleAddDetail={handleAddDetail}
      />
      <TableViewDetail
        data={state.dataDetail}
        dispatch={dispatch}
        columns={schemaDetail.columns}
        handleAdd={handleAddDetail}
        handleEdit={handleEditDetail}
      />
      {/* <SearchBar dispatch={dispatch} /> */}
      {/* <TableView state={state} dispatch={dispatch} columns={schema.columns} handleAdd={handleAdd} /> */}
      <MasterAddForm
        state={state}
        dispatch={dispatch}
        row={masterRow}
        setRow={setMasterRow}
      />
      <EditFormDetail
        state={state}
        dispatch={dispatch}
        row={detailRow}
        setRow={setDetailRow}
        columns={schemaDetail.columns}
      />
      {/* <DetailView state={state} dispatch={dispatch}  /> */}
      {/* <ScrollTopButton/> */}
    </>
  );
}
