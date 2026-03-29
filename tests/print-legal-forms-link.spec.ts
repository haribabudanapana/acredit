// tests/print-legal-forms-link.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ApplicationPage } from '../pages/application-page';
import { testData } from '../test-data/login-data.json';

// Test Case: TC_PLF_001 - Display 'Print Legal Forms' link when application status is 'Approved'
test.describe('Print Legal Forms Link Visibility', () => {
  let loginPage: LoginPage;
  let applicationPage: ApplicationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    applicationPage = new ApplicationPage(page);
  });

  test('should display Print Legal Forms link when application status is Approved [TC_PLF_001]', async ({ page }) => {
    // Arrange: Get test data for an approved application
    const approvedUser = testData.users.find((user: any) => user.applicationStatus === 'Approved');
    expect(approvedUser, 'Test data for approved user must exist').toBeDefined();

    // Step 1: Login as applicant
    await loginPage.goto();
    await loginPage.enterUsername(approvedUser.username);
    await loginPage.enterPassword(approvedUser.password);
    await loginPage.clickLogin();
    await expect(loginPage.isLoggedIn()).resolves.toBeTruthy();

    // Step 2: Navigate to Application Page
    await applicationPage.gotoApplication(approvedUser.applicationId);

    // Step 3: Ensure application status is 'Approved'
    const status = await applicationPage.getApplicationStatus();
    expect(status).toBe('Approved');

    // Step 4: Verify 'Print Legal Forms' link is visible
    const isPrintLegalFormsVisible = await applicationPage.isPrintLegalFormsLinkVisible();
    expect(isPrintLegalFormsVisible).toBeTruthy();
  });
});
