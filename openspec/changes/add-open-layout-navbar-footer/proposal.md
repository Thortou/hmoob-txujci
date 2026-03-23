## Why

The layout currently has the Navbar and Footer components commented out, preventing site navigation and footer information from being displayed. This creates a poor user experience as visitors cannot navigate between pages or access important site information.

## What Changes

- Uncomment and enable the `<Navbar />` component in the locale layout
- Uncomment and enable the `<Footer />` component in the locale layout
- Add appropriate spacing/padding to account for the fixed navbar
- Ensure proper layout structure for all pages

## Capabilities

### New Capabilities

- `layout-navigation`: Enable site-wide navigation and footer components to provide consistent navigation and branding across all pages

### Modified Capabilities

No existing capabilities are being modified.

## Impact

- **Affected code**: `src/app/[locale]/layout.tsx` - the main locale layout file
- **Components**: Navbar and Footer components (already exist, just need to be uncommented)
- **User experience**: All pages will now have navigation and footer visible
- **Layout consideration**: Fixed navbar at top may require content padding to prevent overlap
