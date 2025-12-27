import api from "./axios";

export const getAllRequests = () => api.get("/requests");

export const createRequest = (data) =>
  api.post("/requests", data);

export const updateRequestStatus = (id, data) =>
  api.patch(`/requests/${id}/status`, data);

export const getCalendarRequests = () =>
  api.get("/requests/preventive/calendar");

export const getRequestsByEquipment = (equipmentId) =>
  api.get(`/requests/equipment/${equipmentId}`);

export const getHistoryRequests = () =>
  api.get("/requests/history");
