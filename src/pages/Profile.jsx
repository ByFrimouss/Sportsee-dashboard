import { useEffect, useState } from "react";
// import { mockUser } from "../data/MockData";
import { getUser } from "../services/userService";
import UserModel from "../models/UserModel";
import ProfileHeader from "../components/ProfileHeader";
import KeyDataCard from "../components/Cards/KeyDataCard";
import ActivityChart from "../components/Charts/ActivityChart";

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
  if (!user) return null;

  return (
    <main>
      <ProfileHeader firstName={user.firstName} />

      <section>
        <ActivityChart />
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
