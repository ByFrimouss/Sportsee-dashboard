import ProfileHeader from "../components/ProfileHeader";
import ActivityChart from "../components/Charts/ActivityChart";
import AverageSessionsChart from "../components/Charts/AverageSessionsChart";
import PerformanceRadar from "../components/Charts/PerformanceRadar";
import ScoreChart from "../components/Charts/ScoreChart";
import KeyDataCard from "../components/Cards/KeyDataCard";

function Profile() {
  return (
    <main>
      <ProfileHeader />

      <section>
        <div>
          <ActivityChart />
          <AverageSessionsChart />
          <PerformanceRadar />
          <ScoreChart />
        </div>

        <aside>
          <KeyDataCard label="Calories" />
          <KeyDataCard label="Protéines" />
          <KeyDataCard label="Glucides" />
          <KeyDataCard label="Lipides" />
        </aside>
      </section>
    </main>
  );
}

export default Profile;
