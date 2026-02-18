
import React, { useState } from 'react';
import { useStore } from '../store';
import { Badge, LeaderboardEntry } from '../types';
import { 
  Trophy, 
  Zap, 
  Target, 
  Star, 
  Lock, 
  CheckCircle2, 
  TrendingUp, 
  Medal, 
  Award,
  Flame,
  Search,
  ChevronRight,
  Sparkles,
  Calendar,
  Share2
} from 'lucide-react';

const ALL_BADGES: Badge[] = [
  { id: 'b1', name: 'Quick Starter', description: 'Enrolled in your first course', icon: 'Rocket', category: 'learning', requirement: 'Enroll in 1 course' },
  { id: 'b2', name: 'Early Bird', description: 'Complete a lecture before 8:00 AM', icon: 'Sun', category: 'special', requirement: 'Morning completion' },
  { id: 'b3', name: 'Quiz Master', description: 'Score 100% on any quiz', icon: 'Brain', category: 'learning', requirement: '100% quiz score' },
  { id: 'b4', name: 'Streak King', description: 'Maintain a 7-day learning streak', icon: 'Flame', category: 'streak', requirement: '7-day streak' },
  { id: 'b5', name: 'Polymath', description: 'Enroll in courses from 3 categories', icon: 'Library', category: 'learning', requirement: '3 categories' },
  { id: 'b6', name: 'Community Pillar', description: 'Post 5 comments in the community', icon: 'Users', category: 'social', requirement: '5 posts' },
  { id: 'b7', name: 'AI Pioneer', description: 'Ask the AI tutor 10 questions', icon: 'Bot', category: 'special', requirement: '10 AI doubts' },
  { id: 'b8', name: 'High Flyer', description: 'Reach Level 10', icon: 'Plane', category: 'special', requirement: 'Reach Lvl 10' },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'l1', name: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah', xp: 12450, rank: 1 },
  { id: 'l2', name: 'Gary Simon', avatar: 'https://i.pravatar.cc/150?u=gary', xp: 10200, rank: 2 },
  { id: 'l3', name: 'Lee Robinson', avatar: 'https://i.pravatar.cc/150?u=lee', xp: 9800, rank: 3 },
  { id: 'u1', name: 'Me (You)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student', xp: 1250, rank: 42, isMe: true },
  { id: 'l4', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex', xp: 8500, rank: 4 },
  { id: 'l5', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?u=maria', xp: 7200, rank: 5 },
];

// Added key to props type to prevent TS errors when used in lists
const BadgeCard = ({ badge, unlocked }: { badge: Badge, unlocked: boolean, key?: string }) => {
  return (
    <div className={`relative p-6 rounded-[2rem] border transition-all duration-300 group ${
      unlocked 
        ? 'bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/30 shadow-sm hover:shadow-xl hover:-translate-y-1' 
        : 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800 opacity-60 grayscale'
    }`}>
      {!unlocked && <Lock className="absolute top-4 right-4 text-slate-400" size={16} />}
      {unlocked && <CheckCircle2 className="absolute top-4 right-4 text-indigo-600" size={18} />}
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-12 ${
        unlocked 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
      }`}>
        <Medal size={28} />
      </div>
      
      <h4 className="text-sm font-black dark:text-white uppercase tracking-tight mb-1">{badge.name}</h4>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{badge.description}</p>
      
      {unlocked ? (
        <button className="mt-4 text-[9px] font-black text-indigo-600 uppercase tracking-widest flex items-center hover:underline">
          <Share2 size={10} className="mr-1" /> Share Achievement
        </button>
      ) : (
        <div className="mt-4 flex items-center">
           <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-slate-400 w-1/3"></div>
           </div>
           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-2 whitespace-nowrap">{badge.requirement}</span>
        </div>
      )}
    </div>
  );
};

const Achievements = () => {
  const { user } = useStore();
  const [filter, setFilter] = useState<'all' | 'learning' | 'streak' | 'social'>('all');

  const nextLevelXP = Math.pow(user?.level || 1, 2) * 100;
  const currentLevelXP = Math.pow((user?.level || 1) - 1, 2) * 100;
  const progress = ((user?.xp || 0) - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100;

  const filteredBadges = filter === 'all' ? ALL_BADGES : ALL_BADGES.filter(b => b.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Level & Streak Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
             <Trophy size={200} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles size={14} className="mr-2" /> Current Level {user?.level}
              </div>
              <h2 className="text-4xl font-black tracking-tight">Level Up Your Knowledge</h2>
              <p className="text-white/70 max-w-sm text-sm">You are doing great! Earn <strong>{Math.round(nextLevelXP - (user?.xp || 0))} XP</strong> more to reach Level {user?.level ? user.level + 1 : 1}.</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/80">
                  <span>Progress to Lvl {user?.level ? user.level + 1 : 1}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 p-1">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 text-center flex flex-col items-center justify-center min-w-[160px]">
               <div className="relative">
                  <Flame size={48} className="text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black text-xl mt-1">{user?.streak}</span>
               </div>
               <p className="mt-3 font-black text-xs uppercase tracking-widest text-white/90">Day Streak</p>
               <button className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                 View History
               </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
           <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center uppercase tracking-tight">
             <TrendingUp size={20} className="mr-2 text-indigo-600" /> Leaderboard
           </h3>
           <div className="space-y-4 flex-1">
             {MOCK_LEADERBOARD.map((entry) => (
               <div key={entry.id} className={`flex items-center justify-between p-3 rounded-2xl transition-all ${entry.isMe ? 'bg-indigo-50 dark:bg-indigo-900/30 ring-1 ring-indigo-200 dark:ring-indigo-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                 <div className="flex items-center space-x-3">
                   <span className={`w-6 text-xs font-black ${entry.rank <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                     #{entry.rank}
                   </span>
                   <img src={entry.avatar} className="w-8 h-8 rounded-lg bg-indigo-50" />
                   <div>
                     <p className={`text-xs font-bold ${entry.isMe ? 'text-indigo-600 dark:text-indigo-400' : 'dark:text-white'}`}>{entry.name}</p>
                     <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{entry.xp.toLocaleString()} XP</p>
                   </div>
                 </div>
                 {entry.rank <= 3 && <Award size={16} className={entry.rank === 1 ? 'text-amber-400' : entry.rank === 2 ? 'text-slate-300' : 'text-amber-700'} />}
               </div>
             ))}
           </div>
           <button className="mt-6 w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-200 transition-colors">
             Full Leaderboard
           </button>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-2xl font-black dark:text-white tracking-tight flex items-center">
            <Medal size={24} className="mr-3 text-indigo-600" /> Badge Collection
          </h3>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl overflow-x-auto">
             {['all', 'learning', 'streak', 'social'].map(cat => (
               <button 
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === cat 
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBadges.map((badge) => (
            /* Fixed: Added safe optional chaining for badges check and ensured key is provided correctly to the component */
            <BadgeCard 
              key={badge.id} 
              badge={badge} 
              unlocked={user?.badges?.includes(badge.id) || false} 
            />
          ))}
        </div>
      </div>

      {/* Daily Quest / Reward */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center gap-8">
         <div className="bg-amber-50 dark:bg-amber-900/20 w-32 h-32 rounded-[2.5rem] flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900/30">
            <Calendar size={64} className="text-amber-500" />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-bold dark:text-white mb-2">Weekly Goal Challenge</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
              Complete at least 3 lectures this week to earn the <strong>Quick Learner</strong> bonus (+500 XP). You have already completed 1 lecture.
            </p>
            <div className="mt-4 flex items-center justify-center md:justify-start space-x-2">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`w-10 h-2 rounded-full ${i === 1 ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
               ))}
            </div>
         </div>
         <button className="bg-indigo-600 text-white px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all hover:scale-105">
           Track Progress
         </button>
      </div>
    </div>
  );
};

export default Achievements;
