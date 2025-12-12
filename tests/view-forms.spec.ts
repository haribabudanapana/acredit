import { ENV } from '@/config/env';
import { AdminApplicationReviewPage } from '@/pages/admin-application-review-page';
import { LoginPage } from '@/pages/login.page';
import { MyApplicationsPage } from '@/pages/my-applications-page';
import { ViewUploadFormsPage } from '@/pages/view-upload-forms-workflow';
import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/login.page';
// import { MyApplicationsPage } from '../pages/myApplications.page';
// import { ViewUploadFormsPage } from '../pages/viewUploadForms.page';
// import { AdminApplicationReviewPage } from '../pages/adminReview.page';

test('End-to-End: Facility Upload + Admin Accept + Facility Verification', async ({ page }) => {
    let url = ENV.BASE_URL;
    
    const login = new LoginPage(page);
    const applications = new MyApplicationsPage(page);
    const viewUpload = new ViewUploadFormsPage(page);
    const adminReview = new AdminApplicationReviewPage(page);

    // // Step 1: Facility User Login
    await login.goto(url);
    await login.login('acreditplusfacilityuser@yahoo.com');

    // Step 2: Navigate to My Applications → Sort → View/Upload Forms
    await applications.clickonMyApplicationsLink();
    await applications.sortCreatedOnAscending();
    await viewUpload.openViewUploadForms();

    // Step 3: Upload File + Send to ACR
    const applicationID = await viewUpload.getFacilityID();
    await viewUpload.uploadSurveyFile('C:\\Users\\Chandanasree\\ACRedit\\acredit\\tests\\Decals_03_27_2025.pdf');
    await viewUpload.sendToACR();
    await viewUpload.verifyFilesNotReviewedMessage();

    // Step 4: Facility User Sign Out
    await applications.signOut(page);

    // Step 5: Admin Login
    await login.login('acreditplusadmnstr@yahoo.com');

    // // Step 6: Admin Search Application & Confirm
    await adminReview.performAdminReview('2', applicationID);
    

    
});
