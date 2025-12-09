import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ENV } from '../src/config/env';
import { MyApplicationsPage } from '@/pages/my-applications-page';
import { PrintLegalFormsPage } from '@/pages/print-legal-form-page';

test('test', async ({ page }) => {
  let loginPage: LoginPage;
  let myApplicationsPage: MyApplicationsPage;
  let printLegalFormsPage: PrintLegalFormsPage;
  let url = ENV.BASE_URL;
  let username = ENV.USERNAME;
  loginPage = new LoginPage(page);
  myApplicationsPage = new MyApplicationsPage(page);
  printLegalFormsPage = new PrintLegalFormsPage(page);

  //Launch the Application and login
  await loginPage.goto(url);
  await loginPage.login(username);
  //Click on MyApplications link and sort Created On in Ascending order
  await myApplicationsPage.clickonMyApplicationsLink();
  await myApplicationsPage.sortCreatedOnAscending();
  //Verify the "Print legal forms for Submission" link is visible
  await myApplicationsPage.verifyPrintLegalFormsLink(page);
  //Handle the first popup and verify the Print Legal Forms button and legal form details
  const page1 = await myApplicationsPage.clickOnPrintLegalForms(page);
  await printLegalFormsPage.verifyPrintLegalFormsButton(page1);
  await printLegalFormsPage.verifyLegalFormDetails(page1);
});