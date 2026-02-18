
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { CheckCircle2, XCircle, ChevronRight, Timer, Trophy } from 'lucide-react';

const MOCK_QUIZ = [
  {
    question: "What is the primary benefit of the Render Prop pattern?",
    options: ["Performance optimization", "Shared state management", "Dynamic component injection", "Ease of debugging"],
    answer: 2
  },
  {
    question: "Which hook is most commonly used for creating custom state management patterns?",
    options: ["useEffect", "useReducer", "useCallback", "useMemo"],
    answer: 1
  }
];

const QuizView = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const { updateXP } = useStore();

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsFinished(true);
    }
  }, [timeLeft, isFinished]);

  const handleNext = () => {
    if (selectedOption === MOCK_QUIZ[currentStep].answer) {
      setScore(score + 1);
    }
    
    if (currentStep < MOCK_QUIZ.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      updateXP(score * 50);
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center space-y-6 animate-in zoom-in-95 duration-300 shadow-xl">
        <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto">
          <Trophy size={40} className="text-amber-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Quiz Completed!</h2>
          <p className="text-slate-500">You scored {score} out of {MOCK_QUIZ.length}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
          <p className="text-sm font-bold text-indigo-600">+{score * 50} XP Gained</p>
        </div>
        <button 
          onClick={onComplete}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          Return to Course
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl space-y-8 shadow-xl">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question {currentStep + 1} of {MOCK_QUIZ.length}</p>
          <div className="h-1.5 w-48 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500" 
              style={{ width: `${((currentStep + 1) / MOCK_QUIZ.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 px-3 py-1.5 rounded-xl font-bold text-sm">
          <Timer size={16} />
          <span>{timeLeft}s</span>
        </div>
      </div>

      <h3 className="text-xl font-bold dark:text-white leading-snug">
        {MOCK_QUIZ[currentStep].question}
      </h3>

      <div className="space-y-3">
        {MOCK_QUIZ[currentStep].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOption(idx)}
            className={`w-full p-4 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${
              selectedOption === idx 
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' 
                : 'border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span className="font-medium text-sm">{option}</span>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === idx ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
              {selectedOption === idx && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </button>
        ))}
      </div>

      <button
        disabled={selectedOption === null}
        onClick={handleNext}
        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 dark:shadow-none"
      >
        {currentStep === MOCK_QUIZ.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
};

export default QuizView;
