import { api } from "../../../config/api";

export const obtenerLogs = async () => {
  const response = await api.get("/logs/");
  return response.data;
};