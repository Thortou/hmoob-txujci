/**
 * Chat feature types
 * Based on Facebook Messenger API structure
 */

/**
 * Message status types
 */
export type MessageStatus = 'sent' | 'delivered' | 'read';

/**
 * User/Participant tags
 */
export type Tag = 'ສົນໃຈ' | 'VIP';

/**
 * Available tags
 */
export const AVAILABLE_TAGS: Tag[] = ['ສົນໃຈ', 'VIP'];

/**
 * User/Participant information
 */
export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  online?: boolean;
  lastSeen?: Date;
}

/**
 * Attachment image data
 */
export interface ImageData {
  width: number;
  height: number;
  max_width: number;
  max_height: number;
  url: string;
  preview_url: string;
  image_type: number;
  render_as_sticker: boolean;
}

/**
 * Attachment data
 */
export interface Attachment {
  id: string;
  mime_type: string;
  name: string;
  size: number;
  image_data?: ImageData;
  audio_data?: {
    url: string;
    duration?: number;
  };
}

/**
 * Attachments response
 */
export interface AttachmentsResponse {
  data: Attachment[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

/**
 * Message structure
 */
export interface Message {
  id: string;
  message: string;
  from: Participant;
  to?: {
    data: Participant[];
  };
  created_time: string;
  attachments?: AttachmentsResponse;
  is_echo?: boolean;
  status?: MessageStatus;
}

/**
 * Messages response
 */
export interface MessagesResponse {
  data: Message[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

/**
 * Conversation structure
 */
export interface Conversation {
  id: string;
  updated_time: string;
  snippet: string;
  unread_count: number;
  participants: {
    data: Participant[];
  };
  messages: MessagesResponse;
  typing?: boolean;
  tags?: Tag[];
}

/**
 * Conversations response
 */
export interface ConversationsResponse {
  data: Conversation[];
}

/**
 * Typing indicator state per conversation
 */
export interface TypingIndicators {
  [conversationId: string]: boolean;
}

/**
 * Voice message recording state
 */
export interface VoiceRecordingState {
  isRecording: boolean;
  duration: number;
  audioBlob: Blob | null;
}

/**
 * Chat store filters
 */
export interface ChatFilters {
  onlyUnread: boolean;
  tags: Tag[];
  searchQuery: string;
}

/**
 * Chat state
 */
export interface ChatState {
  // Messages
  messages: Record<string, Message[]>; // conversationId -> messages

  // Conversations
  conversations: Conversation[];
  activeConversationId: string | null;

  // Typing indicators
  typingIndicators: TypingIndicators;

  // Voice recording
  voiceRecording: VoiceRecordingState;

  // Loading states
  loadingMessages: boolean;
  loadingConversations: boolean;
  sendingMessage: boolean;

  // Error state
  error: string | null;

  // Filters
  filters: ChatFilters;
}

/**
 * Re-export legacy User type for backward compatibility
 */
export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen?: Date;
}
