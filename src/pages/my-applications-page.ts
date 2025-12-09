import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class MyApplicationsPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
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
  async clickonMyApplicationsLink(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'My Applications' })).toBeVisible({ timeout: 50000 });
    await this.page.getByRole('link', { name: 'My Applications' }).click();
  }
  async sortCreatedOnAscending(): Promise<void> {
    await this.page.getByLabel('Created On: Ascending sort').getByText('Created On').click();
  }
  // Verify the "Print legal forms for Submission" link is visible
  async verifyPrintLegalFormsLink(page: Page) {
    await expect(this.page.getByRole('link', { name: 'Print legal forms for Submission' })).toBeVisible();
  }

  // Handle the first popup and return the page object
  async clickOnPrintLegalForms(page: Page): Promise<Page> {
    const page1Promise = page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'Print legal forms for' }).click();
    const page1 = await page1Promise;
    return page1;
  }
  // Handle the first popup and return the page object
  async clickOnViewSubmittedApplicationSummary(page: Page): Promise<Page> {
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'View Submitted Application' }).first().click();
    const page1 = await page1Promise;
    return page1;
  }

}
