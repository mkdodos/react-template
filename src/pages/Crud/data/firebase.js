import { db } from "../../../utils/firebase";
import {
  query,
  limit,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  getDoc,
  startAfter,
} from "firebase/firestore/lite";

// 集合名稱
const colName = "template";

export async function read(params) {
  // 取得集合
  const col = collection(db, colName);
  // 資料快照
  const snapshot = await getDocs(col);
  // 資料跑迴圈轉成物件陣列
  const list = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return list;
}
