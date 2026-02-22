// import React, { useState, useEffect } from "react";
// import { 
//   Search, 
//   LayoutDashboard, 
//   Users, 
//   Settings, 
//   LogOut,
//   ChevronLeft, 
//   ChevronRight
// } from "lucide-react";
// import { getTeacherSummary, getWeeklyTrends } from "./services/api";
// import TrendsChart from "./components/TrendsChart";
// import TeacherDetailModal from "./components/TeacherDetailModal";

// function App() {
//   const [teachers, setTeachers] = useState([]);
//   const [trends, setTrends] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState("This Week");
//   const [page, setPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [selectedTeacherId, setSelectedTeacherId] = useState(null);

//   useEffect(() => {
//     const loadTrends = async () => {
//       try {
//         const response = await getWeeklyTrends();
//         setTrends(response.data);
//       } catch (err) { console.error(err); }
//     };
//     loadTrends();
//   }, []);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => { loadData(); }, 400);
//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, page]);

//   useEffect(() => { setPage(1); }, [searchTerm]);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const response = await getTeacherSummary(searchTerm, page);
//       setTeachers(response.data.results || []);
//       setTotalCount(response.data.count || 0);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#F9FAFB] font-sans text-gray-900 overflow-hidden">
      
//       {/* --- SIDEBAR --- */}
//       <aside className="w-[260px] bg-[#111827] flex flex-col justify-between flex-shrink-0">
//         <div>
//           <div className="h-20 flex items-center px-8 border-b border-gray-800">
//             <h1 className="text-xl font-bold text-white tracking-widest uppercase">Savra</h1>
//           </div>
//           <nav className="p-4 space-y-1 mt-4">
//             <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium">
//               <LayoutDashboard size={18} />
//               Insights
//             </a>
//             <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
//               <Users size={18} />
//               Teachers
//             </a>
//           </nav>
//         </div>
//         <div className="p-4 space-y-1 mb-4">
//           <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
//             <Settings size={18} />
//             Settings
//           </a>
//           <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
//             <LogOut size={18} />
//             Logout
//           </a>
//         </div>
//       </aside>

//       {/* --- MAIN CONTENT --- */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-8 max-w-7xl mx-auto space-y-6">
          
//           {/* Header */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Admin Companion</h2>
//             <p className="text-sm text-gray-500 mt-1">See What's Happening Across your School</p>
//           </div>

//           {/* Controls Row (Search & Dropdowns) */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
//             <div className="relative w-full sm:max-w-md">
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search teachers..."
//                 className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex gap-3 w-full sm:w-auto">
//               <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]">
//                 <option>Grade</option>
//                 <option>Grade 6</option>
//                 <option>Grade 7</option>
//                 <option>Grade 8</option>
//               </select>
//               <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]">
//                 <option>All Subjects</option>
//                 <option>Mathematics</option>
//                 <option>Science</option>
//               </select>
//             </div>
//           </div>

//           {/* Content Area Box (White Background matching the reference) */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            
//             {/* Time Filter Pills */}
//             <div className="flex gap-2">
//               {["This Week", "This Month", "This Year"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setTimeRange(tab)}
//                   className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
//                     timeRange === tab 
//                       ? "bg-gray-900 text-white" 
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Chart Area */}
//             <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
//               <TrendsChart data={trends} />
//             </div>

//             {/* Table Area */}
//             <div className="border border-gray-200 rounded-lg overflow-hidden">
//               <table className="w-full text-left border-collapse">
//                 <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase">
//                   <tr>
//                     <th className="px-6 py-3">Teacher</th>
//                     <th className="px-6 py-3 text-center">Lessons</th>
//                     <th className="px-6 py-3 text-center">Quizzes</th>
//                     <th className="px-6 py-3 text-center">Assessments</th>
//                     <th className="px-6 py-3 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 text-sm">
//                   {loading ? (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-12 text-center text-gray-500">Loading data...</td>
//                     </tr>
//                   ) : teachers.length > 0 ? (
//                     teachers.map((t) => (
//                       <tr key={t.teacher_id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4">
//                           <div className="font-medium text-gray-900">{t.teacher_name}</div>
//                           <div className="text-gray-500 text-xs mt-0.5">{t.teacher_id}</div>
//                         </td>
//                         <td className="px-6 py-4 text-center text-gray-700">{t.lessons}</td>
//                         <td className="px-6 py-4 text-center text-gray-700">{t.quizzes}</td>
//                         <td className="px-6 py-4 text-center text-gray-700">{t.assessments}</td>
//                         <td className="px-6 py-4 text-right">
//                           <button 
//                             onClick={() => setSelectedTeacherId(t.teacher_id)}
//                             className="text-blue-600 hover:text-blue-800 font-medium text-sm"
//                           >
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No teachers found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {/* Pagination */}
//               <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
//                 <div className="text-sm text-gray-500">
//                   Page <span className="font-medium text-gray-900">{page}</span> of {Math.ceil(totalCount / 10) || 1}
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                     disabled={page === 1}
//                     className="p-1.5 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button
//                     onClick={() => setPage((p) => p + 1)}
//                     disabled={page >= Math.ceil(totalCount / 10)}
//                     className="p-1.5 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {selectedTeacherId && (
//         <TeacherDetailModal
//           teacherId={selectedTeacherId}
//           onClose={() => setSelectedTeacherId(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { 
  Search, 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { getTeacherSummary, getWeeklyTrends } from "./services/api";
import TrendsChart from "./components/TrendsChart";
import TeacherDetailModal from "./components/TeacherDetailModal";

function App() {
  // --- Data States ---
  const [teachers, setTeachers] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- Filter States (Now wired up!) ---
  const [searchTerm, setSearchTerm] = useState("");
  const [grade, setGrade] = useState("All Grades");
  const [subject, setSubject] = useState("All Subjects");
  const [timeRange, setTimeRange] = useState("This Year"); // Defaulted to This Year to ensure we catch all CSV data initially
  
  // --- Pagination & UI States ---
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  // Re-fetch Chart Data when filters change
  useEffect(() => {
    const loadTrends = async () => {
      try {
        const response = await getWeeklyTrends(grade, subject, timeRange);
        setTrends(response.data);
      } catch (err) { console.error("Trends Error:", err); }
    };
    loadTrends();
  }, [grade, subject, timeRange]);

  // Re-fetch Table Data when filters, search, or page change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadData();
    }, 400); // 400ms debounce protects the server from spam

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, page, grade, subject, timeRange]);

  // Reset to page 1 if any filter changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, grade, subject, timeRange]);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await getTeacherSummary(searchTerm, page, grade, subject, timeRange);
      setTeachers(response.data.results || []);
      setTotalCount(response.data.count || 0);
    } catch (error) {
      console.error("Summary Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans text-gray-900 overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-[260px] bg-[#111827] flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-gray-800">
            <h1 className="text-lg font-bold text-white tracking-widest uppercase">Teacher Insight Dashboard</h1>
          </div>
          <nav className="p-4 space-y-1 mt-4">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium">
              <LayoutDashboard size={18} />
              Insights
            </a>
          </nav>
        </div>
        <div className="p-4 space-y-1 mb-4">
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
            <Settings size={18} />
            Settings
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
            <LogOut size={18} />
            Logout
          </a>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto space-y-6">
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Companion</h2>
            <p className="text-sm text-gray-500 mt-1">See What's Happening Across your School</p>
          </div>

          {/* Controls Row (Fully Functional Now) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <select 
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px] cursor-pointer"
              >
                <option>All Grades</option>
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
              </select>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px] cursor-pointer"
              >
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>Social Studies</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            
            {/* Time Filter Pills (Fully Functional Now) */}
            <div className="flex gap-2">
              {["This Week", "This Month", "This Year"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTimeRange(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    timeRange === tab 
                      ? "bg-gray-900 text-white shadow-sm" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Chart Area */}
            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
              <TrendsChart data={trends} />
            </div>

            {/* Table Area */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-semibold uppercase">
                  <tr>
                    <th className="px-6 py-3">Teacher</th>
                    <th className="px-6 py-3 text-center">Lessons</th>
                    <th className="px-6 py-3 text-center">Quizzes</th>
                    <th className="px-6 py-3 text-center">Assessments</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">Syncing database...</td>
                    </tr>
                  ) : teachers.length > 0 ? (
                    teachers.map((t) => (
                      <tr key={t.teacher_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{t.teacher_name}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{t.teacher_id}</div>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-700">{t.lessons}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{t.quizzes}</td>
                        <td className="px-6 py-4 text-center text-gray-700">{t.assessments}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedTeacherId(t.teacher_id)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        No records found matching your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Page <span className="font-medium text-gray-900">{page}</span> of {Math.ceil(totalCount / 10) || 1}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= Math.ceil(totalCount / 10) || teachers.length === 0}
                    className="p-1.5 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedTeacherId && (
        <TeacherDetailModal
          teacherId={selectedTeacherId}
          onClose={() => setSelectedTeacherId(null)}
        />
      )}
    </div>
  );
}

export default App;