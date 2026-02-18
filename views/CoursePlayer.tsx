
import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { aiService } from '../geminiService';
import { 
  Play, 
  CheckCircle, 
  Lock, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  MessageCircle,
  BrainCircuit,
  Maximize,
  Volume2,
  Settings,
  ArrowLeft,
  X,
  Send,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CoursePlayer = () => {
  const { activeCourse, user, updateXP } = useStore();
  const [currentLecture, setCurrentLecture] = useState(activeCourse?.content[0]?.lectures[0] || null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['s1']);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiConversation, setAiConversation] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeCourse) navigate('/courses');
  }, [activeCourse]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleLectureSelect = (lecture: any) => {
    if (lecture.type === 'video') {
      setCurrentLecture(lecture);
    }
  };

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    const q = aiQuestion;
    setAiQuestion('');
    setAiConversation(prev => [...prev, { role: 'user', text: q }]);
    setIsAiLoading(true);

    const answer = await aiService.solveDoubt(q, activeCourse?.title || 'General Learning');
    
    setAiConversation(prev => [...prev, { role: 'bot', text: answer }]);
    setIsAiLoading(false);
    updateXP(10); // Reward for curiosity!
  };

  if (!activeCourse || !currentLecture) return null;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] gap-6 animate-in fade-in duration-500">
      {/* Left: Video Player Area */}
      <div className="flex-1 flex flex-col space-y-4 min-w-0">
        <div className="bg-slate-900 rounded-3xl overflow-hidden aspect-video relative group shadow-2xl">
          <video 
            ref={videoRef}
            src={currentLecture.videoUrl} 
            className="w-full h-full"
            controls
          />
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex-1 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">{currentLecture.title}</h1>
              <p className="text-slate-500 mt-1">{activeCourse.title} • {activeCourse.instructor}</p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
              Download Resources
            </button>
          </div>

          <div className="flex space-x-6 border-b border-slate-100 dark:border-slate-800 mb-6">
            <button className="pb-4 text-sm font-bold border-b-2 border-indigo-600 text-indigo-600">Overview</button>
            <button className="pb-4 text-sm font-bold text-slate-400 hover:text-slate-600">Notes</button>
            <button className="pb-4 text-sm font-bold text-slate-400 hover:text-slate-600">Reviews</button>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
            <p>In this lecture, we'll dive deep into {currentLecture.title}. We'll explore why this pattern is essential for large-scale applications and how you can implement it in your own projects today.</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Understanding the core concepts</li>
              <li>Live coding implementation</li>
              <li>Common pitfalls and how to avoid them</li>
              <li>Performance benchmarking results</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right: Curriculum & AI Assistant */}
      <div className="w-full lg:w-96 flex flex-col space-y-6">
        {/* Curriculum Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex-1 flex flex-col shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold dark:text-white">Course Content</h3>
            <span className="text-xs font-bold text-indigo-600">24% Completed</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeCourse.content.map((section) => (
              <div key={section.id} className="border-b border-slate-50 dark:border-slate-800/50">
                <button 
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{section.id}</p>
                    <p className="font-bold text-sm dark:text-white">{section.title}</p>
                  </div>
                  {expandedSections.includes(section.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                {expandedSections.includes(section.id) && (
                  <div className="bg-slate-50/50 dark:bg-slate-800/20 py-2">
                    {section.lectures.map((lecture) => (
                      <button
                        key={lecture.id}
                        onClick={() => handleLectureSelect(lecture)}
                        className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-white dark:hover:bg-slate-800 transition-colors ${currentLecture.id === lecture.id ? 'bg-indigo-50 dark:bg-indigo-900/30 border-r-4 border-indigo-600' : ''}`}
                      >
                        {lecture.isCompleted ? (
                          <CheckCircle size={18} className="text-green-500 fill-green-500/10 shrink-0" />
                        ) : (
                          <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300 shrink-0" />
                        )}
                        <div className="flex-1 text-left">
                          <p className={`text-sm font-medium ${currentLecture.id === lecture.id ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-300'}`}>{lecture.title}</p>
                          <div className="flex items-center text-[10px] text-slate-400 mt-0.5">
                            {lecture.type === 'video' ? <Play size={10} className="mr-1" /> : <FileText size={10} className="mr-1" />}
                            {lecture.duration}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Doubt Solver Button / Chat */}
        <div className="relative">
          {!showAIChat ? (
            <button 
              onClick={() => setShowAIChat(true)}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02] transition-transform group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <BrainCircuit size={80} />
              </div>
              <div className="relative z-10 flex items-center">
                <div className="bg-white/20 p-3 rounded-2xl mr-4 backdrop-blur-md">
                  <BrainCircuit size={28} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">AI Doubt Solver</p>
                  <p className="text-sm opacity-80">Stuck? Get instant answers</p>
                </div>
              </div>
            </button>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl h-[400px] flex flex-col animate-in slide-in-from-right-4">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/10">
                <div className="flex items-center">
                  <BrainCircuit size={20} className="text-indigo-600 mr-2" />
                  <span className="font-bold text-slate-800 dark:text-white text-sm">AI Tutor Assistant</span>
                </div>
                <button onClick={() => setShowAIChat(false)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg">
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl text-xs text-slate-600 dark:text-slate-400">
                  Hi {user?.name}! I'm your AI tutor. Ask me anything about <strong>{activeCourse.title}</strong> and I'll help you out!
                </div>
                {aiConversation.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 dark:text-slate-300'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl flex items-center space-x-2">
                      <Loader2 className="animate-spin" size={16} />
                      <span className="text-xs">Generating answer...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <input 
                  type="text" 
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                />
                <button 
                  onClick={handleAskAI}
                  disabled={isAiLoading}
                  className="bg-indigo-600 text-white p-2 rounded-xl disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
