import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'


test.describe('Login Page Visual Tests', () => {
    let homePage: HomePage
    let loginPage: LoginPage


    test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page)
        loginPage = new LoginPage(page)
    

		await homePage.visit()		
		await homePage.clickOnSignIn()
    
	})

    test('Login form test', async ({ page }) => {
        
        await loginPage.snapshotLoginForm()
      
	})

    test('Login error message test', async ({ page }) => {
        
        await loginPage.login('some_username','some_password')
        await loginPage.snapshotErrorMessage()

	})

})

		