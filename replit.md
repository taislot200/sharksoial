# SHARKSO🦈IAL - Modular Social Platform

## Overview

SHARKSO🦈IAL is a modern, modular social media platform built with React, TypeScript, and Express.js. The system is designed with a unique mock/production toggle architecture that allows seamless switching between development with mock data and production with real services. The platform features real-time chat, social feeds, friend management, and user profiles with a Thai-themed UI.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Tailwind CSS** + **Shadcn UI** for consistent design system
- **React Query** for efficient state management and caching
- **Wouter** for lightweight client-side routing
- **React Context** for global state management (Auth and App contexts)

### Backend Architecture
- **Express.js** with TypeScript for API server
- **Drizzle ORM** for database operations with PostgreSQL
- **Modular service architecture** with dependency injection pattern
- **Environment-based configuration** for flexible deployment

### Database Layer
- **PostgreSQL** as the primary database
- **Drizzle ORM** for type-safe database operations
- Schema includes: users, posts, comments, friendships, chats, messages, post interactions

## Key Components

### Authentication System
- **Modular Design**: Completely separated authentication module using interfaces
- **Mock/Production Toggle**: Factory pattern for service selection based on environment
- **JWT Integration**: Ready for token-based authentication in production
- **OAuth Ready**: Configured for Google, Facebook, and LINE social login

### Service Layer
- **IAuthService Interface**: Abstract authentication service contract
- **MockAuthService**: Development-time authentication with simulated delays
- **ProductionAuthService**: Ready for real authentication providers
- **ConfigService**: Centralized configuration management with singleton pattern

### UI Components
- **Component Library**: Comprehensive set of reusable UI components built on Radix UI
- **Responsive Design**: Mobile-first approach with Thai language support
- **Theme System**: CSS variables for consistent styling across the platform

## Data Flow

### Mock Mode (Development)
1. Application starts with `USE_MOCK=true`
2. Services automatically switch to mock implementations
3. Mock data is generated and seeded into the database
4. API calls return simulated data with realistic delays

### Production Mode
1. Application starts with `USE_MOCK=false`
2. Services switch to production implementations
3. Real database connections and external service integrations
4. Full authentication and data persistence

### State Management Flow
1. React Query handles API calls and caching
2. AuthContext manages user authentication state
3. AppContext manages application-level state (active tabs, search)
4. Component-level state for UI interactions

## External Dependencies

### Development Dependencies
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Type checking and compilation
- **Drizzle Kit**: Database migration and schema management

### Production Ready Integrations
- **Firebase**: Authentication and real-time features
- **Supabase**: Alternative backend-as-a-service
- **Cloudinary**: Image upload and management
- **SMTP Services**: Email notifications
- **Push Notifications**: Ready for mobile notifications

### Database & ORM
- **PostgreSQL**: Primary database with connection pooling
- **Drizzle ORM**: Type-safe database operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver

## Deployment Strategy

### Development
- **Replit Environment**: Configured for seamless development experience
- **Hot Module Replacement**: Instant development feedback via Vite
- **Mock Data Seeding**: Automatic population of development database

### Production
- **Autoscale Deployment**: Configured for Replit's autoscale platform
- **Build Process**: Vite build for frontend, ESBuild for backend
- **Environment Variables**: Comprehensive configuration management
- **Database Migrations**: Automated schema updates via Drizzle

### Architecture Decisions

1. **Mock/Production Toggle**: Enables rapid development while maintaining production readiness
   - **Problem**: Need to develop without external service dependencies
   - **Solution**: Factory pattern with environment-based service selection
   - **Benefits**: Fast development, easy testing, smooth transition to production

2. **Modular Authentication**: Completely separated auth logic for future flexibility
   - **Problem**: Need to support multiple authentication providers
   - **Solution**: Interface-based design with pluggable implementations
   - **Benefits**: Easy provider switching, testable code, clean separation

3. **TypeScript Throughout**: Full type safety across frontend and backend
   - **Problem**: Runtime errors and API inconsistencies
   - **Solution**: Shared type definitions and strict TypeScript configuration
   - **Benefits**: Better developer experience, fewer bugs, easier refactoring

4. **Drizzle ORM Choice**: Type-safe database operations with minimal overhead
   - **Problem**: Need type safety without heavy ORM overhead
   - **Solution**: Lightweight ORM with excellent TypeScript integration
   - **Benefits**: Type safety, good performance, easy migrations

## Changelog

```
Changelog:
- June 17, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```