/**
 * Modèle pour le RadarChart
 * Transforme les données API en format exploitable
 */
const KIND_TRANSLATION = {
  intensity: "Intensité",
  speed: "Vitesse",
  strength: "Force",
  endurance: "Endurance",
  energy: "Énergie",
  cardio: "Cardio",
};

class PerformanceModel {
  constructor(item, kinds) {
    this.value = item.value;

    // Cas API : kind est un nombre
    if (typeof item.kind === "number") {
      const englishKind = kinds[item.kind];
      this.kind = KIND_TRANSLATION[englishKind];
    }

    // Cas MOCK : kind est déjà une string
    if (typeof item.kind === "string") {
      this.kind = KIND_TRANSLATION[item.kind];
    }
  }
}

export default PerformanceModel;
