import api from "./axios";

export const getTeams = () => api.get("/teams");
