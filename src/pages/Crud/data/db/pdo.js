import axios from "axios";
import { API_HOST } from "../../../../global/constants";

let response = null;
let folder = "template";
let url = "";
const headers = {
  "Content-Type": "text/plain",
};

export async function read(params) {
  url = `${API_HOST}/${folder}/read.php`;
  response = await axios.get(url, { params });
  return response.data;
}

export async function create(params) {
  url = `${API_HOST}/${folder}/create.php`;
  response = await axios.post(
    url,
    {
      ...params,
    },
    { headers }
  );
  return response.data
}

export async function update(params) {
  url = `${API_HOST}/${folder}/update.php`;
  return await axios.post(
    url,
    {
      ...params,
    },
    { headers }
  );
 
}

export async function destory(id) {
  url = `${API_HOST}/${folder}/delete.php`;
  return await axios.post(
    url,
    {
      id,
    },
    { headers }
  );
  
}
