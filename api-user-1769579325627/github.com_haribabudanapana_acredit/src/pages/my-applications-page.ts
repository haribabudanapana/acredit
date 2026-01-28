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

  async validateApplicationExists(appNumber: string, facilityName: string) {
    const grid = this.page.locator('#gridList_AccrAppList');
    await expect(grid).toContainText(appNumber);
    await expect(grid).toContainText(facilityName);
  }

  async signOut(page: Page) {
      await page.getByRole('link', { name: 'Sign Out' }).click();
  }

  /**
   * Complete workflow to verify 'Print Legal Forms for Submission' link visibility for a submitted application.
   * This method combines navigation, validation, and assertion steps as per the test case TCD_FT_01_FR-1.
   * Preconditions: User is logged in and application is submitted and requires legal forms.
   * Post-conditions: User remains on the 'My Applications' page.
   */
  async verifyPrintLegalFormsForSubmittedApplication(applicationIdOrFacilityName?: string) {
    // Wait for the My Applications page to load
    await this.expectOnMyApplicationsPage();

    // Optionally, filter or locate the application row if applicationIdOrFacilityName is provided
    if (applicationIdOrFacilityName) {
      // Try to locate by application ID or facility name in the grid
      const grid = this.page.locator('#gridList_AccrAppList');
      await grid.waitFor({ state: 'visible', timeout: 10000 });
      await expect(grid).toContainText(applicationIdOrFacilityName);
    }

    // Look for the 'Print Legal Forms for Submission' link in the Action column
    // The link may appear as 'Print legal forms for Submission' or similar
    const printLegalFormsLink = this.page.getByRole('link', { name: /Print legal forms for Submission/i });
    await expect(printLegalFormsLink).toBeVisible({ timeout: 10000 });
  }

  /**
   * Returns true if the 'Print Legal Forms for Submission' link is visible for any submitted application.
   * Optionally, can be scoped to a specific application row if applicationIdOrFacilityName is provided.
   */
  async isPrintLegalFormsForSubmissionLinkVisible(applicationIdOrFacilityName?: string): Promise<boolean> {
    // Optionally, filter or locate the application row
    if (applicationIdOrFacilityName) {
      const grid = this.page.locator('#gridList_AccrAppList');
      await grid.waitFor({ state: 'visible', timeout: 10000 });
      await expect(grid).toContainText(applicationIdOrFacilityName);
    }
    const printLegalFormsLink = this.page.getByRole('link', { name: /Print legal forms for Submission/i });
    return await printLegalFormsLink.isVisible();
  }

  /**
   * Navigates to the 'My Applications' page via the top navigation if not already there.
   * Waits for the page to load.
   */
  async navigateToMyApplicationsPage() {
    // Click the 'My Applications' link in the top navigation bar
    await this.page.getByRole('link', { name: 'My Applications' }).click();
    await this.expectOnMyApplicationsPage();
  }

}