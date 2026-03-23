## Context

**Current State:**
The application uses React 19 with Next.js App Router and has a flat component structure in `/src/components` with mixed feature-specific and shared components. State management is primarily handled through React `useState` hooks scattered throughout components, with some `localStorage` usage for persistence. API calls are made directly using Axios within components without a centralized layer.

**Problems Identified:**
- **Prop Drilling**: Chat components pass message/conversation state through multiple component layers
- **Duplicated Logic**: Similar state management patterns repeated across features
- **Type Fragmentation**: Types defined in multiple locations (`/src/types/chat.ts`, within components)
- **API Inconsistency**: Error handling and request configuration duplicated in each component
- **Scalability Issues**: Adding new features requires understanding the entire component tree

**Constraints:**
- Must maintain existing functionality (no breaking changes to end users)
- Must support Next.js Server Components and App Router patterns
- Must preserve existing internationalization (8 languages)
- Must work with existing Ant Design and Framer Motion integrations

## Goals / Non-Goals

**Goals:**
- Establish a centralized state management system using Zustand with full TypeScript support
- Reorganize codebase into feature-based modules with clear boundaries
- Create a standardized API layer with consistent error handling
- Improve developer experience with better code organization and type safety
- Enable easier testing through isolated stores and modules
- Reduce component complexity through reduced prop drilling

**Non-Goals:**
- Complete rewrite of the application (incremental migration)
- Changing the UI library (keep Ant Design)
- Modifying the internationalization system (preserve next-intl setup)
- Performance optimization beyond state management improvements
- Adding new features to the chat system or other features

## Decisions

### 1. State Management Library: Zustand over Redux

**Decision**: Use Zustand as the state management solution.

**Rationale:**
- **Lightweight**: Minimal boilerplate compared to Redux (no actions, reducers, or dispatch)
- **TypeScript-first**: Built-in TypeScript support without additional packages
- **React Hooks Integration**: Natural fit with React 19's hooks model
- **Performance**: Fine-grained reactivity without re-rendering entire state tree
- **Learning Curve**: Simpler API, faster onboarding for team members
- **Bundle Size**: ~1KB minified vs Redux's ~3KB + additional packages

**Alternatives Considered:**
- **Redux Toolkit**: More boilerplate, overkill for current application size
- **Jotai**: Atomic state model, but team prefers centralized domain stores
- **Recoil**: Facebook-maintained but larger bundle size and more complex API
- **Context API**: Not suitable for frequent updates and complex state

### 2. Feature-Based Architecture over Technical Role Structure

**Decision**: Organize code by feature/domain rather than technical role (components, hooks, utils).

**Rationale:**
- **Colocation**: Related code (components, hooks, types) lives together
- **Encapsulation**: Features are self-contained with clear public APIs
- **Onboarding**: Easier for developers to find feature-related code
- **Delete Feature**: Can delete entire feature folder without hunting dependencies
- **Independent Development**: Teams can work on different features without conflicts

**Alternatives Considered:**
- **Technical Role Structure** (`/components`, `/hooks`, `/utils`): Current approach, leads to scattered code
- **Hybrid Approach**: Keep shared components separate, feature-specific code co-located → This is the final decision (see below)

**Final Decision: Hybrid Approach**
- `/src/features/<feature>/`: Feature-specific code with components/, hooks/, types/, api/
- `/src/components/shared/`: Reusable UI components (Button, Input, Modal)
- `/src/utils/shared/`: Cross-feature utilities
- `/src/types/shared/`: Global types used across features

### 3. API Layer Architecture

**Decision**: Centralized Axios instance with domain-specific API modules.

**Rationale:**
- **Single Point of Configuration**: Base URL, headers, interceptors configured once
- **Type Safety**: Generic types for request/response per endpoint
- **Consistency**: All requests use the same error handling, retry logic, logging
- **Testability**: Can mock API client for unit tests
- **Maintainability**: API changes in one place propagate to all calls

**Architecture:**
```
/src/lib/api/client.ts       // Axios instance with interceptors
/src/features/chat/api/      // Chat API functions (use client)
/src/features/products/api/  // Products API functions (use client)
```

### 4. Store Organization by Domain

**Decision**: Create separate Zustand stores for each domain (chat, products, users, ui).

**Rationale:**
- **Separation of Concerns**: Each store manages related state
- **Performance**: Components only subscribe to relevant state slices
- **Testing**: Can test stores in isolation
- **Scalability**: Easy to add new stores for new features

**Store Structure:**
```
/src/stores/chatStore.ts      // Messages, conversations, typing indicators
/src/stores/productStore.ts   // Product list, current product, filters
/src/stores/userStore.ts      // User profile, preferences, auth
/src/stores/uiStore.ts        // Theme, sidebar state, modals
```

### 5. Persistence Strategy

**Decision**: Use Zustand's persist middleware for specific state slices only.

**What to Persist:**
- User preferences (language, theme)
- Active conversation ID (for chat)
- UI state (sidebar collapsed/expanded)

**What NOT to Persist:**
- Chat messages (fetch fresh each session)
- Form inputs (clear on navigation)
- Temporary UI state (modals, dropdowns)

**Rationale:**
- Avoid stale data: Messages change frequently, always fetch fresh
- Reduce localStorage size: Only persist critical user preferences
- Privacy: Don't store sensitive conversation data in browser storage

### 6. TypeScript Path Aliases

**Decision**: Use `@/` alias for absolute imports with path mapping in tsconfig.json.

**Rationale:**
- **Readability**: `@/features/chat/components/ChatPanel` vs `../../../ChatPanel`
- **Refactoring**: Move folders without breaking imports
- **IDE Support**: Better autocomplete and jump-to-definition
- **Standard Practice**: Common in Next.js projects

## Risks / Trade-offs

### Risk 1: Incremental Migration Complexity
**Risk**: Refactoring while maintaining functionality could introduce bugs during transition period.
**Mitigation**:
- Migrate one feature at a time (chat first, then products, then users)
- Keep old components working alongside new stores during migration
- Run comprehensive tests after each feature migration
- Use feature flags to toggle between old and new implementations

### Risk 2: Performance Regression
**Risk**: Centralized state management could cause unnecessary re-renders if not implemented carefully.
**Mitigation**:
- Use Zustand's selector API to subscribe only to needed state slices
- Implement shallow comparison for objects/arrays to prevent re-renders
- Use React.memo for components that shouldn't re-render
- Profile with React DevTools to identify performance issues

### Risk 3: Learning Curve for Team
**Risk**: Team members unfamiliar with Zustand and feature-based architecture may slow down initially.
**Mitigation**:
- Create comprehensive documentation with examples
- Pair programming during initial migration
- Code review checklist for new patterns
- Reference documentation in code comments

### Risk 4: Bundle Size Increase
**Risk**: Adding Zustand and additional abstractions may increase bundle size.
**Mitigation**:
- Zustand is only ~1KB minified (minimal impact)
- Code splitting with Next.js dynamic imports
- Tree-shaking ensures unused code is removed
- Bundle budget monitoring in CI/CD

### Risk 5: Breaking Existing Features
**Risk**: Refactoring could break internationalization, routing, or third-party integrations.
**Mitigation**:
- Comprehensive test suite before migration
- End-to-end tests for critical user flows
- Manual testing checklist for all features
- Rollback plan with feature flags

### Trade-off: Initial Development Time vs Long-term Maintainability
**Trade-off**: The refactor will take significant upfront effort but will reduce development time for future features.
**Decision**: Proceed with refactor because the current architecture is already slowing down feature development and will become a bottleneck.

## Migration Plan

### Phase 1: Foundation (Week 1)
1. Install dependencies (zustand, zustand-middleware-persist)
2. Create `/src/lib/api/client.ts` with Axios configuration
3. Create `/src/stores/` directory structure
4. Update tsconfig.json with path aliases (`@/*`)
5. Create `/src/components/shared/` and move reusable components

### Phase 2: Chat Feature Migration (Week 2)
1. Create `/src/features/chat/` directory structure
2. Create `chatStore.ts` with all chat state
3. Move chat components to `/src/features/chat/components/`
4. Create chat API module at `/src/features/chat/api/`
5. Update chat components to use `useChatStore` instead of props
6. Test all chat functionality (messages, voice, typing, conversations)
7. Remove old component-level state from chat components

### Phase 3: Products Feature Migration (Week 3)
1. Create `/src/features/products/` directory structure
2. Create `productStore.ts` with products state
3. Move product components to `/src/features/products/components/`
4. Create products API module
5. Update components to use `useProductStore`
6. Test product listing, detail pages, and admin product management

### Phase 4: User & Admin Migration (Week 4)
1. Create `/src/features/admin/` directory structure
2. Create `userStore.ts` with user preferences and auth state
3. Create `uiStore.ts` with UI state (theme, sidebar, modals)
4. Move admin components to `/src/features/admin/`
5. Update admin pages to use stores
6. Test all admin functionality

### Phase 5: Cleanup & Optimization (Week 5)
1. Remove old `/src/components` folder (except shared)
2. Update all import statements to use path aliases
3. Add DevTools middleware to all stores
4. Implement persist middleware for appropriate state
5. Performance profiling and optimization
6. Update documentation with new architecture

### Rollback Strategy
- Feature flags in environment variables to toggle between old and new implementations
- Git branches for each phase to allow selective rollback
- Keep old components in `/src/components/legacy/` during migration period
- Automated tests to verify functionality after each phase

## Open Questions

1. **Should we implement optimistic updates for chat messages?**
   - **Decision**: Yes, but implement after initial migration to reduce complexity
   - **Timeline**: Phase 6 (Post-migration enhancement)

2. **Should we add request deduplication to the API layer?**
   - **Decision**: Add if performance profiling shows duplicate requests
   - **Timeline**: Evaluate in Phase 5 (Cleanup & Optimization)

3. **Should we use React Query or SWR for server state management?**
   - **Decision**: Start with Zustand, evaluate React Query in Phase 5
   - **Rationale**: React Query adds complexity, may not be needed for current scale

4. **Should we implement real-time updates for chat (WebSocket)?**
   - **Decision**: Out of scope for this refactor, create separate proposal
   - **Rationale**: Current implementation uses polling, WebSocket is significant change

5. **How should we handle offline support?**
   - **Decision**: Out of scope for initial refactor
   - **Timeline**: Phase 7 (Future enhancement)
