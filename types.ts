
export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  xp: number;
  streak: number;
  badges: string[];
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
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  isMe?: boolean;
}

export interface LiveParticipant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isRaisingHand: boolean;
}
