import { User, PostWithAuthor, ChatWithLastMessage, UserWithStats } from '@shared/schema';
import { apiRequest } from '../lib/queryClient';

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
    const res = await apiRequest('POST', '/api/auth/login', credentials);
    return res.json();
  }

  async register(userData: any): Promise<AuthResponse> {
    const res = await apiRequest('POST', '/api/auth/register', userData);
    return res.json();
  }

  async logout(userId: number): Promise<void> {
    await apiRequest('POST', '/api/auth/logout', { userId });
  }

  async getCurrentUser(): Promise<UserWithStats> {
    const res = await apiRequest('GET', '/api/users/me');
    return res.json();
  }

  // Posts methods
  async getPosts(limit = 10, offset = 0): Promise<PostWithAuthor[]> {
    const res = await apiRequest('GET', `/api/posts?limit=${limit}&offset=${offset}`);
    return res.json();
  }

  async getPost(id: number): Promise<PostWithAuthor> {
    const res = await apiRequest('GET', `/api/posts/${id}`);
    return res.json();
  }

  async createPost(postData: { content: string; imageUrl?: string; authorId: number }): Promise<any> {
    const res = await apiRequest('POST', '/api/posts', postData);
    return res.json();
  }

  async likePost(postId: number): Promise<{ success: boolean }> {
    const res = await apiRequest('POST', `/api/posts/${postId}/like`);
    return res.json();
  }

  async unlikePost(postId: number): Promise<{ success: boolean }> {
    const res = await apiRequest('DELETE', `/api/posts/${postId}/like`);
    return res.json();
  }

  async savePost(postId: number): Promise<{ success: boolean }> {
    const res = await apiRequest('POST', `/api/posts/${postId}/save`);
    return res.json();
  }

  async unsavePost(postId: number): Promise<{ success: boolean }> {
    const res = await apiRequest('DELETE', `/api/posts/${postId}/save`);
    return res.json();
  }

  // Friends methods
  async getFriends(): Promise<User[]> {
    const res = await apiRequest('GET', '/api/friends');
    return res.json();
  }

  async getFriendRequests(): Promise<User[]> {
    const res = await apiRequest('GET', '/api/friends/requests');
    return res.json();
  }

  async sendFriendRequest(friendId: number): Promise<any> {
    const res = await apiRequest('POST', `/api/friends/${friendId}/request`);
    return res.json();
  }

  async acceptFriendRequest(friendId: number): Promise<{ success: boolean }> {
    const res = await apiRequest('POST', `/api/friends/${friendId}/accept`);
    return res.json();
  }

  // Chats methods
  async getChats(): Promise<ChatWithLastMessage[]> {
    const res = await apiRequest('GET', '/api/chats');
    return res.json();
  }

  async getMessages(chatId: number, limit = 50): Promise<any[]> {
    const res = await apiRequest('GET', `/api/chats/${chatId}/messages?limit=${limit}`);
    return res.json();
  }

  async sendMessage(chatId: number, content: string): Promise<any> {
    const res = await apiRequest('POST', `/api/chats/${chatId}/messages`, { content });
    return res.json();
  }
}

export const apiService = new ApiService();
