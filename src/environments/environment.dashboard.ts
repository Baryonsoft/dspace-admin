import { AppConfig } from '../config/app-config.interface';

export const environment: Partial<AppConfig> = {
  ui: {
    ssl: true,
    host: 'dashboard.baryonics.org',
    port: 443,
    nameSpace: '/',
  },
  rest: {
    ssl: true,
    host: 'v1-prod.baryonics.org',
    port: 443,
    nameSpace: '/',
  },
};
