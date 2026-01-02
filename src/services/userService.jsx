import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export async function getUser(id) {
  const response = await axios.get(`${API_BASE_URL}/user/${id}`);
  return response.data.data;
}

export async function getUserActivity(id) {
  const response = await axios.get(`${API_BASE_URL}/user/${id}/activity`);
  return response.data.data.sessions;
}
