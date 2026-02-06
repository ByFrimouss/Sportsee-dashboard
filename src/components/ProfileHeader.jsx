/**
 * ProfileHeader Component
 * --------------------------------------------------------------------
 * En-tête de la page profil utilisateur.
 * Affiche un message de bienvenue personnalisé avec le prénom
 * ainsi qu'un message de motivation.
 *
 */

import PropTypes from "prop-types";
import "./ProfileHeader.scss";

/**
 * @param {Object} props
 * @param {string} props.firstName - Prénom de l'utilisateur
 * @returns {JSX.Element} En-tête de la page profil
 */

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

ProfileHeader.propTypes = {
  firstName: PropTypes.string.isRequired,
};

export default ProfileHeader;
