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
const colNameDetail = "dishFoodDetail";
let response = null;

export async function read(params) {
  let q = collection(db, colName);
  q = query(q, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return list;
}


export async function readDetail(params) {
  let q = collection(db, colNameDetail);
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
    console.log(doc.data());
    // return { ...doc.data(), id: doc.id };
    return {
      key: doc.id,
      text: doc.data().dishName,
      value: doc.data().dishName,
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

export async function createDetail(params) {
  response = await addDoc(collection(db, colNameDetail), {
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

export async function updateDetail(params) {
  await updateDoc(doc(db, colNameDetail, params.id), {
    ...params,
  });
  // return response.id;
}

export async function destory(id) {
  await deleteDoc(doc(db, colName, id));
}

export async function destoryDetail(id) {
  await deleteDoc(doc(db, colNameDetail, id));
}
