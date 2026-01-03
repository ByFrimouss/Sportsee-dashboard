import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

/**
 * Récupère les informations générales de l'utilisateur
 * @param {number} id - l'id de l'utilisateur
 * @returns {Promise<Object>}
 */
export async function getUser(id) {
  const response = await axios.get(`${API_BASE_URL}/user/${id}`);
  return response.data.data;
}

/**
 * Récupère l'activité quotidienne de l'utilisateur
 * @param {number} id - l'id de l'utilisateur
 * @returns {Promise<Array>}
 */
export async function getUserActivity(id) {
  const response = await axios.get(`${API_BASE_URL}/user/${id}/activity`);
  return response.data.data.sessions;
}

/**
 * Récupère la moyenne des sessions
 */
export async function getAverageSessions(id) {
  const response = await axios.get(
    `${API_BASE_URL}/user/${id}/average-sessions`
  );
  return response.data.data.sessions;
}

/**
 * Récupère la performance pour le radar chart
 */
export async function getUserPerformance(id) {
  const response = await axios.get(`${API_BASE_URL}/user/${id}/performance`);
  return response.data.data;
}
