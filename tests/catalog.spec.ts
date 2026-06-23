import { test, expect } from '../fixtures/testFixtures';
import { testUsers } from '../data/testData';

test.describe('Catalog', () => {
  test.beforeEach(async ({ page, loginPage, catalogPage }) => {
    await loginPage.open();
    await loginPage.login({
      userName: testUsers.standard.userName,
      password: testUsers.standard.password,
    });

    await expect(page).toHaveURL(/.*inventory.html/);
    await catalogPage.waitForPageToLoad();
  });

  test('should display catalog page', async ({ catalogPage }) => {
    const pageTitleVisible = await catalogPage.isPageTitleVisible();
    expect(pageTitleVisible).toBe(true);
    expect(await catalogPage.getProductCount()).toBeGreaterThan(0);
  });

  test('should have product name and price', async ({ catalogPage }) => {
    const firstProduct = await catalogPage.products().then(products => products[0]);
    const productName = await firstProduct.isProductNameVisible();
    const productPrice = await firstProduct.isProductPriceVisible();
    const productImage = await firstProduct.isProductImageVisible();
    expect(productName).toBe(true);
    expect(productPrice).toBe(true);
    expect(productImage).toBe(true);
  });

  test('should add and remove product from cart', async ({ catalogPage}) => {
    const firstProduct = await catalogPage.products().then(products => products[0]);
    await firstProduct.addToCart();
    expect(await catalogPage.header.isCartBadgeVisible()).toBe(true);
    expect(await catalogPage.header.getCartBadgeCount()).toBe(1);
    await firstProduct.removeFromCart();
    expect(await catalogPage.header.isCartBadgeVisible()).toBe(false);
  });

});