import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import ScoreModel from "../../models/ScoreModel";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

import "./ScoreChart.scss";

function ScoreChart() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function fetchScore() {
      const userData = await getUser(12);

      const userScore = userData.todayScore ?? userData.score;

      const formattedScore = new ScoreModel(userScore);
      setScore(formattedScore);
    }

    fetchScore();
  }, []);

  if (!score) return null;

  const data = [{ value: score.value }];

  return (
    <div className="score-chart">
      <h2>Score</h2>

      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="80%"
          data={data}
          startAngle={90}
          endAngle={90 + (score.value / 100) * 360}
        >
          <RadialBar dataKey="value" fill="#FF0000" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="score-chart__text">
        <span>{score.value}%</span>
        <p>
          de votre
          <br />
          objectif
        </p>
      </div>
    </div>
  );
}

export default ScoreChart;
