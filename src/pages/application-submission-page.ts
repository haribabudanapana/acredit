import { Page, expect } from '@playwright/test';

export class ApplicationSubmissionPage {
    constructor(private page: Page) {}

    async navigateToSurveyAgreement() {
        await this.page.goto(
            `https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/PointA/WizardUI/WzLoad?appCycle=Initial&cs=15&appId`
        );
    }

    async acceptSurveyAgreement() {
        await this.page.getByRole('checkbox', { name: 'Survey Agreement' }).check();
    }

    async submitApplication() {
        await this.page.getByRole('button', { name: 'Submit Application' }).nth(1).click();
    }

    async selectSubmissionChecklist() {
        await this.page.getByRole('checkbox', { name: 'Application Fee' }).check();
        await this.page.getByRole('checkbox', { name: 'Copy of Application Invoice' }).check();
    }

    async verifySubmissionConfirmation() {
        await this.page.goto(
            `https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/PointA/PTAAppSubmitInfo/ApplicationSubmissionConfirmation?applicationId`
        );
        await expect(this.page.locator('h1')).toContainText('Application Submitted Successfully');
    }
}
