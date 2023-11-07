import { test, expect } from '@playwright/test'

test('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const pageTitle = await page.locator('.navbar__inner .navbar__title')
    await expect(pageTitle).toHaveText('Playwright')
})

