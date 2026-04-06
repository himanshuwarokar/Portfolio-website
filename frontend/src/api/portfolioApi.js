import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};

export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const addProject = async (payload) => {
  const { data } = await api.post("/projects", payload);
  return data;
};

export const removeProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};

export const sendContactMessage = async (payload) => {
  const { data } = await api.post("/messages", payload);
  return data;
};
