import { test, expect } from '../fixtures/testFixtures';

test('home loads', async ({ homePage }) => {
  await homePage.open();
  await expect(homePage.heroTitle).toBeVisible();
});
