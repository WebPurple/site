import { client } from 'nightwatch-cucumber'
import { defineSupportCode } from 'cucumber'

defineSupportCode(({ Then, When }) => {

    When(/^I submit event form$/, () => client.click('.e2e-add-event-form button[type="submit"]').pause(500))

    When(/^I type "(.+)" into "(.+)"$/, (value, field) => client.setValue(`.e2e-add-event-form input[name="${field}"]`, value))

    When(/^I click "Add talk"$/, () => client
        .click('.e2e-add-event-talk')
        .waitForElementPresent('.e2e-talk-fieldset', 100))

    When(/^I click add event button$/, () => client.click('.e2e-add-event-button'))

    When(/^I select first author$/, () => client
        .click('.e2e-talk-fieldset .Select-arrow-zone')
        .click('.e2e-talk-fieldset .Select-option:first-child'))

    Then(/^I can see add event button$/, () => client.expect.element('.e2e-add-event-button').to.be.visible)

    Then(/^Event form is opened$/, () => client.expect.element('.e2e-add-event-form').to.be.visible)

    Then(/^(\d+) talk forms visible$/, numberOfTalks => numberOfTalks === 0
        ? client.expect.element('.e2e-talk-fieldset').not.to.be.present
        : client.expect.element(`.e2e-talk-fieldset:nth-child(${numberOfTalks})`).present)

    Then(/^Event form is closed$/, () => client.expect.element('.e2e-add-event-form').not.to.be.present)

})
