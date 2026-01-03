import { useEffect, useState } from "react";
import { getUserActivity } from "../../services/userService";
import ActivityModel from "../../models/ActivityModel";
import "./ActivityChart.scss";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function ActivityChart() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    async function fetchActivity() {
      const sessions = await getUserActivity(12);
      const formattedData = sessions.map(
        (session, index) => new ActivityModel(session, index)
      );
      setActivity(formattedData);
    }

    fetchActivity();
  }, []);

  if (!activity.length) return null;

  return (
    <div className="activity-chart">
      <h2>Activité quotidienne</h2>

      <div className="activity-chart__container">
        <BarChart
          width={835}
          height={320}
          data={activity}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis yAxisId="kilogram" orientation="right" />
          <YAxis yAxisId="calories" orientation="left" hide />
          <Tooltip />
          <Bar
            yAxisId="kilogram"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </div>
    </div>
  );
}
export default ActivityChart;
