import { Page, Locator } from '@playwright/test';

export class CTModalityPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ---------------- Modality Selection ---------------- */

  async selectComputedTomography(): Promise<void> {
    await this.page
      .getByRole('checkbox', { name: 'Computed Tomography' })
      .check();

    await this.page
      .getByRole('button', { name: 'Next: Modality Information' })
      .nth(1)
      .click();

    await this.page
      .getByRole('button', { name: 'Next: Modality Information (' })
      .nth(1)
      .click();
  }

  /* ---------------- Supervising Physician ---------------- */

  async enterCTSupervisingPhysician(firstName: string, lastName: string, degree: string, email: string): Promise<void> {
    const spRow = this.page.getByRole('row', {
      name: /Computed Tomography Supervising Physician/i
    });

    await spRow.getByLabel('First Name').fill(firstName);
    await spRow.getByLabel('Last Name').fill(lastName);

    await this.page.getByLabel('Degree').selectOption(degree);

    await this.page
      .locator('#SupervisingPhysician_PhoneNumber_FirstSection')
      .fill('654');
    await this.page
      .locator('#SupervisingPhysician_PhoneNumber_SecondSection')
      .fill('765');
    await this.page
      .locator('#SupervisingPhysician_PhoneNumber_ThirdSection')
      .fill('8999');

    await this.page.locator('#SupervisingPhysician_EmailAddress').fill(email);
    await this.page
      .locator('#SupervisingPhysician_ConfirmEmailAddress')
      .fill(email);
  }

  /* ---------------- Technologist ---------------- */

  async enterCTTechnologist(firstName: string, lastName: string, email: string): Promise<void> {
    const techRow = this.page.getByRole('cell', {
      name: /First Name MI Last Name/i
    });

    await techRow.getByLabel('First Name').fill(firstName);
    await techRow.getByLabel('Last Name').fill(lastName);

    await this.page
      .locator('#Technologist_PhoneNumber_FirstSection')
      .fill('654');
    await this.page
      .locator('#Technologist_PhoneNumber_SecondSection')
      .fill('765');
    await this.page
      .locator('#Technologist_PhoneNumber_ThirdSection')
      .fill('8999');

    await this.page.locator('#Technologist_EmailAddress').fill(email);
    await this.page
      .locator('#Technologist_ConfirmEmailAddress')
      .fill(email);
  }

  /* ---------------- Unit & Physician Quality ---------------- */

  async enterUnitAndPhysicianQuality(): Promise<void> {
    await this.page.locator('#NumberOfUnitsAtLocation').fill('1');

    await this.page
      .getByRole('button', { name: 'Next: Physician Quality' })
      .nth(1)
      .click();

    await this.page.locator('span', { hasText: 'Yes' }).getByRole('radio').check();
    await this.page
      .locator('span', { hasText: 'Peer Review' })
      .getByRole('radio')
      .check();

    await this.page.getByRole('radio').nth(4).check();
    await this.page.getByRole('textbox').fill('25');

    await this.page
      .locator('div:nth-child(7) span .choiceItem')
      .first()
      .check();
  }

  /* ---------------- CT Unit Details ---------------- */

  async enterCTUnitDetails(): Promise<void> {
    await this.page
      .getByRole('button', { name: /Next: CTAP Unit/i })
      .nth(1)
      .click();

    await this.page.locator('#RoomLocation').fill('1');
    await this.page.getByLabel('Manufacturer').selectOption('199');
    await this.page.getByLabel('Model Name', { exact: true }).selectOption('4730');
    await this.page.getByRole('textbox', { name: 'Year Manufactured' }).click();
    await this.page.getByRole('textbox', { name: 'Year Manufactured' }).fill('1990');
    await this.page.getByRole('textbox', { name: 'Serial Number' }).fill('1001');
    await this.page.getByLabel('Operating Location').selectOption('1');

    await this.page.getByRole('checkbox', { name: 'Adult' }).check();
    await this.page.getByRole('checkbox', { name: 'Head/Neck' }).check();

    await this.page
      .getByRole('button', { name: /Next: Exam Selection/i })
      .nth(1)
      .click();
  }
}
