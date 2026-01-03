/**
 * Modèle pour le score journalier
 * Gère todayScore OU score selon l'utilisateur
 */
class ScoreModel {
  constructor(score) {
    this.value = score * 100;
  }
}

export default ScoreModel;
