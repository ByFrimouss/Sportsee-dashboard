import "./KeyDataCard.scss";

function KeyDataCard({ icon, value, unit, label, type }) {
  return (
    <div className={`key-data-card key-data-card--${type}`}>
      <div className="key-data-card__icon">
        <img src={icon} alt={label} />
      </div>

      <div className="key-data-card__content">
        <p className="key-data-card__value">
          {value}
          {unit}
        </p>
        <p className="key-data-card__label">{label}</p>
      </div>
    </div>
  );
}

export default KeyDataCard;
