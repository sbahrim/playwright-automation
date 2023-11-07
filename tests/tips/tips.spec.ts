import { test } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'


test.describe('Plawright Tips and Tricks', () => {
    
    //get detailed information about the test execution
    test('TestInfo Object', async ({ page }, testInfo) => {
        await page.goto('https://example.com')
        console.log('TEST: ' + testInfo.title + ' has ' + testInfo.expectedStatus)
        // console.log(testInfo.expectedStatus)
        let newRandomNumber = await getRandomNumber()
        let newString = await getRandomString()
        console.log(newRandomNumber)
        console.log(newString)
    })

    //skip tests on specific browser
    test('Test Skip Browser', async ({ page, browserName }, testInfo) => {
        test.skip(browserName === 'chromium','Feature not ready in Chrome browser')
        await page.goto('https://example.com')
        console.log('TEST: ' + testInfo.title + ' has ' + testInfo.expectedStatus)
        // console.log(testInfo.expectedStatus)
    })

    //skip tests that need refactoring or updates
    test('Test Fixme Annotation', async ({ page, browserName }, testInfo) => {
        test.fixme(browserName === 'chromium','Test is not stable, needs revision')
        await page.goto('https://example.com')
        console.log('TEST: ' + testInfo.title + ' has ' + testInfo.expectedStatus)
        // console.log(testInfo.expectedStatus)
    })

    //run tests with parameters
    const people = ['Mike', 'Peter', 'Elon', 'Alice']
    for (const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.fill('#searchTerm',`${name}`)
            await page.waitForTimeout(3000)
        })
    }

    //mouse movement simulation
    test('Mouse Movement Simulation', async ({ page }) => {
        await page.goto('https://example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    //interacting with multiple page tabs in a browser context
    test('Multiple browser tabs inside 1 Browser', async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()

        await page1.goto('https://example.com')
        await page2.goto('https://example.com')
        await page3.goto('https://example.com')
        await page1.waitForTimeout(2000)
    })

    //emulate devices - terminal: npx playwright open --device="iPhone 14" wikipedia.org

    //create pdf file  - terminal: npx playwright https://example.com myPdfFile.pdf

    //customized screenshots - terminal: npx playwright screenshot --device="iPhone 14" --color-scheme=dark --wait-for-timeout=3000 twiiter.com twitter-iphone-image.png

    //emulate browser language and timezone - terminal: npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com
})

