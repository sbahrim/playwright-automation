import {expect, Locator, Page} from '@playwright/test'

export class AccountActivityPage {
    readonly page:Page
    readonly accountTypeField: Locator
    readonly accountTransactions: Locator
    readonly noResultsMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.accountTypeField = page.locator('#aa_accountId')
        this.accountTransactions = page.locator('#all_transactions_for_account tbody tr')
        this.noResultsMessage = page.locator('.well')

    }

    async verifyTransactionsForAccount(accountType:string, expectedTransactions:number) {
        await this.accountTypeField.selectOption(accountType)
        await expect(this.accountTransactions).toHaveCount(expectedTransactions);
    }


}
