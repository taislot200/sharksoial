export class ConfigService {
  private static instance: ConfigService;
  
  private constructor() {
    this.validateConfig();
  }
  
  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }
  
  private validateConfig(): void {
    if (!this.useMock && this.isProduction) {
      const requiredVars = ['DATABASE_URL', 'JWT_SECRET'];
      const missingVars = requiredVars.filter(varName => !process.env[varName]);
      
      if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables for production: ${missingVars.join(', ')}`);
      }
    }
  }
  
  get useMock(): boolean {
    return process.env.USE_MOCK === 'true';
  }
  
  get databaseUrl(): string {
    return process.env.DATABASE_URL || '';
  }
  
  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'dev-secret-key';
  }
  
  get port(): number {
    return parseInt(process.env.PORT || '5000', 10);
  }
  
  get environment(): string {
    return process.env.NODE_ENV || 'development';
  }
  
  get isDevelopment(): boolean {
    return this.environment === 'development';
  }
  
  get isProduction(): boolean {
    return this.environment === 'production';
  }
  
  // External service configurations (Production mode only)
  get firebaseConfig(): {
    projectId: string;
    privateKey: string;
    clientEmail: string;
  } {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID || '',
      privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || ''
    };
  }
  
  get supabaseConfig(): {
    url: string;
    anonKey: string;
  } {
    return {
      url: process.env.SUPABASE_URL || '',
      anonKey: process.env.SUPABASE_ANON_KEY || ''
    };
  }
  
  get cloudinaryConfig(): {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  } {
    return {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
      apiKey: process.env.CLOUDINARY_API_KEY || '',
      apiSecret: process.env.CLOUDINARY_API_SECRET || ''
    };
  }
  
  logCurrentMode(): void {
    console.log(`🚀 SHARKSO🦈IAL starting in ${this.useMock ? 'MOCK' : 'PRODUCTION'} mode`);
    console.log(`   Environment: ${this.environment}`);
    console.log(`   Port: ${this.port}`);
    console.log(`   Mock Data: ${this.useMock ? 'Enabled' : 'Disabled'}`);
  }
}

export const config = ConfigService.getInstance();
