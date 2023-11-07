import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { TransferFundsPage } from '../../page-objects/TransferFundsPage'

test.describe('Transfer Funds and Make Payments', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let transferFundsPage: TransferFundsPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        transferFundsPage = new TransferFundsPage(page)
		
        await homePage.visit()		
		await homePage.clickOnSignIn()
        await loginPage.login('username','password')
		await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
	})

    test('Transfer Funds', async ({ page }) => {
        
        // fill transfer details and submit transfer
        await transferFundsPage.submitTransfer()

        // validate transfer before final submission 
        await transferFundsPage.validateTransferBeforeFinalSubmit()

        // validate transfer after final submission 
        await transferFundsPage.validateTransferAfterSubmit()

	})

})