Feature: Login

  Background:
    Given I open WebPurple's "home" page

  Scenario: Find login button
    Then I can see login button

  Scenario: Open login modal
    When I click login button
    Then login modal is opened
