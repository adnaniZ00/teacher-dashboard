// import React, { useEffect, useState } from "react";
// import { X, BookOpen, PenTool, CheckCircle } from "lucide-react";
// import { getTeacherDetail } from "../services/api";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// const COLORS = ["#4f46e5", "#9333ea", "#d97706", "#10b981"];

// const TeacherDetailModal = ({ teacherId, onClose }) => {
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (teacherId) {
//       const loadDetails = async () => {
//         try {
//           const res = await getTeacherDetail(teacherId);
//           setDetails(res.data);
//         } catch (err) {
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       loadDetails();
//     }
//   }, [teacherId]);

//   if (!teacherId) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
//       <div className="bg-white w-full max-w-md h-full shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
//         >
//           <X size={24} />
//         </button>

//         {loading ? (
//           <div className="h-full flex items-center justify-center">
//             Loading...
//           </div>
//         ) : (
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {details.teacher_name}
//               </h2>
//               <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mt-1">
//                 ID: {details.teacher_id}
//               </p>
//             </div>

//             {/* Quick Stats Grid */}
//             <div className="grid grid-cols-3 gap-4">
//               <div className="bg-blue-50 p-3 rounded-xl text-center">
//                 <BookOpen className="mx-auto text-blue-600 mb-1" size={20} />
//                 <span className="block text-xl font-bold">
//                   {details.totals.lessons}
//                 </span>
//                 <span className="text-[10px] text-blue-600 uppercase font-bold">
//                   Lessons
//                 </span>
//               </div>
//               <div className="bg-purple-50 p-3 rounded-xl text-center">
//                 <PenTool className="mx-auto text-purple-600 mb-1" size={20} />
//                 <span className="block text-xl font-bold">
//                   {details.totals.quizzes}
//                 </span>
//                 <span className="text-[10px] text-purple-600 uppercase font-bold">
//                   Quizzes
//                 </span>
//               </div>
//               <div className="bg-amber-50 p-3 rounded-xl text-center">
//                 <CheckCircle
//                   className="mx-auto text-amber-600 mb-1"
//                   size={20}
//                 />
//                 <span className="block text-xl font-bold">
//                   {details.totals.assessments}
//                 </span>
//                 <span className="text-[10px] text-amber-600 uppercase font-bold">
//                   Assessed
//                 </span>
//               </div>
//             </div>

//             {/* Subject Distribution Chart */}
//             <div className="pt-6 border-t border-gray-100">
//               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
//                 Subject Distribution
//               </h3>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={details.subject_distribution}
//                       dataKey="count"
//                       nameKey="subject"
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={80}
//                       paddingAngle={5}
//                     >
//                       {details.subject_distribution.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherDetailModal;


import React, { useState, useEffect } from "react";
import { X, BookOpen, FileText, CheckSquare, BarChart2 } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getTeacherDetail } from "../services/api";

const COLORS = ["#3B82F6", "#8B5CF6", "#F59E0B", "#10B981", "#EF4444"];

function TeacherDetailModal({ teacherId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTeacherDetail(teacherId);
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch teacher details:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchData();
    }
  }, [teacherId]);

  // Handle the "Loading" state so React doesn't crash trying to read undefined data
  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Loading teacher insights...</p>
        </div>
      </div>
    );
  }

  // Handle API errors safely
  if (error || !data) {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full">
          <p className="text-red-500 font-medium mb-4">{error || "Something went wrong."}</p>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Map the Django subject distribution to what Recharts expects
  const pieData = data.subject_distribution.map((item) => ({
    name: item.subject,
    value: item.count,
  }));

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-end z-50 transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{data.teacher_name}</h2>
            <p className="text-xs text-slate-500 font-mono mt-1">ID: {data.teacher_id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Stats Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Total Output</h3>
            <div className="grid grid-cols-2 gap-4">
              
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col justify-center items-center text-center">
                <BookOpen size={24} className="text-blue-600 mb-2" />
                <span className="text-2xl font-black text-blue-900">{data.total_lessons}</span>
                <span className="text-xs font-bold text-blue-600 uppercase mt-1">Lessons</span>
              </div>
              
              <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex flex-col justify-center items-center text-center">
                <CheckSquare size={24} className="text-purple-600 mb-2" />
                <span className="text-2xl font-black text-purple-900">{data.total_quizzes}</span>
                <span className="text-xs font-bold text-purple-600 uppercase mt-1">Quizzes</span>
              </div>
              
              <div className="col-span-2 bg-amber-50 border border-amber-100 p-4 rounded-xl flex flex-col justify-center items-center text-center">
                <FileText size={24} className="text-amber-600 mb-2" />
                <span className="text-2xl font-black text-amber-900">{data.total_assessments}</span>
                <span className="text-xs font-bold text-amber-600 uppercase mt-1">Assessments</span>
              </div>
              
            </div>
          </div>

          {/* Subject Distribution Chart */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BarChart2 size={16} />
              Subject Distribution
            </h3>
            
            {pieData.length > 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                {/* Fixed height container to prevent Recharts warning */}
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Custom Legend */}
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      {entry.name} ({entry.value})
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 text-center">
                <p className="text-slate-500 text-sm">No subject data available.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default TeacherDetailModal;