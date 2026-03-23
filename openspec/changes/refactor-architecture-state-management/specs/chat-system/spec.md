## MODIFIED Requirements

### Requirement: Chat state management
The system SHALL manage all chat-related state using a centralized Zustand store instead of component-level React state.

#### Scenario: Centralized messages state
- **WHEN** chat messages are loaded or updated
- **THEN** the chat store manages all message state
- **AND** components access messages via useChatStore((state) => state.messages)
- **AND** message updates propagate to all subscribed components
- **AND** no prop drilling is required for message data

#### Scenario: Conversation list management
- **WHEN** the conversation list changes
- **THEN** the chat store manages the conversations array
- **AND** components access conversations via useChatStore((state) => state.conversations)
- **AND** conversation selection is managed in the store
- **AND** active conversation state is centralized

#### Scenario: Typing indicators
- **WHEN** typing indicators change
- **THEN** the chat store manages typing state per conversation
- **AND** components access typing status via useChatStore((state) => state.typingIndicators)
- **AND** typing indicators are automatically cleared after a timeout

#### Scenario: Voice message recording state
- **WHEN** a user records a voice message
- **THEN** the recording state is managed in the chat store
- **AND** recording status is accessible across chat components
- **AND** recorded audio blobs are managed centrally

### Requirement: Chat actions and mutations
The system SHALL provide typed actions in the chat store for all state mutations.

#### Scenario: Send message action
- **WHEN** a user sends a message
- **THEN** the sendMessage action is called on the chat store
- **AND** the action accepts message content and metadata
- **AND** the message is optimistically added to the state
- **AND** the API call is made in the background
- **AND** the message is updated with the server response

#### Scenario: Load messages action
- **WHEN** a conversation is selected
- **THEN** the loadMessages action is called with the conversation ID
- **AND** messages are fetched from the API
- **AND** the messages state is updated with the fetched data
- **AND** loading state is managed during the fetch

#### Scenario: Update conversation action
- **WHEN** conversation metadata changes
- **THEN** the updateConversation action is called
- **AND** the conversation in the conversations array is updated
- **AND** components using the conversation are re-rendered

### Requirement: Chat selectors and computed state
The system SHALL provide derived selectors for computed chat state.

#### Scenario: Unread message count
- **WHEN** components need to display unread counts
- **THEN** a selector computes unread messages per conversation
- **AND** the selector is memoized for performance
- **AND** components access via useChatStore((state) => state.getUnreadCount(conversationId))

#### Scenario: Filtered conversations
- **WHEN** components need filtered conversation lists
- **THEN** selectors provide filtered views (active, archived, tagged)
- **AND** selectors accept filter parameters
- **AND** filtered lists update automatically when conversations change

### Requirement: Chat store persistence
The system SHALL persist critical chat state to localStorage while excluding transient message data.

#### Scenario: Active conversation persistence
- **WHEN** a user selects a conversation
- **THEN** the active conversation ID is persisted to localStorage
- **AND** the conversation is restored on page reload
- **AND** the user returns to their last conversation

#### Scenario: No message persistence
- **WHEN** messages are loaded or updated
- **THEN** messages are NOT persisted to localStorage
- **AND** messages are fetched fresh on each session
- **AND** only message metadata (drafts) is persisted

### Requirement: Chat store DevTools integration
The system SHALL integrate with Redux DevTools for chat state inspection and debugging.

#### Scenario: Action tracking
- **WHEN** chat store actions are dispatched
- **THEN** actions appear in Redux DevTools with payloads
- **AND** developers can track message sends, loads, and updates
- **AND** action names clearly indicate the operation

#### Scenario: State time-travel
- **WHEN** developers use time-travel debugging
- **THEN** chat state can be inspected at any point in time
- **AND** state changes can be replayed step-by-step
