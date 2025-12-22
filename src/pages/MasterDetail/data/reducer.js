import { API_HOST } from "../../../global/constants";
import axios from "axios";
import { read } from "./db/pdo";

export const reducer = async (state, action) => {
  let response = null;

  // 接收 row 值給後端處理(create,update)
  const row = action.payload?.row;

  // editedRowIndex : 編輯列索引
  // 儲存時依此判斷新增或更新

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      console.log(action.payload);
      const data = await read(action.payload);
      console.log(data);
      return {
        ...state,
        data,
        loading: false,
      };

    //
    case "ADD_MASTER":
      console.log('add master')
      return {
        ...state,
        isMasterAddFormOpen: true,
      };
  }
};
