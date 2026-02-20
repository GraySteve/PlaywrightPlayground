import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';

type TestFixtures = {
  homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
