export const mockUser = [
  {
    id: 12,
    userInfos: {
      firstName: "Karl",
      lastName: "Dovineau",
      age: 31,
    },
    todayScore: 0.12,
    keyData: {
      calorieCount: 1930,
      proteinCount: 155,
      carbohydrateCount: 290,
      lipidCount: 50,
    },
  },
];

export const mockActivity = [
  { day: "2023-12-01", kilogram: 80, calories: 240 },
  { day: "2023-12-02", kilogram: 79, calories: 220 },
  { day: "2023-12-03", kilogram: 78, calories: 280 },
];

export const mockAverageSessions = [
  { day: 1, sessionLength: 30 },
  { day: 2, sessionLength: 40 },
];

export const mockPerformance = {
  data: [
    { kind: "Cardio", value: 80 },
    { kind: "Endurance", value: 120 },
    { kind: "Strength", value: 140 },
  ],
};
