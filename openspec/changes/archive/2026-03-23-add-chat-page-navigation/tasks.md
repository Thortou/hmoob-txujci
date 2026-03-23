## 1. Translation Updates

- [x] 1.1 Add "chat" key to `messages/en/nav.json` with value "Chat"
- [x] 1.2 Add "chat" key to `messages/vi/nav.json` with value "Trò chuyện"
- [x] 1.3 Add "chat" key to `messages/hm/nav.json` with appropriate Hmong translation
- [x] 1.4 Add "chat" key to `messages/ja/nav.json` with appropriate Japanese translation
- [x] 1.5 Add "chat" key to `messages/ko/nav.json` with appropriate Korean translation
- [x] 1.6 Add "chat" key to `messages/la/nav.json` with appropriate Lao translation
- [x] 1.7 Add "chat" key to `messages/th/nav.json` with appropriate Thai translation
- [x] 1.8 Add "chat" key to `messages/zh/nav.json` with appropriate Chinese translation

## 2. Navbar Modifications

- [x] 2.1 Add "Chat" NavLink component to desktop menu in Navbar.tsx (after Community, before LanguageSwitcher)
- [x] 2.2 Add "Chat" NavLink component to mobile menu in Navbar.tsx (after Community, before LanguageSwitcher)
- [x] 2.3 Verify mobile menu closes when Chat link is clicked

## 3. Layout Conditional Rendering

- [x] 3.1 Create a client wrapper component or use headers to detect chat route in locale layout
- [x] 3.2 Add conditional rendering to exclude Navbar component on chat page
- [x] 3.3 Add conditional rendering to exclude Footer component on chat page
- [x] 3.4 Add conditional rendering to exclude ConsentBanner component on chat page
- [x] 3.5 Add conditional rendering to exclude ScrollToTop component on chat page
- [x] 3.6 Remove pt-14 padding wrapper on chat page (conditionally apply)

## 4. Chat Page Navigation

- [x] 4.1 Add "Back to Website" button to ChatSidebar component
- [x] 4.2 Style the back button with appropriate icon and hover effects
- [x] 4.3 Ensure the back button links to home page ("/") with locale preservation

## 5. Testing and Verification

- [ ] 5.1 Navigate to chat page and verify navbar/footer are hidden
- [ ] 5.2 Verify chat page uses full viewport height without padding
- [ ] 5.3 Click "Back to Website" button and verify navigation to home page
- [ ] 5.4 Click "Chat" link in navbar from home page and verify navigation to chat
- [ ] 5.5 Test navigation flow: home → chat → home in multiple locales
- [ ] 5.6 Verify "Chat" link is highlighted when on chat page
- [ ] 5.7 Test mobile menu: open menu, click Chat, verify menu closes and navigates
- [ ] 5.8 Test responsive behavior on desktop and mobile screen sizes
- [ ] 5.9 Verify translations display correctly across all supported locales
- [ ] 5.10 Check for console errors or hydration warnings related to conditional rendering
