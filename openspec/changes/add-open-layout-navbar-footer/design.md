## Context

The current Next.js application has a locale-based layout structure at `src/app/[locale]/layout.tsx`. Well-developed Navbar and Footer components already exist but are commented out in the layout. The Navbar is a fixed-position component (height 14/3.5rem) at the top of the viewport. The application uses next-intl for internationalization with support for multiple locales.

## Goals / Non-Goals

**Goals:**
- Enable navigation across all pages by uncommenting Navbar component
- Enable footer display by uncommenting Footer component
- Ensure page content doesn't overlap with the fixed navbar
- Maintain existing internationalization functionality

**Non-Goals:**
- Modifying the Navbar or Footer component implementations
- Changing the styling or behavior of existing components
- Adding new navigation features or footer content

## Decisions

### Content Padding Approach

**Decision:** Add top padding to the main content wrapper to account for the fixed navbar height (h-14 = 3.5rem).

**Rationale:** The Navbar component uses `fixed top-0` positioning which removes it from the document flow. Without padding, page content would render underneath the navbar. Adding padding to the content wrapper is the simplest solution that doesn't require modifying the Navbar component itself.

**Alternatives considered:**
- Change Navbar from `fixed` to `sticky` positioning: This would change the scrolling behavior and might affect user experience
- Modify Navbar to be non-fixed: Would require significant component changes and lose the persistent navigation benefit
- Use margin-top on individual pages: Would require changes to every page and be harder to maintain

### Layout Structure

**Decision:** Keep components in the same order but add a wrapper div with padding around children.

**Rationale:** This maintains the existing component hierarchy and only adds the necessary spacing. The structure will be:
```
<NextIntlClientProvider>
  <Navbar />
  <div className="pt-14"> {/* Padding for fixed navbar */}
    {children}
  </div>
  <Footer />
  <ConsentBanner />
  <ScrollToTop />
</NextIntlClientProvider>
```

### Component Placement

**Decision:** Place Navbar at top and Footer after children, maintaining existing positions.

**Rationale:** This follows standard web layout patterns and matches the original uncommented structure. Navbar provides site-wide navigation, Footer provides site-wide information and links.

## Risks / Trade-offs

**Risk:** Fixed navbar may cover content on scroll-up in certain browsers
- **Mitigation:** The pt-14 padding (matching navbar h-14) ensures content starts below the navbar

**Risk:** Footer may float if content is too short
- **Mitigation:** Current Footer component uses `mt-10` for margin-top, which provides spacing. If sticky footer behavior is needed, can be added later

**Trade-off:** Fixed navbar reduces available viewport height
- **Benefit:** Persistent navigation improves user experience and is standard web practice
- **Acceptable:** 3.5rem height is reasonable and doesn't significantly impact content area

## Migration Plan

1. Uncomment `<Navbar />` component in layout
2. Uncomment `<Footer />` component in layout
3. Add padding wrapper div around `{children}` with `pt-14` class
4. Test navigation across different pages
5. Verify footer displays correctly at bottom of pages

**Rollback strategy:** Simply re-comment the Navbar and Footer components if issues arise.

## Open Questions

None - this is a straightforward change with well-defined scope and existing components.
