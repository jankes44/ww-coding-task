Feature: NI deductions
  In order to calculate my national insurance deductions
  As a consumer of the ni calculation
  I want to be given the correct class a national insurance contributions for the income and date I requested

  #############
  #    NOW    #
  #############

  Scenario: When a run date is not defined, the current year bands are used
    Given that I have a monthly income of £719
    And that the current tax year is 2018/19
    When calculating my ni deductions
    Then I should be liable to pay £2.04 in class 1 national insurance contributions


  #############
  #  2019/20  #
  #############

  Scenario: 2019/20 below Primary Threshold
    Given that I have a monthly income of £719
    And that the tax year is 2019/20
    When calculating my ni deductions
    Then I should be liable to pay £0 in class 1 national insurance contributions

  Scenario: 2019/20 above Primary Threshold
    Given that I have a monthly income of £720
    And that the tax year is 2019/20
    When calculating my ni deductions
    Then I should be liable to pay £0.12 in class 1 national insurance contributions

  Scenario: 2019/20 below Upper Earnings Limit
    Given that I have a monthly income of £4167
    And that the tax year is 2019/20
    When calculating my ni deductions
    Then I should be liable to pay £413.76 in class 1 national insurance contributions

  Scenario: 2019/20 above Upper Earnings Limit
    Given that I have a monthly income of £4168
    And that the tax year is 2019/20
    When calculating my ni deductions
    Then I should be liable to pay £413.78 in class 1 national insurance contributions

  #############
  #  2018/19  #
  #############

  Scenario: 2018/19 below Primary Threshold
    Given that I have a monthly income of £702
    And that the tax year is 2018/19
    When calculating my ni deductions
    Then I should be liable to pay £0 in class 1 national insurance contributions

  Scenario: 2018/19 above Primary Threshold
    Given that I have a monthly income of £703
    And that the tax year is 2018/19
    When calculating my ni deductions
    Then I should be liable to pay £0.12 in class 1 national insurance contributions

  Scenario: 2018/19 below Upper Earnings Limit
    Given that I have a monthly income of £3863
    And that the tax year is 2018/19
    When calculating my ni deductions
    Then I should be liable to pay £379.32 in class 1 national insurance contributions

  Scenario: 2018/19 above Upper Earnings Limit
    Given that I have a monthly income of £3864
    And that the tax year is 2018/19
    When calculating my ni deductions
    Then I should be liable to pay £379.34 in class 1 national insurance contributions
