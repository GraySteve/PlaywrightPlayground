import type { Page } from '@playwright/test';
import { BaseComponent } from './baseComponent';

export class Header extends BaseComponent {
  constructor(page: Page) {
    super(page, page.locator('header'));
  }

  get logo() {
    return this.root.getByRole('img', { name: /logo/i });
  }
}
