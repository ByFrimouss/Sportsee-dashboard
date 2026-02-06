/**
 * AverageSessionsChart Component
 * --------------------------------------------------------------------
 * Graphique représentant la durée moyenne des sessions sportives
 * par jour de la semaine.
 *
 * Ce composant :
 * - récupère les données via le service utilisateur
 * - formate les données grâce à un modèle dédié
 * - affiche une courbe avec Recharts
 *
 * Il est conçu pour être entièrement responsive grâce à
 * l'utilisation de ResponsiveContainer.
 */

import { useEffect, useState } from "react";
import { getAverageSessions } from "../../services/userService";
import AverageSessionsModel from "../../models/AverageSessionModel";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./AverageSessionsChart.scss";

/**
 * @returns {JSX.Element|null} Graphique des sessions ou null si aucune donnée
 */
function AverageSessionsChart() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await getAverageSessions(12);

        const sessions = Array.isArray(data.sessions) ? data.sessions : [];

        const formattedData = sessions.map(
          (session, index) => new AverageSessionsModel(session, index),
        );

        setSessions(formattedData);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des sessions moyennes :",
          error,
        );
      }
    }

    fetchSessions();
  }, []);

  // Empêche l'affichage tant que les données ne sont pas chargées
  if (!sessions.length) return null;

  return (
    <div className="average-sessions">
      <h2>Durée moyenne des sessions</h2>

      <div className="average-sessions__chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sessions}>
            {/* Axe des jours */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#fff", opacity: 0.5 }}
              padding={{ left: 5, right: 5 }}
            />

            {/* Axe Y masqué car la valeur est affichée via le tooltip */}
            <YAxis hide />

            {/* Tooltip personnalisé */}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="average-sessions__tooltip">
                      {payload[0].value} min
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Courbe représentant la durée des sessions */}
            <Line
              type="monotone"
              dataKey="sessionLength"
              stroke="#FFFFFF"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AverageSessionsChart;
