import { 
  users, posts, comments, friendships, chats, messages, postLikes, postSaves,
  type User, type InsertUser, type Post, type InsertPost, 
  type PostWithAuthor, type ChatWithLastMessage, type UserWithStats,
  type Comment, type InsertComment, type Friendship, type InsertFriendship,
  type Chat, type InsertChat, type Message, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  getUserWithStats(id: number): Promise<UserWithStats | undefined>;
  
  // Post operations
  getPosts(limit?: number, offset?: number): Promise<PostWithAuthor[]>;
  getPost(id: number): Promise<PostWithAuthor | undefined>;
  getPostsByUser(userId: number): Promise<PostWithAuthor[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, updates: Partial<Post>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  
  // Post interactions
  likePost(postId: number, userId: number): Promise<boolean>;
  unlikePost(postId: number, userId: number): Promise<boolean>;
  savePost(postId: number, userId: number): Promise<boolean>;
  unsavePost(postId: number, userId: number): Promise<boolean>;
  
  // Comments
  getCommentsByPost(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Friends
  getFriends(userId: number): Promise<User[]>;
  getFriendRequests(userId: number): Promise<User[]>;
  sendFriendRequest(userId: number, friendId: number): Promise<Friendship>;
  acceptFriendRequest(userId: number, friendId: number): Promise<boolean>;
  rejectFriendRequest(userId: number, friendId: number): Promise<boolean>;
  
  // Chats
  getChats(userId: number): Promise<ChatWithLastMessage[]>;
  getChat(id: number): Promise<Chat | undefined>;
  createChat(chat: InsertChat): Promise<Chat>;
  
  // Messages
  getMessages(chatId: number, limit?: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessagesAsRead(chatId: number, userId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private friendships: Map<number, Friendship>;
  private chats: Map<number, Chat>;
  private messages: Map<number, Message>;
  private postLikes: Map<string, { postId: number; userId: number }>;
  private postSaves: Map<string, { postId: number; userId: number }>;
  
  private currentUserId: number;
  private currentPostId: number;
  private currentCommentId: number;
  private currentFriendshipId: number;
  private currentChatId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.friendships = new Map();
    this.chats = new Map();
    this.messages = new Map();
    this.postLikes = new Map();
    this.postSaves = new Map();
    
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.currentCommentId = 1;
    this.currentFriendshipId = 1;
    this.currentChatId = 1;
    this.currentMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      bio: insertUser.bio ?? null,
      avatar: insertUser.avatar ?? null,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUserWithStats(id: number): Promise<UserWithStats | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const postsCount = Array.from(this.posts.values()).filter(p => p.authorId === id).length;
    const friendsCount = Array.from(this.friendships.values())
      .filter(f => (f.userId === id || f.friendId === id) && f.status === 'accepted').length;
    const likesCount = Array.from(this.posts.values())
      .filter(p => p.authorId === id)
      .reduce((sum, p) => sum + (p.likesCount ?? 0), 0);
    
    return {
      ...user,
      postsCount,
      friendsCount,
      likesCount
    };
  }

  async getPosts(limit = 10, offset = 0): Promise<PostWithAuthor[]> {
    const allPosts = Array.from(this.posts.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(offset, offset + limit);
    
    return Promise.all(allPosts.map(async (post) => {
      const author = await this.getUser(post.authorId);
      return {
        ...post,
        author: author!,
        isLiked: this.postLikes.has(`${post.id}-${post.authorId}`),
        isSaved: this.postSaves.has(`${post.id}-${post.authorId}`)
      };
    }));
  }

  async getPost(id: number): Promise<PostWithAuthor | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const author = await this.getUser(post.authorId);
    return {
      ...post,
      author: author!,
      isLiked: this.postLikes.has(`${post.id}-${post.authorId}`),
      isSaved: this.postSaves.has(`${post.id}-${post.authorId}`)
    };
  }

  async getPostsByUser(userId: number): Promise<PostWithAuthor[]> {
    const userPosts = Array.from(this.posts.values())
      .filter(p => p.authorId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
    
    const author = await this.getUser(userId);
    return userPosts.map(post => ({
      ...post,
      author: author!,
      isLiked: this.postLikes.has(`${post.id}-${userId}`),
      isSaved: this.postSaves.has(`${post.id}-${userId}`)
    }));
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const post: Post = {
      ...insertPost,
      id,
      imageUrl: insertPost.imageUrl ?? null,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date()
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: number, updates: Partial<Post>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }

  async likePost(postId: number, userId: number): Promise<boolean> {
    const key = `${postId}-${userId}`;
    if (this.postLikes.has(key)) return false;
    
    this.postLikes.set(key, { postId, userId });
    const post = this.posts.get(postId);
    if (post) {
      post.likesCount = (post.likesCount ?? 0) + 1;
      this.posts.set(postId, post);
    }
    return true;
  }

  async unlikePost(postId: number, userId: number): Promise<boolean> {
    const key = `${postId}-${userId}`;
    if (!this.postLikes.has(key)) return false;
    
    this.postLikes.delete(key);
    const post = this.posts.get(postId);
    if (post && (post.likesCount ?? 0) > 0) {
      post.likesCount = (post.likesCount ?? 0) - 1;
      this.posts.set(postId, post);
    }
    return true;
  }

  async savePost(postId: number, userId: number): Promise<boolean> {
    const key = `${postId}-${userId}`;
    if (this.postSaves.has(key)) return false;
    
    this.postSaves.set(key, { postId, userId });
    return true;
  }

  async unsavePost(postId: number, userId: number): Promise<boolean> {
    const key = `${postId}-${userId}`;
    return this.postSaves.delete(key);
  }

  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(c => c.postId === postId)
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = {
      ...insertComment,
      id,
      createdAt: new Date()
    };
    this.comments.set(id, comment);
    
    // Update comments count
    const post = this.posts.get(insertComment.postId);
    if (post) {
      post.commentsCount = (post.commentsCount ?? 0) + 1;
      this.posts.set(insertComment.postId, post);
    }
    
    return comment;
  }

  async getFriends(userId: number): Promise<User[]> {
    const friendships = Array.from(this.friendships.values())
      .filter(f => (f.userId === userId || f.friendId === userId) && f.status === 'accepted');
    
    const friendIds = friendships.map(f => f.userId === userId ? f.friendId : f.userId);
    const friends = await Promise.all(friendIds.map(id => this.getUser(id)));
    return friends.filter(Boolean) as User[];
  }

  async getFriendRequests(userId: number): Promise<User[]> {
    const requests = Array.from(this.friendships.values())
      .filter(f => f.friendId === userId && f.status === 'pending');
    
    const requesters = await Promise.all(requests.map(r => this.getUser(r.userId)));
    return requesters.filter(Boolean) as User[];
  }

  async sendFriendRequest(userId: number, friendId: number): Promise<Friendship> {
    const id = this.currentFriendshipId++;
    const friendship: Friendship = {
      id,
      userId,
      friendId,
      status: 'pending',
      createdAt: new Date()
    };
    this.friendships.set(id, friendship);
    return friendship;
  }

  async acceptFriendRequest(userId: number, friendId: number): Promise<boolean> {
    const friendship = Array.from(this.friendships.values())
      .find(f => f.userId === friendId && f.friendId === userId && f.status === 'pending');
    
    if (!friendship) return false;
    
    friendship.status = 'accepted';
    this.friendships.set(friendship.id, friendship);
    return true;
  }

  async rejectFriendRequest(userId: number, friendId: number): Promise<boolean> {
    const friendship = Array.from(this.friendships.values())
      .find(f => f.userId === friendId && f.friendId === userId && f.status === 'pending');
    
    if (!friendship) return false;
    
    friendship.status = 'rejected';
    this.friendships.set(friendship.id, friendship);
    return true;
  }

  async getChats(userId: number): Promise<ChatWithLastMessage[]> {
    // This is a simplified implementation
    // In a real app, you'd join chat_members table
    const allChats = Array.from(this.chats.values());
    
    return Promise.all(allChats.map(async (chat) => {
      const messages = Array.from(this.messages.values())
        .filter(m => m.chatId === chat.id)
        .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
      
      const lastMessage = messages[0];
      let lastMessageWithSender;
      
      if (lastMessage) {
        const sender = await this.getUser(lastMessage.senderId);
        lastMessageWithSender = {
          ...lastMessage,
          sender: sender!
        };
      }
      
      const unreadCount = messages.filter(m => !m.isRead && m.senderId !== userId).length;
      
      return {
        ...chat,
        lastMessage: lastMessageWithSender,
        unreadCount,
        members: [] // Simplified for now
      };
    }));
  }

  async getChat(id: number): Promise<Chat | undefined> {
    return this.chats.get(id);
  }

  async createChat(insertChat: InsertChat): Promise<Chat> {
    const id = this.currentChatId++;
    const chat: Chat = {
      ...insertChat,
      id,
      name: insertChat.name ?? null,
      avatar: insertChat.avatar ?? null,
      isGroup: insertChat.isGroup ?? false,
      createdAt: new Date()
    };
    this.chats.set(id, chat);
    return chat;
  }

  async getMessages(chatId: number, limit = 50): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(m => m.chatId === chatId)
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime())
      .slice(-limit);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      messageType: insertMessage.messageType ?? "text",
      isRead: false,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessagesAsRead(chatId: number, userId: number): Promise<boolean> {
    const messages = Array.from(this.messages.values())
      .filter(m => m.chatId === chatId && m.senderId !== userId && !m.isRead);
    
    messages.forEach(message => {
      message.isRead = true;
      this.messages.set(message.id, message);
    });
    
    return true;
  }
}

export const storage = new MemStorage();
