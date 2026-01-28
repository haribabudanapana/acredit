// Test file for: Verify 'Print Legal Forms for Submission' link visibility for submitted applications
// Test Case ID: TCD_FT_01_FR-1
// This test uses Page Object Model and loads test data from JSON

import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { MyApplicationsPage } from '../src/pages/my-applications-page';
import { TestDataUtils } from '../src/utils/test-data-utils';

const testDataPath = 'test/resources/testdata/verify-print-legal-forms-for-submission-link-visibility-data.json';

// Utility to load test data
async function loadTestData() {
  const dataArr = await TestDataUtils.getInstance().loadJSONData(testDataPath);
  return dataArr && dataArr.length > 0 ? dataArr[0] : null;
}

test.describe('TCD_FT_01_FR-1: Print Legal Forms for Submission link visibility', () => {
  let loginPage: LoginPage;
  let myApplicationsPage: MyApplicationsPage;
  let testData: any;

  test.beforeAll(async ({ browser }) => {
    testData = await loadTestData();
    if (!testData) throw new Error('Test data could not be loaded');
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    myApplicationsPage = new MyApplicationsPage(page);
    // Use existing login workflow (always use Page Object method)
    await loginPage.goto('/ACReditPlus/Account/Login');
    await loginPage.login(testData.user.username, testData.user.password);
    // Navigate to 'My Applications' page using Page Object method
    await myApplicationsPage.navigateToMyApplicationsPage();
  });

  test('should display Print Legal Forms for Submission link for submitted application requiring legal forms', async ({ page }) => {
    // Main happy path: Application is submitted and requires legal forms
    const { application } = testData;
    // Optionally, validate application exists in the list
    await myApplicationsPage.verifyPrintLegalFormsForSubmittedApplication(application.facilityName);
    // Assert user remains on My Applications page
    await myApplicationsPage.expectOnMyApplicationsPage();
  });

  test('should NOT display Print Legal Forms for Submission link if application does NOT require legal forms', async ({ page }) => {
    const edgeCase = testData.edgeCases.find((c: any) => c.description.includes('does NOT require legal forms'));
    // Optionally, filter by applicationId or description
    const isVisible = await myApplicationsPage.isPrintLegalFormsForSubmissionLinkVisible(edgeCase.applicationId);
    expect(isVisible).toBeFalsy();
  });

  test('should NOT display Print Legal Forms for Submission link if application is in Draft status', async ({ page }) => {
    const edgeCase = testData.edgeCases.find((c: any) => c.status === 'Draft');
    const isVisible = await myApplicationsPage.isPrintLegalFormsForSubmissionLinkVisible(edgeCase.applicationId);
    expect(isVisible).toBeFalsy();
  });

  test('should NOT display Print Legal Forms for Submission link if user is not logged in', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const myAppsPage = new MyApplicationsPage(page);
    // Go directly to My Applications page without login
    await page.goto('/ACReditPlus/Facility/ApplicationList');
    const edgeCase = testData.edgeCases.find((c: any) => c.user === null);
    const isVisible = await myAppsPage.isPrintLegalFormsForSubmissionLinkVisible(edgeCase.applicationId);
    expect(isVisible).toBeFalsy();
    await context.close();
  });

  test('should display Print Legal Forms for Submission link for application with maximum allowed legal forms required', async ({ page }) => {
    const boundary = testData.boundaryValues[0];
    await myApplicationsPage.verifyPrintLegalFormsForSubmittedApplication(boundary.applicationId);
    await myApplicationsPage.expectOnMyApplicationsPage();
  });

  // Optionally, add a sign out after each test if needed
  // test.afterEach(async ({ page }) => {
  //   await myApplicationsPage.signOut(page);
  // });
});
