import { useEffect, useState } from "react";
import { getTeacherSummary, getWeeklyTrends } from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchWeekly();
  }, []);

  const fetchSummary = async () => {
    const res = await getTeacherSummary();
    setSummary(res.data.results); // because pagination
  };

  const fetchWeekly = async () => {
    const res = await getWeeklyTrends();
    setWeeklyData(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teacher Insights Dashboard</h1>

      <h2>Summary</h2>
      <ul>
        {summary.map((teacher) => (
          <li key={teacher.teacher_id}>
            {teacher.teacher_name} — Lessons: {teacher.lessons}, Quizzes:{" "}
            {teacher.quizzes}, Assessments: {teacher.assessments}
          </li>
        ))}
      </ul>

      <h2>Weekly Trends</h2>
      <pre>{JSON.stringify(weeklyData, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;
