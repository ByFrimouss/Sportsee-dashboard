/**
 * Modèle pour le RadarChart
 * Transforme les données API en format exploitable
 */
class PerformanceModel {
  constructor(item, kinds) {
    this.value = item.value;
    this.kind = kinds[item.kind];
  }
}

export default PerformanceModel;
