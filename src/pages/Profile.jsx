import { useEffect, useState } from "react";
import { mockUser } from "../data/MockData";
import ProfileHeader from "../components/ProfileHeader";
import ActivityChart from "../components/Charts/ActivityChart";
import AverageSessionsChart from "../components/Charts/AverageSessionsChart";
import PerformanceRadar from "../components/Charts/PerformanceRadar";
import ScoreChart from "../components/Charts/ScoreChart";
import KeyDataCard from "../components/Cards/KeyDataCard";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(mockUser);
  }, []);

  if (!user) return null;

  return (
    <main>
      <ProfileHeader firstName={user.userInfos.firstName} />

      <section>
        <div>
          <ActivityChart />
          <AverageSessionsChart />
          <PerformanceRadar />
          <ScoreChart />
        </div>

        <aside>
          <KeyDataCard label="Calories" value={user.keyData.calorieCount} />
          <KeyDataCard label="Protéines" value={user.keyData.proteinCount} />
          <KeyDataCard
            label="Glucides"
            value={user.keyData.carbohydrateCount}
          />
          <KeyDataCard label="Lipides" value={user.keyData.lipidCount} />
        </aside>
      </section>
    </main>
  );
}

export default Profile;
