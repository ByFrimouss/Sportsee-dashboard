class UserModel {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.userInfos.firstName;
    this.lastName = data.userInfos.lastName;
    this.age = data.userInfos.age;

    // gestion des deux cas possibles API
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
