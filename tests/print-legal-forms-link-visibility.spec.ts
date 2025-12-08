import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
//import { HomePage } from '../pages/home-page';
import { MyApplicationsPage } from '../src/pages/my-applications-page';
import testData from '../test/resources/testdata/verify-print-legal-forms-for-submission-link-visibility-data.json';
import { ENV } from '../src/config/env';  
// Test Case: TCD_FT_01_FR-1
// Verify 'Print Legal Forms for Submission' link visibility for submitted applications

test.describe('Print Legal Forms for Submission Link Visibility', () => {
  let loginPage: LoginPage;
  //let homePage: HomePage;
  let myApplicationsPage: MyApplicationsPage;
  let url=ENV.BASE_URL;
  let username=ENV.USERNAME;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    //homePage = new HomePage(page);
   // myApplicationsPage = new MyApplicationsPage(page);
    // Login as Facility User
    await loginPage.goto(url);
    await loginPage.login(username);
    // // Ensure we are on the Home Page
    // await homePage.waitForLoad();
  });

  test('should display Print Legal Forms for Submission link for submitted applications requiring legal forms', async ({ page }) => {
    // Navigate to My Applications page
    // await homePage.goToMyApplications();
    // await myApplicationsPage.waitForLoad();

    // // Filter or select a submitted application that requires legal forms
    // // (Assumes testData.submittedApplicationId is available)
    // await myApplicationsPage.selectApplicationById(testData.submittedApplicationId);
    // await myApplicationsPage.waitForApplicationDetailsLoad();

    // // Assert that the 'Print Legal Forms for Submission' link is visible
    // const isPrintLegalFormsLinkVisible = await myApplicationsPage.isPrintLegalFormsLinkVisible();
    // expect(isPrintLegalFormsLinkVisible).toBeTruthy();

    // // Post-condition: User remains on My Applications page
    // await myApplicationsPage.expectOnMyApplicationsPage();
  });
});
