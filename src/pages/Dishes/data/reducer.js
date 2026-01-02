// 引入不同資料庫
// import { read, create, update, destory } from "./db/pdo";
import { read, create, update, destory, readOptions,addOption,readCates } from "./db/firebase";

export const reducer = async (state, action) => {
  // 接收 row 值給後端處理(create,update)
  const row = action.payload?.row;

  let id = "";

  

  // 執行相關動作
  switch (action.type) {
    // 新增下拉選項
    case "ADD_OPTION":
      const value = action.value;
      id = await addOption(value);
      console.log(id)
      state.options.unshift({
        text: value,
        key: value,
        value: value,
      });

      return {
        ...state,
      };

    // 載入資料
    case "LOAD":
      const data = await read(action.params);
      const options = await readOptions();
      const cates = await readCates();
     
      return {
        ...state,
        data,
        options,
        cates,
        loading: false,
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
        editedRowIndex: action.payload.index,
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
      id = await create(row);

      // 接收後端傳回的 id , 加入 row 至陣列
      state.data.unshift({ ...row, id });
      // state.data.push({ ...row, id });
      return {
        ...state,
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 更新
    case "UPDATE":
      await update(row);
      Object.assign(state.data[state.editedRowIndex], row);

      return {
        ...state,
        isEditFormOpen: false,
        editedRowIndex: -1,
      };

    // 刪除
    case "DELETE":
      id = action.payload.id;
      await destory(id);
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
