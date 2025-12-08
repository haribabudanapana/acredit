import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { MyApplicationsPage } from '../pages/my-applications-page';
import { testData } from '../test-data/login-data.json';

// Test Case: TCD_FT_01_FR-1
// Verify 'Print Legal Forms for Submission' link visibility for submitted applications

test.describe('Print Legal Forms for Submission Link Visibility', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let myApplicationsPage: MyApplicationsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    myApplicationsPage = new MyApplicationsPage(page);
    // Login as Facility User using test data
    await loginPage.goto();
    await loginPage.enterUsername(testData.facilityUser.username);
    await loginPage.enterPassword(testData.facilityUser.password);
    await loginPage.clickLogin();
    await homePage.waitForHomePageLoaded();
  });

  test('should display Print Legal Forms for Submission link for submitted applications that require legal forms', async ({ page }) => {
    // Navigate to My Applications page
    await homePage.navigateToMyApplications();
    await myApplicationsPage.waitForMyApplicationsPage();

    // Find a submitted application that requires legal forms
    // (Assume test data provides application reference or filter criteria)
    const submittedAppRef = testData.submittedApplicationWithLegalForms.referenceNumber;
    await myApplicationsPage.filterByReferenceNumber(submittedAppRef);
    await myApplicationsPage.waitForApplicationRow(submittedAppRef);

    // Assert that the 'Print Legal Forms for Submission' link is visible
    const isPrintLegalFormsLinkVisible = await myApplicationsPage.isPrintLegalFormsLinkVisible(submittedAppRef);
    expect(isPrintLegalFormsLinkVisible).toBeTruthy();

    // Ensure user remains on My Applications page
    await myApplicationsPage.expectOnMyApplicationsPage();
  });
});
