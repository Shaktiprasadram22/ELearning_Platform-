
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Search, Filter, Star, Clock, Users } from 'lucide-react';

const CourseLibrary = () => {
  const { courses, setActiveCourse } = useStore();
  const navigate = useNavigate();

  const handleEnroll = (course: any) => {
    setActiveCourse(course);
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Explore Courses</h1>
          <p className="text-slate-500 mt-1">Pick your path and start mastering new skills</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center text-sm font-bold shadow-sm">
            <Filter size={18} className="mr-2" /> Filters
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search category..." 
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group cursor-pointer"
            onClick={() => handleEnroll(course)}
          >
            <div className="relative h-56 overflow-hidden">
              <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Enroll Now
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-amber-500 font-bold text-sm">
                  <Star size={16} className="mr-1 fill-amber-500" />
                  {course.rating}
                </div>
                <div className="flex items-center text-slate-400 text-xs">
                  <Users size={14} className="mr-1" />
                  {course.enrolled.toLocaleString()} Enrolled
                </div>
              </div>

              <h3 className="text-xl font-bold dark:text-white mb-2 line-clamp-1">{course.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10">{course.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 mr-3 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${course.instructor}`} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{course.instructor}</span>
                </div>
                <div className="text-xl font-black text-indigo-600">
                  ${course.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLibrary;
