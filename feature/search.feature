Feature: Agoda Hotel Search and Verification

Scenario: Search for a specific hotel with defined dates and guest occupancy
    Given As an User, I open the Agoda homepage
    When I enter "Muong Thanh Saigon Centre Hotel" in the box
    And the user selects a check-in date 2 days from the current date 
    And the user selects a check-out date 3 days from the current date 
    And the user sets the occupancy to 1 room, 4 adults, and 2 children 
    And the user clicks the search button 
    And the user selects the first available hotel option from the search results 
    Then the price of the selected hotel should be explicitly displayed on the screen
