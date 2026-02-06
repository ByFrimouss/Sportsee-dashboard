/**
 * ChartCard Component
 * --------------------------------------------------------------------
 * Composant conteneur générique utilisé pour encapsuler les graphiques
 * et permet d’uniformiser l’affichage des charts sur le dashboard.
 */

import PropTypes from "prop-types";
import "./ChartCard.scss";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du graphique
 * @param {string} [props.title] - Titre optionnel de la carte
 * @param {string} [props.className] - Classe CSS additionnelle
 * @returns {JSX.Element} Carte de graphique
 */

function ChartCard({ children, title, className = "" }) {
  return (
    <div className={`chart-card ${className}`}>
      {title && <h2 className="chart-card__title">{title}</h2>}
      <div className="chart-card__content">{children}</div>
    </div>
  );
}

ChartCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default ChartCard;
