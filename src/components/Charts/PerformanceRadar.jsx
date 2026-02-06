/**
 * PerformanceRadar Component
 * --------------------------------------------------------------------
 * Graphique radar affichant les performances de l'utilisateur
 * par type d'activité (cardio, endurance, force, etc.).
 */

import { useEffect, useState } from "react";
import { getUserPerformance } from "../../services/userService";
import PerformanceModel from "../../models/PerformanceModel";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import "./PerformanceRadar.scss";

/**
 * @returns {JSX.Element|null} Graphique radar des performances utilisateur
 */

function PerformanceRadar() {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    /**
     * Récupère et formate les données de performance utilisateur
     */

    async function fetchPerformance() {
      const data = await getUserPerformance(12);

      const formattedData = data.data
        .map((item) => new PerformanceModel(item, data.kind))
        .filter((item) => item.kind && item.value !== undefined);

      // Ordre souhaité : Intensité, Vitesse, Force, Endurance, Énergie, Cardio
      const orderedKinds = [
        "Intensité",
        "Vitesse",
        "Force",
        "Endurance",
        "Énergie",
        "Cardio",
      ];

      // Réorganise les données selon l'ordre défini
      const orderedData = orderedKinds
        .map((kind) => formattedData.find((item) => item.kind === kind))
        .filter(Boolean); // Retire les éventuelles valeurs undefined

      setPerformance(orderedData);
    }

    fetchPerformance();
  }, []);

  if (!performance.length) return null;

  return (
    <div className="performance-radar">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={performance} outerRadius="65%">
          <PolarGrid stroke="#FFFFFF" radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            tick={{ fill: "#FFFFFF", fontSize: 10 }}
          />

          <Radar dataKey="value" fill="#FF0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceRadar;
