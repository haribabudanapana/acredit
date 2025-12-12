import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ENV } from '../src/config/env';
import { MyApplicationsPage } from '@/pages/my-applications-page';
import { PrintLegalFormsPage } from '@/pages/print-legal-form-page';
import { ViewSubmittedApplicationSummaryPage } from '@/pages/view-submitted-applicationsummary-page';

test('test', async ({ page }) => {
  // Recording...
  // await page.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlus');
  // await page.getByRole('textbox', { name: 'Username' }).click();
  // await page.getByRole('textbox', { name: 'Username' }).fill('acreditplusfacilityuser@yahoo.com');
  // await page.getByRole('button', { name: 'Login' }).click();
  // await page.getByRole('link', { name: 'My Applications' }).click();
  // await page.getByLabel('Created On: Ascending sort').getByText('Created On').click();
  // const page1Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'View Submitted Application' }).first().click();
  // const page1 = await page1Promise;
  // await expect(page1.locator('#divtoprint')).toContainText('SUBMITTED APPLICATION SUMMARY');
  // await expect(page1.locator('#divtoprint')).toContainText('facility');
  // await expect(page1.locator('#divtoprint')).toContainText('user');
  // await expect(page1.locator('#divtoprint')).toContainText('acreditplusfacilityuser@yahoo.com');
  // await page1.getByRole('link', { name: 'Sign Out' }).click();



  let loginPage: LoginPage;
  let myApplicationsPage: MyApplicationsPage;
  let printLegalFormsPage: PrintLegalFormsPage;
  let summaryPage: ViewSubmittedApplicationSummaryPage;
  let url = ENV.BASE_URL;
  let username = ENV.USERNAME;
  loginPage = new LoginPage(page);
  myApplicationsPage = new MyApplicationsPage(page);
  printLegalFormsPage = new PrintLegalFormsPage(page);
  summaryPage = new ViewSubmittedApplicationSummaryPage(page);

  //Launch the Application and login
  await loginPage.goto(url);
  await loginPage.login(username);
  //Click on MyApplications link and sort Created On in Ascending order
  await myApplicationsPage.clickonMyApplicationsLink();
  await myApplicationsPage.sortCreatedOnAscending();
  //Handle the first popup and verify the View submitted application summary button and user details in application summary page.
  const page1 = await myApplicationsPage.clickOnViewSubmittedApplicationSummary(page);
  await summaryPage.verifySummaryHeader(page1);
  await summaryPage.verifyFacilityText(page1);
  await summaryPage.verifyUserText(page1);
  await summaryPage.verifyEmailText(page1);
  await myApplicationsPage.signOut(page1);

});