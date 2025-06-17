# SHARKSO🦈IAL System Architecture Overview

> อัปเดตล่าสุด: เพิ่มปุ่มนำทาง "เอกสาร" ใน BottomNavigation สำหรับเข้าถึงเอกสารระบบ

## System Philosophy

SHARKSO🦈IAL is built on the principle of **modular flexibility** with **production readiness**. The system uses environment-based toggles to seamlessly switch between mock development services and production-ready implementations.

## Core Architecture Principles

### 1. Separation of Concerns
- **Authentication Module**: Completely isolated from business logic
- **Data Layer**: Abstract interfaces for easy provider switching
- **UI Components**: Reusable, composable React components
- **Service Layer**: Business logic separated from API routes

### 2. Environment-Aware Design
```typescript
// Automatic service selection based on environment
export class AuthServiceFactory {
  static create(): IAuthService {
    if (config.useMock) {
      return new MockAuthService();
    }
    return new ProductionAuthService();
  }
}
```

## Mock/Production Mode Toggle System

### Configuration Management

The system uses a centralized `ConfigService` with environment variable validation:

```bash
# Development with Mock Data
USE_MOCK=true
NODE_ENV=development

# Production with Real Services
USE_MOCK=false
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
FIREBASE_PROJECT_ID=your-project
```

### Mock Mode (Development)

**Activation**: Set `USE_MOCK=true` in environment variables

**Features**:
- 🚀 **Zero External Dependencies**: No database, auth providers, or APIs needed
- 📋 **Pre-seeded Data**: Complete dataset ready for testing
- ⚡ **Fast Development**: Instant startup with realistic delays
- 🔄 **Automatic Reset**: Fresh data on every restart

**Mock Users for Testing**:
- **Admin** (admin): System administrator - online
- **สมชาย ใจดี** (somchai): Full-stack developer - online  
- **มาลี สวยงาม** (malee): UX/UI Designer - offline (30 min ago)

**Sample Data Includes**:
- 2 private chats + 1 group chat ("ทีมพัฒนา SHARKSO🦈IAL")
- 5 sample messages with Thai content
- Complete friendship connections between all users
- Mock posts with images and interactions

### Production Mode

**Activation**: Set `USE_MOCK=false` in environment variables

**Requirements**:
- PostgreSQL database connection
- JWT secret for authentication
- External service API keys (Firebase/Supabase)
- Image upload service (Cloudinary)

**Features**:
- 🔐 **Real Authentication**: JWT tokens, OAuth providers
- 💾 **Persistent Data**: PostgreSQL with Drizzle ORM
- 🌐 **External Integrations**: Real-time features, file uploads
- 📈 **Production Monitoring**: Error tracking, performance metrics

### Mode Switching Guide

#### Switching to Mock Mode (Development)
```bash
# In .env file
USE_MOCK=true
NODE_ENV=development
# Remove or comment out production variables
```

**Benefits**:
- No setup required
- Instant testing data
- Offline development
- Rapid prototyping

#### Switching to Production Mode
```bash
# In .env file
USE_MOCK=false
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-256-bit-secret
FIREBASE_PROJECT_ID=your-project-id
# Add other required service keys
```

**Verification Steps**:
1. ✅ Database connection successful
2. ✅ Authentication service initialized
3. ✅ External services connected
4. ✅ All environment variables validated

### Service Layer Architecture

Each service implements the same interface but with different backends:

```typescript
interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  register(userData: InsertUser): Promise<AuthResponse>;
  logout(userId: number): Promise<void>;
  validateToken(token: string): Promise<User | null>;
}

// Mock implementation with simulated delays
class MockAuthService implements IAuthService { ... }

// Production implementation with real providers
class ProductionAuthService implements IAuthService { ... }
```

### Development Workflow

1. **Start Development** → Use Mock mode for rapid iteration
2. **Feature Complete** → Test with mock data scenarios
3. **Integration Testing** → Switch to Production mode with test database
4. **Production Deploy** → Full Production mode with live services

### Configuration Validation

The system automatically validates required environment variables:

- **Mock Mode**: Only basic variables needed
- **Production Mode**: Comprehensive validation of all external service keys
- **Startup Logging**: Clear mode indication and missing variable warnings

### Best Practices

#### For Development
- ✅ Use Mock mode for new features
- ✅ Test all user scenarios with mock data
- ✅ Verify UI with different data states
- ✅ Keep mock data representative of production

#### For Production
- ✅ Test mode switching before deployment
- ✅ Validate all environment variables
- ✅ Use secure secrets management
- ✅ Monitor service health and performance

### Troubleshooting

#### Mock Mode Issues
- **No data showing**: Check console for initialization logs
- **API errors**: Verify `USE_MOCK=true` in environment
- **Slow responses**: Expected behavior (simulated network delays)

#### Production Mode Issues
- **Startup failures**: Check environment variable validation
- **Database errors**: Verify `DATABASE_URL` and permissions
- **Auth failures**: Confirm external service configurations

### Future Enhancements

The modular architecture supports easy addition of:
- New authentication providers (Discord, Twitter, etc.)
- Additional mock data scenarios
- A/B testing configurations
- Performance monitoring integrations

## Changelog

```
Changelog:
- December 24, 2024: Enhanced Mock/Production toggle system
  * Added comprehensive environment variable validation
  * Improved startup logging with mode indicators
  * Updated documentation with switching guide
  * Added configuration validation for production requirements
- December 24, 2024: Added mock users for chat testing
  * สมชาย ใจดี (somchai) - Full-stack developer, online
  * มาลี สวยงาม (malee) - UX/UI Designer, offline (30 min ago)
  * Created sample chats: 2 private chats + 1 group chat
  * Added sample messages with Thai content
  * Established friendships between all users
```
