import { testUsers } from '../data/testData';
import { test, expect } from '../fixtures/testFixtures';

test.describe('Login', () => {
  test('loads login page', async ({ loginPage }) => {
    await loginPage.open();
    expect(await loginPage.isLogoTitleVisible()).toBe(true);
  });

  test('shows error for wrong credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login({ userName: 'wrong', password: 'wrong' });

    expect(await loginPage.isErrorIconVisibleForInput('username')).toBe(true);
    expect(await loginPage.isErrorIconVisibleForInput('password')).toBe(true);
    expect(await loginPage.getErrorMessage()).toBe(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('logs in successfully with standard user', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login({
      userName: testUsers.standard.userName,
      password: testUsers.standard.password,
    });

    await expect(page).toHaveURL(/.*inventory.html/);
  });
});