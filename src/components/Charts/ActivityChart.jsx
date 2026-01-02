import { useEffect, useState } from "react";
import { getUserActivity } from "../../services/userService";
import ActivityModel from "../../models/ActivityModel";

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

  console.log(activity);

  return (
    <div>
      <h2>Activité quotidienne</h2>
      <p>BarChart à venir</p>
    </div>
  );
}

export default ActivityChart;
