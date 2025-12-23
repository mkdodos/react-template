import { useState } from "react";
import TableView from "./components/TableView";
import EditForm from "./components/EditForm";
import schema from "./data/schema.json";
export default function index({ dispatch, data,state }) {
  
  
   // 欄位預設值
  const defaultRow = {};
  const { columns } = schema;
  columns.map((obj) => {
    defaultRow[obj.dataKey] = "";
  });
  
  
  const [row, setRow] = useState(defaultRow);
  
  
  const handleAdd = () => {
    dispatch({ type: "ADD_DETAIL" });
    // setMasterRow(defaultMasterRow);
  };
  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <TableView handleAdd={handleAdd} data={data} columns={schema.columns} />
      <EditForm row={row} setRow={setRow} dispatch={dispatch} state={state}  />
    </div>
  );
}
