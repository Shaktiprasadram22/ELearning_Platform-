
export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  requirement: string;
  category: 'learning' | 'social' | 'streak' | 'special';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[]; // IDs of unlocked badges
  lastLogin?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
  enrolled: number;
  category: string;
  content: Section[];
}

export interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isCompleted: boolean;
  type: 'video' | 'pdf' | 'quiz';
  quizQuestions?: QuizQuestion[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  isMe?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface LiveParticipant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isRaisingHand: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
  isMe?: boolean;
}
