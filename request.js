import axios from "axios";

export const client = axios.create({
  baseURL: "http://172.17.17.135:5000",
});
