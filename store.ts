
import { create } from 'zustand';
import { User, UserRole, Course, ChatMessage, LiveParticipant, Badge } from './types';

interface AppState {
  user: User | null;
  courses: Course[];
  enrolledCourseIds: string[];
  completedLectureIds: string[];
  activeCourse: Course | null;
  currentLectureId: string | null;
  messages: ChatMessage[];
  liveParticipants: LiveParticipant[];
  isDarkMode: boolean;
  isPro: boolean;
  unlockedBadges: string[];
  
  // Actions
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  enrollInCourse: (id: string) => void;
  setActiveCourse: (course: Course | null) => void;
  setCurrentLecture: (id: string | null) => void;
  completeLecture: (id: string) => void;
  addMessage: (msg: ChatMessage) => void;
  toggleDarkMode: () => void;
  updateXP: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  setLiveParticipants: (p: LiveParticipant[]) => void;
  toggleHand: (id: string) => void;
  setProStatus: (status: boolean) => void;
}

const calculateLevel = (xp: number) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const useStore = create<AppState>((set) => ({
  user: null,
  courses: [],
  enrolledCourseIds: ['c1'], 
  completedLectureIds: ['l1'],
  activeCourse: null,
  currentLectureId: null,
  messages: [],
  liveParticipants: [],
  isDarkMode: false,
  isPro: false,
  unlockedBadges: ['b1', 'b2'],

  login: (email, role) => {
    const xp = 1250;
    set({
      user: {
        id: 'u1',
        name: email.split('@')[0],
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        xp: xp,
        level: calculateLevel(xp),
        streak: 5,
        badges: ['b1', 'b2'],
        lastLogin: Date.now()
      }
    });
  },
  
  logout: () => set({ user: null, activeCourse: null, currentLectureId: null }),
  setCourses: (courses) => set({ courses }),
  addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
  enrollInCourse: (id) => set((state) => ({ 
    enrolledCourseIds: state.enrolledCourseIds.includes(id) ? state.enrolledCourseIds : [...state.enrolledCourseIds, id] 
  })),
  setActiveCourse: (course) => set({ activeCourse: course }),
  setCurrentLecture: (id) => set({ currentLectureId: id }),
  completeLecture: (id) => set((state) => ({
    completedLectureIds: state.completedLectureIds.includes(id) ? state.completedLectureIds : [...state.completedLectureIds, id]
  })),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  toggleDarkMode: () => set((state) => {
    const next = !state.isDarkMode;
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    return { isDarkMode: next };
  }),
  updateXP: (amount) => set((state) => {
    if (!state.user) return {};
    const newXP = state.user.xp + amount;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > state.user.level;
    
    return {
      user: { 
        ...state.user, 
        xp: newXP, 
        level: newLevel 
      }
    };
  }),
  unlockBadge: (badgeId) => set((state) => {
    if (!state.user || state.user.badges.includes(badgeId)) return {};
    return {
      user: {
        ...state.user,
        badges: [...state.user.badges, badgeId]
      }
    };
  }),
  setLiveParticipants: (p) => set({ liveParticipants: p }),
  toggleHand: (id) => set((state) => ({
    liveParticipants: state.liveParticipants.map(p => 
      p.id === id ? { ...p, isRaisingHand: !p.isRaisingHand } : p
    )
  })),
  setProStatus: (status) => set({ isPro: status }),
}));
