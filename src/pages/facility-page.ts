import { Page, expect } from '@playwright/test';
import { RandomData } from '../utils/random-data';

export class FacilityPage {
    constructor(private page: Page) { }

    async openFacilityPage() {
        await this.page.getByRole('link', { name: 'Facility', exact: true }).click();
    }

    async selectFacilityType() {
        await this.page.getByRole('radio', { name: 'Please define which' }).check();
    }

    async fillFacilityInfo() {
        await this.page.getByLabel('Facility Name').fill(RandomData.generateFacilityName());

        await this.page.locator("//input[contains(@id,'LocationAddressViewModel_StreetAddress1')]").fill(RandomData.randomStreet());
        const city = RandomData.randomCity();
        await this.page.getByLabel('City/Town').nth(0).fill(RandomData.randomCity());
        const state = RandomData.randomStateOption();
        await this.page.getByLabel('State/Province').nth(0).selectOption(state);
        await this.page.getByLabel('Zip').nth(0).fill(RandomData.randomZipCode());
        await this.page.getByRole('checkbox', { name: 'Check if same as location' }).click();
        await this.page.evaluate(() => {
            const checkbox = document.getElementById('IsMailingAddressSameAsLocationAddress') as HTMLInputElement;
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
        await expect(this.page.locator('#IsMailingAddressSameAsLocationAddress')).toBeChecked();
        await this.page.waitForLoadState('networkidle');

        await this.page.locator('//input[contains(@name,"next")]').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator('//input[contains(@name,"next")]').click({ force: true });
        // const nextBtn = this.page.locator('//input[contains(@name,"next")]');
        // await nextBtn.waitFor({ state: 'visible' });
        // await nextBtn.click({ force: true });
        // // optionally wait for navigation or wizard step
        // await this.page.waitForTimeout(500); // 

    }

    async selectOwnershipNone() {
        await this.page.getByRole('radio', { name: 'None of the above:' }).check();
        await this.page.getByRole('button', { name: 'Next' }).click();
    }
}
