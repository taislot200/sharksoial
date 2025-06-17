import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authService } from "./services/auth.service";
import { MockService } from "./services/mock.service";
import { config } from "./services/config.service";
import { insertUserSchema, insertPostSchema, insertCommentSchema, insertFriendshipSchema, insertChatSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export async function registerRoutes(app: Express): Promise<Server> {
  const mockService = MockService.getInstance();
  
  // Initialize mock data if using mock mode
  if (config.useMock) {
    // Add mock users
    const mockUsers = [mockService.getMockUser(), ...mockService.getMockUsers()];
    for (const user of mockUsers) {
      try {
        await storage.createUser({
          username: user.username,
          password: user.password,
          displayName: user.displayName,
          bio: user.bio,
          avatar: user.avatar
        });
      } catch (error) {
        // User might already exist, ignore
      }
    }
    
    // Add mock posts
    const mockPosts = mockService.getMockPosts();
    for (const post of mockPosts) {
      await storage.createPost({
        authorId: post.authorId,
        content: post.content,
        imageUrl: post.imageUrl
      });
    }
    
    // Add mock chats and messages
    const mockChats = mockService.getMockChats();
    for (const chat of mockChats) {
      const createdChat = await storage.createChat({
        name: chat.name,
        isGroup: chat.isGroup,
        avatar: chat.avatar
      });
      
      if (chat.lastMessage) {
        await storage.createMessage({
          chatId: createdChat.id,
          senderId: chat.lastMessage.senderId,
          content: chat.lastMessage.content,
          messageType: chat.lastMessage.messageType
        });
      }
    }
  }

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const result = await authService.login({ username, password });
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Login failed' });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const result = await authService.register(userData);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Registration failed' });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    try {
      const { userId } = req.body;
      await authService.logout(userId);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Logout failed' });
    }
  });

  // User routes
  app.get("/api/users/me", async (req, res) => {
    try {
      // In a real app, you'd get userId from JWT token
      const userId = 1; // Mock current user
      const user = await storage.getUserWithStats(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get user' });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get user' });
    }
  });

  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const posts = await storage.getPosts(limit, offset);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get posts' });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get post' });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to create post' });
    }
  });

  app.post("/api/posts/:id/like", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = 1; // Mock current user
      const success = await storage.likePost(postId, userId);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to like post' });
    }
  });

  app.delete("/api/posts/:id/like", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = 1; // Mock current user
      const success = await storage.unlikePost(postId, userId);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to unlike post' });
    }
  });

  app.post("/api/posts/:id/save", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = 1; // Mock current user
      const success = await storage.savePost(postId, userId);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to save post' });
    }
  });

  app.delete("/api/posts/:id/save", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = 1; // Mock current user
      const success = await storage.unsavePost(postId, userId);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to unsave post' });
    }
  });

  // Comments routes
  app.get("/api/posts/:id/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const comments = await storage.getCommentsByPost(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get comments' });
    }
  });

  app.post("/api/posts/:id/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const commentData = insertCommentSchema.parse({
        ...req.body,
        postId,
        authorId: 1 // Mock current user
      });
      const comment = await storage.createComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to create comment' });
    }
  });

  // Friends routes
  app.get("/api/friends", async (req, res) => {
    try {
      const userId = 1; // Mock current user
      const friends = await storage.getFriends(userId);
      res.json(friends);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get friends' });
    }
  });

  app.get("/api/friends/requests", async (req, res) => {
    try {
      const userId = 1; // Mock current user
      const requests = await storage.getFriendRequests(userId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get friend requests' });
    }
  });

  app.post("/api/friends/:id/request", async (req, res) => {
    try {
      const friendId = parseInt(req.params.id);
      const userId = 1; // Mock current user
      const friendship = await storage.sendFriendRequest(userId, friendId);
      res.status(201).json(friendship);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to send friend request' });
    }
  });

  app.post("/api/friends/:id/accept", async (req, res) => {
    try {
      const friendId = parseInt(req.params.id);
      const userId = 1; // Mock current user
      const success = await storage.acceptFriendRequest(userId, friendId);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to accept friend request' });
    }
  });

  // Chats routes
  app.get("/api/chats", async (req, res) => {
    try {
      const userId = 1; // Mock current user
      const chats = await storage.getChats(userId);
      res.json(chats);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get chats' });
    }
  });

  app.get("/api/chats/:id/messages", async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 50;
      const messages = await storage.getMessages(chatId, limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to get messages' });
    }
  });

  app.post("/api/chats/:id/messages", async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const messageData = insertMessageSchema.parse({
        ...req.body,
        chatId,
        senderId: 1 // Mock current user
      });
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to send message' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
