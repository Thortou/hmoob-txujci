## Why

The language switcher component is not functioning properly, preventing users from changing the application language. This breaks internationalization (i18n) functionality and creates a poor user experience for non-English speakers.

## What Changes

- Fix the LanguageSwitcher component to properly switch locales using next-intl's routing API
- Ensure the router.replace method correctly updates the locale in the URL
- Verify that clicking a language option navigates to the same page in the selected language
- Add proper error handling and state management
- Test language switching across all supported locales (en, la, ja, ko, zh, th, hm, vi)

## Capabilities

### New Capabilities

- `language-switching`: Functional language switcher that allows users to change application locale

### Modified Capabilities

No existing capabilities are being modified.

## Impact

- **Affected code**: `src/components/LanguageSwitcher.tsx` - fix locale switching logic
- **User experience**: Users will be able to switch between 8 supported languages
- **i18n integration**: Proper integration with next-intl's routing system
- **Navigation**: Language changes should preserve the current route and only change the locale prefix
