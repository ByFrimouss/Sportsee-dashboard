/**
 * KeyDataCard Component
 * --------------------------------------------------------------------
 * Carte affichant une donnée clé de l'utilisateur (calories, protéines, etc.).
 * Ce composant est réutilisable et stylé dynamiquement en fonction du type de donnée.
 *
 * Il est utilisé dans la colonne de droite du dashboard utilisateur.
 */

import PropTypes from "prop-types";
import "./KeyDataCard.scss";

/**
 * @param {Object} props
 * @param {string} props.icon - Chemin de l'icône associée à la donnée
 * @param {number} props.value - Valeur numérique à afficher
 * @param {string} props.unit - Unité de la valeur (kCal, g, etc.)
 * @param {string} props.label - Libellé de la donnée
 * @param {string} props.type - Type de donnée (utilisé pour le style CSS)
 * @returns {JSX.Element} Carte de donnée utilisateur
 */

function KeyDataCard({ icon, value, unit, label, type }) {
  return (
    <div className={`key-data-card key-data-card--${type}`}>
      <div className="key-data-card__icon">
        <img src={icon} alt={label} />
      </div>

      <div className="key-data-card__content">
        <p className="key-data-card__value">
          {value.toLocaleString("fr-FR")}
          <span className="unit">{unit}</span>
        </p>

        <p className="key-data-card__label">{label}</p>
      </div>
    </div>
  );
}
KeyDataCard.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default KeyDataCard;
