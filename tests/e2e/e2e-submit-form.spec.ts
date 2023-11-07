import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel('Feedback form', () => {
	let homePage: HomePage
    let feedbackPage: FeedbackPage

	//Before hook
	test.beforeEach(async({page}) => {
		homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

		await homePage.visit()
		await homePage.clickOnFeedbackTab()
	})

	//Reset feedback form
	test('Reset feedback form', async ({ page }) => {

        //fill form fields
        await feedbackPage.fillForm('Name','myemail@email.com','some_subject','this is a comment')

        //reset form
        await feedbackPage.resetForm()

        //confirm form fields have reset
        await feedbackPage.assertReset()
		
	})

	//Submit feedback form
	test('Submit feedback form', async ({ page }) => {

		//fill form fields
        await feedbackPage.fillForm('Name','myemail@email.com','some_subject','this is a comment')
        
         //submit form
		await feedbackPage.submitForm()

        //confirm the form has been successfully submitted
        await feedbackPage.assertSentForm()
        
	})
})