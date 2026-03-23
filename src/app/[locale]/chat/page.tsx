'use client';

import { useEffect } from 'react';
import { ChatSidebar, ChatWindow } from '@/src/features/chat';
import { useChatStore } from '@/src/stores/chatStore';
import { mockConversations } from '@/src/data/mockChatData';
import type { Conversation } from '@/src/features/chat';

export default function ChatPage() {
  const { conversations, setConversations, activeConversationId } = useChatStore();

  // Initialize store with mock data
  useEffect(() => {
    if (conversations.length === 0) {
      setConversations(mockConversations as Conversation[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations.length]);

  return (
    <div className="h-screen flex">
      {/* Sidebar - 30% width on desktop, hidden on mobile when chat is open */}
      <div className={`${activeConversationId ? 'hidden md:flex' : 'flex'} md:w-[30%] lg:w-[25%] h-full`}>
        <ChatSidebar />
      </div>

      {/* Chat Window - 70% width on desktop, full width on mobile */}
      <div className={`${activeConversationId ? 'flex' : 'hidden md:flex'} md:w-[70%] lg:w-[75%] h-full`}>
        <ChatWindow />
      </div>
    </div>
  );
}
