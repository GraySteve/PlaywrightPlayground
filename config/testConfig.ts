/// <reference types="node" />

export interface TestConfig {
  baseURL: string;
  environment: 'dev' | 'preprod' | 'prod';
  timeouts: {
    short: number;
    medium: number;
    long: number;
    explicit: number;
  };
  retries: {
    ui: number;
    api: number;
  };
  reporting: {
    captureScreenshot: boolean;
    captureVideo: boolean;
    captureTrace: boolean;
  };
}

export const getConfig = (): TestConfig => {
  const env = process.env.TEST_ENV || 'dev';

  const configs: Record<string, TestConfig> = {
    dev: {
      baseURL: 'https://www.saucedemo.com/',
      environment: 'dev',
      timeouts: { short: 5000, medium: 10000, long: 20000, explicit: 30000 },
      retries: { ui: 0, api: 1 },
      reporting: { captureScreenshot: true, captureVideo: false, captureTrace: true },
    },
    preprod: {
      baseURL: process.env.PREPROD_URL || 'https://www.saucedemo.com/preprodURL',
      environment: 'preprod',
      timeouts: { short: 8000, medium: 15000, long: 30000, explicit: 45000 },
      retries: { ui: 1, api: 2 },
      reporting: { captureScreenshot: true, captureVideo: true, captureTrace: true },
    },
    prod: {
      baseURL: process.env.PROD_URL || 'https://www.saucedemo.com/prodURL',
      environment: 'prod',
      timeouts: { short: 10000, medium: 20000, long: 40000, explicit: 60000 },
      retries: { ui: 2, api: 3 },
      reporting: { captureScreenshot: true, captureVideo: true, captureTrace: true },
    },
  };

  return configs[env] as TestConfig;
};