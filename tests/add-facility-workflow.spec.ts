import { test } from '@playwright/test';
import { FacilityPage } from '@/pages/facility-page';
import { FacilityDetailsPage } from '@/pages/facility-detail-page';
import { SurveyAgreementPage } from '@/pages/survey-agreement-page';
import { CTModalityPage } from '@/pages/CT-modality-workflow';
import { ExamPersonnelPage } from '@/pages/exam-personnel-page';
import { PaymentSubmissionPage } from '@/pages/payment-application-submission-page';
import { MyApplicationsPage } from '@/pages/my-applications-page';
import { ENV } from '@/config/env';
import { Logger } from '@/utils/logger';


test('Create Facility End-to-End', async ({ page }) => {
    let url = ENV.baseUrl;
    let facility_username = ENV.auth.facility_username;
    let dashboard = ENV.facility.dashboard;

    Logger.info('Test execution started: Create Facility End-to-End');

    //Login
    await test.step('Login as Facility User', async () => {
        await page.goto(url);
        await page.getByLabel('Username').fill(facility_username);
        await page.getByRole('button', { name: 'Login' }).click();
    });

    // Page Objects
    const facility = new FacilityPage(page);
    const fdetail = new FacilityDetailsPage(page);
    const practiceSite = new SurveyAgreementPage(page);
    const ctModality = new CTModalityPage(page);
    const examPersonnel = new ExamPersonnelPage(page);
    const paymentSubmission = new PaymentSubmissionPage(page);
    const myApplications = new MyApplicationsPage(page);

    await test.step('Navigate to Facility Dashboard', async () => {
        await page.goto(dashboard);
    });

    // Facility Creation
    await test.step('Create Facility', async () => {
        await facility.openFacilityPage();
        await facility.selectFacilityType();
        await facility.fillFacilityInfo();
    });

    // Facility Details
    await test.step('Enter Facility Details', async () => {
        await fdetail.enterPhoneFaxNumber();
        await fdetail.enterFacilityOwner('fo1');
        await fdetail.enterSupervisingPhysician('sp1', '123', '5', 'fsp@gmail.com');
        await fdetail.enterAdministrator('ad1', '123', '1', 'fa@gmail.com');
        await fdetail.enterAccountsPayableContact('apc1', '123', 'fapc@gmail.com');
        await fdetail.selectPracticeSettingOptions();
        await fdetail.clickNextSurveyAgreement();
    });

    // Survey Agreement
    await test.step('Complete Survey Agreement', async () => {
        await practiceSite.selectPrintTitleAndGoNext('3');
    });

    // CT Modality Selection
    await test.step('Configure CT Modality', async () => {
        await ctModality.selectComputedTomography();

        await ctModality.enterCTSupervisingPhysician(
        'Ctspi', '123', '5', 'ctpi@gmail.com'
        );

        await ctModality.enterCTTechnologist(
        'Cttcpi', '123', 'cttcpi@gmail.com'
        );

        await ctModality.enterUnitAndPhysicianQuality();
        await ctModality.enterCTUnitDetails();
    });

    // Exam Personnel
    await test.step('Add Exam Personnel', async () => {
        await examPersonnel.selectCTExams();

        await examPersonnel.addInterpretingRadiologist(
        'IRP', '123', 'irp@gmail.com'
        );

        await examPersonnel.addMedicalPhysicist(
        'mpmrs', '123', 'mpmrs@gmail.com'
        );

        await examPersonnel.addTechnologist(
        'techie', '123', 'techie@gmail.com'
        );

        await examPersonnel.clickNextPaymentDetail();
    });

    // Payment & Submission
    await test.step('Submit Payment and Application', async () => {
        await paymentSubmission.selectPaymentMethodAndProceed();
        await paymentSubmission.proceedThroughSummaryAndVerification();
        await paymentSubmission.submitApplication();
        await paymentSubmission.verifySubmissionConfirmation();
    });

    // Sign Out
    await test.step('Sign Out', async () => {
        await myApplications.signOut(page);
    });
    
    Logger.info('Test execution completed successfully');
});
