Feature: SpecFlow documentation site

  #---------------------------------------------------------------------------
  # TSM001: Homepage and onboarding
  #---------------------------------------------------------------------------

  @TS001 @happyPath @status_pending
  Scenario: Engineer understands the minimal path from the homepage
    Given an engineer opens the SpecFlow homepage
    When the homepage loads
    Then the page explains what SpecFlow is in simple terms
    And the page shows the minimal path "201 -> 202 -> 301 -> 401"
    And the primary calls to action lead to Getting Started and Core Workflow

  @TS002 @happyPath @status_pending
  Scenario: New user reaches a practical getting started guide
    Given a new user opens the Getting Started page
    When the user scans the page
    Then the page explains the core concepts and minimal workflow path
    And the page shows a realistic first-time example prompt sequence
    And the page explains which files SpecFlow typically creates

  #---------------------------------------------------------------------------
  # TSM002: Core workflow reference
  #---------------------------------------------------------------------------

  @TS003 @happyPath @status_pending
  Scenario Outline: User opens a core workflow page and gets practical guidance
    Given the user opens the "<workflow>" core workflow page
    When the page is rendered
    Then the page explains what the workflow is for
    And the page explains when to use it
    And the page lists what it produces and what usually comes next
    And the page includes a common prompt example

    Examples:
      | workflow |
      | 201-high-level-design |
      | 202-spec-design |
      | 301-spec-implementation |
      | 401-cleanup |

  @TS004 @edgePath @status_pending
  Scenario: Navigation stays coherent across docs pages
    Given a user opens any docs page in the site
    When the page loads
    Then the top navigation shows the current major section
    And the left sidebar highlights the active page
    And previous or next links appear when there is a logical reading sequence

  #---------------------------------------------------------------------------
  # TSM003: Catalog and deployment
  #---------------------------------------------------------------------------

  @TS005 @happyPath @status_pending
  Scenario: User browses the full skill catalog without confusing the core story
    Given a user opens the Full Skill Catalog page
    When the catalog is displayed
    Then skills are grouped by category
    And each skill shows whether it is core, optional, or bonus
    And bonus skills do not visually dominate the core workflow

  @TS006 @errorPath @status_pending
  Scenario: Missing page routes return the user to a safe starting point
    Given a user opens an invalid route in the site
    When the page is rendered
    Then the user sees a 404 page
    And the 404 page provides a path back to Getting Started
