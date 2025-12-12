import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {await page.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/Facility/Dashboard');
await page.getByRole('link', { name: 'My Applications' }).click();
await page.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/Facility/ApplicationList');
await page.getByLabel('Created On: Ascending sort').getByText('Created On').click();
await page.getByRole('link', { name: 'View/Upload FormsAction' }).click();
await page.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/Facility/AppViewUploadForm/Landing?q=loy%2fy%2bhjjsOC55briSgNVWSetu3x032cvP%2bE9zXytEtLNBl2k%2btIQtZ8Jm5YJU9C3LM30foe25tGgaKpMbnwxGn2rvFtoSde%2fTosNsPA0cLJVyDrb4FIW2XXKJgxxw%2bY');
await page.getByRole('button', { name: 'Upload new file for Survey' }).click();
await page.getByRole('button', { name: 'Upload new file for Survey' }).setInputFiles('Decals_03_27_2025.pdf');
await expect(page.locator('#processMessage')).toContainText('Loading...');
await page.getByRole('button', { name: 'Send to ACR' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
await expect(page.locator('#AppViewUploadFormContent')).toContainText('Submitted');
await page.getByText('The files related to this').click();
await expect(page.locator('#AppViewUploadFormContent')).toContainText('The files related to this document have not been reviewed by ACR yet.');
await page.getByRole('link', { name: 'Sign Out' }).click();
await page.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlusAuthService/Account/Login?ReturnUrl=%2FACReditPlusAuthService%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DACReditUAT%26redirect_uri%3Dhttps%253A%252F%252Facreditplus-cloud-uat-one.acr.org%252FACReditPlus%252Fauthorization-code%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520email%2520offline_access%26response_mode%3Dform_post%26nonce%3D639009448560918196.MjVhMjIyYTktNWE5YS00NTU4LWFjOTctNGY0Y2VmYTE4MThhMGI4NDYwYjMtYWMzYS00Y2QxLTk3ZDEtYmMxMmI5NzBhODg1%26state%3DCfDJ8Ck3x1RclytKpnq03cZURWHusRw0uSrB1OnMLe4UmcdRN4u1DpUxQOGQ8G9R-Vg-y7gsHZdUCTxQWwEAeS4b62z95SPubikENLsM9EpXNVZLzA4GNN9LH4ELnXchVvsaa1klf3KuMhDRnrjpF5Yk7m87WMEMbaxIEn-Fo5GHypju1fo2yobjFWBqed5ZLG6k_ENn6sejRXVK6y_b8zsi9KkzbBsI8YfgVhRxXOf7Jp_2yR4LsEyQ-vE6TaH6g06-qZHB-89ubpmzHs1tu3-j1oWsqSHEuzT8TH3KF6YukpMhvXpxw9Nw2OMAm7gBszg0JdtudmWeiis5_GdIxKEfJiiDHQJQVVusOox0vLy62zEr_Yb0VmLvRHv_1qzg-8zY4w%26x-client-SKU%3DID_NET6_0%26x-client-ver%3D6.35.0.0');
await page.getByRole('textbox', { name: 'Username' }).click();
await page.getByRole('textbox', { name: 'Username' }).fill('acreditplusadmnstr@yahoo.com');
await page.getByRole('button', { name: 'Login' }).click();

 await page.getByRole('link', { name: 'Application Completed' }).click();
  await page.getByLabel('Modality', { exact: true }).selectOption('3');//NMAP selection
  await page.getByRole('textbox', { name: 'Modality#' }).click();
  await page.getByRole('textbox', { name: 'Modality#' }).fill('60212');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'View Items' }).click();
  const page1 = await page1Promise;
  await page1.locator('#FacilityDocumentItem-1').selectOption('2');//mark as completed.
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'View Document(s)' }).click();
  const page2 = await page2Promise;
  await page2.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/lib/External/PDFViewer/web/viewer.html?q=7AnSOKoU');
  await page1.getByRole('checkbox', { name: 'Payment is received' }).check();
  await page1.getByRole('button', { name: 'Confirm Application' }).click();
  await page1.getByRole('button', { name: 'Yes' }).click();
  await expect(page1.locator('#processMessage')).toContainText('Confirming application. Please wait...');
  await page.goto('https://acreditplus-cloud-uat-one.acr.org/ACReditPlus/Admin/AppAcceptance?rs=true');
  await page.getByRole('link', { name: 'Sign Out' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('acreditplusfacilityuser@yahoo.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('#processMessage')).toContainText('Loading Dashboard...');
  await page.getByRole('link', { name: 'My Applications' }).click();
  await page.getByLabel('Created On: Ascending sort').getByText('Created On').click();
  await page.getByRole('link', { name: 'View Submitted Forms' }).first().click();
  await expect(page.locator('#AppViewUploadFormContent')).toContainText('Accepted');
  await page.getByRole('link', { name: 'Sign Out' }).click();

});