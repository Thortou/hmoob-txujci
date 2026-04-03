# Web Application Documentation

**Last Updated:** 2026-04-03

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture](#3-architecture)
4. [Data Entities](#4-data-entities)
5. [Feature Modules](#5-feature-modules)
6. [State Management](#6-state-management)
7. [Internationalization](#7-internationalization)
8. [Project Plan](#8-project-plan)
9. [Getting Started](#9-getting-started)

---

## 1. Project Overview

### Purpose

This is a multi-language e-commerce platform focused on Hmong traditional clothing and cultural products. The application provides a modern shopping experience combined with community features and real-time chat capabilities.

### Target Audience

- **Primary Users**: Customers interested in Hmong traditional clothing (khaub ncaws)
- **Secondary Users**: Community members engaging with topics and discussions
- **Administrators**: Content moderators and system managers

### Supported Languages

The application supports 8 languages with locale-based routing:

| Locale | Language | Code |
|--------|----------|------|
| English | English | `en` |
| Lao | Lao | `la` |
| Japanese | Japanese | `ja` |
| Korean | Korean | `ko` |
| Chinese | Chinese | `zh` |
| Thai | Thai | `th` |
| Hmong | Hmong | `hm` |
| Vietnamese | Vietnamese | `vi` |

### Key Value Propositions

- **Cultural Focus**: Specialized in Hmong traditional clothing and products
- **Multi-language Support**: Full localization for 8 Asian languages
- **Real-time Communication**: Facebook Messenger-style chat with voice messaging
- **Community Engagement**: Trending topics and user profiles
- **Modern UX**: 3D product viewing, smooth animations, responsive design

---

## 2. Technology Stack

### Core Frameworks

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router for SSR and routing |
| **React** | 19.2.3 | UI library for building user interfaces |
| **TypeScript** | ^5 | Static typing and enhanced developer experience |
| **Node.js** | (See package.json) | JavaScript runtime for server-side execution |

### UI Libraries

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | ^4 | Utility-first CSS framework for styling |
| **Ant Design** | ^6.1.4 | Enterprise UI component library |
| **Framer Motion** | ^12.29.2 | Animation library for smooth transitions |
| **Swiper** | ^12.0.3 | Modern touch slider for carousels |

### State Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **Zustand** | ^5.0.12 | Lightweight state management |
| **Zustand Middleware** | - | Devtools and persistence for state debugging |

### Internationalization

| Technology | Version | Purpose |
|------------|---------|---------|
| **next-intl** | ^4.7.0 | Internationalization for Next.js with routing |

### HTTP & Data

| Technology | Version | Purpose |
|------------|---------|---------|
| **Axios** | ^1.13.2 | HTTP client for API requests |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | ^9 | Code linting and quality |
| **TypeScript** | ^5 | Static type checking |

---

## 3. Architecture

### Project Structure

```
src/
├── app/                          # Next.js App Router structure
│   ├── [locale]/               # Internationalization routing
│   │   ├── home/               # Homepage route
│   │   ├── products/           # Product catalog route
│   │   ├── chat/               # Live chat interface
│   │   ├── community/          # Community features
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact form
│   │   ├── admin/             # Admin dashboard
│   │   ├── layout.tsx         # Locale-specific layout
│   │   └── page.tsx           # Home page
│   ├── proxy.ts               # Middleware for routing and locale handling
│   └── layout.tsx             # Root layout
├── components/                 # Reusable UI components
│   ├── Navbar.tsx             # Navigation header
│   ├── Footer.tsx             # Footer component
│   ├── BannerSlider.tsx       # Hero banner carousel
│   ├── Book3D.tsx            # 3D product viewer
│   ├── LanguageSwitcher.tsx  # Language selector
│   └── forms/                # Form components
├── features/                  # Feature-specific modules
│   └── chat/                 # Chat feature module
│       ├── components/      # Chat components
│       ├── types/           # Chat type definitions
│       └── api/             # Chat API layer
├── stores/                   # Zustand state management
│   ├── userStore.ts         # User preferences and auth
│   ├── chatStore.ts         # Chat state management
│   ├── uiStore.ts           # UI state
│   ├── createStore.ts       # Store factory with middleware
│   ├── middleware.ts        # Store middleware configuration
│   └── types.ts            # Shared store types
├── types/                    # TypeScript type definitions
│   └── chat.ts              # Chat-related types
├── i18n/                     # Internationalization config
│   └── routing.ts           # Locale-aware routing wrapper
├── lib/                      # Utility libraries
├── services/                 # Service layer
├── data/                     # Mock data and constants
└── messages/                 # Translation files (JSON)
    ├── en.json              # English translations
    ├── la.json              # Lao translations
    ├── ja.json              # Japanese translations
    ├── ko.json              # Korean translations
    ├── zh.json              # Chinese translations
    ├── th.json              # Thai translations
    ├── hm.json              # Hmong translations
    └── vi.json              # Vietnamese translations
```

### Routing Strategy

The application uses **Next.js App Router** with **locale-based routing**:

- **URL Pattern**: `/{locale}/{route}` (e.g., `/en/products`, `/ja/chat`)
- **Locale Prefix**: Always required (`localePrefix: 'always'`)
- **Middleware**: `src/app/proxy.ts` handles locale detection and redirects
- **Navigation**: Custom routing wrapper at `src/i18n/routing.ts`

### Middleware Behavior

The `proxy.ts` middleware:
1. Detects user's preferred locale from headers/cookie
2. Redirects to locale-prefixed URL if missing
3. Handles protected routes (admin)
4. Manages authentication redirects

### Module Organization

**Feature-based architecture**:
- Each major feature has its own directory under `features/`
- Features contain their own components, types, and API layer
- Shared components live in `components/`
- State is managed globally via Zustand stores

### Data Flow Patterns

1. **User Interaction** → Component event handler
2. **Component** → Calls Zustand store action
3. **Store** → Updates state and persists if needed
4. **State Change** → Components re-render via selectors
5. **API Calls** → Made from store actions or component effects

---

## 4. Data Entities

### Chat Entities

#### Participant

**Description**: Represents a user or participant in the chat system (based on Facebook Messenger API)

**Properties**:
- `id: string` - Unique participant identifier
- `name: string` - Participant's display name
- `email: string` - Participant's email address
- `avatar?: string` - Optional profile image URL
- `online?: boolean` - Online status indicator
- `lastSeen?: Date` - Last active timestamp

**Usage**: Used in chat conversations as message senders/receivers

**Type Definition**: `src/features/chat/types/index.ts`

---

#### Message

**Description**: A single message in a conversation

**Properties**:
- `id: string` - Unique message identifier
- `message: string` - Message text content
- `from: Participant` - Message sender
- `to?: { data: Participant[] }` - Message recipients (optional)
- `created_time: string` - ISO timestamp of message creation
- `attachments?: AttachmentsResponse` - File attachments (images, audio)
- `is_echo?: boolean` - Whether this is an echo (sent by current user)
- `status?: MessageStatus` - Delivery status ('sent' | 'delivered' | 'read')

**Usage**: Core data structure for chat messages displayed in ChatWindow

**Type Definition**: `src/features/chat/types/index.ts`

---

#### Attachment

**Description**: File attachment in a message (image, audio, etc.)

**Properties**:
- `id: string` - Attachment identifier
- `mime_type: string` - MIME type of the file
- `name: string` - File name
- `size: number` - File size in bytes
- `image_data?: ImageData` - Image-specific metadata
- `audio_data?: { url: string, duration?: number }` - Audio-specific metadata

**Usage**: Used for voice messages, images, and other file attachments

**Type Definition**: `src/features/chat/types/index.ts`

---

#### Conversation

**Description**: A chat conversation between participants

**Properties**:
- `id: string` - Unique conversation identifier
- `updated_time: string` - Last update timestamp
- `snippet: string` - Preview of last message
- `unread_count: number` - Number of unread messages
- `participants: { data: Participant[] }` - Conversation participants
- `messages: MessagesResponse` - Messages in this conversation
- `typing?: boolean` - Whether someone is typing
- `tags?: Tag[]` - Conversation tags ('ສົນໃຈ' | 'VIP')

**Usage**: Main entity for managing chat conversations in the sidebar

**Type Definition**: `src/features/chat/types/index.ts`

---

#### VoiceRecordingState

**Description**: State for voice message recording

**Properties**:
- `isRecording: boolean` - Whether currently recording
- `duration: number` - Recording duration in seconds
- `audioBlob: Blob | null` - Recorded audio data

**Usage**: Manages voice message recording in the chat interface

**Type Definition**: `src/features/chat/types/index.ts`

---

### Product Entities

#### Product

**Description**: A product in the catalog (Hmong traditional clothing)

**Properties** (inferred from usage):
- `id: string` - Unique product identifier
- `name: string` - Product name
- `description: string` - Product description
- `price: number` - Product price
- `images: string[]` - Product image URLs
- `category: string` - Product category

**Usage**: Displayed in product catalog and detail pages

**Location**: Mock data in `src/data/`

---

### Community Entities

#### CommunityPost

**Description**: A post in the community section

**Properties** (inferred from usage):
- `id: string` - Unique post identifier
- `title: string` - Post title
- `content: string` - Post content
- `author: Participant` - Post author
- `created_time: string` - Creation timestamp
- `comments?: Comment[]` - Post comments

**Usage**: Displayed in community feed

**Location**: Mock data in `src/data/`

---

### User Entities

#### User

**Description**: Application user (legacy type for backward compatibility)

**Properties**:
- `id: string` - Unique user identifier
- `name: string` - User's display name
- `avatar: string` - Profile image URL
- `online: boolean` - Online status
- `lastSeen?: Date` - Last active timestamp

**Usage**: Used in components for user display

**Type Definition**: `src/features/chat/types/index.ts`

---

## 5. Feature Modules

### Live Chat System

**Location**: `src/features/chat/`

**Description**: Facebook Messenger-style chat interface with real-time messaging capabilities

**Components**:
- **ChatWindow** (`src/features/chat/components/ChatWindow.tsx`): Main chat interface with message list and input
- **ChatSidebar** (`src/features/chat/components/ChatSidebar.tsx`): Conversation list with search and filters
- **MessageBubble** (`src/features/chat/components/MessageBubble.tsx`): Individual message display component

**Capabilities**:
- Send/receive text messages
- Voice message recording with audio blob handling
- Message attachments (images, files)
- Conversation tagging (VIP, 'ສົນໃຈ')
- Typing indicators
- Unread message counts
- Message search and filtering
- Online/offline status
- Message status tracking (sent, delivered, read)

**API Layer**: `src/features/chat/api/index.ts`

---

### Product Catalog

**Location**: `src/app/[locale]/products/`

**Description**: E-commerce catalog for Hmong traditional clothing

**Components**:
- Product cards with hover effects
- Image galleries with Next.js Image optimization
- 3D product viewer (Book3D component)
- Product detail pages

**Capabilities**:
- Browse products by category
- View product details and images
- 3D product visualization
- SEO-optimized with structured data
- Responsive design for mobile

---

### Community Platform

**Location**: `src/app/[locale]/community/`

**Description**: Community features for user engagement

**Features**:
- Trending topics feed
- User profiles
- Post creation and commenting
- Search functionality

---

### Admin Dashboard

**Location**: `src/app/[locale]/admin/`

**Description**: Administrative interface for content and user management

**Features**:
- User management
- Product management
- Analytics dashboard
- Protected routes (admin-only access)

---

### Authentication & Authorization

**Description**: User authentication and role-based access control

**Implementation**:
- User preferences stored in `userStore`
- Role-based rendering in components
- Protected admin routes via middleware
- Locale preference persistence

**User Roles**:
- **Admin**: Full access to admin dashboard
- **User**: Standard customer access

---

## 6. State Management

### Store Architecture

The application uses **Zustand** for state management with a custom store factory pattern.

**Store Factory**: `src/stores/createStore.ts`
- Wraps stores with devtools middleware
- Configures persistence middleware selectively
- Provides consistent store creation pattern

### Store Definitions

#### userStore

**Location**: `src/stores/userStore.ts`

**Purpose**: Manages user preferences and authentication state

**State**:
- `locale: string` - Current language preference
- `user: User | null` - Current user
- `isAuthenticated: boolean` - Authentication status

**Actions**:
- `setLocale(locale: string)` - Change application language
- `setUser(user: User | null)` - Update current user
- `logout()` - Clear user session

**Persistence**: Locale preference persisted to localStorage

---

#### chatStore

**Location**: `src/stores/chatStore.ts`

**Purpose**: Manages all chat-related state

**State**:
- `conversations: Conversation[]` - All conversations
- `activeConversationId: string | null` - Currently open conversation
- `messages: Record<string, Message[]>` - Messages per conversation
- `typingIndicators: Record<string, boolean>` - Typing status per conversation
- `voiceRecording: VoiceRecordingState` - Voice recording state
- `filters: ChatFilters` - Chat filters (unread, tags, search)
- `loadingMessages: boolean` - Loading state
- `loadingConversations: boolean` - Loading state
- `sendingMessage: boolean` - Sending state
- `error: string | null` - Error message

**Actions**:
- `setConversations(conversations: Conversation[])` - Load conversations
- `setActiveConversation(id: string | null)` - Switch conversation
- `addMessage(conversationId: string, message: Message)` - Add new message
- `setTyping(conversationId: string, isTyping: boolean)` - Update typing indicator
- `startRecording()` / `stopRecording()` - Voice recording controls
- `setFilters(filters: Partial<ChatFilters>)` - Update filters

**Persistence**: No sensitive data persisted (messages only in memory)

---

#### uiStore

**Location**: `src/stores/uiStore.ts`

**Purpose**: Manages global UI state

**State**:
- `theme: 'light' | 'dark'` - Current theme
- `sidebarOpen: boolean` - Mobile sidebar state
- `loading: boolean` - Global loading indicator

**Actions**:
- `setTheme(theme: 'light' | 'dark')` - Change theme
- `toggleSidebar()` - Toggle mobile sidebar
- `setLoading(loading: boolean)` - Set loading state

**Persistence**: Theme preference persisted

---

### Middleware Configuration

**Location**: `src/stores/middleware.ts`

**DevTools Middleware**:
- Enabled for all stores in development
- Provides Redux DevTools integration
- Time-travel debugging support

**Persist Middleware**:
- Configured per-store to avoid persisting sensitive data
- Used for: user preferences (locale, theme)
- NOT used for: chat messages, auth tokens

---

### Data Flow Patterns

**Component → Store Flow**:
```typescript
// Component reads state
const { conversations, activeConversationId } = useChatStore();

// Component calls action
const setActiveConversation = useChatStore(s => s.setActiveConversation);
setActiveConversation(conversationId);
```

**Store → Component Flow**:
- Components use Zustand selectors to subscribe to state
- Re-renders automatically on state change
- Can subscribe to specific slices for optimization

---

## 7. Internationalization

### Supported Locales

All locales use the format `{locale}` with full translations:

| Code | Language | Translation File |
|------|----------|------------------|
| `en` | English | `src/messages/en.json` |
| `la` | Lao | `src/messages/la.json` |
| `ja` | Japanese | `src/messages/ja.json` |
| `ko` | Korean | `src/messages/ko.json` |
| `zh` | Chinese | `src/messages/zh.json` |
| `th` | Thai | `src/messages/th.json` |
| `hm` | Hmong | `src/messages/hm.json` |
| `vi` | Vietnamese | `src/messages/vi.json` |

### Translation Structure

Translation files are organized by feature:
```json
{
  "nav": {
    "home": "Home",
    "products": "Products",
    "chat": "Chat",
    "community": "Community"
  },
  "products": {
    "title": "Our Products",
    "price": "Price"
  },
  "chat": {
    "send": "Send",
    "typeMessage": "Type a message..."
  }
}
```

### Locale Detection

1. **Cookie**: Check for `NEXT_LOCALE` cookie
2. **Header**: Parse `Accept-Language` header
3. **Default**: Fallback to `en`

### Locale Routing

**Configuration**: `localePrefix: 'always'`

**Examples**:
- English home: `/en/home`
- Japanese products: `/ja/products`
- Lao chat: `/la/chat`

**Routing Wrapper**: `src/i18n/routing.ts`
- Wraps Next.js `useRouter` and `usePathname`
- Provides locale-aware navigation
- Handles locale transitions

### Language Switcher

**Component**: `src/components/LanguageSwitcher.tsx`

**Features**:
- Dropdown menu with all 8 languages
- Displays current locale
- Flags and labels for each language
- Preserves current route when switching

**Usage**:
```tsx
<LanguageSwitcher />
```

---

## 8. Project Plan

### Implemented Features ✓

| Feature | Status | Notes |
|---------|--------|-------|
| Multi-language Support | ✓ Complete | 8 languages with full translations |
| Live Chat System | ✓ Complete | Text, voice, attachments, tags |
| Product Catalog | ✓ Complete | Browse, view details, 3D viewer |
| Community Platform | ✓ Complete | Topics, profiles, search |
| Admin Dashboard | ✓ Complete | User/product management |
| Responsive Design | ✓ Complete | Mobile-first approach |
| SEO Optimization | ✓ Complete | Structured data, meta tags |

### Planned Features

| Feature | Priority | Status |
|---------|----------|--------|
| Payment Integration | High | Not Started |
| User Reviews | Medium | Not Started |
| Shopping Cart | High | Not Started |
| Order Management | High | Not Started |
| Real-time Notifications | Medium | Not Started |
| Advanced Search | Low | Not Started |

### Known Technical Debt

1. **Mock Data**: Products and community data currently use mocks
2. **No Backend**: Chat endpoints need real implementation
3. **Error Handling**: Limited error boundary implementation
4. **Testing**: No automated tests
5. **API Layer**: Incomplete API abstraction

### Future Considerations

- Migrate to real backend (Node.js/Express or Next.js API routes)
- Implement WebSocket for real-time chat
- Add Redis for session management
- Consider microservices for scalability
- Implement CI/CD pipeline
- Add monitoring and analytics

---

## 9. Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher (comes with Node.js)
- **Git**: For version control

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd my-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (if needed):
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

### Development

**Start the development server**:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

**Available locales**:
- http://localhost:3000/en/home
- http://localhost:3000/la/home
- http://localhost:3000/ja/home
- etc.

### Build

**Create a production build**:
```bash
npm run build
```

**Start production server**:
```bash
npm start
```

### Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** and test locally

3. **Lint code**:
   ```bash
   npm run lint
   ```

4. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: description of changes"
   ```

5. **Push and create pull request**

### Project Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Key Files to Know

| File | Purpose |
|------|---------|
| `src/app/proxy.ts` | Middleware for routing and locale |
| `src/stores/` | State management |
| `src/i18n/routing.ts` | Locale-aware routing |
| `src/messages/` | Translation files |
| `next.config.js` | Next.js configuration |

---

## Appendix

### Type Definitions Reference

- **Chat Types**: `src/features/chat/types/index.ts`
- **Legacy Chat Types**: `src/types/chat.ts`
- **Store Types**: `src/stores/types.ts`

### Component Reference

- **Shared Components**: `src/components/`
- **Chat Components**: `src/features/chat/components/`
- **Page Components**: `src/app/[locale]/*/page.tsx`

### API Layer

- **Chat API**: `src/features/chat/api/index.ts`
- **Services**: `src/services/`

---

**Document Version**: 1.0
**Maintained By**: Development Team
**Questions?**: Contact the development team or open an issue in the repository.
