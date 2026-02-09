// Playwright test for: Verify 'Print Legal Forms for Submission' link visibility for submitted applications
// Test Case ID: TCD_FT_01_FR-1
// This test is data-driven and uses the Page Object Model strictly (NO direct locators in test file)

import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { MyApplicationsPage } from '../src/pages/my-applications-page';
import * as path from 'path';
import { TestDataUtils } from '../src/utils/test-data-utils';

// Path to test data JSON
const testDataPath = path.resolve(__dirname, '../test/resources/testdata/verify-print-legal-forms-for-submission-link-visibility-data.json');

let testData: any[] = [];

test.beforeAll(async () => {
  // Load test data using utility (sync for simplicity; adapt if async is required)
  // If TestDataUtils is async, use await TestDataUtils.loadJSONData(testDataPath)
  // For this example, use require for sync loading
  testData = require(testDataPath);
});

test.describe('TCD_FT_01_FR-1: Verify Print Legal Forms for Submission link visibility for submitted applications', () => {
  for (const data of testData) {
    const {
      description,
      facilityUser: { username, password },
      application: { applicationId, status, requiresLegalForms, facilityName },
      expectedResult: { printLegalFormsLinkVisible }
    } = data;

    // Compose a unique test title for each data row
    const testTitle = `${description} [AppID: ${applicationId}, Facility: ${facilityName}]`;

    test(testTitle, async ({ page }) => {
      // --- LOGIN ---
      const loginPage = new LoginPage(page);
      // Assume loginPage.goto() navigates to login page if required
      await loginPage.goto('/ACReditPlus/Account/Login');
      await loginPage.login(username, password);

      // --- NAVIGATE TO MY APPLICATIONS ---
      const myApplicationsPage = new MyApplicationsPage(page);
      await myApplicationsPage.clickonMyApplicationsLink();
      await myApplicationsPage.waitForLoad();

      // --- VERIFY APPLICATION EXISTS (optional, but helps with test stability) ---
      await myApplicationsPage.validateApplicationExists(applicationId, facilityName);

      // --- VERIFY LINK VISIBILITY ---
      if (status === 'Submitted' && requiresLegalForms) {
        // Should be visible
        await myApplicationsPage.verifyPrintLegalFormsLinkVisibilityForSubmittedApplication(applicationId);
      } else {
        // Should NOT be visible
        // Try/catch to assert invisibility using page object method
        let isVisible = false;
        try {
          await myApplicationsPage.verifyPrintLegalFormsLinkVisibilityForSubmittedApplication(applicationId);
          isVisible = true;
        } catch (err) {
          isVisible = false;
        }
        expect(isVisible, 'Print Legal Forms link should NOT be visible').toBe(printLegalFormsLinkVisible);
      }

      // --- POST-CONDITION: User remains on My Applications page ---
      await myApplicationsPage.assertUserRemainsOnMyApplicationsPage();
    });
  }
});
