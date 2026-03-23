/**
 * Chat API module
 * Typed API functions for chat-related operations
 */

import { apiClient } from '@/src/lib/api/client';
import type {
  Message,
  MessagesResponse,
  Conversation,
  ConversationsResponse,
  Attachment,
} from '../types';

/**
 * API response wrapper
 */
export interface APIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

/**
 * Send message request
 */
export interface SendMessageRequest {
  conversationId: string;
  message: string;
  attachments?: Attachment[];
}

/**
 * Send a message
 */
export async function sendMessage(
  request: SendMessageRequest
): Promise<APIResponse<Message>> {
  try {
    const response = await apiClient.post<Message>(
      `/chat/conversations/${request.conversationId}/messages`,
      {
        message: request.message,
        attachments: request.attachments,
      }
    );

    return {
      data: response,
      success: true,
    };
  } catch (error) {
    return {
      data: {} as Message,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message',
    };
  }
}

/**
 * Get conversations list
 */
export async function getConversations(): Promise<APIResponse<Conversation[]>> {
  try {
    const response = await apiClient.get<ConversationsResponse>('/chat/conversations');

    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch conversations',
    };
  }
}

/**
 * Get messages for a conversation
 */
export interface GetMessagesParams {
  conversationId: string;
  limit?: number;
  before?: string; // Pagination cursor
  after?: string; // Pagination cursor
}

export async function getMessages(
  params: GetMessagesParams
): Promise<APIResponse<Message[]>> {
  try {
    const { conversationId, limit, before, after } = params;
    const queryParams = new URLSearchParams();

    if (limit) queryParams.append('limit', limit.toString());
    if (before) queryParams.append('before', before);
    if (after) queryParams.append('after', after);

    const url = `/chat/conversations/${conversationId}/messages${
      queryParams.toString() ? `?${queryParams}` : ''
    }`;

    const response = await apiClient.get<MessagesResponse>(url);

    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch messages',
    };
  }
}

/**
 * Upload voice message
 */
export interface UploadVoiceMessageRequest {
  conversationId: string;
  audioBlob: Blob;
  duration: number;
}

export async function uploadVoiceMessage(
  request: UploadVoiceMessageRequest
): Promise<APIResponse<Message>> {
  try {
    const formData = new FormData();
    formData.append('audio', request.audioBlob);
    formData.append('duration', request.duration.toString());

    const response = await apiClient.post<Message>(
      `/chat/conversations/${request.conversationId}/voice`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      data: response,
      success: true,
    };
  } catch (error) {
    return {
      data: {} as Message,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload voice message',
    };
  }
}

/**
 * Mark conversation as read
 */
export async function markConversationRead(
  conversationId: string
): Promise<APIResponse<void>> {
  try {
    await apiClient.post(`/chat/conversations/${conversationId}/read`);

    return {
      data: undefined,
      success: true,
    };
  } catch (error) {
    return {
      data: undefined,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark as read',
    };
  }
}

/**
 * Get typing indicator status for a conversation
 */
export async function getTypingIndicator(
  conversationId: string
): Promise<APIResponse<{ typing: boolean }>> {
  try {
    const response = await apiClient.get<{ typing: boolean }>(
      `/chat/conversations/${conversationId}/typing`
    );

    return {
      data: response,
      success: true,
    };
  } catch (error) {
    return {
      data: { typing: false },
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get typing status',
    };
  }
}

/**
 * Update conversation tags
 */
export interface UpdateTagsRequest {
  conversationId: string;
  tags: string[];
}

export async function updateConversationTags(
  request: UpdateTagsRequest
): Promise<APIResponse<Conversation>> {
  try {
    const response = await apiClient.put<Conversation>(
      `/chat/conversations/${request.conversationId}/tags`,
      { tags: request.tags }
    );

    return {
      data: response,
      success: true,
    };
  } catch (error) {
    return {
      data: {} as Conversation,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update tags',
    };
  }
}

/**
 * Upload attachment
 */
export async function uploadAttachment(
  file: File,
  conversationId: string
): Promise<APIResponse<Attachment>> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<Attachment>(
      `/chat/conversations/${conversationId}/attachments`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      data: response,
      success: true,
    };
  } catch (error) {
    return {
      data: {} as Attachment,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload attachment',
    };
  }
}
