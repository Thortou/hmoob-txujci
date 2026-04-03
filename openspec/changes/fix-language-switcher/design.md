## Context

The application uses next-intl for internationalization with 8 supported locales. The LanguageSwitcher component is imported from the custom i18n routing module (`@/src/i18n/routing`) which wraps Next.js navigation APIs to handle locale-aware routing.

Current implementation analysis:
- LanguageSwitcher uses `useRouter` and `usePathname` from the custom routing module
- The `switchLocale` function calls `router.replace(pathname, { locale: newLocale })`
- The routing is configured with `localePrefix: 'always'` meaning all URLs must include a locale prefix
- Middleware at `src/app/proxy.ts` handles locale redirects

The issue is likely that the router.replace call is not properly triggering the locale change, possibly due to:
1. Incorrect usage of the router API
2. Pathname not being in the correct format for locale-aware navigation
3. Missing or incorrect configuration in the routing setup

## Goals / Non-Goals

**Goals:**
- Fix the language switcher to successfully change the application locale
- Ensure navigation preserves the current route (e.g., `/en/about` → `/ja/about`)
- Maintain the dropdown UI and user experience
- Support all 8 locales: en, la, ja, ko, zh, th, hm, vi
- Properly close the dropdown after language selection

**Non-Goals:**
- Changing the UI design of the language switcher
- Adding new languages
- Modifying the i18n routing configuration
- Changing the middleware behavior

## Decisions

### Root Cause Analysis

**Issue**: The current code uses `router.replace(pathname, { locale: newLocale })` but `pathname` from `usePathname()` already includes the locale prefix. This can cause conflicts.

**Current problematic flow:**
1. User is on `/en/home`
2. `pathname` returns `/en/home`
3. User clicks to switch to Japanese
4. `router.replace('/en/home', { locale: 'ja' })` is called
5. This may not work correctly because the pathname already has a locale

### Solution Approach

**Decision:** Use `router.replace()` with just the pathname without locale, or use the Link component's locale parameter pattern.

**Implementation options:**

**Option 1: Strip locale from pathname before replacing**
```typescript
const switchLocale = (newLocale: string) => {
  // Get pathname without locale prefix
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
  router.replace(pathnameWithoutLocale, { locale: newLocale });
  setIsOpen(false);
};
```

**Option 2: Use router.push with explicit locale**
```typescript
const switchLocale = (newLocale: string) => {
  router.push(pathname, { locale: newLocale });
  setIsOpen(false);
};
```

**Option 3: Navigate to root and rebuild path**
```typescript
import { Link } from '@/src/i18n/routing';

// In the JSX, use Link components instead of buttons
<Link href={pathname} locale={loc.code}>
```

**Chosen approach:** Option 1 - Strip the locale prefix from pathname before replacing. This is the most direct fix that maintains the current structure.

**Rationale:**
- Minimal code change
- Follows next-intl's expected pattern for locale switching
- Preserves the current route
- Works with the existing router setup

### Dropdown Position Fix

**Issue:** The dropdown menu may have z-index or positioning issues when used inside the navbar.

**Decision:** Ensure `z-50` is applied to the dropdown container and verify it appears above other navbar elements.

## Risks / Trade-offs

**Risk:** Stripping locale from pathname might break on root path
- **Mitigation**: Handle edge case where pathname is `/` or `/${locale}`
- **Implementation**: Check if pathname starts with `/${locale}` before stripping

**Risk:** Router may not trigger re-render of components
- **Mitigation**: The NextIntlClientProvider should pick up locale changes and trigger re-renders

**Trade-off:** Using router.replace vs router.push
- **replace**: Doesn't add to browser history (preferred for language switching)
- **push**: Adds to history (allows back button to go back to previous language)
- **Decision**: Keep using `replace` as it's more appropriate for this use case

## Migration Plan

1. Update the `switchLocale` function in LanguageSwitcher component
2. Add logic to strip locale prefix from pathname
3. Test language switching from each locale to all other locales
4. Verify on different pages (home, about, products, etc.)
5. Test on mobile and desktop
6. Verify the dropdown closes after selection

**Rollback strategy:** Revert to the original implementation if issues arise.

## Open Questions

None - the fix is straightforward based on next-intl documentation and common patterns.
