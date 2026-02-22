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