
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, Users, DollarSign, BookOpen, Clock, Plus, Filter, MoreVertical, Star } from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 4500 },
  { name: 'Feb', revenue: 5200 },
  { name: 'Mar', revenue: 4800 },
  { name: 'Apr', revenue: 6100 },
  { name: 'May', revenue: 5900 },
  { name: 'Jun', revenue: 7200 },
];

const enrollmentData = [
  { name: 'React Patterns', students: 1250, color: '#6366f1' },
  { name: 'Next.js 14', students: 3200, color: '#8b5cf6' },
  { name: 'UI/UX Fundamentals', students: 850, color: '#ec4899' },
];

const InstructorDashboard = () => {
  const { user, courses } = useStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Instructor Hub</h1>
          <p className="text-slate-500 mt-1">Monitor your course performance and student engagement.</p>
        </div>
        <button 
          onClick={() => navigate('/instructor/create-course')}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-2" /> Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "$32,450", icon: DollarSign, color: "bg-emerald-500", trend: "+14.2%" },
          { title: "Total Students", value: "5,300", icon: Users, color: "bg-indigo-600", trend: "+8.1%" },
          { title: "Course Rating", value: "4.8", icon: Star, color: "bg-amber-500", trend: "+0.2%" },
          { title: "Watch Time", value: "1,240h", icon: Clock, color: "bg-rose-500", trend: "+5.4%" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
                <stat.icon size={24} />
              </div>
              <span className="text-green-500 text-xs font-bold">{stat.trend}</span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-2xl font-black dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold dark:text-white">Monthly Revenue</h3>
            <div className="flex space-x-2">
              <button className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-slate-500">2023</button>
              <button className="text-xs font-bold bg-indigo-600 px-3 py-1.5 rounded-lg text-white">2024</button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold dark:text-white mb-8">Enrollment Split</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={enrollmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="students"
                >
                  {enrollmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <p className="text-2xl font-black dark:text-white">5.3k</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Students</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
             {enrollmentData.map((item) => (
               <div key={item.name} className="flex justify-between items-center">
                 <div className="flex items-center">
                   <div className="w-2 h-2 rounded-full mr-3" style={{ background: item.color }} />
                   <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                 </div>
                 <span className="text-xs font-bold dark:text-white">{Math.round((item.students / 5300) * 100)}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <h3 className="text-xl font-bold dark:text-white">My Active Courses</h3>
           <div className="flex space-x-2">
              <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                <Filter size={18} />
              </button>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Course Name</th>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Enrolled</th>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Revenue</th>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={course.thumbnail} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-sm font-bold dark:text-white">{course.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{course.enrolled.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-black text-indigo-600">${(course.enrolled * course.price * 0.7).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-500 text-[10px] font-black rounded uppercase tracking-widest border border-green-100 dark:border-green-900/30">Active</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
