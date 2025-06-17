import { User, InsertUser } from "@shared/schema";
import { config } from "./config.service";
import { MockService } from "./mock.service";

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  register(userData: InsertUser): Promise<AuthResponse>;
  logout(userId: number): Promise<void>;
  validateToken(token: string): Promise<User | null>;
  getCurrentUser(userId: number): Promise<User | null>;
}

export class MockAuthService implements IAuthService {
  private mockService = MockService.getInstance();
  
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const user = this.mockService.getMockUser();
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (credentials.username === user.username) {
      return {
        user,
        token: 'mock-jwt-token'
      };
    }
    
    throw new Error('Invalid credentials');
  }
  
  async register(userData: InsertUser): Promise<AuthResponse> {
    // Simulate registration delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.floor(Math.random() * 1000) + 100,
      ...userData,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date(),
    };
    
    return {
      user,
      token: 'mock-jwt-token'
    };
  }
  
  async logout(userId: number): Promise<void> {
    console.log(`Mock logout for user ${userId}`);
  }
  
  async validateToken(token: string): Promise<User | null> {
    if (token === 'mock-jwt-token') {
      return this.mockService.getMockUser();
    }
    return null;
  }
  
  async getCurrentUser(userId: number): Promise<User | null> {
    return this.mockService.getMockUser();
  }
}

export class ProductionAuthService implements IAuthService {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    // TODO: Implement real authentication
    throw new Error('Production auth not implemented yet');
  }
  
  async register(userData: InsertUser): Promise<AuthResponse> {
    // TODO: Implement real registration
    throw new Error('Production auth not implemented yet');
  }
  
  async logout(userId: number): Promise<void> {
    // TODO: Implement real logout
    throw new Error('Production auth not implemented yet');
  }
  
  async validateToken(token: string): Promise<User | null> {
    // TODO: Implement real token validation
    throw new Error('Production auth not implemented yet');
  }
  
  async getCurrentUser(userId: number): Promise<User | null> {
    // TODO: Implement real user fetching
    throw new Error('Production auth not implemented yet');
  }
}

export class AuthServiceFactory {
  static create(): IAuthService {
    if (config.useMock) {
      return new MockAuthService();
    }
    return new ProductionAuthService();
  }
}

export const authService = AuthServiceFactory.create();
