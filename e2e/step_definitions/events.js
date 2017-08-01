import { client } from 'nightwatch-cucumber'
import { defineSupportCode } from 'cucumber'

const numberOfElements = (selector, number) => number === 0
    ? client.expect.element(selector).not.to.be.present
    : client.expect.element(`${selector}:nth-child(${number})`).present

defineSupportCode(({ Given, When, Then }) => {

    Given(/^(\d+) event is "(.+)"$/, (eventNumber, title) => client
        .waitForElementPresent('.e2e-event-card', 200)
        .expect.element(`.e2e-event-card:nth-child(${eventNumber}) .e2e-event-card-title`).text.to.equal(title))

    When(/^I submit event form$/, () => client.click('.e2e-add-event-form button[type="submit"]').pause(500))

    When(/^I type "(.+)" into "(.+)"$/, (value, field) => client.setValue(`.e2e-add-event-form input[name="${field}"]`, value))

    When(/^I click "Add talk"$/, () => client
        .click('.e2e-add-event-talk')
        .waitForElementPresent('.e2e-talk-fieldset', 100))

    When(/^I click add event button$/, () => client.click('.e2e-add-event-button'))

    When(/^I select first author$/, () => client
        .click('.e2e-talk-fieldset .Select-arrow-zone')
        .click('.e2e-talk-fieldset .Select-option:first-child'))

    When(/^I remove (\d+) event$/, eventNumber => client.click(`.e2e-event-card:nth-child(${eventNumber}) .e2e-delete-event`).pause(1000))

    Then(/^There are (\d+) events$/, numberOfEvents => numberOfElements('.e2e-event-card', numberOfEvents))

    Given(/^(\d+) event is not "(.+)"$/, (eventNumber, title) => client.expect.element(`.e2e-event-card:nth-child(${eventNumber}) .e2e-event-card-title`).text.not.to.equal(title))

    Then(/^I can see add event button$/, () => client.expect.element('.e2e-add-event-button').to.be.visible)

    Then(/^Event form is opened$/, () => client.expect.element('.e2e-add-event-form').to.be.visible)

    Then(/^(\d+) talk forms visible$/, numberOfTalks => numberOfElements('.e2e-talk-fieldset', numberOfTalks))

    Then(/^Event form is closed$/, () => client.expect.element('.e2e-add-event-form').not.to.be.present)

})
