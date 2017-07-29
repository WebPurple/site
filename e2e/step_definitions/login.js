import { client } from 'nightwatch-cucumber'
import { defineSupportCode } from 'cucumber'

defineSupportCode(({ Given, Then, When }) => {

    Given(/^I open WebPurple's home page$/, () => client
        .url('http://localhost:4200/')
        .waitForElementVisible('main', 1000))

    Then(/^I can see login button$/, () => client.assert.visible('.e2e-sing-in-button'))

    When(/^I click login button$/, () => client.click('.e2e-sing-in-button'))

    Then(/^login modal is opened$/, () => client.assert.visible('.e2e-sing-in-dialog'))

})
