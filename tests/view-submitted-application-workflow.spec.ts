import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ENV } from '../src/config/env';
import { MyApplicationsPage } from '@/pages/my-applications-page';
import { PrintLegalFormsPage } from '@/pages/print-legal-form-page';
import { ViewSubmittedApplicationSummaryPage } from '@/pages/view-submitted-applicationsummary-page';

test('test', async ({ page }) => {

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