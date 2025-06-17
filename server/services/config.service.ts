export class ConfigService {
  private static instance: ConfigService;
  
  private constructor() {}
  
  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
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
}

export const config = ConfigService.getInstance();
