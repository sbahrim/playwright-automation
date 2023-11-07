import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Search results', () => {
    let homePage: HomePage
    
    //Before hook
	test.beforeEach(async({page}) => {
		homePage = new HomePage(page)
        await homePage.visit()
	})

	test('Should find search results', async ({ page }) => {
		await homePage.searchFor('bank')

        //validate search results were found
		const numberOfLinks = await page.locator('li > a')
		await expect(numberOfLinks).toHaveCount(2)
	})

    test('No results found', async ({ page }) => {
		await homePage.searchFor('noresults')

        //validate search results were found
		const noResultsMessage = await page.locator('.top_offset')
		await expect(noResultsMessage).toContainText('No results were found for the query:')
	})
})