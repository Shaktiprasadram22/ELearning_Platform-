
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Course, Section, Lecture, QuizQuestion } from '../types';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Image as LucideImageIcon, 
  Type as TypeIcon, 
  DollarSign, 
  Tag, 
  Save,
  ArrowLeft,
  Layout,
  Video,
  FileText,
  HelpCircle,
  AlertCircle,
  FileBox,
  Check,
  Upload,
  File as LucideFileIcon,
  RefreshCw,
  Settings,
  X,
  Circle,
  ShieldCheck,
  Copy,
  ArrowUp,
  ArrowDown,
  GripVertical
} from 'lucide-react';

const QuizBuilder = ({ 
  lecture, 
  onSave, 
  onClose 
}: { 
  lecture: Lecture, 
  onSave: (questions: QuizQuestion[]) => void, 
  onClose: () => void 
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(lecture.quizQuestions || []);

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: '',
      options: ['', ''],
      answer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const duplicateQuestion = (index: number) => {
    const q = questions[index];
    const newQuestion = { ...q, id: `q-${Date.now()}` };
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, newQuestion);
    setQuestions(newQuestions);
  };

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === questions.length - 1)) return;
    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
    setQuestions(newQuestions);
  };

  const updateQuestion = (id: string, updates: Partial<QuizQuestion>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const addOption = (qId: string) => {
    setQuestions(questions.map(q => q.id === qId ? {
      ...q,
      options: [...q.options, '']
    } : q));
  };

  const removeOption = (qId: string, optIdx: number) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = q.options.filter((_, i) => i !== optIdx);
        let newAnswer = q.answer;
        if (q.answer === optIdx) newAnswer = 0;
        else if (q.answer > optIdx) newAnswer = q.answer - 1;
        return { ...q, options: newOptions, answer: newAnswer };
      }
      return q;
    }));
  };

  const updateOption = (qId: string, optIdx: number, value: string) => {
    setQuestions(questions.map(q => q.id === qId ? {
      ...q,
      options: q.options.map((opt, i) => i === optIdx ? value : opt)
    } : q));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-[2rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <HelpCircle size={20} />
              </div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight">Quiz Builder</h3>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {lecture.title || 'Untitled Quiz'} • {questions.length} Question{questions.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 dark:bg-slate-950/20">
          {questions.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-indigo-600 mb-6">
                 <HelpCircle size={40} />
              </div>
              <h4 className="text-xl font-bold dark:text-white mb-2">No questions yet</h4>
              <p className="text-slate-500 max-w-xs mx-auto text-sm mb-8">Create your first quiz question to start testing your students' knowledge.</p>
              <button 
                onClick={addQuestion}
                className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all"
              >
                Create Question
              </button>
            </div>
          ) : (
            <>
              {questions.map((q, idx) => (
                <div key={q.id} className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="bg-indigo-600 text-white text-xs font-black w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
                        {idx + 1}
                      </span>
                      <h4 className="text-lg font-bold dark:text-white">Question {idx + 1}</h4>
                    </div>
                    <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => moveQuestion(idx, 'up')}
                        disabled={idx === 0}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp size={18} />
                      </button>
                      <button 
                        onClick={() => moveQuestion(idx, 'down')}
                        disabled={idx === questions.length - 1}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown size={18} />
                      </button>
                      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                      <button 
                        onClick={() => duplicateQuestion(idx)}
                        className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all"
                        title="Duplicate"
                      >
                        <Copy size={18} />
                      </button>
                      <button 
                        onClick={() => removeQuestion(q.id)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Question Text</label>
                      <textarea
                        value={q.question}
                        onChange={(e) => updateQuestion(q.id, { question: e.target.value })}
                        placeholder="What is the result of...?"
                        rows={2}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-600 rounded-3xl px-6 py-4 text-base font-medium focus:ring-0 outline-none dark:text-white transition-all resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center mb-2 px-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Options</label>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Mark correct answer</span>
                      </div>
                      <div className="space-y-3">
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center space-x-3 group/opt">
                            <button 
                              onClick={() => updateQuestion(q.id, { answer: optIdx })}
                              className={`p-3 rounded-2xl transition-all transform active:scale-95 ${
                                q.answer === optIdx 
                                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none' 
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                              title="Mark as correct"
                            >
                              {q.answer === optIdx ? <Check size={18} strokeWidth={3} /> : <Circle size={18} />}
                            </button>
                            <div className="flex-1 relative">
                              <input 
                                type="text"
                                value={opt}
                                onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                                placeholder={`Option ${optIdx + 1}`}
                                className={`w-full bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl px-6 py-3.5 text-sm font-semibold focus:ring-0 outline-none dark:text-white transition-all ${
                                  q.answer === optIdx ? 'border-emerald-500/50' : 'border-transparent focus:border-indigo-600/50'
                                }`}
                              />
                              {q.options.length > 2 && (
                                <button 
                                  onClick={() => removeOption(q.id, optIdx)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover/opt:opacity-100"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {q.options.length < 6 && (
                        <button 
                          onClick={() => addOption(q.id)}
                          className="w-full py-3 mt-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all font-bold text-xs flex items-center justify-center"
                        >
                          <Plus size={16} className="mr-2" /> Add Option
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={addQuestion}
                className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] text-slate-400 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                  <Plus size={24} />
                </div>
                <span className="font-black text-sm uppercase tracking-widest">Add New Question</span>
              </button>
            </>
          )}
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onSave(questions);
              onClose();
            }}
            className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none transform active:scale-95"
          >
            Apply Quiz Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateCourse = () => {
  const navigate = useNavigate();
  const { addCourse, user } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadLecture, setActiveUploadLecture] = useState<{sId: string, lId: string} | null>(null);
  const [activeQuizEdit, setActiveQuizEdit] = useState<{sId: string, lecture: Lecture} | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('https://picsum.photos/seed/new-course/800/450');
  const [price, setPrice] = useState(49);
  const [category, setCategory] = useState('Development');
  const [content, setContent] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddSection = () => {
    const newSection: Section = {
      id: `s-${Date.now()}`,
      title: 'New Section',
      lectures: []
    };
    setContent([...content, newSection]);
    setError(null);
  };

  const handleRemoveSection = (sectionId: string) => {
    setContent(content.filter(s => s.id !== sectionId));
  };

  const handleUpdateSectionTitle = (sectionId: string, newTitle: string) => {
    setContent(content.map(s => s.id === sectionId ? { ...s, title: newTitle } : s));
  };

  const handleAddLecture = (sectionId: string) => {
    const newLecture: Lecture = {
      id: `l-${Date.now()}`,
      title: '',
      duration: '10:00',
      videoUrl: '', 
      isCompleted: false,
      type: 'video'
    };
    setContent(content.map(s => s.id === sectionId ? { ...s, lectures: [...s.lectures, newLecture] } : s));
    setError(null);
  };

  const handleRemoveLecture = (sectionId: string, lectureId: string) => {
    setContent(content.map(s => s.id === sectionId ? { ...s, lectures: s.lectures.filter(l => l.id !== lectureId) } : s));
  };

  const handleUpdateLecture = (sectionId: string, lectureId: string, updates: Partial<Lecture>) => {
    setContent(content.map(s => s.id === sectionId ? {
      ...s,
      lectures: s.lectures.map(l => l.id === lectureId ? { ...l, ...updates } : l)
    } : s));
    setError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadLecture) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      handleUpdateLecture(activeUploadLecture.sId, activeUploadLecture.lId, { 
        videoUrl: base64,
        title: content.find(s => s.id === activeUploadLecture.sId)?.lectures.find(l => l.id === activeUploadLecture.lId)?.title || file.name.replace('.pdf', '')
      });
      setActiveUploadLecture(null);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed for the thumbnail.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setThumbnail(base64);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const isValidUrl = (url: string) => {
    if (!url) return false;
    if (url.startsWith('data:')) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = () => {
    setError(null);

    if (!title.trim() || !description.trim()) {
      setError('Please fill in the course title and description.');
      return;
    }

    if (content.length === 0) {
      setError('Please add at least one section to your course.');
      return;
    }

    for (const section of content) {
      if (!section.title.trim()) {
        setError(`Section title cannot be empty.`);
        return;
      }
      
      if (section.lectures.length === 0) {
        setError(`Section "${section.title}" must have at least one lecture.`);
        return;
      }

      for (const lecture of section.lectures) {
        if (!lecture.title.trim()) {
          setError(`Lecture title in section "${section.title}" cannot be empty.`);
          return;
        }

        if (lecture.type === 'video' || lecture.type === 'pdf') {
          if (!lecture.videoUrl.trim()) {
            setError(`${lecture.type.toUpperCase()} content for "${lecture.title}" is required.`);
            return;
          }
          if (!isValidUrl(lecture.videoUrl)) {
            setError(`Invalid source for "${lecture.title}". Please provide a full URL or upload a file.`);
            return;
          }
        }

        if (lecture.type === 'quiz' && (!lecture.quizQuestions || lecture.quizQuestions.length === 0)) {
          setError(`Quiz "${lecture.title}" must have at least one question.`);
          return;
        }
      }
    }

    const newCourse: Course = {
      id: `c-${Date.now()}`,
      title,
      instructor: user?.name || 'Unknown Instructor',
      description,
      thumbnail,
      price,
      rating: 0,
      enrolled: 0,
      category,
      content
    };

    addCourse(newCourse);
    navigate('/instructor');
  };

  const LECTURE_TYPES = [
    { id: 'video', label: 'Video Lecture', icon: Video, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'pdf', label: 'PDF Document', icon: LucideFileIcon, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 'quiz', label: 'Interactive Quiz', icon: HelpCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' }
  ] as const;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {activeQuizEdit && (
        <QuizBuilder 
          lecture={activeQuizEdit.lecture}
          onClose={() => setActiveQuizEdit(null)}
          onSave={(questions) => {
            handleUpdateLecture(activeQuizEdit.sId, activeQuizEdit.lecture.id, { quizQuestions: questions });
          }}
        />
      )}

      <input 
        type="file" 
        accept="application/pdf" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileUpload}
      />
      <input 
        type="file" 
        accept="image/*" 
        ref={imageInputRef} 
        className="hidden" 
        onChange={handleImageUpload}
      />
      
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate('/instructor')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-400 flex items-center group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>
        <button 
          onClick={handleSave}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all hover:scale-[1.02]"
        >
          <Save size={20} className="mr-2" /> Publish Course
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-center text-red-600 dark:text-red-400 text-sm animate-in fade-in zoom-in-95">
          <AlertCircle size={18} className="mr-3 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold dark:text-white flex items-center">
              <TypeIcon size={20} className="mr-2 text-indigo-600" /> Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Course Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Clean Code in JavaScript"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what students will learn..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Price ($)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                  <div className="relative">
                    <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white appearance-none"
                    >
                      <option>Development</option>
                      <option>Design</option>
                      <option>Business</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold dark:text-white flex items-center">
                <Layout size={20} className="mr-2 text-indigo-600" /> Curriculum
              </h3>
              <button 
                onClick={handleAddSection}
                className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center text-sm font-bold border border-indigo-100 dark:border-indigo-900/30 shadow-sm"
              >
                <Plus size={18} className="mr-2" /> Add Section
              </button>
            </div>

            <div className="space-y-6">
              {content.map((section, sIdx) => (
                <div key={section.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex-1 flex items-center">
                      <div className="bg-indigo-600 text-white text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center mr-3 shrink-0 shadow-sm">
                        {sIdx + 1}
                      </div>
                      <input 
                        type="text"
                        value={section.title}
                        onChange={(e) => handleUpdateSectionTitle(section.id, e.target.value)}
                        placeholder="e.g. Getting Started"
                        className="bg-transparent border-none font-bold text-sm focus:ring-0 outline-none dark:text-white flex-1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleAddLecture(section.id)}
                        className="p-1.5 bg-white dark:bg-slate-700 rounded-lg text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors"
                        title="Add Lecture"
                      >
                        <Plus size={16} />
                      </button>
                      <button 
                        onClick={() => handleRemoveSection(section.id)}
                        className="p-1.5 bg-white dark:bg-slate-700 rounded-lg text-red-500 shadow-sm hover:bg-red-50 transition-colors"
                        title="Remove Section"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {section.lectures.map((lecture, lIdx) => (
                      <div key={lecture.id} className="flex flex-col space-y-4 p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 flex items-center space-x-3">
                             <div className={`p-2 rounded-xl shadow-sm ${
                               lecture.type === 'video' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 
                               lecture.type === 'pdf' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 
                               'bg-amber-50 dark:bg-amber-900/20 text-amber-600'
                             }`}>
                                {lecture.type === 'video' ? <Video size={16} /> : lecture.type === 'quiz' ? <HelpCircle size={16} /> : <FileText size={16} />}
                             </div>
                             <input 
                               type="text"
                               value={lecture.title}
                               onChange={(e) => handleUpdateLecture(section.id, lecture.id, { title: e.target.value })}
                               placeholder="Lecture Title"
                               className="bg-transparent border-none text-sm font-bold focus:ring-0 outline-none dark:text-white w-full"
                             />
                          </div>
                          <button 
                            onClick={() => handleRemoveLecture(section.id, lecture.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="space-y-3 pt-2">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Select Lecture Type</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {LECTURE_TYPES.map((type) => (
                              <button
                                key={type.id}
                                onClick={() => handleUpdateLecture(section.id, lecture.id, { type: type.id as any })}
                                className={`flex items-center p-3 rounded-xl border-2 transition-all relative overflow-hidden group ${
                                  lecture.type === type.id 
                                    ? 'border-indigo-600 bg-white dark:bg-slate-800 shadow-md scale-[1.02]' 
                                    : 'border-slate-100 dark:border-slate-800 bg-transparent hover:border-slate-200 dark:hover:border-slate-700'
                                }`}
                              >
                                <div className={`p-2 rounded-lg mr-3 ${type.bg} ${type.color}`}>
                                  <type.icon size={18} />
                                </div>
                                <div className="text-left">
                                  <p className={`text-xs font-bold ${lecture.type === type.id ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-400'}`}>
                                    {type.label}
                                  </p>
                                </div>
                                {lecture.type === type.id && (
                                  <div className="absolute top-2 right-2 text-indigo-600">
                                    <Check size={14} />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Est. Duration</label>
                            <input 
                                type="text"
                                value={lecture.duration}
                                onChange={(e) => handleUpdateLecture(section.id, lecture.id, { duration: e.target.value })}
                                placeholder="e.g. 15m"
                                className="w-full bg-white dark:bg-slate-800 text-xs rounded-xl border-none px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white shadow-sm transition-all"
                            />
                          </div>
                        </div>

                        {lecture.type === 'video' && (
                          <div className="animate-in slide-in-from-top-2 duration-300">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Video Source URL</label>
                            <input 
                                type="text"
                                value={lecture.videoUrl}
                                onChange={(e) => handleUpdateLecture(section.id, lecture.id, { videoUrl: e.target.value })}
                                placeholder="https://youtube.com/..."
                                className={`w-full bg-white dark:bg-slate-800 text-xs rounded-xl border px-4 py-3.5 outline-none dark:text-white transition-all shadow-sm ${!lecture.videoUrl ? 'border-amber-200 dark:border-amber-900/30' : 'border-transparent focus:ring-2 focus:ring-indigo-500'}`}
                            />
                          </div>
                        )}

                        {lecture.type === 'pdf' && (
                          <div className="animate-in slide-in-from-top-2 duration-300 space-y-3">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">PDF Content</label>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                              <div className="flex-1">
                                <input 
                                  type="text"
                                  value={lecture.videoUrl.startsWith('data:') ? 'Local file uploaded' : lecture.videoUrl}
                                  onChange={(e) => handleUpdateLecture(section.id, lecture.id, { videoUrl: e.target.value })}
                                  placeholder="https://example.com/document.pdf"
                                  disabled={lecture.videoUrl.startsWith('data:')}
                                  className={`w-full bg-white dark:bg-slate-800 text-xs rounded-xl border px-4 py-3.5 outline-none dark:text-white transition-all shadow-sm ${!lecture.videoUrl ? 'border-amber-200 dark:border-amber-900/30' : 'border-transparent focus:ring-2 focus:ring-indigo-500'}`}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">OR</span>
                                <button 
                                  onClick={() => {
                                    setActiveUploadLecture({ sId: section.id, lId: lecture.id });
                                    fileInputRef.current?.click();
                                  }}
                                  className={`flex items-center px-4 py-3 rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap ${lecture.videoUrl.startsWith('data:') ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
                                >
                                  {lecture.videoUrl.startsWith('data:') ? <Check size={14} className="mr-2" /> : <Upload size={14} className="mr-2" />}
                                  {lecture.videoUrl.startsWith('data:') ? 'Re-upload' : 'Upload PDF'}
                                </button>
                              </div>
                            </div>

                            {lecture.videoUrl.startsWith('data:') && (
                              <div className="flex items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                <LucideFileIcon size={16} className="text-emerald-600 mr-2" />
                                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Mock stored PDF file detected</span>
                                <button 
                                  onClick={() => handleUpdateLecture(section.id, lecture.id, { videoUrl: '' })}
                                  className="ml-auto text-[10px] font-bold text-red-500 hover:underline"
                                >
                                  Clear File
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {lecture.type === 'quiz' && (
                          <div className="p-5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/20 flex flex-col space-y-4">
                            <div className="flex items-start">
                              <HelpCircle size={20} className="text-indigo-500 mr-3 shrink-0 mt-1" />
                              <div className="flex-1">
                                <h5 className="text-xs font-bold text-indigo-600 mb-1">Interactive Quiz Configuration</h5>
                                <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                  {lecture.quizQuestions && lecture.quizQuestions.length > 0 
                                    ? `Total Questions: ${lecture.quizQuestions.length}`
                                    : 'No questions defined yet. Challenge your students by building a quiz.'}
                                </p>
                              </div>
                            </div>
                            <button 
                              onClick={() => setActiveQuizEdit({ sId: section.id, lecture })}
                              className="w-full flex items-center justify-center p-2.5 bg-white dark:bg-slate-800 rounded-xl text-xs font-bold text-indigo-600 border border-indigo-100 dark:border-indigo-900/30 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all shadow-sm"
                            >
                              <Settings size={14} className="mr-2" /> 
                              {lecture.quizQuestions && lecture.quizQuestions.length > 0 ? 'Edit Quiz Questions' : 'Configure Quiz Questions'}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Thumbnail Picker */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sticky top-24">
             <h3 className="text-sm font-bold dark:text-white flex items-center uppercase tracking-widest">
               <LucideImageIcon size={18} className="mr-2 text-indigo-600" /> Thumbnail
             </h3>
             <div className="aspect-video rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative group shadow-inner ring-1 ring-slate-200 dark:ring-slate-800">
                <img src={thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Course Thumbnail Preview" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm space-y-2">
                   <button 
                    onClick={() => imageInputRef.current?.click()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-xl hover:scale-105 transition-transform flex items-center"
                   >
                     <Upload size={14} className="mr-1.5" /> Upload Image
                   </button>
                   <button 
                    onClick={() => setThumbnail(`https://picsum.photos/seed/${Math.random()}/800/450`)}
                    className="px-4 py-2 bg-white rounded-xl text-indigo-600 text-xs font-black shadow-xl hover:scale-105 transition-transform flex items-center"
                   >
                     <RefreshCw size={14} className="mr-1.5" /> Randomize
                   </button>
                </div>
             </div>
             <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Image URL / Data</label>
                <input 
                  type="text" 
                  value={thumbnail.startsWith('data:') ? 'Custom uploaded image' : thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  disabled={thumbnail.startsWith('data:')}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all shadow-sm"
                />
                {thumbnail.startsWith('data:') && (
                  <button 
                    onClick={() => setThumbnail('https://picsum.photos/seed/new-course/800/450')}
                    className="mt-2 text-[10px] font-bold text-red-500 hover:underline"
                  >
                    Reset to Default
                  </button>
                )}
             </div>

             <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold dark:text-white mb-4 flex items-center">
                   <ShieldCheck size={18} className="mr-2 text-indigo-600" /> Instructor Verified
                </h4>
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                   <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Modules</span>
                      <span className="font-bold dark:text-white">{content.length}</span>
                   </div>
                   <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Lectures</span>
                      <span className="font-bold dark:text-white">{content.reduce((acc, s) => acc + s.lectures.length, 0)}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
