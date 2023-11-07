import {expect, Locator, Page} from '@playwright/test'

export class TransferFundsPage {
    readonly page:Page
    readonly fromAccount: Locator
    readonly toAccount: Locator
    readonly amountField: Locator
    readonly descriptionField: Locator
    readonly submitButton: Locator
    readonly verifyHeader: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.fromAccount = page.locator('#tf_fromAccountId')
        this.toAccount = page.locator('#tf_toAccountId')
        this.amountField = page.locator('#tf_amount')
        this.descriptionField = page.locator('#tf_description')
        this.submitButton = page.locator('#btn_submit')
        this.verifyHeader = page.locator('h2.board-header')
        this.successMessage = page.locator('.alert-success')

    }

    async submitTransfer(fromAccount:string='2',toAccount:string='3',amount:string='10'
        ,description:string='test_description') {
        await this.fromAccount.selectOption(fromAccount)
        await this.toAccount.selectOption(toAccount)
        await this.amountField.fill(amount)
        await this.descriptionField.fill(description)
        await this.submitButton.click()
    }

    async validateTransferBeforeFinalSubmit(){
        await expect(this.verifyHeader).toBeVisible()
        await expect(this.verifyHeader).toContainText('Verify')

    }

    async validateTransferAfterSubmit() {
        await this.submitButton.click()
        await expect(this.successMessage).toBeVisible()
        await expect(this.successMessage).toContainText('You successfully submitted your transaction.')
    }

}
