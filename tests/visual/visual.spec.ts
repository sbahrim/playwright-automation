import { test,expect } from '@playwright/test'


test.describe.only('Visual Regression Testing Example', () => {

    test('Full Page Snapshot Test', async ({ page }) => {

        await page.goto('https://example.com')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')

	})

    test('Single Element Snapshot', async ({ page }) => {
        await page.goto('https://example.com');

        let pageHeaderElement
        
        try {
            pageHeaderElement = await page.$('h1')!;
            expect(await pageHeaderElement.screenshot()).toMatchSnapshot('pageTitle.png');
        } catch (error) {
            console.error('Error:', error);
        }    });
})
