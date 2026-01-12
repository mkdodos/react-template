// 設定檔
import { db } from "../../../../utils/firebase";
import {
  query,
  limit,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  orderBy,
  getDoc,
  startAfter,
} from "firebase/firestore/lite";

// 集合名稱
const colName = "dishFood";

// 沒使用查詢參數
// const col = collection(db, colName);
// const snapshot = await getDocs(col);


let q = collection(db, colName);
// 排序
q = query(q, orderBy("date", "desc"));
// 有傳參數組合不同查詢
if (className) q = query(q, where("class", "==", className));
if (workName) q = query(q, where("workName", "==", workName));
const snapshot = await getDocs(q);

// 資料陣列
const list = snapshot.docs.map((doc) => {
  return { ...doc.data(), id: doc.id };
});
