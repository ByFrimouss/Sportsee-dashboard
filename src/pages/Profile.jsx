import { useEffect, useState } from "react";
import { mockUser } from "../data/MockData";
import UserModel from "../models/UserModel";
import ProfileHeader from "../components/ProfileHeader";
// import ActivityChart from "../components/Charts/ActivityChart";
// import AverageSessionsChart from "../components/Charts/AverageSessionsChart";
// import PerformanceRadar from "../components/Charts/PerformanceRadar";
// import ScoreChart from "../components/Charts/ScoreChart";
import KeyDataCard from "../components/Cards/KeyDataCard";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const formattedUser = new UserModel(mockUser);
    setUser(formattedUser);
  }, []);

  if (!user) return null;

  return (
    <main>
      <ProfileHeader firstName={user.firstName} />

      <section>
        <aside>
          <KeyDataCard label="Calories" value={user.keyData.calories} />
          <KeyDataCard label="Protéines" value={user.keyData.proteins} />
          <KeyDataCard label="Glucides" value={user.keyData.carbs} />
          <KeyDataCard label="Lipides" value={user.keyData.lipids} />
        </aside>
      </section>
    </main>
  );
}

export default Profile;
