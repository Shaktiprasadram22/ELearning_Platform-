
import React from 'react';
import { Award, Download, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      id: "CERT-9921",
      course: "Advanced React Patterns",
      date: "Jan 12, 2024",
      grade: "A+",
      instructor: "Sarah Drasner"
    },
    {
      id: "CERT-4412",
      course: "Modern UI/UX Design",
      date: "Nov 28, 2023",
      grade: "A",
      instructor: "Gary Simon"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Your Achievements</h1>
        <p className="text-slate-500 mt-1">Verify and download your official course certificates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
          <div key={cert.id} className="group relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                <Award size={32} className="text-amber-500" />
              </div>
              <div className="flex items-center space-x-1 text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
              </div>
            </div>

            <h3 className="text-xl font-bold dark:text-white mb-2 leading-tight">{cert.course}</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-6">Issued by {cert.instructor}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Date</p>
                <div className="flex items-center text-xs font-bold dark:text-white">
                  <Calendar size={12} className="mr-1.5 text-indigo-600" />
                  {cert.date}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Grade</p>
                <p className="text-xs font-bold text-indigo-600">{cert.grade}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none">
                <Download size={14} className="mr-2" /> Download PDF
              </button>
              <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>

            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <p className="text-[8px] text-slate-300 font-mono tracking-tighter">ID: {cert.id}</p>
            </div>
          </div>
        ))}

        {/* Locked Certificate Mock */}
        <div className="bg-slate-50/50 dark:bg-slate-900/50 p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center opacity-60">
           <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
              <Lock size={32} className="text-slate-400" />
           </div>
           <p className="text-sm font-bold text-slate-500">Next Achievement</p>
           <p className="text-xs text-slate-400 mt-1 italic">Complete "Fullstack Next.js" to unlock</p>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
