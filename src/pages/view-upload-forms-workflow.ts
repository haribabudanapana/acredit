import { Page, expect } from '@playwright/test';

export class ViewUploadFormsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openViewUploadForms() {
        await this.page.getByRole('link', { name: 'View/Upload FormsAction' }).click();
    }
    async getFacilityID(){
        const element = await this.page.locator('xpath=//*[@id="AppViewUploadFormContent"]/div[4]/table/tbody/tr[2]/td[2]/span');

        //const applicationId = await this.page.locator('td[style="width: 200px;"] span').innerText();
        return element.innerText();
    }

    async uploadSurveyFile(filePath: string){
        try{
            // Wait for the file chooser when clicking the upload button
            const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.click('input[acr="btn"][value="Upload new file for Survey Agreement"]'), // This triggers the file dialog
            ]);
            await fileChooser.setFiles(filePath);
        } catch (error) {
            
            console.error('Error during file upload:', error);
        }
    }
    // async uploadSurveyAgreement(filePath: string) {
    //     await this.page.click('input[acr="btn"][value="Upload new file for Survey Agreement"]');
    //     const fileChooser = await this.page.waitForEvent('filechooser');
    //     await fileChooser.setFiles(filePath);
    // }
    async sendToACR() {
        await this.page.getByRole('button', { name: 'Send to ACR' }).click();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
        await expect(this.page.locator('#AppViewUploadFormContent')).toContainText('Submitted');
    }
   



    async verifyFilesNotReviewedMessage() {
        await this.page.getByText('The files related to this').click();
        await expect(this.page.locator('#AppViewUploadFormContent'))
            .toContainText('The files related to this document have not been reviewed by ACR yet.');
    }

    // async signOut() {
    //     await this.page.getByRole('link', { name: 'Sign Out' }).click();
    // }
}
