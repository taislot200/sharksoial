The code modification documents testing setup in the system overview, including mock users and sample data for testing the chat function.
```

```
# SHARKSO🦈IAL System Architecture Overview

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

### Mock Mode (Development)
1. Application starts with `USE_MOCK=true`
2. Services automatically switch to mock implementations
3. Mock data is generated and seeded into the database
4. API calls return simulated data with realistic delays

#### Mock Users for Testing
- **Admin** (admin): System administrator - online
- **สมชาย ใจดี** (somchai): Full-stack developer - online  
- **มาลี สวยงาม** (malee): UX/UI Designer - offline (30 min ago)

#### Sample Data Includes
- 2 private chats + 1 group chat ("ทีมพัฒนา SHARKSO🦈IAL")
- 5 sample messages with Thai content
- Complete friendship connections between all users