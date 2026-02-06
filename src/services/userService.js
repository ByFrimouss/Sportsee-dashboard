import axios from "axios";
import {
  mockUser,
  mockActivity,
  mockAverageSessions,
  mockPerformance,
} from "../data/MockData";

// Si REACT_APP_USE_MOCK=true dans .env, on utilise les données mock
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE_URL = "http://localhost:3000";

/**
 * Fonction centrale pour récupérer les données de l'API ou des mocks
 * @param {string} endpoint - L'endpoint de l'API (ex: "/user/12")
 * @param {any} mockData - Les données à retourner si on est en mode mock
 * @returns {Promise<any>} - Retourne les données de l'utilisateur ou du mock
 *
 *
 * Cette fonction évite de répéter la logique mock/API dans chaque service.
 * Elle gère aussi les erreurs et loggue un message clair si l'API échoue.
 */
async function fetchData(endpoint, mockData) {
  if (USE_MOCK) return mockData;

  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data.data;
  } catch (error) {
    console.error(`Erreur API sur ${endpoint}:`, error);
    throw new Error("Impossible de récupérer les données utilisateur");
  }
}

/**
 * Récupère les informations générales de l'utilisateur
 * @param {number} id - ID de l'utilisateur
 * @returns {Promise<Object>} - Objet contenant id, userInfos et todayScore
 *
 *
 * getUser utilise fetchData pour centraliser la logique mock/API.
 */
export async function getUser(id) {
  const mockData = mockUser.find((u) => u.id === id);
  return fetchData(`/user/${id}`, mockData);
}

/**
 * Récupère l'activité quotidienne de l'utilisateur
 * @param {number} id - ID de l'utilisateur
 * @returns {Promise<Array>} - Tableau de sessions [{day, kilogram, calories}]
 *
 *
 * getUserActivity récupère les données pour les graphiques journaliers.
 */
export async function getUserActivity(id) {
  const mockData = mockActivity;
  return fetchData(`/user/${id}/activity`, mockData.sessions || mockData);
}

/**
 * Récupère la moyenne des sessions par jour
 * @param {number} id - ID de l'utilisateur
 * @returns {Promise<Array>} - Tableau de sessions moyennes [{day, sessionLength}]
 *
 *
 * getAverageSessions prépare les données pour le chart "AverageSessions".
 */
export async function getAverageSessions(id) {
  const mockData = mockAverageSessions;
  return fetchData(`/user/${id}/average-sessions`, mockData);
}

/**
 * Récupère la performance de l'utilisateur pour le radar chart
 * @param {number} id - ID de l'utilisateur
 * @returns {Promise<Object>} - Objet performance {data: [...], kind: {...}}
 *
 *
 * getUserPerformance est utilisé pour le radar chart "Performance".
 *
 */
export async function getUserPerformance(id) {
  const mockData = mockPerformance;
  return fetchData(`/user/${id}/performance`, mockData);
}
