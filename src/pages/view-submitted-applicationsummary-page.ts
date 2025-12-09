import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ViewSubmittedApplicationSummaryPage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    /**
     * Verify the submitted application summary header is visible
     */
    async verifySummaryHeader(page: Page) {
        await expect(page.locator('#divtoprint')).toContainText('SUBMITTED APPLICATION SUMMARY');
    }

    /**
     * Verify facility text is present
     */
    async verifyFacilityText(page: Page) {
        await expect(page.locator('#divtoprint')).toContainText('facility');
    }

    /**
     * Verify user text is present
     */
    async verifyUserText(page: Page) {
        await expect(page.locator('#divtoprint')).toContainText('user');
    }

    /**
     * Verify email text is present
     */
    async verifyEmailText(page: Page) {
        await expect(page.locator('#divtoprint')).toContainText('acreditplusfacilityuser@yahoo.com');
    }

    /**
     * Click the Sign Out link
     */
    async signOut(page: Page) {
        await page.getByRole('link', { name: 'Sign Out' }).click();
    }
}