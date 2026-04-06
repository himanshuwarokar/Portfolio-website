import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const fallbackApiUrl = import.meta.env.DEV ? "http://localhost:5000/api" : "/api";
const baseURL = (configuredApiUrl || fallbackApiUrl).replace(/\/+$/, "");

const api = axios.create({
  baseURL
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
