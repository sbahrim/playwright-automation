import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { AccountActivityPage } from '../../page-objects/AccountActivityPage'
import { Navbar } from '../../page-objects/components/Navbar'


test.describe('Filter Transactions', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let accountActivityPage: AccountActivityPage
    let navBar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        accountActivityPage = new AccountActivityPage(page)
        navBar = new Navbar(page)
		
        await homePage.visit()		
		await homePage.clickOnSignIn()
        await loginPage.login('username','password')
		await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
	})

    test('Verify the results for each account', async ({ }) => {
        
        await navBar.clickOnTab('Account Activity')
        
        //check various types of accounts
        await accountActivityPage.verifyTransactionsForAccount('2',3)
        // await page.selectOption('#aa_accountId','2')
		// const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
		// await expect(checkingAccount).toHaveCount(3)

        await accountActivityPage.verifyTransactionsForAccount('4',2)
        // await page.selectOption('#aa_accountId','4')
        // const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        // await expect(loanAccount).toHaveCount(2)

        await accountActivityPage.verifyTransactionsForAccount('6',0)
        // await page.selectOption('#aa_accountId','6')
        // const noResults = await page.locator('.well')
        // await expect(noResults).toBeVisible()

	})

})