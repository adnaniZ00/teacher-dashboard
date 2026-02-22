// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const TrendsChart = ({ data }) => {
//   // Format the date from the backend (TruncWeek usually returns "2023-10-01")
//   const formatXAxis = (tickItem) => {
//     const date = new Date(tickItem);
//     return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-[400px]">
//       <h2 className="text-xl font-bold mb-4">Weekly Activity Trends</h2>
//       <ResponsiveContainer width="100%" height="90%">
//         <LineChart data={data}>
//           <CartesianGrid
//             strokeDasharray="3 3"
//             vertical={false}
//             stroke="#f0f0f0"
//           />
//           <XAxis
//             dataKey="week"
//             tickFormatter={formatXAxis}
//             stroke="#94a3b8"
//             fontSize={12}
//           />
//           <YAxis stroke="#94a3b8" fontSize={12} />
//           <Tooltip
//             contentStyle={{
//               borderRadius: "12px",
//               border: "none",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             }}
//           />
//           <Legend iconType="circle" />
//           <Line
//             type="monotone"
//             dataKey="lessons"
//             stroke="#4f46e5"
//             strokeWidth={3}
//             dot={false}
//             name="Lessons"
//           />
//           <Line
//             type="monotone"
//             dataKey="quizzes"
//             stroke="#9333ea"
//             strokeWidth={3}
//             dot={false}
//             name="Quizzes"
//           />
//           <Line
//             type="monotone"
//             dataKey="assessments"
//             stroke="#d97706"
//             strokeWidth={3}
//             dot={false}
//             name="Assessments"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TrendsChart;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TrendsChart = ({ data }) => {
  // Check if data exists and is an array to prevent "Cannot read property 'map' of undefined"
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          <p className="text-gray-400 text-sm">Processing activity trends...</p>
        </div>
      </div>
    );
  }

  const formatXAxis = (tickItem) => {
    try {
      const date = new Date(tickItem);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return tickItem;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-[400px]">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Weekly Activity Trends
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="week"
            tickFormatter={formatXAxis}
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
          <Line
            type="monotone"
            dataKey="lessons"
            stroke="#4f46e5"
            strokeWidth={4}
            dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6 }}
            name="Lessons"
          />
          <Line
            type="monotone"
            dataKey="quizzes"
            stroke="#9333ea"
            strokeWidth={4}
            dot={{ r: 4, fill: "#9333ea", strokeWidth: 2, stroke: "#fff" }}
            name="Quizzes"
          />
          <Line
            type="monotone"
            dataKey="assessments"
            stroke="#d97706"
            strokeWidth={4}
            dot={{ r: 4, fill: "#d97706", strokeWidth: 2, stroke: "#fff" }}
            name="Assessments"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;
