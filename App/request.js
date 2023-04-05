import axios from "axios";

export const client = axios.create({
  baseURL: "http://34.240.13.190:8080",
});
