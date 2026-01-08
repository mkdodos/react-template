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
const colName = "dishes";
let response = null;

export async function read(params) {
  let q = collection(db, colName);

  // 依所傳參數組合不同查詢
  const { dish, cate } = params;
  if (dish) q = query(q, where("dish", "==", dish));
  if (cate) q = query(q, where("cate", "==", cate));
  q = query(q, orderBy("date","desc"));
  q = query(q, limit(10));
  // q = query(q, orderBy("date"));
  const snapshot = await getDocs(q);

  const list = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return list;
}

export async function addOption(value) {
  console.log(value);
  response = await addDoc(collection(db, "dish"), {
    dishName: value,
  });
  return response.id;
}

export async function readOptions() {
  // return options;
  // 取得集合
  const col = collection(db, "dish");
  // 資料快照
  const snapshot = await getDocs(col);
  // 資料跑迴圈轉成物件陣列
  const list = snapshot.docs.map((doc) => {
    // console.log(doc.data());
    // return { ...doc.data(), id: doc.id };
    return {
      key: doc.id,
      text: doc.data().dishName,
      value: doc.data().dishName,
    };
  });
  return list;
}

export async function readCates() {
  const col = collection(db, "dishCate");
  // 資料快照
  const snapshot = await getDocs(col);
  // 資料跑迴圈轉成物件陣列
  const list = snapshot.docs.map((doc) => {
    return {
      key: doc.id,
      text: doc.data().cateName,
      value: doc.data().cateName,
    };
  });
  return list;
}

export async function create(params) {
  response = await addDoc(collection(db, colName), {
    ...params,
  });
  return response.id;
}

export async function update(params) {
  await updateDoc(doc(db, colName, params.id), {
    ...params,
  });
  // return response.id;
}

export async function destory(id) {
  await deleteDoc(doc(db, colName, id));
}
