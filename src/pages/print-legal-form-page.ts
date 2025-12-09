import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class PrintLegalFormsPage extends BasePage{
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  //Verify the "[ Print Legal Forms ]" button is visible in legal form page.
  async verifyPrintLegalFormsButton(page: Page) {
    await expect(page.locator("//a[contains(text(),'[ Print Legal Forms ]')]")).toBeVisible({ timeout: 10000 });
  }

  //Verify the div content inside the popup
  async verifyLegalFormDetails(page: Page) {
    const divLocator = page.locator("div[style='padding: 2pt 0 10pt 35pt;']");
    await expect(divLocator).toContainText('NMAP# 60212');
    await expect(divLocator).toContainText('TEST_QZ_A1');
    await expect(divLocator).toContainText('test');
    await expect(divLocator).toContainText('qz');
    await expect(divLocator).toContainText('Qwerty, Alaska 12345');
  }
}