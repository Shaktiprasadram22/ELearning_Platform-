
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, Clock, Book, Target, Zap, Trophy, Star, ChevronRight, Sparkles, Medal } from 'lucide-react';

const statsData = [
  { name: 'Mon', hours: 2.5, xp: 200 },
  { name: 'Tue', hours: 3.8, xp: 450 },
  { name: 'Wed', hours: 1.2, xp: 150 },
  { name: 'Thu', hours: 4.5, xp: 600 },
  { name: 'Fri', hours: 2.9, xp: 350 },
  { name: 'Sat', hours: 5.2, xp: 800 },
  { name: 'Sun', hours: 1.5, xp: 200 },
];

const StatCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 dark:text-white">{value}</h3>
        <p className="text-green-500 text-xs mt-1 font-semibold flex items-center">
          <TrendingUp size={14} className="mr-1" /> {subtitle}
        </p>
      </div>
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, courses, enrolledCourseIds, setActiveCourse } = useStore();
  const navigate = useNavigate();

  // Filter courses to show only enrolled ones
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const handleResume = (course: any) => {
    setActiveCourse(course);
    navigate(`/course/${course.id}`);
  };

  const nextLevelXP = Math.pow(user?.level || 1, 2) * 100;
  const currentLevelXP = Math.pow((user?.level || 1) - 1, 2) * 100;
  const progress = ((user?.xp || 0) - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white flex items-center">
            Welcome back, {user?.name}! 👋
            {user?.role === 'STUDENT' && <span className="ml-3 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full text-xs font-black uppercase tracking-widest border border-amber-100 dark:border-amber-900/30">Lvl {user?.level}</span>}
          </h1>
          <p className="text-slate-500 mt-1">You've completed 75% of your weekly goal.</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
            <Clock size={16} className="mr-2 text-indigo-600" /> View History
          </button>
          <button 
            onClick={() => navigate('/achievements')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none flex items-center hover:scale-105 transition-transform"
          >
            <Trophy size={16} className="mr-2" /> Achievements
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total XP" value={user?.xp.toLocaleString()} subtitle="+12% from last week" icon={Zap} color="bg-amber-500" />
        <StatCard title="Course Progress" value={enrolledCourses.length} subtitle={`${enrolledCourses.length} active courses`} icon={Book} color="bg-indigo-600" />
        <StatCard title="Study Hours" value="124h" subtitle="+5h vs average" icon={Clock} color="bg-violet-600" />
        <StatCard title="Current Streak" value={`${user?.streak} Days`} subtitle="Keep it up!" icon={TrendingUp} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* XP Progress Card */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
               <Sparkles size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight">Level {user?.level} Progress</h3>
                      <p className="text-indigo-100 text-sm mt-1">Next Level in {Math.round(nextLevelXP - (user?.xp || 0))} XP</p>
                    </div>
                    <span className="text-2xl font-black">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
               </div>
               <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 text-center min-w-[120px]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Total XP</p>
                  <p className="text-2xl font-black">{user?.xp.toLocaleString()}</p>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold dark:text-white">Learning Activity</h3>
              <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-2 py-1 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statsData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                  />
                  <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Upcoming Classes</h3>
            <div className="space-y-6">
              {[
                { time: '10:30 AM', title: 'React Performance', instructor: 'Sarah Drasner', color: 'bg-indigo-100 text-indigo-600' },
                { time: '02:00 PM', title: 'Typography Workshop', instructor: 'Gary Simon', color: 'bg-violet-100 text-violet-600' },
                { time: '04:15 PM', title: 'Backend with Prisma', instructor: 'Lee Robinson', color: 'bg-emerald-100 text-emerald-600' }
              ].map((cls, idx) => (
                <div key={idx} className="flex space-x-4 items-start group cursor-pointer">
                  <div className={`p-3 rounded-2xl ${cls.color} font-bold text-xs whitespace-nowrap`}>
                    {cls.time}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors">{cls.title}</p>
                    <p className="text-xs text-slate-500">by {cls.instructor}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors">
                View All Schedule
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold dark:text-white">Recent Badges</h3>
              <button onClick={() => navigate('/achievements')} className="text-xs font-bold text-indigo-600 hover:underline">See all</button>
            </div>
            <div className="flex gap-4">
               {['Quick Starter', 'Daily Learner', 'Code Ninja'].map((badge, idx) => (
                 <div key={idx} className="group relative">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform cursor-help shadow-sm">
                       <Medal size={28} />
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      {badge}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold dark:text-white">Continue Learning</h3>
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div 
                key={course.id} 
                onClick={() => handleResume(course)}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
                    <Star size={14} className="text-amber-500 mr-1 fill-amber-500" />
                    <span className="text-xs font-bold dark:text-white">{course.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-md">{course.category}</span>
                    <span className="text-xs text-slate-500">{course.enrolled} Students</span>
                  </div>
                  <h4 className="font-bold text-lg mb-4 dark:text-white line-clamp-1">{course.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${course.instructor}`} className="w-6 h-6 rounded-full mr-2" alt={course.instructor} />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{course.instructor}</span>
                    </div>
                    <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4">
             <div className="bg-indigo-50 dark:bg-indigo-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
                <Book size={32} />
             </div>
             <div>
                <h4 className="font-bold dark:text-white">No active courses yet</h4>
                <p className="text-slate-500 text-sm">Explore our library and start your journey today.</p>
             </div>
             <button 
              onClick={() => navigate('/courses')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg"
             >
               Explore Library
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
