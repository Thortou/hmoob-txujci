## Context

The application currently has a chat page at `/chat` that uses the same locale layout as all other pages, which includes the navbar and footer components. The chat page is designed as a full-screen application (`h-screen`) with its own internal navigation (sidebar and chat window). The navbar uses next-intl translations for all menu items.

Current locale layout structure:
- Navbar (fixed at top)
- Content wrapper with pt-14 padding
- Footer
- ConsentBanner
- ScrollToTop

## Goals / Non-Goals

**Goals:**
- Exclude navbar and footer from the chat page to provide a focused full-screen experience
- Add navigation back to the main website from the chat page
- Add a "Chat" link in the main navbar to access the chat feature
- Support internationalization for the new Chat menu item across all locales

**Non-Goals:**
- Modifying the chat page internal layout or functionality
- Changing the navbar/footer behavior for other pages
- Creating separate layout components (using conditional rendering instead)

## Decisions

### Conditional Rendering Approach

**Decision:** Use `usePathname()` hook in the locale layout to conditionally render navbar and footer based on the current route.

**Rationale:**
- Chat page is at `/chat` route, can detect this in the parent layout
- Simpler than creating a separate layout file for chat
- Maintains single source of truth for layout structure
- Easy to add more routes in the future that need special treatment

**Implementation:**
```typescript
import { usePathname } from 'next/navigation';

// In layout component
const pathname = usePathname();
const isChatPage = pathname?.includes('/chat');

{!isChatPage && <Navbar />}
<div className={isChatPage ? '' : 'pt-14'}>
  {children}
</div>
{!isChatPage && <Footer />}
{!isChatPage && <ConsentBanner />}
{!isChatPage && <ScrollToTop />}
```

**Note:** Since the layout is a Server Component, we'll need to check the route from the `children` prop or use a client component wrapper. Alternatively, check the route segment in params.

### Alternative: Route-Based Layout

**Decision rejected:** Create a separate layout at `src/app/[locale]/chat/layout.tsx`

**Reason:** While this is the Next.js recommended approach for route-specific layouts, the current change can be accomplished more simply with conditional rendering in the parent layout since we're just hiding components, not restructuring the entire layout for the chat section.

### Chat Page Back Button

**Decision:** Add a "Back to Website" button in the ChatSidebar component, positioned at the top.

**Rationale:**
- ChatSidebar already exists and is the natural place for chat-related navigation
- Placing it at the top ensures visibility when chat page loads
- Uses existing Link component from i18n routing for locale-aware navigation

**Implementation:**
```tsx
<Link href="/" className="flex items-center gap-2 px-4 py-3 hover:bg-sky-100">
  <ArrowLeftIcon />
  <span>Back to Website</span>
</Link>
```

### Navbar Chat Link Position

**Decision:** Add "Chat" menu item after "Community" and before Language Switcher in both desktop and mobile menus.

**Rationale:**
- Maintains logical flow: Home → About → Products → Contact → Community → **Chat**
- Consistent placement in both desktop and mobile views
- Before Language Switcher so it's grouped with other navigation links

### Translation Strategy

**Decision:** Add "chat" key to all locale nav.json files with appropriate translations.

**Translations to add:**
- Vietnamese (`messages/vi/nav.json`): "chat": "Trò chuyện"
- English (if exists): "chat": "Chat"
- Any other locales in the messages directory

**Rationale:**
- Maintains existing i18n pattern
- Uses next-intl's `useTranslations('nav')` hook already in Navbar
- Easy to extend to additional locales

## Risks / Trade-offs

**Risk:** Conditional rendering in layout based on pathname may cause hydration mismatch if not careful
- **Mitigation:** Use server-side route detection from params or create a client wrapper component for conditional rendering

**Risk:** Chat page without footer may miss important links (privacy, terms, etc.)
- **Mitigation:** Evaluate if critical links need to be added to chat page separately. For now, "Back to Website" provides access to full site with footer.

**Trade-off:** Full-screen chat experience removes easy access to other site sections
- **Benefit:** Focused chat experience is better for user engagement in chat functionality
- **Acceptable:** "Back to Website" button provides exit when needed

**Risk:** Adding new menu item may crowd navbar on smaller screens
- **Mitigation:** Current responsive design already collapses to hamburger menu on mobile. Adding one more item is acceptable.

## Migration Plan

1. Update all locale nav.json files to add "chat" translation key
2. Modify Navbar component to include Chat link in desktop and mobile menus
3. Update locale layout to conditionally exclude navbar/footer for chat route
4. Add "Back to Website" button to ChatSidebar component
5. Test navigation flow: main site → chat → back to main site
6. Verify translations work across all supported locales
7. Test responsive behavior on mobile and desktop

**Rollback strategy:**
- Remove conditional rendering logic from layout (restore navbar/footer for all routes)
- Remove Chat link from Navbar component
- Remove "Back to Website" button from ChatSidebar
- Remove added translation keys from nav.json files

## Open Questions

None - the approach is straightforward and follows existing patterns in the codebase.
