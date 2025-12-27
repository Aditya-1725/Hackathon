import api from "./axios";

export const getAllEquipment = () => api.get("/equipment");

export const createEquipment = (data) =>
  api.post("/equipment", data);
