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
   * This method covers navigation, identification, and validation steps as a single business flow.
   * @param applicationIdentifier - Unique identifier (e.g., application number or facility name) for the submitted application
   */
  async verifyPrintLegalFormsLinkVisibilityForSubmittedApplication(applicationIdentifier: string): Promise<void> {
    // Wait for the My Applications page to load
    await this.waitForLoad();

    // Find the application row by applicationIdentifier (could be app number or facility name)
    // Placeholder: Adjust selector as per actual DOM structure
    const applicationRow = this.page.locator(`#gridList_AccrAppList tr:has-text("${applicationIdentifier}")`);
    await applicationRow.waitFor({ state: 'visible', timeout: 10000 });

    // Within the application row, locate the 'Print Legal Forms for Submission' link
    // Placeholder: Adjust selector as per actual DOM structure
    const printLegalFormsLink = applicationRow.locator('a:has-text("Print legal forms for Submission")');
    await printLegalFormsLink.waitFor({ state: 'visible', timeout: 10000 });

    // Assert that the link is visible
    await expect(printLegalFormsLink).toBeVisible();
  }

  /**
   * Navigates to 'My Applications' page and validates user remains on the page after performing actions.
   * This method can be used as a post-condition assertion.
   */
  async assertUserRemainsOnMyApplicationsPage(): Promise<void> {
    // Wait for the unique heading or element that identifies the My Applications page
    await this.expectOnMyApplicationsPage();
  }

  /**
   * (Optional) Clicks the 'Print Legal Forms for Submission' link for a specific submitted application and returns the popup page.
   * @param applicationIdentifier - Unique identifier (e.g., application number or facility name) for the submitted application
   * @returns {Promise<Page>} - The popup Page object
   */
  async openPrintLegalFormsPopupForSubmittedApplication(applicationIdentifier: string): Promise<Page> {
    // Wait for the application row
    const applicationRow = this.page.locator(`#gridList_AccrAppList tr:has-text("${applicationIdentifier}")`);
    await applicationRow.waitFor({ state: 'visible', timeout: 10000 });

    // Find the link
    const printLegalFormsLink = applicationRow.locator('a:has-text("Print legal forms for Submission")');
    await expect(printLegalFormsLink).toBeVisible();

    // Click and handle popup
    const popupPromise = this.page.waitForEvent('popup');
    await printLegalFormsLink.click();
    const popupPage = await popupPromise;
    return popupPage;
  }

}