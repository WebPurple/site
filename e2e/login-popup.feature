Feature: Login

  Scenario: Find login button

    Given I open WebPurple's home page
    Then I can see login button

  Scenario: Open login modal

    Given I open WebPurple's home page
    When I click login button
    Then login modal is opened
