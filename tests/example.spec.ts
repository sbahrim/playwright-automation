import { test, expect } from '@playwright/test'

import {loadHomePage,assertTitle} from '../helpers'

test('Simple basic test', async ({ page }) => {
    await page.goto('https://example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on elements', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {
    //text
    await page.click('text=some text')

    //css selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    //only visible css selector
    await page.click('.submit-button:visible') //will only click on .submit-button that is visible on the page

    //combinations
    await page.click('#username .first')

    //xpath
    await page.click('//button')
})

test.describe('My first test suite', () => {
    test('Working with Inputs @myTag', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')

        await page.fill('#user_login', 'some username')
        await page.fill('#user_password', 'password')

        await page.click('text=Sign in')

        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    test('Assertions @myTag', async ({ page }) => {
        await page.goto('https://example.com')
        await expect(page).toHaveURL('https://example.com')
        await expect(page).toHaveTitle('Example Domain')

        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)

        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()


    })
})

test.describe.parallel.only('Hooks', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/')
    })

    test('Screenshots', async ({ page }) => {
        // await page.goto('http://example.com')

        //take screenshot
        await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })

    test('Single element screenshot', async ({ page }) => {
        // await page.goto('http://example.com')

        //take screenshot
        const element = await page.$('h1s')
        await element?.screenshot({ path: 'single_element_screenshot.png' }) //takes a screenshot to "h1" element IF present
    })
})

test('Custom helpers', async ({ page }) => {
    await loadHomePage(page);
    // await page.pause()
    await assertTitle(page)

})