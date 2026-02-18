
import { Course, UserRole, Contact } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced React Patterns',
    instructor: 'Sarah Drasner',
    description: 'Master the art of high-performance React applications using advanced patterns, custom hooks, and state management strategies.',
    thumbnail: 'https://picsum.photos/seed/react/800/450',
    price: 99,
    rating: 4.8,
    enrolled: 1250,
    category: 'Development',
    content: [
      {
        id: 's1',
        title: 'Introduction to Patterns',
        lectures: [
          { id: 'l1', title: 'Why Patterns Matter', duration: '10:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: true, type: 'video' },
          { id: 'l2', title: 'The Render Prop Pattern', duration: '15:20', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, type: 'video' }
        ]
      },
      {
        id: 's2',
        title: 'Compound Components',
        lectures: [
          { id: 'l3', title: 'Building Flexibly', duration: '12:45', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, type: 'video' },
          { id: 'l4', title: 'Quiz: Testing your Knowledge', duration: '5:00', videoUrl: '', isCompleted: false, type: 'quiz' }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Fullstack Next.js 14',
    instructor: 'Lee Robinson',
    description: 'Learn the latest Next.js 14 features including App Router, Server Actions, and Partial Prerendering.',
    thumbnail: 'https://picsum.photos/seed/nextjs/800/450',
    price: 149,
    rating: 4.9,
    enrolled: 3200,
    category: 'Development',
    content: []
  },
  {
    id: 'c3',
    title: 'UI/UX Fundamentals',
    instructor: 'Gary Simon',
    description: 'The foundation of good design: Hierarchy, White Space, Color Theory, and Typography.',
    thumbnail: 'https://picsum.photos/seed/design/800/450',
    price: 79,
    rating: 4.7,
    enrolled: 850,
    category: 'Design',
    content: []
  }
];

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 'u-sarah',
    name: 'Sarah Drasner',
    role: 'Instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    status: 'online',
    lastMessage: 'The new module on Server Actions is live!',
    lastMessageTime: '10:45 AM',
    unreadCount: 2
  },
  {
    id: 'u-gary',
    name: 'Gary Simon',
    role: 'Instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gary',
    status: 'away',
    lastMessage: 'Did you check the typography assignments?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'u-lee',
    name: 'Lee Robinson',
    role: 'Instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lee',
    status: 'online',
    lastMessage: 'Welcome to the Next.js community!',
    lastMessageTime: '2 days ago',
    unreadCount: 0
  },
  {
    id: 'u-alex',
    name: 'Alex Johnson',
    role: 'Student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    status: 'offline',
    lastMessage: 'Hey, do you want to collaborate on the project?',
    lastMessageTime: '3 days ago',
    unreadCount: 0
  },
  {
    id: 'u-maria',
    name: 'Maria Garcia',
    role: 'Student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    status: 'online',
    lastMessage: 'Thanks for the help with the CSS grid!',
    lastMessageTime: 'Just now',
    unreadCount: 0
  }
];

export const MOCK_PARTICIPANTS = [
  { id: 'p1', name: 'Alice Chen', avatar: 'https://i.pravatar.cc/150?u=a', isMuted: false, isVideoOff: false, isRaisingHand: false },
  { id: 'p2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?u=b', isMuted: true, isVideoOff: false, isRaisingHand: true },
  { id: 'p3', name: 'Charlie Day', avatar: 'https://i.pravatar.cc/150?u=c', isMuted: false, isVideoOff: true, isRaisingHand: false },
  { id: 'p4', name: 'Diana Ross', avatar: 'https://i.pravatar.cc/150?u=d', isMuted: true, isVideoOff: true, isRaisingHand: false },
];

export const simulatePayment = async (amount: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ status: 'success', transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9) }), 2000);
  });
};
