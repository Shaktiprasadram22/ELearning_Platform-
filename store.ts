
import { create } from 'zustand';
import { User, UserRole, Course, ChatMessage, LiveParticipant } from './types';

interface AppState {
  user: User | null;
  courses: Course[];
  activeCourse: Course | null;
  currentLecture: string | null;
  messages: ChatMessage[];
  liveParticipants: LiveParticipant[];
  isDarkMode: boolean;
  
  // Actions
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  setCourses: (courses: Course[]) => void;
  setActiveCourse: (course: Course) => void;
  setCurrentLecture: (id: string) => void;
  addMessage: (msg: ChatMessage) => void;
  toggleDarkMode: () => void;
  updateXP: (amount: number) => void;
  setLiveParticipants: (p: LiveParticipant[]) => void;
  toggleHand: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  courses: [],
  activeCourse: null,
  currentLecture: null,
  messages: [],
  liveParticipants: [],
  isDarkMode: false,

  login: (email, role) => set({
    user: {
      id: 'u1',
      name: email.split('@')[0],
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      xp: 1250,
      streak: 5,
      badges: ['Quick Learner', 'Code Ninja']
    }
  }),
  
  logout: () => set({ user: null, activeCourse: null }),
  setCourses: (courses) => set({ courses }),
  setActiveCourse: (course) => set({ activeCourse: course }),
  setCurrentLecture: (id) => set({ currentLecture: id }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  toggleDarkMode: () => set((state) => {
    const next = !state.isDarkMode;
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    return { isDarkMode: next };
  }),
  updateXP: (amount) => set((state) => state.user ? ({
    user: { ...state.user, xp: state.user.xp + amount }
  }) : {}),
  setLiveParticipants: (p) => set({ liveParticipants: p }),
  toggleHand: (id) => set((state) => ({
    liveParticipants: state.liveParticipants.map(p => 
      p.id === id ? { ...p, isRaisingHand: !p.isRaisingHand } : p
    )
  }))
}));
