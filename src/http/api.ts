import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const login = async (data: { username: string; password: string }) => {
  return api.post("/api/user/login", data);
};

export const studentList = async () => api.get("api/student");
export const createStudent = async (data: FormData) =>
  api.post("api/student/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const messageList = async () => api.get("api/contact/post-list");
