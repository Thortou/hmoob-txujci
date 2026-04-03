## ADDED Requirements

### Requirement: Language switcher changes application locale
The system SHALL allow users to change the application language by selecting an option from the language switcher dropdown menu.

#### Scenario: User clicks language option
- **WHEN** a user clicks on a language option in the language switcher
- **THEN** the application SHALL navigate to the same page in the selected language
- **AND** the URL SHALL be updated with the new locale prefix
- **AND** the page content SHALL be displayed in the selected language
- **AND** the dropdown menu SHALL close

#### Scenario: Language switching preserves current route
- **WHEN** a user switches languages while on any page (e.g., /en/about)
- **THEN** the user SHALL remain on the same page after language switch (e.g., /ja/about)
- **AND** only the locale prefix SHALL change

#### Scenario: Language switcher displays current locale
- **WHEN** the language switcher component is rendered
- **THEN** it SHALL display the current active locale
- **AND** the current locale option SHALL be visually highlighted

### Requirement: Language switcher supports all configured locales
The language switcher SHALL support all locales configured in the application routing.

#### Scenario: All locales are available
- **WHEN** the language switcher dropdown is open
- **THEN** it SHALL display options for all 8 supported locales (en, la, ja, ko, zh, th, hm, vi)
- **AND** each option SHALL display the locale's label and flag icon

#### Scenario: Switching between any locales
- **WHEN** a user switches from any locale to any other locale
- **THEN** the switch SHALL complete successfully
- **AND** the application SHALL render content in the target locale
