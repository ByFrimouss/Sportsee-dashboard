class ActivityModel {
  constructor(session, index) {
    this.day = index + 1;
    this.kilogram = session.kilogram;
    this.calories = session.calories;
  }
}

export default ActivityModel;
