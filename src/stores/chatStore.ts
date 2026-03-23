/**
 * Chat Store - Manages all chat-related state
 * Including messages, conversations, typing indicators, and voice recording
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  Message,
  Conversation,
  TypingIndicators,
} from '@/src/features/chat/types';

/**
 * Chat state interface
 */
export interface ChatState {
  // Messages: conversationId -> messages map
  messages: Record<string, Message[]>;

  // Conversations
  conversations: Conversation[];
  activeConversationId: string | null;

  // Typing indicators
  typingIndicators: TypingIndicators;

  // Voice recording
  voiceRecording: {
    isRecording: boolean;
    duration: number;
    audioBlob: Blob | null;
  };

  // Loading states
  loadingMessages: boolean;
  loadingConversations: boolean;
  sendingMessage: boolean;

  // Error state
  error: string | null;

  // Filters
  filters: {
    onlyUnread: boolean;
    tags: string[];
    searchQuery: string;
  };
}

/**
 * Chat actions interface
 */
export interface ChatActions {
  // Conversation actions
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (conversationId: string | null) => void;
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void;

  // Message actions
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;

  // Typing indicators
  setTypingIndicator: (conversationId: string, isTyping: boolean) => void;
  clearTypingIndicator: (conversationId: string) => void;

  // Voice recording
  startRecording: () => void;
  stopRecording: () => void;
  setRecordingDuration: (duration: number) => void;
  setRecordingBlob: (blob: Blob | null) => void;
  clearRecording: () => void;

  // Loading states
  setLoadingMessages: (loading: boolean) => void;
  setLoadingConversations: (loading: boolean) => void;
  setSendingMessage: (sending: boolean) => void;

  // Error handling
  setError: (error: string | null) => void;

  // Filters
  setFilterOnlyUnread: (onlyUnread: boolean) => void;
  setFilterTags: (tags: string[]) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;

  // Selectors (computed values)
  getActiveConversation: () => Conversation | null;
  getMessagesForConversation: (conversationId: string) => Message[];
  getUnreadCount: (conversationId?: string) => number;
  getFilteredConversations: () => Conversation[];

  // Reset
  reset: () => void;
}

/**
 * Initial chat state
 */
const initialState: ChatState = {
  messages: {},
  conversations: [],
  activeConversationId: null,
  typingIndicators: {},
  voiceRecording: {
    isRecording: false,
    duration: 0,
    audioBlob: null,
  },
  loadingMessages: false,
  loadingConversations: false,
  sendingMessage: false,
  error: null,
  filters: {
    onlyUnread: false,
    tags: [],
    searchQuery: '',
  },
};

/**
 * Chat store type
 */
type ChatStore = ChatState & ChatActions;

/**
 * Create chat store with DevTools and selective persistence
 * Only persists: activeConversationId
 */
export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Conversation actions
        setConversations: (conversations) =>
          set({ conversations }, false, 'setConversations'),

        setActiveConversation: (conversationId) =>
          set({ activeConversationId: conversationId }, false, 'setActiveConversation'),

        updateConversation: (conversationId, updates) =>
          set(
            (state) => ({
              conversations: state.conversations.map((conv) =>
                conv.id === conversationId ? { ...conv, ...updates } : conv
              ),
            }),
            false,
            'updateConversation'
          ),

        // Message actions
        setMessages: (conversationId, messages) =>
          set(
            (state) => ({
              messages: {
                ...state.messages,
                [conversationId]: messages,
              },
            }),
            false,
            'setMessages'
          ),

        addMessage: (conversationId, message) =>
          set(
            (state) => ({
              messages: {
                ...state.messages,
                [conversationId]: [...(state.messages[conversationId] || []), message],
              },
            }),
            false,
            'addMessage'
          ),

        updateMessage: (conversationId, messageId, updates) =>
          set(
            (state) => ({
              messages: {
                ...state.messages,
                [conversationId]: (state.messages[conversationId] || []).map((msg) =>
                  msg.id === messageId ? { ...msg, ...updates } : msg
                ),
              },
            }),
            false,
            'updateMessage'
          ),

        deleteMessage: (conversationId, messageId) =>
          set(
            (state) => ({
              messages: {
                ...state.messages,
                [conversationId]: (state.messages[conversationId] || []).filter(
                  (msg) => msg.id !== messageId
                ),
              },
            }),
            false,
            'deleteMessage'
          ),

        // Typing indicators
        setTypingIndicator: (conversationId, isTyping) =>
          set(
            (state) => ({
              typingIndicators: {
                ...state.typingIndicators,
                [conversationId]: isTyping,
              },
            }),
            false,
            'setTypingIndicator'
          ),

        clearTypingIndicator: (conversationId) =>
          set(
            (state) => {
              const newIndicators = { ...state.typingIndicators };
              delete newIndicators[conversationId];
              return { typingIndicators: newIndicators };
            },
            false,
            'clearTypingIndicator'
          ),

        // Voice recording
        startRecording: () =>
          set(
            (state) => ({
              voiceRecording: {
                ...state.voiceRecording,
                isRecording: true,
                duration: 0,
                audioBlob: null,
              },
            }),
            false,
            'startRecording'
          ),

        stopRecording: () =>
          set(
            (state) => ({
              voiceRecording: {
                ...state.voiceRecording,
                isRecording: false,
              },
            }),
            false,
            'stopRecording'
          ),

        setRecordingDuration: (duration) =>
          set(
            (state) => ({
              voiceRecording: {
                ...state.voiceRecording,
                duration,
              },
            }),
            false,
            'setRecordingDuration'
          ),

        setRecordingBlob: (blob) =>
          set(
            (state) => ({
              voiceRecording: {
                ...state.voiceRecording,
                audioBlob: blob,
              },
            }),
            false,
            'setRecordingBlob'
          ),

        clearRecording: () =>
          set(
            {
              voiceRecording: {
                isRecording: false,
                duration: 0,
                audioBlob: null,
              },
            },
            false,
            'clearRecording'
          ),

        // Loading states
        setLoadingMessages: (loading) =>
          set({ loadingMessages: loading }, false, 'setLoadingMessages'),
        setLoadingConversations: (loading) =>
          set({ loadingConversations: loading }, false, 'setLoadingConversations'),
        setSendingMessage: (sending) =>
          set({ sendingMessage: sending }, false, 'setSendingMessage'),

        // Error handling
        setError: (error) => set({ error }, false, 'setError'),

        // Filters
        setFilterOnlyUnread: (onlyUnread) =>
          set(
            (state) => ({
              filters: {
                ...state.filters,
                onlyUnread,
              },
            }),
            false,
            'setFilterOnlyUnread'
          ),

        setFilterTags: (tags) =>
          set(
            (state) => ({
              filters: {
                ...state.filters,
                tags,
              },
            }),
            false,
            'setFilterTags'
          ),

        setSearchQuery: (query) =>
          set(
            (state) => ({
              filters: {
                ...state.filters,
                searchQuery: query,
              },
            }),
            false,
            'setSearchQuery'
          ),

        clearFilters: () =>
          set(
            {
              filters: {
                onlyUnread: false,
                tags: [],
                searchQuery: '',
              },
            },
            false,
            'clearFilters'
          ),

        // Selectors
        getActiveConversation: () => {
          const state = get();
          if (!state.activeConversationId) return null;
          return state.conversations.find((c) => c.id === state.activeConversationId) || null;
        },

        getMessagesForConversation: (conversationId) => {
          const state = get();
          return state.messages[conversationId] || [];
        },

        getUnreadCount: (conversationId) => {
          const state = get();
          if (conversationId) {
            const conv = state.conversations.find((c) => c.id === conversationId);
            return conv?.unread_count || 0;
          }
          return state.conversations.reduce((sum, conv) => sum + conv.unread_count, 0);
        },

        getFilteredConversations: () => {
          const state = get();
          let filtered = [...state.conversations];

          // Filter by unread
          if (state.filters.onlyUnread) {
            filtered = filtered.filter((c) => c.unread_count > 0);
          }

          // Filter by tags
          if (state.filters.tags.length > 0) {
            filtered = filtered.filter((c) =>
              c.tags?.some((tag) => state.filters.tags.includes(tag))
            );
          }

          // Filter by search query
          if (state.filters.searchQuery) {
            const query = state.filters.searchQuery.toLowerCase();
            filtered = filtered.filter((c) =>
              c.participants.data.some((p) => p.name.toLowerCase().includes(query))
            );
          }

          return filtered;
        },

        // Reset
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'chat-storage',
        partialize: (state) => ({
          activeConversationId: state.activeConversationId,
        }),
      }
    ),
    {
      name: 'chat-store-devtools',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
