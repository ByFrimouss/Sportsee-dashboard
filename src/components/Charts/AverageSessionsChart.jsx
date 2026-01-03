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

function AverageSessionsChart() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const data = await getAverageSessions(12);

      const formattedData = data.map(
        (session, index) => new AverageSessionsModel(session, index)
      );

      setSessions(formattedData);
    }

    fetchSessions();
  }, []);

  if (!sessions.length) return null;

  return (
    <div className="average-sessions">
      <h2>Durée moyenne des sessions</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sessions}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#fff", opacity: 0.6 }}
          />

          <YAxis hide />

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

          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsChart;
