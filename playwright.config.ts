import { defineConfig, devices } from '@playwright/test';
import { getConfig } from './config/testConfig';

const testConfig = getConfig();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? testConfig.retries.ui : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: testConfig.baseURL,
    trace: testConfig.reporting.captureTrace ? 'on-first-retry' : 'off',
    screenshot: testConfig.reporting.captureScreenshot ? 'only-on-failure' : 'off',
    video: testConfig.reporting.captureVideo ? 'retain-on-failure' : 'off',
    navigationTimeout: testConfig.timeouts.explicit,
    actionTimeout: testConfig.timeouts.medium,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
