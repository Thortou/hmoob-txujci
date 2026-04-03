## 1. Language Switcher Fix

- [x] 1.1 Update the `switchLocale` function to strip locale prefix from pathname before calling router.replace
- [x] 1.2 Add edge case handling for root path (/) and locale-only paths (e.g., /en)
- [x] 1.3 Ensure setIsOpen(false) is called to close dropdown after selection
- [x] 1.4 Verify z-index styling on dropdown menu for proper layering

## 2. Testing and Verification

- [ ] 2.1 Test language switching from English to each other locale (la, ja, ko, zh, th, hm, vi)
- [ ] 2.2 Test language switching from each non-English locale to English
- [ ] 2.3 Test language switching between non-English locales (e.g., ja → ko)
- [ ] 2.4 Verify URL updates correctly with new locale prefix on each switch
- [ ] 2.5 Test on multiple pages: home, about, products, contact, community
- [ ] 2.6 Verify dropdown closes after language selection
- [ ] 2.7 Test on desktop and mobile viewports
- [ ] 2.8 Verify page content displays in selected language
- [ ] 2.9 Check for console errors during language switching
- [ ] 2.10 Verify the current locale is highlighted in the dropdown
