import axios from "axios";
import {
  mockUser,
  mockActivity,
  mockAverageSessions,
  mockPerformance,
} from "../data/MockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE_URL = "http://localhost:3000";

// ✅ WHITELIST des endpoints autorisés
const ALLOWED_ENDPOINTS = [
  "/user/:id",
  "/user/:id/activity",
  "/user/:id/average-sessions",
  "/user/:id/performance",
];

/**
 * Valide et construit l'endpoint de manière sécurisée
 * @param {string} pattern - Pattern de l'endpoint (ex: "/user/:id")
 * @param {number} id - ID de l'utilisateur
 * @returns {string} - Endpoint validé
 */
function buildSecureEndpoint(pattern, id) {
  // Valide que l'id est bien un nombre
  const userId = parseInt(id, 10);
  if (isNaN(userId) || userId <= 0) {
    throw new Error("ID utilisateur invalide");
  }

  // Vérifie que le pattern est dans la whitelist
  if (!ALLOWED_ENDPOINTS.includes(pattern)) {
    throw new Error("Endpoint non autorisé");
  }

  // Remplace :id par l'id validé
  return pattern.replace(":id", userId);
}

/**
 * Fonction centrale pour récupérer les données de l'API ou des mocks
 */
async function fetchData(endpointPattern, id, mockData) {
  if (USE_MOCK) return mockData;

  try {
    const endpoint = buildSecureEndpoint(endpointPattern, id);
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data.data;
  } catch (error) {
    console.error(`Erreur API sur ${endpointPattern}:`, error);
    throw new Error("Impossible de récupérer les données utilisateur");
  }
}

export async function getUser(id) {
  const mockData = mockUser.find((u) => u.id === parseInt(id, 10));
  return fetchData("/user/:id", id, mockData);
}

export async function getUserActivity(id) {
  const mockData = mockActivity;
  return fetchData("/user/:id/activity", id, mockData.sessions || mockData);
}

export async function getAverageSessions(id) {
  const mockData = mockAverageSessions;
  return fetchData("/user/:id/average-sessions", id, mockData);
}

export async function getUserPerformance(id) {
  const mockData = mockPerformance;
  return fetchData("/user/:id/performance", id, mockData);
}
