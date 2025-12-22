import axios from "axios";
import { API_HOST } from "../../../../../global/constants";


let response = null;
let folder = "masterDetail";
export async function read(params) {   
  let urlRead = `${API_HOST}/${folder}/read.php`;
  response = await axios.get(urlRead, { params });
  return response.data; 
}
