import type { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { Header } from './components/header';

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

  async login(testUser: { userName: string; password: string }): Promise<void> {
    await this._usernameInput.waitFor({ state: 'visible' });
    await this._usernameInput.fill(testUser.userName);
    await this._passwordInput.fill(testUser.password);
    await this._loginButton.click();
  };

  async isErrorIconVisibleForInput(input: 'username' | 'password'): Promise<boolean> {
    const icon = input === 'username' ? this._usernameErrorIcon : this._passwordErrorIcon;
    return await icon.isVisible();
  }
  async getErrorMessage(): Promise<string | null> {
    return await this._errorMessage.textContent();
  }
}
