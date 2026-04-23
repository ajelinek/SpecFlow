# INSTRUCTION BLOCK (remove before committing)
# This template is the starting structure for specs.feature.
# Fill in the Feature name and Description from the feature's overview.md.
# Replace all placeholder scenario text with real Gherkin steps.
# Preserve the TSM# comment headers, TS# tags, and @status_pending on every new scenario.
# Do not invent TS# numbers — check overview.md and any existing scenarios for the current
# highest number and continue from there.
# Delete this instruction block before writing the file.

Feature: Expense Submission
  Users can submit expense reports for manager review and finance processing.
  This feature covers the full submission lifecycle from form entry through approval routing.

  #---------------------------------------------------------------------------
  # TSM001: Expense Submission — Happy Paths
  #---------------------------------------------------------------------------

  @TS001 @happyPath @status_pending
  Scenario: Employee submits a single-line expense and receives confirmation
    Given the employee is logged in and on the expense submission page
    When the employee enters a valid expense with amount, category, and receipt
    And the employee submits the form
    Then the expense is saved with status "Pending Review"
    And the employee sees a confirmation message with the expense reference number
    And the employee's manager receives an approval request notification

  @TS002 @happyPath @status_pending
  Scenario Outline: Employee submits expenses across supported categories
    Given the employee is logged in and on the expense submission page
    When the employee submits an expense with category "<category>" and amount <amount>
    Then the expense is saved successfully
    And the routing rules for "<category>" are applied to the approval workflow

    Examples:
      | category    | amount |
      | Travel      | 450.00 |
      | Meals       | 38.50  |
      | Software    | 99.00  |

  #---------------------------------------------------------------------------
  # TSM002: Expense Submission — Error Paths
  #---------------------------------------------------------------------------

  @TS003 @errorPath @status_pending
  Scenario: Submission fails when required receipt is missing
    Given the employee is on the expense submission page
    And the expense category requires a receipt attachment
    When the employee attempts to submit without uploading a receipt
    Then the form displays an error: "Receipt is required for this expense category"
    And the expense is not saved
    And the employee remains on the submission form with their entered data preserved

  @TS004 @errorPath @status_pending
  Scenario: Submission fails when amount exceeds the employee's approval threshold
    Given the employee has a per-expense approval threshold of $500
    When the employee submits an expense for $750
    Then the system displays a warning: "This amount requires a Finance review"
    And the expense is routed to Finance rather than the direct manager

  #---------------------------------------------------------------------------
  # TSM003: Expense Submission — Edge Cases
  #---------------------------------------------------------------------------

  @TS005 @edgePath @status_pending
  Scenario: Duplicate submission is detected and blocked
    Given the employee has already submitted an expense with the same date, amount, and category
    When the employee submits an identical expense again
    Then the system displays a duplicate warning with the original reference number
    And the duplicate is not saved unless the employee explicitly confirms it is a separate charge
