import { useEffect, useState } from "react";
// import { mockUser } from "../data/MockData";
import { getUser } from "../services/userService";
import UserModel from "../models/UserModel";
import ProfileHeader from "../components/ProfileHeader";
import KeyDataCard from "../components/Cards/KeyDataCard";
import ActivityChart from "../components/Charts/ActivityChart";

// Cards
import calorieIcon from "../assets/calories-icon.png";
import proteinIcon from "../assets/chicken.svg";
import carbIcon from "../assets/carbs-icon.png";
import lipidIcon from "../assets/fat-icon.png";

import AverageSessionsChart from "../components/Charts/AverageSessionsChart";
import PerformanceRadar from "../components/Charts/PerformanceRadar";
import ScoreChart from "../components/Charts/ScoreChart";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser(12);
      const formattedUser = new UserModel(userData);
      setUser(formattedUser);
    }

    fetchUser();
  }, []);
  if (!user) return <p>Chargement...</p>;

  return (
    <main>
      <ProfileHeader firstName={user.firstName} />

      <section>
        <ActivityChart />
        <div className="secondary-charts">
          <AverageSessionsChart />
          <PerformanceRadar />
          <ScoreChart />
        </div>
        <aside className="key-data">
          <KeyDataCard
            icon={calorieIcon}
            value={user.keyData.calories}
            unit="kCal"
            label="Calories"
            type="calories"
          />

          <KeyDataCard
            icon={proteinIcon}
            value={user.keyData.proteins}
            unit="g"
            label="Protéines"
            type="proteins"
          />

          <KeyDataCard
            icon={carbIcon}
            value={user.keyData.carbs}
            unit="g"
            label="Glucides"
            type="carbs"
          />

          <KeyDataCard
            icon={lipidIcon}
            value={user.keyData.lipids}
            unit="g"
            label="Lipides"
            type="lipids"
          />
        </aside>
      </section>
    </main>
  );
}

export default Profile;
