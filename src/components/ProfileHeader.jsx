import "./ProfileHeader.scss";

function ProfileHeader({ firstName }) {
  return (
    <header className="profile-header">
      <h1>
        Bonjour <span className="profile-header__name">{firstName}</span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </header>
  );
}

export default ProfileHeader;
