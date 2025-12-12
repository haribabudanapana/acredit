import { test } from '@playwright/test';
import { ApplicationSubmissionPage } from '@/pages/application-submission-page';
import { MyApplicationsPage } from '@/pages/my-applications-page';
import { FacilityPage } from '@/pages/facility-page';
import { FacilityDetailsPage } from '@/pages/facility-detail-page';


test('Create Facility End-to-End', async ({ page }) => {

    // Login
    await page.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlusAuthService/Account/Login');
    await page.getByLabel('Username').fill('acreditplusfacilityuser@yahoo.com');
    await page.getByRole('button', { name: 'Login' }).click();

    // PAGE OBJECTS
    const facility = new FacilityPage(page);
    const fdetail = new FacilityDetailsPage(page);
    const submission = new ApplicationSubmissionPage(page);
    const myApps = new MyApplicationsPage(page);


    await page.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/Facility/Dashboard');

    // Facility Creation
    await facility.openFacilityPage();
    await facility.selectFacilityType();
    await facility.fillFacilityInfo();
    //await facility.selectOwnershipNone();

    // facility detail Steps
    await fdetail.enterPhoneFaxNumber();
    await fdetail.enterFacilityOwner('fo1');
    await fdetail.enterSupervisingPhysician('sp1','123', '1', 'fsp@gmail.com');
    await fdetail.enterAdministrator('ad1', '123', '1', 'fa@gmail.com');
    await fdetail.enterAccountsPayableContact('apc1', '123', 'fapc@gmail.com');
    await fdetail.selectPracticeSettingOptions();
    await fdetail.clickNextSurveyAgreement();

    // // Application Submission Steps
    // await submission.navigateToSurveyAgreement();
    // await submission.acceptSurveyAgreement();
    // await submission.submitApplication();
    // await submission.selectSubmissionChecklist();
    // await submission.submitApplication();
    // await submission.verifySubmissionConfirmation();

    // await myApps.clickonMyApplicationsLink();
    // await myApps.sortCreatedOnAscending();
    // await myApps.validateApplicationExists("CTAP# 60547", "TEST_QZF2");
    // await myApps.signOut(page);
});
