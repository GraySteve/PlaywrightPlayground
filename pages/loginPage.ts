import type { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { Header } from './components/header';

export class LoginPage extends BasePage {
  readonly header: Header;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }

  private get _heroTitle(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  async open(): Promise<void> {
    await super.open('/');
  }
}
