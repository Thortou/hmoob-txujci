## Why

The chat page requires a focused, full-screen experience without navigation distractions. Users need a way to return to the main website from the chat interface, and the main site needs a clear entry point to access the chat feature. This creates a seamless dual-experience flow between the main website and the chat application.

## What Changes

- Exclude navbar and footer from the chat page by conditionally rendering layout components
- Add a "Back to Website" button/link in the chat page for navigation back to main site
- Add "Chat" menu item to the main navbar in both desktop and mobile views
- Add translation keys for the new "Chat" menu item across all locales
- Ensure proper routing between main site and chat page

## Capabilities

### New Capabilities

- `chat-page-navigation`: Isolated chat page experience with dedicated navigation to/from main website
- `navbar-chat-link': Chat menu item in main navigation for accessing chat feature

### Modified Capabilities

No existing capabilities are being modified.

## Impact

- **Affected code**:
  - `src/app/[locale]/layout.tsx` - conditionally render navbar/footer based on route
  - `src/app/[locale]/chat/page.tsx` - add "Back to Website" button
  - `src/components/Navbar.tsx` - add Chat menu item
  - Translation files (`messages/*/nav.json`) - add "chat" key for all locales
- **User experience**: Chat page becomes a focused full-screen app with simple navigation back to main site
- **Navigation**: Users can easily access chat from any page via navbar, and return to main site from chat
