// 引入不同資料庫
// import { read, create, update, destory } from "./db/pdo";
import {
  read,
  create,
  update,
  destory,
  readDetail,
  createDetail,
  updateDetail,
  destoryDetail,
} from "./db/firebase";

export const reducer = async (state, action) => {
  // 接收 row 值給後端處理(create,update)
  const row = action.payload?.row;

  let id = "";

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      const data = await read(action.params);
      const dataDetail = await readDetail();

      return {
        ...state,
        data,
        dataDetail,
        loading: false,
      };

    // 新增
    case "ADD_MASTER":
      console.log("add master");
      return {
        ...state,
        editedRowIndex: -1,
        isMasterAddFormOpen: true,
      };

    // 新增
    case "ADD_DETAIL":
      console.log("add detail");
      return {
        ...state,
        editedDetailRowIndex: -1,
        isDetailFormOpen: true,
        masterID: action.payload.masterID,
      };

    // 編輯
    case "EDIT_MASTER":
      console.log("edit master");
      return {
        ...state,
        editedRowIndex: action.payload.index,
        isMasterAddFormOpen: true,
      };

    // 編輯
    case "EDIT_DETAIL":
      console.log("edit detail");
      return {
        ...state,
        editedDetailRowIndex: action.payload.index,
        isDetailFormOpen: true,
      };

    // 關閉編輯表單
    case "CLOSE_MASTERADDFORM":
      return {
        ...state,
        isMasterAddFormOpen: false,
      };

    // 關閉編輯表單
    case "CLOSE_DETAILFORM":
      return {
        ...state,
        isDetailFormOpen: false,
      };

    // 新建
    case "CREATE_MASTER":
      id = await create(row);

      // 接收後端傳回的 id , 加入 row 至陣列
      state.data.unshift({ ...row, id });
      return {
        ...state,
        isMasterAddFormOpen: false,
        editedRowIndex: -1,
        masterID: id,
      };

    // 新建
    case "CREATE_DETAIL":
      console.log("create detail");
      id = await createDetail({ ...row, masterID: state.masterID });

      // 接收後端傳回的 id , 加入 row 至陣列
      state.dataDetail.unshift({ ...row,masterID: state.masterID, id });
      return {
        ...state,
        isDetailFormOpen: false,
        editedDetailRowIndex: -1,
        masterID: id,
      };

    // 更新
    case "UPDATE_MASTER":
      await update(row);
      Object.assign(state.data[state.editedRowIndex], row);

      return {
        ...state,
        isMasterAddFormOpen: false,
        editedRowIndex: -1,
      };

    // 更新
    case "UPDATE_DETAIL":
      await updateDetail(row);
      Object.assign(state.dataDetail[state.editedDetailRowIndex], row);

      return {
        ...state,
        isDetailFormOpen: false,
        editedDetailRowIndex: -1,
      };

    // 刪除
    case "DELETE_MASTER":
      id = action.payload.id;
      await destory(id);
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != id),
        isMasterAddFormOpen: false,
        editedRowIndex: -1,
      };

    // 刪除
    case "DELETE_DETAIL":
      id = action.payload.id;
      await destoryDetail(id);
      return {
        ...state,
        dataDetail: state.dataDetail.filter((obj) => obj.id != id),
        isDetailFormOpen: false,
        editedDetailRowIndex: -1,
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

    default:
      return state;
  }
};
