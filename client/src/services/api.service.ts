import { User, PostWithAuthor, ChatWithLastMessage, UserWithStats } from '@shared/schema';
import { apiRequest } from '../lib/queryClient';
import * as mock from './mockData';

function isMockMode() {
  if (typeof window !== 'undefined' && (window as any).USE_MOCK !== undefined) return (window as any).USE_MOCK;
  return process.env.USE_MOCK === 'true';
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export class ApiService {
  // Auth methods
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    if (isMockMode()) {
      return Promise.resolve({ user: mock.mockUser, token: 'mocktoken' });
    }
    const res = await apiRequest('POST', '/api/auth/login', credentials);
    return res.json();
  }

  async register(userData: any): Promise<AuthResponse> {
    if (isMockMode()) {
      return Promise.resolve({ user: mock.mockUser, token: 'mocktoken' });
    }
    const res = await apiRequest('POST', '/api/auth/register', userData);
    return res.json();
  }

  async logout(userId: number): Promise<void> {
    if (isMockMode()) return Promise.resolve();
    await apiRequest('POST', '/api/auth/logout', { userId });
  }

  async getCurrentUser(): Promise<UserWithStats> {
    if (isMockMode()) {
      return Promise.resolve(mock.mockUser);
    }
    const res = await apiRequest('GET', '/api/users/me');
    return res.json();
  }

  // Posts methods
  async getPosts(limit = 10, offset = 0): Promise<PostWithAuthor[]> {
    if (isMockMode()) {
      return Promise.resolve(mock.mockPosts);
    }
    const res = await apiRequest('GET', `/api/posts?limit=${limit}&offset=${offset}`);
    return res.json();
  }

  async getPost(id: number): Promise<PostWithAuthor> {
    if (isMockMode()) {
      return Promise.resolve(mock.mockPosts[0]);
    }
    const res = await apiRequest('GET', `/api/posts/${id}`);
    return res.json();
  }

  async createPost(postData: { content: string; imageUrl?: string; authorId: number }): Promise<any> {
    if (isMockMode()) {
      return Promise.resolve({ success: true, post: { ...postData, id: Date.now() } });
    }
    const res = await apiRequest('POST', '/api/posts', postData);
    return res.json();
  }

  async likePost(postId: number): Promise<{ success: boolean }> {
    if (isMockMode()) return Promise.resolve({ success: true });
    const res = await apiRequest('POST', `/api/posts/${postId}/like`);
    return res.json();
  }

  async unlikePost(postId: number): Promise<{ success: boolean }> {
    if (isMockMode()) return Promise.resolve({ success: true });
    const res = await apiRequest('DELETE', `/api/posts/${postId}/like`);
    return res.json();
  }

  async savePost(postId: number): Promise<{ success: boolean }> {
    if (isMockMode()) return Promise.resolve({ success: true });
    const res = await apiRequest('POST', `/api/posts/${postId}/save`);
    return res.json();
  }

  async unsavePost(postId: number): Promise<{ success: boolean }> {
    if (isMockMode()) return Promise.resolve({ success: true });
    const res = await apiRequest('DELETE', `/api/posts/${postId}/save`);
    return res.json();
  }

  // Friends methods
  async getFriends(): Promise<User[]> {
    if (isMockMode()) {
      return Promise.resolve(mock.mockFriends);
    }
    const res = await apiRequest('GET', '/api/friends');
    return res.json();
  }

  async getFriendRequests(): Promise<User[]> {
    if (isMockMode()) return Promise.resolve([]);
    const res = await apiRequest('GET', '/api/friends/requests');
    return res.json();
  }

  async sendFriendRequest(friendId: number): Promise<any> {
    if (isMockMode()) return Promise.resolve({ success: true });
    const res = await apiRequest('POST', `/api/friends/${friendId}/request`);
    return res.json();
  }

  async acceptFriendRequest(friendId: number): Promise<{ success: boolean }> {
    if (isMockMode()) return Promise.resolve({ success: true });
    const res = await apiRequest('POST', `/api/friends/${friendId}/accept`);
    return res.json();
  }

  // Chats methods
  async getChats(): Promise<ChatWithLastMessage[]> {
    if (isMockMode()) {
      return Promise.resolve(mock.mockChats);
    }
    const res = await apiRequest('GET', '/api/chats');
    return res.json();
  }

  async getMessages(chatId: number, limit = 50): Promise<any[]> {
    if (isMockMode()) {
      return Promise.resolve(mock.mockMessages);
    }
    const res = await apiRequest('GET', `/api/chats/${chatId}/messages?limit=${limit}`);
    return res.json();
  }

  async sendMessage(chatId: number, content: string): Promise<any> {
    if (isMockMode()) return Promise.resolve({ success: true });
    const res = await apiRequest('POST', `/api/chats/${chatId}/messages`, { content });
    return res.json();
  }
}

export const apiService = new ApiService();
