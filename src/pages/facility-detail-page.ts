// facilityDetails.page.ts
import { Page } from '@playwright/test';

export class FacilityDetailsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ------------------------------
    // Facility Owner Information
    // ------------------------------
    async enterPhoneFaxNumber() {
        await this.page.locator('#FacilityPhoneNumber_FirstSection').fill('654');
        await this.page.locator('#FacilityPhoneNumber_SecondSection').fill('567');
        await this.page.locator('#FacilityPhoneNumber_ThirdSection').fill('8999');

        await this.page.locator('#FacilityFaxNumber_FirstSection').fill('654');
        await this.page.locator('#FacilityFaxNumber_SecondSection').fill('567');
        await this.page.locator('#FacilityFaxNumber_ThirdSection').fill('8999');
    }
    async enterFacilityOwner(ownerName: string) {
        await this.page.getByRole('textbox', { name: 'Facility Owner' }).fill(ownerName);
    }

    // ------------------------------
    // Facility Supervising Physician Information
    // ------------------------------
    async enterSupervisingPhysician(firstName: string, lastName: string, degreeValue: string, email: string) {
        await this.page.locator('#SupervisingPhysician_FirstName').fill(firstName);
        await this.page
            .getByRole('row', { name: `Name: ${firstName} First Name MI Last` })
            .getByLabel('Last Name')
            .fill(lastName);
        await this.page.locator('#SupervisingPhysician_SelectedDegreeId').selectOption(degreeValue);
        await this.page.locator('#SupervisingPhysician_EmailAddress').fill(email);
        await this.page.locator('#SupervisingPhysician_ConfirmEmailAddress').fill(email);
    }

    // ------------------------------
    // Facility Administrator Information
    // ------------------------------
    async enterAdministrator(firstName: string, lastName: string, degreeValue: string, email: string) {
        await this.page.locator('#Administrator_FirstName').fill(firstName);
        await this.page
            .getByRole('row', { name: `Name: ${firstName} First Name MI Last` })
            .getByLabel('Last Name')
            .fill(lastName);

        await this.page
            .getByRole('row', { name: 'Degree: [ Select ]' })
            .getByLabel('Degree')
            .selectOption(degreeValue);

        await this.page.getByRole('checkbox', { name: 'ARRT (RT)' }).check();
        await this.page.getByRole('checkbox', { name: 'BS (earned after 2011)' }).check();
        await this.page.getByRole('checkbox', { name: 'CCI' }).check();
        await this.page.getByRole('checkbox', { name: 'RVS' }).check();

        await this.page.locator('#Administrator_PhoneNumber_FirstSection').fill('654');
        await this.page.locator('#Administrator_PhoneNumber_SecondSection').fill('567');
        await this.page.locator('#Administrator_PhoneNumber_ThirdSection').fill('8999');

        await this.page
            .getByRole('row', { name: 'Email Address: help' })
            .getByLabel('Email Address')
            .fill(email);
        await this.page.locator('#Administrator_ConfirmEmailAddress').fill(email);
    }

    // ------------------------------
    // Facility Accounts Payable Contact Information
    // ------------------------------
    async enterAccountsPayableContact(firstName: string, lastName: string, email: string) {
        await this.page
            .getByRole('row', { name: 'Name: First Name MI Last Name' })
            .getByLabel('First Name')
            .fill(firstName);
        await this.page
            .getByRole('row', { name: `Name: ${firstName} First Name MI Last` })
            .getByLabel('Last Name')
            .fill(lastName);

        await this.page.locator('#AccountPayableContact_PhoneNumber_FirstSection').fill('654');
        await this.page.locator('#AccountPayableContact_PhoneNumber_SecondSection').fill('567');
        await this.page.locator('#AccountPayableContact_PhoneNumber_ThirdSection').fill('8999');

        await this.page
            .getByRole('row', { name: 'Email Address:', exact: true })
            .getByLabel('Email Address')
            .fill(email);

        await this.page.locator('#AccountPayableContact_ConfirmEmailAddress').fill(email);
    }

    // ------------------------------
    // Practice Setting Information
    // ------------------------------
    async selectPracticeSettingOptions() {
        await this.page.locator('#PracticeSetting_SelectedPracticeSettingId').selectOption('1');
        await this.page.getByLabel('The interpreting physicians').selectOption('1');
        await this.page.getByLabel('The facility type of this').selectOption('1');
        await this.page.getByLabel('The location type of this').selectOption('1');
    }

    // ------------------------------
    // Click Next: Survey Agreement
    // ------------------------------
    async clickNextSurveyAgreement() {
        await this.page.getByRole('button', { name: 'Next: Survey Agreement' }).nth(1).click();
    }
}
