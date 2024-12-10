import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { username: string; password: string }) => {
  return api.post("/api/user/login", data);
};

export const studentList = async () => api.get("api/student");
