
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useStore } from './store';
import { MOCK_COURSES } from './mockService';
import { UserRole } from './types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  MessageSquare, 
  Award, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Menu, 
  X,
  Sun,
  Moon,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';

// View Components
import Dashboard from './views/Dashboard';
import CourseLibrary from './views/CourseLibrary';
import CoursePlayer from './views/CoursePlayer';
import LiveClass from './views/LiveClass';
import Community from './views/Community';
import Login from './views/Login';

const Sidebar = () => {
  const { user, logout } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/courses' },
    { label: 'Live Classes', icon: Video, path: '/live' },
    { label: 'Community', icon: MessageSquare, path: '/community' },
    { label: 'Certificates', icon: Award, path: '/certificates' },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 h-screen sticky top-0 flex flex-col z-40`}>
      <div className="p-6 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Lumina Learn</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
            <item.icon size={22} className="group-hover:scale-110 transition-transform" />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button onClick={logout} className="flex items-center space-x-3 p-3 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors">
          <LogOut size={22} />
          {isOpen && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

const Header = () => {
  const { user, isDarkMode, toggleDarkMode } = useStore();

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="relative w-96 max-w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search courses, mentors..." 
          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button onClick={toggleDarkMode} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full border border-amber-100 dark:border-amber-900/30">
          <span className="text-amber-600 text-sm font-bold">⚡ {user?.streak} Days</span>
        </div>

        <button className="relative p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-6">
          <div className="text-right">
            <p className="text-sm font-bold dark:text-white">{user?.name}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">{user?.role}</p>
          </div>
          <img src={user?.avatar} alt="Avatar" className="w-10 h-10 rounded-xl bg-indigo-100 p-0.5 border border-slate-200 dark:border-slate-700" />
        </div>
      </div>
    </header>
  );
};

// Fixed: children typing updated to avoid 'Property children is missing' errors in some TS environments
const ProtectedLayout = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

// Fixed: Removed React.FC as it is not strictly necessary and can cause issues with children in modern React
const App = () => {
  const { setCourses, isDarkMode } = useStore();

  useEffect(() => {
    setCourses(MOCK_COURSES);
    if (isDarkMode) document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/courses" element={<ProtectedLayout><CourseLibrary /></ProtectedLayout>} />
        <Route path="/course/:id" element={<ProtectedLayout><CoursePlayer /></ProtectedLayout>} />
        <Route path="/live" element={<ProtectedLayout><LiveClass /></ProtectedLayout>} />
        <Route path="/community" element={<ProtectedLayout><Community /></ProtectedLayout>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
