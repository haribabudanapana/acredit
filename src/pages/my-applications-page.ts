import { Page } from '@playwright/test';

export class MyApplicationsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoad() {
    // Wait for the My Applications page to load (e.g., heading or unique element)
    await this.page.waitForSelector('[data-testid="my-applications-heading"]', { state: 'visible' });
  }

  async selectApplicationById(applicationId: string) {
    // Click or select the application row by its ID (assumes data-testid or similar is available)
    await this.page.click(`[data-testid="application-row-${applicationId}"]`);
  }

  async waitForApplicationDetailsLoad() {
    // Wait for the application details panel or section to be visible
    await this.page.waitForSelector('[data-testid="application-details-section"]', { state: 'visible' });
  }

  async isPrintLegalFormsLinkVisible(): Promise<boolean> {
    // Returns true if the 'Print Legal Forms for Submission' link is visible
    return await this.page.isVisible('[data-testid="print-legal-forms-link"]');
  }

  async expectOnMyApplicationsPage() {
    // Assertion helper to ensure the user is still on the My Applications page
    await this.page.waitForSelector('[data-testid="my-applications-heading"]', { state: 'visible' });
  }
}
