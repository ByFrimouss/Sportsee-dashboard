/**
 * Modèle pour les sessions moyennes
 * Permet de standardiser les données API
 */
class AverageSessionsModel {
  constructor(session, index) {
    // Axe X : jours de la semaine
    const days = ["L", "M", "M", "J", "V", "S", "D"];

    this.day = days[index];
    this.sessionLength = session.sessionLength;
  }
}

export default AverageSessionsModel;
