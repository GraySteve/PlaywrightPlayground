import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CatalogPage } from '../pages/catalogPage';
import { logger } from '../utils/logger';
import { UserBuilder } from '../data/builders/userBuilders';

type TestFixtures = {
  loginPage: LoginPage;
  catalogPage: CatalogPage;
  autoCloseContext: void;
  authenticatedUser: { page: any; catalogPage: CatalogPage };
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    logger.info('Setting up LoginPage fixture');
    const loginPage = new LoginPage(page);
    await use(loginPage);
    logger.info('Tearing down LoginPage fixture');
  },

  catalogPage: async ({ page }, use) => {
    logger.info('Setting up CatalogPage fixture');
    const catalogPage = new CatalogPage(page);
    await use(catalogPage);
    logger.info('Tearing down CatalogPage fixture');
  },

  authenticatedUser: async ({ page, loginPage }, use) => {
    logger.info('Setting up authenticated user');
    await loginPage.open();
    const standardUser = new UserBuilder()
          .build();
    const catalogPage = await loginPage.login(standardUser);
    
    await use({ page, catalogPage });
    
    logger.info('Tearing down authenticated user');
    if (!page.isClosed()) {
      await page.context().close();
    }
  },
});

export { expect } from '@playwright/test';
