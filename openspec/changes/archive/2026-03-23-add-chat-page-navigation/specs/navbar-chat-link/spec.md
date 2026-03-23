## ADDED Requirements

### Requirement: Navbar includes chat menu item
The system SHALL display a "Chat" menu item in the navigation bar that links to the chat page.

#### Scenario: Desktop navbar displays chat link
- **WHEN** a user views the site on a desktop screen
- **THEN** the navigation bar SHALL include a "Chat" menu item
- **AND** the "Chat" item SHALL be positioned after "Community" and before the language switcher
- **AND** the "Chat" item SHALL follow the same styling as other navigation links

#### Scenario: Mobile navbar displays chat link
- **WHEN** a user views the site on a mobile screen
- **THEN** the mobile menu SHALL include a "Chat" menu item
- **AND** the "Chat" item SHALL be positioned after "Community" and before the language switcher
- **AND** clicking "Chat" SHALL navigate to the chat page and close the mobile menu

### Requirement: Chat link navigation behavior
The "Chat" menu item SHALL navigate users to the chat page while maintaining their current locale.

#### Scenario: User clicks chat link from any page
- **WHEN** a user clicks the "Chat" menu item from any page
- **THEN** the system SHALL navigate to the `/chat` route
- **AND** the user's current locale SHALL be preserved in the URL
- **AND** the "Chat" link SHALL be visually highlighted when on the chat page

### Requirement: Chat link internationalization
The "Chat" menu item SHALL support translation across all supported locales.

#### Scenario: Chat link displays in user's language
- **WHEN** a user views the site in any supported locale
- **THEN** the "Chat" menu item SHALL display text in that locale's language
- **AND** the translation SHALL be loaded from the nav.json translation file
- **AND** the link SHALL function correctly regardless of the selected locale
