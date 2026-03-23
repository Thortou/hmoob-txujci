/**
 * Chat feature public API
 * Exports main components and types for the chat feature
 */

// Components
export { default as ChatSidebar } from './components/ChatSidebar';
export { default as ChatWindow } from './components/ChatWindow';
export { default as MessageBubble } from './components/MessageBubble';

// Types
export type {
  Message,
  MessagesResponse,
  Conversation,
  ConversationsResponse,
  Participant,
  Attachment,
  AttachmentsResponse,
  User,
  MessageStatus,
  Tag,
} from './types';

// Constants
export { AVAILABLE_TAGS } from './types';

// API
export {
  sendMessage,
  getConversations,
  getMessages,
  uploadVoiceMessage,
  markConversationRead,
  getTypingIndicator,
  updateConversationTags,
  uploadAttachment,
} from './api';
