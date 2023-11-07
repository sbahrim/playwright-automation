import { Locator, Page } from '@playwright/test'

export class HomePage {
    // Define selectors
    readonly page:Page
    readonly signInButton: Locator
    readonly searchBox: Locator
    readonly feedbackTab: Locator
   
    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.searchBox = page.locator('#searchTerm')
        this.feedbackTab = page.locator('#feedback')
    }

    // Define Home page methods 
    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

    async clickOnSignIn () {
        await this.signInButton.click()
    }

    async clickOnFeedbackTab() {
        await this.feedbackTab.click()
    }

    async searchFor(keyword:string) {
        await this.searchBox.fill(keyword)
        await this.page.keyboard.press('Enter')
    }
}
