import { Page, expect } from '@playwright/test';

export class PaymentSubmissionPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ---------------- Payment ---------------- */

  async selectPaymentMethodAndProceed(): Promise<void> {
    await this.page
      .getByRole('radio', { name: 'Please select payment method' })
      .check();

    await this.page
      .getByRole('button', { name: 'Next: Application Summary' })
      .nth(1)
      .click();
  }

  /* ---------------- Summary & Verification ---------------- */

  async proceedThroughSummaryAndVerification(): Promise<void> {
    await this.page
      .getByRole('button', { name: 'Next: Verify Application Data' })
      .nth(1)
      .click();

    await this.page
      .getByRole('button', { name: 'Go to Application Submission' })
      .click();
  }

  /* ---------------- Application Submission ---------------- */

  async submitApplication(): Promise<void> {
    await this.page
      .getByRole('checkbox', { name: 'Survey Agreement' })
      .check();

    await this.page
      .getByRole('checkbox', { name: 'Application Fee' })
      .check();

    await this.page
      .getByRole('checkbox', { name: 'Copy of Application Invoice' })
      .check();

    await this.page
      .getByRole('button', { name: 'Submit Application' })
      .nth(1)
      .click();
  }

  /* ---------------- Confirmation ---------------- */

  async verifySubmissionConfirmation(): Promise<void> {
    // await this.page.goto(
    //   `https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/PointA/PTAAppSubmitInfo/ApplicationSubmissionConfirmation`
    // );

    await expect(this.page.locator('h1'))
      .toContainText('Application Submitted Successfully');
  }

//   /* ---------------- My Applications ---------------- */

//   async navigateToMyApplicationsAndValidate(): Promise<void> {

//     await this.page.getByRole('link', { name: 'Here' }).click();
//     await this.page.getByRole('link', { name: 'My Applications' }).click();

//     await this.page
//       .getByLabel('Created On: Ascending sort')
//       .getByText('Created On')
//       .click();
//   }
}
