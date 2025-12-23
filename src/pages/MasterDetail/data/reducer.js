import { API_HOST } from "../../../global/constants";
import axios from "axios";
import { read } from "./db/pdo";

export const reducer = async (state, action) => {
  let response = null;

  // 接收 row 值給後端處理(create,update)
  const row = action.payload?.row;

  const headers = {
    "Content-Type": "text/plain",
  };

  let folder = "masterDetail";
  let url = "";

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
      console.log("add master");
      return {
        ...state,
        isMasterAddFormOpen: true,
      };

    case "ADD_DETAIL":
      console.log("add detail");
      return {
        ...state,
        isDetailFormOpen: true,
      };

    // 新增報價
    case "CREATE_MASTER":
      // console.log("create master");
      // console.log(row);
      url = `${API_HOST}/${folder}/master/create.php`;
      response = await axios.post(
        url,
        {
          ...row,
        },
        { headers }
      );
      // 新增完傳回報價單號和輸入的資料
      return {
        ...state,
        isMasterAddFormOpen: false,
        // 報價單號
        quoteID: response.data,
        // 開啟 DetailView
        isDetailViewOpen: true,
        // 報價單號和輸入的資料(準備給 DetailView 顯示)
        dataMasterRow: { ...row, quoteID: response.data },
      };

    case "CREATE_DETAIL":
      console.log("create detail");
      console.log(row);
      url = `${API_HOST}/${folder}/detail/create.php`;
      response = await axios.post(
        url,
        {
          ...row,
          quoteID:state.quoteID
        },
        { headers }
      );

      return {
        ...state,
        isDetailFormOpen: false,
        dataDetail: [{ ...row,quoteID:state.quoteID }],
      };

    // 關閉編輯表單
    case "CLOSE_MASTERFORM":
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

    // 關閉
    case "CLOSE_DETAILVIEW":
      return {
        ...state,
        isDetailViewOpen: false,
      };

    // 編輯
    case "EDIT_MASTER":
      console.log("edit_master");
      return {
        ...state,
        isMasterEditFormOpen: true,
      };

    case "UPDATE_MASTER":
      url = `${API_HOST}/${folder}/master/update.php`;

      response = await axios.post(
        url,
        {
          ...row,
        },
        { headers }
      );

      // 更新主畫面資料
      const dataByQuoteID = state.data.filter(
        (obj) => obj.quoteID == row.quoteID
      );

      dataByQuoteID.map((obj) => {
        obj.custName = row.custName;
      });

      // 更新 Master Row 元件資料
      Object.assign(state.dataMasterRow, row);

      return {
        ...state,
        isMasterEditFormOpen: false,
      };
  }
};
