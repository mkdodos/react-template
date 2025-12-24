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

  function joinSize(row) {
    let size = "";
    // size = "Φ " + row.size1 + " * " + row.size2;
    if (row.size1 != "") {
      size += "Φ " + row.size1;
    }
    if (row.size2 != "") {
      size += " * " + row.size2;
    }
    if (row.size3 != "") {
      size += " * " + row.size3;
    }
    return size;
  }

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

    case "SHOW_DETAIL":
      // 用傳來的報價單號到後端取得資料
      // dataDetail 提供給 DetailView
      const dataDetail = await read({ quoteID: action.quoteID });
      // dataDetail[0] 做為 master rowview 資料
      return {
        ...state,
        quoteID: action.quoteID,
        dataMasterRow: dataDetail[0],
        dataDetail,
        isDetailViewOpen: true,
      };

    // 關閉
    case "CLOSE_DETAILVIEW":
      return {
        ...state,
        isDetailViewOpen: false,
      };

    /**************** MASTER *******************/
    //
    case "ADD_MASTER":
      console.log("add master");
      return {
        ...state,
        isMasterAddFormOpen: true,
        dataDetail: [],
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

    // 關閉編輯表單
    case "CLOSE_MASTERFORM":
      return {
        ...state,
        isMasterAddFormOpen: false,
      };

    /**************** DETAIL *******************/

    case "ADD_DETAIL":
      console.log("add detail");
      return {
        ...state,
        isDetailFormOpen: true,
        editedRowIndex: -1,
      };

    case "CREATE_DETAIL":
      // console.log("create detail");
      // console.log(row);
      url = `${API_HOST}/${folder}/detail/create.php`;
      response = await axios.post(
        url,
        {
          ...row,
          quoteID: state.quoteID,
        },
        { headers }
      );

      // const size = "Φ" + row.size1 + "*" + row.size2 + "*" + row.size3;

      // console.log(response.data)

      state.data.unshift({
        ...state.dataMasterRow,
        ...row,
        id: response.data,
        size: joinSize(row),
      });
      state.dataDetail.unshift({
        ...row,
        id: response.data,
        size: joinSize(row),
        quoteID: state.quoteID,
      });

      return {
        ...state,
        isDetailFormOpen: false,
        // dataDetail: [{ ...row,quoteID:state.quoteID }],
      };

    // 編輯
    case "EDIT_DETAIL":
      console.log("edit_detail");
      return {
        ...state,
        isDetailFormOpen: true,
        editedRowIndex: action.payload.index,
      };

    //
    case "UPDATE_DETAIL":
      url = `${API_HOST}/${folder}/detail/update.php`;

      response = await axios.post(
        url,
        {
          ...row,
        },
        { headers }
      );

      Object.assign(state.dataDetail[state.editedRowIndex], {
        ...row,
        size: joinSize(row),
      });

      // 更新主畫面資料
      const obj = state.data.find((obj) => obj.id == row.id);

      // console.log(obj);

      Object.assign(obj, { ...row, size: joinSize(row) });
      // Object.assign(obj, { ...row  });

      return {
        ...state,
        isDetailFormOpen: false,
      };

    case "DESTROY_DETAIL":
      url = `${API_HOST}/${folder}/detail/delete.php`;
      await axios.post(
        url,
        {
          id: row.id,
        },
        { headers }
      );
      return {
        ...state,
        data: state.data.filter((obj) => obj.id != row.id),
        dataDetail: state.dataDetail.filter((obj) => obj.id != row.id),

        isDetailFormOpen: false,
        // editedRowIndex: -1,
      };

    // 關閉編輯表單
    case "CLOSE_DETAILFORM":
      return {
        ...state,
        isDetailFormOpen: false,
      };
  }
};
