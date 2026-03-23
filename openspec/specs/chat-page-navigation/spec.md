## ADDED Requirements

### Requirement: Chat page excludes navigation elements
The system SHALL NOT display the navbar, footer, consent banner, or scroll-to-top components when the user is on the chat page.

#### Scenario: User navigates to chat page
- **WHEN** a user navigates to the `/chat` route
- **THEN** the navbar SHALL NOT be visible
- **AND** the footer SHALL NOT be visible
- **AND** the consent banner SHALL NOT be visible
- **AND** the scroll-to-top button SHALL NOT be visible
- **AND** the page SHALL render without the top padding normally reserved for the navbar

### Requirement: Chat page provides back navigation
The system SHALL display a "Back to Website" button in the chat interface that allows users to return to the main website.

#### Scenario: User clicks back to website button
- **WHEN** a user is on the chat page
- **THEN** a "Back to Website" button SHALL be visible in the chat sidebar
- **AND** when clicked, the user SHALL be navigated to the home page ("/")
- **AND** the link SHALL maintain the user's current locale

### Requirement: Chat page maintains full-screen layout
The chat page SHALL utilize the full viewport height without layout interruptions from parent layout components.

#### Scenario: Chat page renders at full screen
- **WHEN** the chat page loads
- **THEN** the chat interface SHALL occupy the full viewport height
- **AND** no spacing SHALL be reserved for hidden navigation elements
- **AND** the chat sidebar and window SHALL render at their intended sizes
