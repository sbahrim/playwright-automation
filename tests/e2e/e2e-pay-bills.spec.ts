import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe('New Payment', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navBar: Navbar

    test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        navBar = new Navbar(page)

		await homePage.visit()		
		await homePage.clickOnSignIn()
        await loginPage.login('username','password')
		await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
	})

    test('Send new payment', async ({ page }) => {
        
        await navBar.clickOnTab('Pay Bills')
        await paymentPage.makePayment()
        await paymentPage.assertPaymentWasMade()
	})

})