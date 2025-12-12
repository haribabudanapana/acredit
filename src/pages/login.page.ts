import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { ActionUtils } from '../utils/action-utils';

export class LoginPage extends BasePage {
  private readonly usernameField: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

 // ...existing code...
  async login(username: string): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.usernameField.waitFor({ state: 'visible', timeout: 100000 });
    await this.usernameField.click();
    await ActionUtils.fill(this.usernameField, username, { page: this.page }); // <-- fix
    await ActionUtils.click(this.loginButton, { page: this.page }); // <-- fix
    await this.page.waitForLoadState('domcontentloaded');
  }
// ...existing code...

  async goto(url: string): Promise<void> {

    await this.page.goto(url, { waitUntil: 'commit' }); // fast, minimal wait

  }
}