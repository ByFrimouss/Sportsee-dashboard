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

function PerformanceRadar() {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    async function fetchPerformance() {
      const data = await getUserPerformance(12);

      const formattedData = data.data.map(
        (item) => new PerformanceModel(item, data.kind)
      );

      setPerformance(formattedData);
    }

    fetchPerformance();
  }, []);

  if (!performance.length) return null;

  return (
    <div className="performance-radar">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={performance}>
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
