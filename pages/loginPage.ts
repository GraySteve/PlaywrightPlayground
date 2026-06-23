import type { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { Header } from './components/header';
import { WaitUtils } from '../utils/waitUtils';
import { CatalogPage } from './catalogPage';
import { logger } from '../utils/logger';

export class LoginPage extends BasePage {
  readonly header: Header;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }

  private get _logoTitle(): Locator {
    return this.page.getByText('Swag Labs');
  }
  private get _usernameInput(): Locator {
    return this.page.locator('#user-name');
  }
  private get _passwordInput(): Locator {
    return this.page.locator('#password');
  }
  private get _loginButton(): Locator {
    return this.page.locator('#login-button');
  }
  private get _usernameErrorIcon(): Locator {
    return this._usernameInput.locator('xpath=following-sibling::*[contains(@class, "error_icon")]');
  }
  private get _passwordErrorIcon(): Locator {
    return this._passwordInput.locator('xpath=following-sibling::*[contains(@class, "error_icon")]');
  }
  private get _errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await super.open('/');
  }

  async isLogoTitleVisible(): Promise<boolean> {
    return await this._logoTitle.isVisible();
  }
  async attemptLogin(testUser: { userName: string; password: string }): Promise<void> {
    logger.info('Attempting to log in', { userName: testUser.userName });
    await WaitUtils.waitForElement(this._usernameInput, { message: 'Username input' });
    await this._usernameInput.fill(testUser.userName);
    await this._passwordInput.fill(testUser.password);
    await this._loginButton.click();
    logger.info('Login button clicked', { userName: testUser.userName });
  }
  async login(testUser: { userName: string; password: string }): Promise<CatalogPage> {
    await this.attemptLogin(testUser);
    const catalogPage = new CatalogPage(this.page);
    await catalogPage.waitForPageToLoad();
    logger.info('Successfully logged in', { userName: testUser.userName });
    return catalogPage;
  };

  async isErrorIconVisibleForInput(input: 'username' | 'password'): Promise<boolean> {
    const icon = input === 'username' ? this._usernameErrorIcon : this._passwordErrorIcon;
    return await icon.isVisible();
  }
  async getErrorMessage(): Promise<string | null> {
    return await this._errorMessage.textContent();
  }
}
