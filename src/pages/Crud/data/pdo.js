import axios from "axios";
import { API_HOST } from "../../../global/constants";
export const pdo = () => {
  let folder = "TEMPLATE";
  // 對應後端資料處理
  let urlRead = `${API_HOST}/${folder}/read.php`;
  let urlCreate = `${API_HOST}/${folder}/create.php`;
  let urlUpdate = `${API_HOST}/${folder}/update.php`;
  let urlDelete = `${API_HOST}/${folder}/delete.php`;
  let response = null;
  async function read() {
    response = await axios.get(urlRead, { params: { y: 2021, m: 12 } });
    // console.log(response.data);
  }
};

let response = null;
let folder = "TEMPLATE";
export async function read(params) {
    console.log(params)
  let urlRead = `${API_HOST}/${folder}/read.php`;
  response = await axios.get(urlRead, { params });
  return response.data;
  //   console.log(response.data);
}
