import { useState } from "react";
import RowView from "./components/RowView";
import EditForm from "./components/EditForm";

export default function index({ dispatch, data, state }) {
  
  const [row, setRow] = useState(data);
  
  const handleAdd = () => {
    dispatch({ type: "ADD_MASTER" });
    setRow(null);
  };

  const handleEdit = (row) => {
    dispatch({ type: "EDIT_MASTER", payload: { index } });
    setRow(row)
  };
  return (
    <div>
      <RowView row={data} handleAdd={handleAdd} handleEdit={handleEdit} />
      <EditForm row={row} setRow={setRow} dispatch={dispatch} state={state} />
      {/* {JSON.stringify(data)} */}
    </div>
  );
}
