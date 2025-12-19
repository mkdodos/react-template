import React, { useState, useEffect } from "react";

import useAsyncReducer from "../../../utils/asyncReducer";
import schema from "./data/schema.json";

import { reducer } from "./data/reducer";

import RowView from "./components/RowView";
import EditForm from "./components/EditForm";

export default function index({ dispatch,data,state }) {


  const { columns } = schema;

  const [row, setRow] = useState(data);

  useEffect(() => {
    // 讀取資料
    // dispatch({ type: "LOAD", payload: data });
    // dispatch({ type: "LOAD_MASTER" });
  }, []);

 

  const handleEdit = (row) => {
  
    // dispatch({ type: "EDIT", payload: { index } });
    dispatch({ type: "EDIT_MASTER", payload: { index } });
 
  };

  return (
    <div>
      <RowView row={data} handleEdit={handleEdit} />
      <EditForm
        row={row}
        setRow={setRow}
        dispatch={dispatch}        
        state={state}
      />
    </div>
  );
}
