import { UserBuilder } from '../data/builders/userBuilders';
import { test, expect } from '../fixtures/testFixtures';

test.describe('Login', () => {
  test('loads login page', async ({ loginPage }) => {
    await loginPage.open();
    expect(await loginPage.isLogoTitleVisible()).toBe(true);
  });

  test('shows error for wrong credentials', async ({ loginPage }) => {
    const errorUser = new UserBuilder()
    .withUserName('wrong_user')
    .withPassword('wrong_password')
    .build();
    await loginPage.open();
    await loginPage.attemptLogin(errorUser);

    expect(await loginPage.isErrorIconVisibleForInput('username')).toBe(true);
    expect(await loginPage.isErrorIconVisibleForInput('password')).toBe(true);
    expect(await loginPage.getErrorMessage()).toBe(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('logs in successfully with standard user', async ({ authenticatedUser }) => {
    const { catalogPage, page } = authenticatedUser;

    await expect(page).toHaveURL(/.*inventory.html/);
  });
});