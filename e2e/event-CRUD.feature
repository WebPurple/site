Feature: Event CRUD

  Background:
    Given I open WebPurple's "events" page

  Scenario: Find add event button
    Then I can see add event button

  Scenario: Open add event dialog
    When I click add event button
    Then Event form is opened

  Scenario: Prevent submitting empty form
    Given I click add event button
    When I submit event form
    Then Event form is opened

  Scenario: Add event
    Given I click add event button
    And 0 talk forms visible
    When I click "Add talk"
    Then 1 talk forms visible

  Scenario: Add event
    Given I click add event button
    Then I type "e2e event" into "title"
    And I type "Event created by e2e tests" into "description"
    And I type "https://pp.userapi.com/c841524/v841524162/873d/6lGeAJEhtNE.jpg" into "image"
    And I type "Ryazan" into "location"
    And I click "Add talk"
    And I type "e2e talk" into "talks[0].title"
    And I select first author
    And I submit event form
    Then Event form is closed
