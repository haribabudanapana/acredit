// pages/application-page.ts
import { Page } from '@playwright/test';

export class ApplicationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoApplication(applicationId: string): Promise<void> {
    await this.page.goto(`/applications/${applicationId}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getApplicationStatus(): Promise<string> {
    // Replace with actual implementation using locator for status element
    const statusElement = await this.page.waitForSelector('[data-testid="application-status"]', { state: 'visible' });
    return statusElement.textContent();
  }

  async isPrintLegalFormsLinkVisible(): Promise<boolean> {
    // Replace with actual implementation using locator for the link
    const link = await this.page.$('[data-testid="print-legal-forms-link"]');
    if (!link) return false;
    return await link.isVisible();
  }
}
