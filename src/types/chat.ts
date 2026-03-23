export type MessageStatus = 'sent' | 'delivered' | 'read';

export type Tag = 'ສົນໃຈ' | 'VIP';

export const AVAILABLE_TAGS: Tag[] = ['ສົນໃຈ', 'VIP'];

// User/Participant information from Facebook Messenger API
export interface Participant {
  id: string;
  name: string;
  email: string;
}

// Attachment data structure
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

// Message structure matching Facebook Messenger API
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

// Conversation structure matching Facebook Messenger API
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

// Conversations response wrapper
export interface ConversationsResponse {
  data: Conversation[];
}

// Legacy types for backward compatibility with components
export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen?: Date;
}
