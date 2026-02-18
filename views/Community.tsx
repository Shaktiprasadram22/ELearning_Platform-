
import React from 'react';
import { 
  MessageSquare, ThumbsUp, MessageCircle, Share2, 
  Search, Plus, TrendingUp, Hash, UserPlus
} from 'lucide-react';

const Community = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Feed Area */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-4">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 rounded-xl bg-slate-100" />
             <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-left px-6 py-3 rounded-2xl text-slate-500 text-sm hover:bg-slate-200 transition-colors">
               Share your thoughts with the community...
             </button>
             <button className="bg-indigo-600 p-3 rounded-xl text-white">
               <Plus size={20} />
             </button>
          </div>
        </div>

        {[
          {
            user: "Alex Johnson",
            role: "Fullstack Developer",
            avatar: "https://i.pravatar.cc/150?u=alex",
            time: "2h ago",
            content: "Just finished the Next.js 14 course! Server actions are a total game changer. Who else is using them in production?",
            likes: 42,
            comments: 15,
            tags: ["NextJS", "WebDev"]
          },
          {
            user: "Maria Garcia",
            role: "UX Designer",
            avatar: "https://i.pravatar.cc/150?u=maria",
            time: "5h ago",
            content: "Check out this amazing palette I put together for my latest project. Hierarchy and color balance are key!",
            image: "https://picsum.photos/seed/design-community/800/400",
            likes: 128,
            comments: 34,
            tags: ["Design", "UIUX"]
          }
        ].map((post, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <img src={post.avatar} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-sm dark:text-white">{post.user}</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{post.role} • {post.time}</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600"><Plus size={18} /></button>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
              {post.content}
            </p>

            {post.image && (
              <div className="rounded-2xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800">
                <img src={post.image} className="w-full h-auto" />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-1 rounded">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center space-x-6 border-t border-slate-50 dark:border-slate-800 pt-4">
              <button className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors">
                <ThumbsUp size={18} className="mr-2" />
                <span className="text-xs font-bold">{post.likes}</span>
              </button>
              <button className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors">
                <MessageCircle size={18} className="mr-2" />
                <span className="text-xs font-bold">{post.comments}</span>
              </button>
              <button className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors">
                <Share2 size={18} className="mr-2" />
                <span className="text-xs font-bold">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Area */}
      <div className="space-y-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-sm dark:text-white mb-4 flex items-center">
            <TrendingUp size={16} className="mr-2 text-indigo-600" /> Trending Topics
          </h3>
          <div className="space-y-4">
            {["React19", "AITools", "RemoteJobs", "Typescript", "SaaS"].map(tag => (
              <div key={tag} className="flex justify-between items-center group cursor-pointer">
                 <div className="flex items-center">
                   <Hash size={14} className="text-slate-400 mr-2" />
                   <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 transition-colors">{tag}</span>
                 </div>
                 <span className="text-[10px] text-slate-400">1.2k posts</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-sm dark:text-white mb-4 flex items-center">
            <UserPlus size={16} className="mr-2 text-indigo-600" /> Recommended Mentors
          </h3>
          <div className="space-y-4">
             {[
               { name: "Sarah Drasner", bio: "Engineering Manager @Netlify", avatar: "https://i.pravatar.cc/150?u=sarah" },
               { name: "Gary Simon", bio: "Designer & Dev Mentor", avatar: "https://i.pravatar.cc/150?u=gary" }
             ].map((mentor, idx) => (
               <div key={idx} className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <img src={mentor.avatar} className="w-8 h-8 rounded-lg object-cover" />
                   <div>
                     <p className="text-xs font-bold dark:text-white">{mentor.name}</p>
                     <p className="text-[9px] text-slate-400 truncate w-24">{mentor.bio}</p>
                   </div>
                 </div>
                 <button className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                   <UserPlus size={14} />
                 </button>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
