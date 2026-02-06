/**
 * Profile page
 * ----------------
 * Page principale du tableau de bord utilisateur.
 * Elle est responsable de :
 * - récupérer les données utilisateur via les services
 * - formater les données à l’aide du UserModel
 * - transmettre les données aux composants enfants (charts, cards, header)
 *
 * Cette page correspond à la vue "profil utilisateur" définie dans la maquette SportSee.
 */

import { useEffect, useState } from "react";
// import { mockUser } from "../data/MockData";
import { getUser } from "../services/userService";
import UserModel from "../models/UserModel";
import ProfileHeader from "../components/ProfileHeader";
import KeyDataCard from "../components/Cards/KeyDataCard";

// Icons des cartes de données clés
import calorieIcon from "../assets/calories-icon.png";
import proteinIcon from "../assets/chicken.svg";
import carbIcon from "../assets/carbs-icon.png";
import lipidIcon from "../assets/fat-icon.png";

// Composants graphiques
import ActivityChart from "../components/Charts/ActivityChart";
import AverageSessionsChart from "../components/Charts/AverageSessionsChart";
import PerformanceRadar from "../components/Charts/PerformanceRadar";
import ScoreChart from "../components/Charts/ScoreChart";
import ChartCard from "../components/Charts/ChartCard";
import "./Profile.scss";

/**
 * @returns {JSX.Element} Page profil utilisateur
 */

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
    <main className="dashboard">
      <ProfileHeader firstName={user.firstName} />

      <section className="dashboard__content">
        {/* COLONNE GAUCHE */}
        <div className="dashboard__charts">
          <ChartCard className="chart-card--activity">
            <ActivityChart />
          </ChartCard>

          <div className="secondary-charts">
            <ChartCard>
              <AverageSessionsChart />
            </ChartCard>
            <ChartCard>
              <PerformanceRadar />
            </ChartCard>
            <ChartCard>
              <ScoreChart />
            </ChartCard>
          </div>
        </div>

        {/* COLONNE DROITE */}
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
