import { client } from 'nightwatch-cucumber'
import { defineSupportCode } from 'cucumber'

defineSupportCode(({ Then, When }) => {

    Then(/^I can see login button$/, () => client.assert.visible('.e2e-sing-in-button'))

    When(/^I click login button$/, () => client.click('.e2e-sing-in-button'))

    Then(/^login modal is opened$/, () => client.assert.visible('.e2e-sing-in-dialog'))

})
