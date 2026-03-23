## ADDED Requirements

### Requirement: Layout displays navigation bar
The system SHALL display a navigation bar at the top of all pages in the application.

#### Scenario: User navigates to any page
- **WHEN** a user accesses any page in the application
- **THEN** a navigation bar SHALL be visible at the top of the viewport
- **AND** the navigation bar SHALL remain fixed in position during scrolling

### Requirement: Layout displays footer
The system SHALL display a footer component at the bottom of all pages in the application.

#### Scenario: User scrolls to bottom of page
- **WHEN** a user scrolls to the bottom of any page
- **THEN** a footer SHALL be visible
- **AND** the footer SHALL contain navigation links and copyright information

### Requirement: Content spacing for fixed navbar
The system SHALL apply top padding to the main content area to prevent overlap with the fixed navigation bar.

#### Scenario: Page content renders below navbar
- **WHEN** a page loads
- **THEN** the main content SHALL start below the navigation bar
- **AND** no content SHALL be hidden behind the navigation bar
- **AND** the top padding SHALL match the navigation bar height (3.5rem/14 units)

### Requirement: Navigation functionality
The navigation bar SHALL provide working links to all major sections of the site.

#### Scenario: User clicks navigation links
- **WHEN** a user clicks any link in the navigation bar
- **THEN** the application SHALL navigate to the corresponding page
- **AND** the current page link SHALL be visually highlighted

### Requirement: Internationalization support
The navigation bar and footer SHALL support multiple locales and display content in the user's selected language.

#### Scenario: User views navigation in different locales
- **WHEN** a user switches to a different locale
- **THEN** the navigation bar and footer text SHALL update to the selected language
- **AND** all navigation links SHALL maintain the locale prefix in URLs
