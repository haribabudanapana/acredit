import { Page, Locator } from '@playwright/test';

export class ExamPersonnelPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ---------------- Exam Selection ---------------- */
  async selectCTExams(): Promise<void> {
    // Select all base exams
    await this.page.locator('#ModulesAndExams_0__Exams_0__IsSelected').check();
    await this.page.locator('#ModulesAndExams_0__Exams_1__IsSelected').check();
    await this.page.locator('#ModulesAndExams_0__Exams_2__IsSelected').check();

    await this.page
      .getByRole('button', { name: 'Next: Personnel Detail' })
      .nth(1)
      .click();
  }

  /* =========================
     Interpreting Radiologist
     ========================= */
  async addInterpretingRadiologist(
    lastName: string,
    firstName: string,
    email: string
  ) {
    await this.page.getByRole('button', { name: 'Add New Interpreting' }).click();

    await this.page
      .locator('input[name^="RadiologistPersonnelList"][name$=".LastName"]')
      .fill(lastName);

    await this.page
      .locator('input[name^="RadiologistPersonnelList"][name$=".FirstName"]')
      .fill(firstName);

    await this.page
      .locator('input[name^="RadiologistPersonnelList"][name$=".EmailAddress"]')
      .fill(email);

    await this.page.getByRole('link', { name: 'Select', exact: true }).click();
    await this.page.getByRole('checkbox', { name: 'M.D.' }).check();
    await this.page.locator('label').filter({ hasText: 'D.O.' }).click();
    await this.page.getByRole('button', { name: 'Confirm Selection' }).click();

    await this.page.getByRole('combobox').selectOption('1');
  }

  /* =========================
     Medical Physicist / MR
     ========================= */
  async addMedicalPhysicist(
    lastName: string,
    firstName: string,
    email: string
  ) {
    await this.page
      .getByRole('button', { name: 'Add New Medical Physicist/MR' })
      .click();

    await this.page
      .locator('input[name^="PhysicistPersonnelList"][name$=".LastName"]')
      .fill(lastName);

    await this.page
      .locator('input[name^="PhysicistPersonnelList"][name$=".FirstName"]')
      .fill(firstName);

    await this.page
      .locator('input[name^="PhysicistPersonnelList"][name$=".EmailAddress"]')
      .fill(email);

    await this.page.getByRole('link', { name: 'Select', exact: true }).click();
    await this.page.getByRole('checkbox', { name: 'D.O.' }).check();
    await this.page.getByRole('checkbox', { name: 'M.D.' }).check();
    await this.page.getByRole('button', { name: 'Confirm Selection' }).click();
  }

  /* =========================
     Technologist
     ========================= */
  async addTechnologist(
    lastName: string,
    firstName: string,
    email: string
  ) {
    await this.page.getByRole('button', { name: 'Add New Technologist' }).click();

    await this.page
      .locator('input[id^="TechnologistPersonnelList"][id$="__LastName"]')
      .fill(lastName);

    await this.page
      .locator('input[id^="TechnologistPersonnelList"][id$="__FirstName"]')
      .fill(firstName);

    await this.page
      .locator('input[id^="TechnologistPersonnelList"][id$="__EmailAddress"]')
      .fill(email);

    /* Degree Selection */
    await this.page.locator('#DegreeDialog_1_7').click();
    await this.page.getByRole('checkbox', { name: 'D.O.' }).check();
    await this.page.getByRole('checkbox', { name: 'M.D.' }).check();
    await this.page.getByRole('button', { name: 'Confirm Selection' }).click();

    /* Certification Selection */
    await this.page.getByRole('link', { name: 'Select', exact: true }).click();
    await this.page.getByRole('checkbox', { name: 'ARRT (RT)' }).check();
    await this.page.getByRole('checkbox', { name: 'CT' }).check();
    await this.page.locator('label').filter({ hasText: 'CCI' }).click();
    await this.page.getByRole('checkbox', { name: 'RVS' }).check();
    await this.page.getByRole('button', { name: 'Confirm Selection' }).click();
  }

  /* =========================
     Next: Payment Detail
     ========================= */
  async clickNextPaymentDetail() {
    await this.page
      .getByRole('button', { name: 'Next: Payment Detail' })
      .nth(1)
      .click();
  }
}
