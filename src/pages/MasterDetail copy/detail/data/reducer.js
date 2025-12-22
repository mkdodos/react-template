import { API_HOST } from "../../../../global/constants";
import axios from "axios";
import { read } from "./db/pdo";
// import { read } from "./db/firebase";

export const reducer = async (state, action) => {
  // console.log(pdo);
  let folder = "masterDetail";

  let urlCreate = `${API_HOST}/${folder}/create.php`;
  let urlUpdate = `${API_HOST}/${folder}/update.php`;
  let urlDelete = `${API_HOST}/${folder}/delete.php`;

  let response = null;

  // 接收 row 值給後端處理(create,update)
  const row = action.payload?.row;

  const headers = {
    "Content-Type": "text/plain",
  };

  // editedRowIndex : 編輯列索引
  // 儲存時依此判斷新增或更新

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      // const data = await read({ year: 2022, month: 10 });
      const data = await read(action.payload);

      // console.log(action.payload);
      // console.log(data);
      return {
        ...state,
        data,
        loading: false,
        params: action.payload,
      };

    case "SHOW_DETAIL":
      // console.log(action)
      const dataDetail = await read({ quoteID: action.quoteID });
      return {
        ...state,
        quoteID: action.quoteID,
        dataDetail,
        open:true
      };

    case "CLOSE_DETAIL":
     
      return {
        ...state,       
        open:false
      };  

    // 新增
    case "ADD":
     
      return {
        ...state,
        editedRowIndex: -1,
        isEditFormOpen: true,
      };
    // 編輯
    case "EDIT":
      return {
        ...state,
        editedRowIndex: action.payload.editedRowIndex,
        isEditFormOpen: true,
      };

    // 關閉編輯表單
    case "CLOSE_EDITFORM":
      return {
        ...state,
        isEditFormOpen: false,
      };

    // 新建
    case "CREATE":
      response = await axios.post(
        urlCreate,
        {
          ...row,
        },
        { headers }
      );
      // 接收後端傳回的 id , 加入 row 至陣列
      state.data.unshift({ ...row, id: response.data });
      return {
        ...state,
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 更新
    case "UPDATE":
      await axios.post(
        urlUpdate,
        {
          ...row,
        },
        { headers }
      );
      Object.assign(state.data[state.editedRowIndex], row);

      return {
        ...state,
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 刪除
    case "DELETE":
      const id = action.payload.id;
      await axios.post(
        urlDelete,
        {
          id,
        },
        { headers }
      );
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != id),
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 排序
    case "SORT":
      let direction = "ascending";
      // 排序後資料
      let sortedData = state.data;
      const columnName = action.payload.sortedColumn;
      const columnType = action.payload.type;

      if (state.sortedColumn == columnName) {
        direction = state.direction == "ascending" ? "descending" : "ascending";
        sortedData = state.data.slice().reverse();
      } else {
        direction = "ascending";
        sortedData = state.data.slice().sort((a, b) => {
          // 數字欄位
          if (columnType == "number")
            return a[columnName] * 1 > b[columnName] * 1 ? 1 : -1;
          // 其他欄位
          return a[columnName] > b[columnName] ? 1 : -1;
        });
      }

      return {
        ...state,
        data: sortedData,
        // 目前排序欄位名
        sortedColumn: columnName,
        direction,
      };
  }
};
