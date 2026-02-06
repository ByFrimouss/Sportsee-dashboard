/**
 * UserModel
 * Permet de standardiser les données utilisateur venant de l'API
 * afin de fournir une structure unique aux composants React.
 */

class UserModel {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.userInfos.firstName;
    this.lastName = data.userInfos.lastName;
    this.age = data.userInfos.age;

    // L'API peut renvoyer todayScore ou score selon l'utilisateur
    this.score = data.todayScore ?? data.score;

    this.keyData = {
      calories: data.keyData.calorieCount,
      proteins: data.keyData.proteinCount,
      carbs: data.keyData.carbohydrateCount,
      lipids: data.keyData.lipidCount,
    };
  }
}

export default UserModel;
