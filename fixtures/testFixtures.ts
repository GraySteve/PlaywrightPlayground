import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CatalogPage } from '../pages/catalogPage';

type TestFixtures = {
  loginPage: LoginPage;
  catalogPage: CatalogPage;
  autoCloseContext: void;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  autoCloseContext: [
    async ({ page }, use) => {
      await use();
      if (!page.isClosed()) {
        await page.context().close();
      }
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
