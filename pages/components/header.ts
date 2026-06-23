import type { Locator, Page } from '@playwright/test';
import { BaseComponent } from './baseComponent';
import { WaitUtils } from '../../utils/waitUtils';

export class Header extends BaseComponent {
  constructor(page: Page) {
    super(page, page.locator('header'));
  }

  private get _cartContainer(): Locator {
    return this.root.locator('.cart_container');
  }
  private get _cartBadge(): Locator {
    return this.page.locator('.shopping_cart_badge');
  }
  private get _cartLink(): Locator {
    return this._cartContainer.locator('a');
  }
  private get _backToProductsButton(): Locator {
    return this.root.getByRole('button', { name: /back-to-products/i });
  }

  get logo() {
    return this.root.getByRole('img', { name: /logo/i });
  }
  get title() {
    return this.root.getByRole('heading', { name: /title/i });
  }
  async waitForCartbadgeToAppear(): Promise<void> {
    await WaitUtils.waitForElementState(this._cartBadge, 'visible', { message: 'Cart Badge' });
  }
  async isCartBadgeVisible(): Promise<boolean> {
    return await this._cartBadge.isVisible();
  }
  async getCartBadgeCount(): Promise<number> {
    const countText = await this._cartBadge.textContent();
    return countText ? parseInt(countText) : 0;
  }
  async clickCartLink(): Promise<void> {
    await this._cartLink.click();
  }

  async goBackToProductsPage(): Promise<void> {
    await this._backToProductsButton.click();
  } 
}