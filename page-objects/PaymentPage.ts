import {expect, Locator, Page} from '@playwright/test'

export class PaymentPage {
    readonly page:Page
    readonly payeeType: Locator
    readonly payeeDetailsButton: Locator
    readonly payeeDetailsButtonContent: Locator
    readonly accountType: Locator
    readonly amountField: Locator
    readonly dateField: Locator
    readonly descriptionField: Locator
    readonly payButton: Locator
    readonly successPayMessage: Locator
    readonly currencyOption: Locator
    readonly currencyRate: Locator
    readonly exchangeAmountField: Locator
    readonly dollarsButton: Locator
    readonly calculateCostsButton: Locator
    readonly exchangeAmountNotification: Locator
    readonly purchaseButton: Locator
    readonly exchangeSuccessfullNotification: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeType = page.locator('#sp_payee')
        this.payeeDetailsButton = page.locator('#sp_get_payee_details')
        this.payeeDetailsButtonContent = page.locator('#sp_payee_details')
        this.accountType = page.locator('#sp_account')
        this.amountField = page.locator('#sp_amount')
        this.dateField = page.locator('#sp_date')
        this.descriptionField = page.locator('#sp_description')
        this.payButton = page.locator('#pay_saved_payees')
        this.successPayMessage = page.locator('#alert_content > span')
        this.currencyOption = page.locator('#pc_currency')
        this.currencyRate = page.locator('.help-block span')
        this.exchangeAmountField = page.locator('#pc_amount')
        this.dollarsButton = page.locator('#pc_inDollars_true')
        this.calculateCostsButton = page.locator('#pc_calculate_costs')
        this.exchangeAmountNotification = page.locator('#pc_conversion_amount')
        this.purchaseButton = page.locator('#purchase_cash')
        this.exchangeSuccessfullNotification = page.locator('div#alert_content')

    }

    async makePayment(paymentType:string='apple',accountType:string='6',amount:string='10'
        ,date:string='2023-10-10',description:string='test_description') {
        await this.payeeType.selectOption(paymentType)
        await this.payeeDetailsButton.click()
        await expect(this.payeeDetailsButtonContent).toBeVisible()
        await this.accountType.selectOption(accountType)
        await this.amountField.fill(amount)
        await this.dateField.fill(date)
        await this.descriptionField.fill(description)
        await this.payButton.click()
    }

    async assertPaymentWasMade() {
        await expect(this.successPayMessage).toBeVisible()
        await expect(this.successPayMessage).toContainText('The payment was successfully submitted.')
    }

    async submitExchangeRequest(currency:string='EUR',amount:string='100') {
        await this.currencyOption.selectOption(currency)
        await expect(this.currencyRate).toBeVisible()
        await expect(this.currencyRate).toContainText('1 euro (EUR) =')
        await expect(this.currencyRate).toContainText('U.S. dollar (USD)')

        await this.exchangeAmountField.fill(amount)
        await this.dollarsButton.click()
        await this.calculateCostsButton.click()
        await expect(this.exchangeAmountNotification).toBeVisible()
        await expect(this.exchangeAmountNotification).toContainText('100.00 U.S. dollar (USD)')
        await this.purchaseButton.click()
    }

    async assertExchangeSucceeded() {
        await expect(this.exchangeSuccessfullNotification).toBeVisible()
        await expect(this.exchangeSuccessfullNotification).toContainText('Foreign currency cash was successfully purchased.')
    }





}
