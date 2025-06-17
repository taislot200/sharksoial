// Mock data for SHARKSO🦈IAL UI testing
import { User, PostWithAuthor, ChatWithLastMessage, UserWithStats } from '@shared/schema';

export const mockUser: UserWithStats = {
  id: 1,
  username: 'mockuser',
  displayName: 'Mock User',
  avatar: '',
  bio: 'This is a mock user.',
  stats: { posts: 3, friends: 2, credits: 100 },
};

export const mockFriends: User[] = [
  { id: 2, username: 'alice', displayName: 'Alice', avatar: '', bio: 'Alice the hacker' },
  { id: 3, username: 'bob', displayName: 'Bob', avatar: '', bio: 'Bob the shark' },
];

export const mockPosts: PostWithAuthor[] = [
  {
    id: 101,
    content: 'Welcome to SHARKSO🦈IAL! #mock',
    imageUrl: '',
    author: mockUser,
    createdAt: new Date().toISOString(),
    liked: false,
    saved: false,
    likes: 1,
    comments: 1,
  },
  {
    id: 102,
    content: 'โพสต์นี้สร้างจาก mock data',
    imageUrl: '',
    author: mockFriends[0],
    createdAt: new Date().toISOString(),
    liked: true,
    saved: false,
    likes: 2,
    comments: 0,
  },
];

export const mockChats: ChatWithLastMessage[] = [
  {
    id: 1,
    participants: [mockUser, mockFriends[0]],
    lastMessage: { sender: mockFriends[0], content: 'สวัสดี!', timestamp: Date.now() },
  },
];

export const mockMessages = [
  { sender: 'alice', content: 'Hello, Mock!', timestamp: new Date().toISOString() },
  { sender: 'mockuser', content: 'Hi Alice!', timestamp: new Date().toISOString() },
];
