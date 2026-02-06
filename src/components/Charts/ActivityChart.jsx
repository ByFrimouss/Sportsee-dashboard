/**
 * ActivityChart Component
 * --------------------------------------------------------------------
 * Graphique d'activité quotidienne de l'utilisateur.
 *
 * Ce composant :
 * - récupère les données d'activité via le service utilisateur
 * - formate les données à l'aide d'un modèle dédié (ActivityModel)
 * - affiche un graphique en barres avec Recharts
 *
 * Il est utilisé dans le dashboard utilisateur pour visualiser
 * le poids et les calories brûlées par jour.
 */

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getUserActivity } from "../../services/userService";
import ActivityModel from "../../models/ActivityModel";
import "./ActivityChart.scss";
import { ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

/** Tooltip personnalisé affiché au survol des barres du graphique.
 * @param {Object} props
 * @param {boolean} props.active - Indique si le tooltip est actif
 * @param {Array} props.payload - Données de la barre survolée
 * @returns {JSX.Element|null} Tooltip personnalisé ou null
 */

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="activity-tooltip">
        <p>{payload[0].value}kg</p>
        <p>{payload[1].value}kCal</p>
      </div>
    );
  }

  return null;
}

function ActivityChart() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const data = await getUserActivity(12);
        console.log(data);

        const sessions = Array.isArray(data.sessions) ? data.sessions : [];

        const formattedData = sessions.map(
          (session, index) => new ActivityModel(session, index),
        );

        setActivity(formattedData);
      } catch (error) {
        console.error("Erreur lors du chargement de l'activité :", error);
      }
    }

    fetchActivity();
  }, []);

  // Évite l'affichage du composant tant que les données ne sont pas disponibles
  if (!activity.length) return null;

  return (
    <div className="activity-chart">
      {/* HEADER */}
      <div className="activity-chart__header">
        <h2>Activité quotidienne</h2>

        <ul className="activity-chart__legend">
          <li className="kg">Poids (kg)</li>
          <li className="cal">Calories brûlées (kCal)</li>
        </ul>
      </div>

      {/* CHART */}
      <div className="activity-chart__container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={activity} barGap={8} barSize={7}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* Axe des jours */}
            <XAxis dataKey="day" tickLine={false} axisLine={false} />

            {/* Axe du poids (kg) */}
            <YAxis
              yAxisId="kilogram"
              orientation="right"
              axisLine={false}
              tickLine={false}
              domain={[69, "dataMax+1"]}
              tickCount={3}
            />

            {/* Axe des calories (masqué) */}
            <YAxis yAxisId="calories" hide />

            {/* Tooltip personnalisé */}
            <Tooltip content={<CustomTooltip />} />

            {/* Barres du poids */}
            <Bar
              yAxisId="kilogram"
              dataKey="kilogram"
              fill="#282D30"
              radius={[3, 3, 0, 0]}
            />

            {/* Barres des calories */}
            <Bar
              yAxisId="calories"
              dataKey="calories"
              fill="#E60000"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    }),
  ),
};

export default ActivityChart;
