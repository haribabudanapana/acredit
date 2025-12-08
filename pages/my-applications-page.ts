import { Page, expect } from '@playwright/test';

export class MyApplicationsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForMyApplicationsPage() {
    // Wait for a unique element on My Applications page
    await this.page.waitForSelector('text=My Applications', { state: 'visible' });
  }

  async filterByReferenceNumber(referenceNumber: string) {
    // Use the page's filter/search functionality to find the application
    await this.page.fill('[data-testid="application-search-input"]', referenceNumber);
    await this.page.click('[data-testid="application-search-button"]');
  }

  async waitForApplicationRow(referenceNumber: string) {
    // Wait for the application row to appear in the table/list
    await this.page.waitForSelector(`[data-testid="application-row-${referenceNumber}"]`, { state: 'visible' });
  }

  async isPrintLegalFormsLinkVisible(referenceNumber: string): Promise<boolean> {
    // Check if the Print Legal Forms for Submission link is visible for the given application
    const rowSelector = `[data-testid="application-row-${referenceNumber}"]`;
    const linkSelector = `${rowSelector} [data-testid="print-legal-forms-link"]`;
    return await this.page.isVisible(linkSelector);
  }

  async expectOnMyApplicationsPage() {
    // Assert that the user is still on the My Applications page
    await expect(this.page).toHaveURL(/.*\/my-applications/);
    await expect(this.page.locator('text=My Applications')).toBeVisible();
  }
}
