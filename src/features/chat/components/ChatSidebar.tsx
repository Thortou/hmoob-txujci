'use client';

import { useState } from 'react';
import { Link } from '@/src/i18n/routing';
import { useChatStore } from '@/src/stores/chatStore';
import { currentUser, getCustomerFromConversation } from '@/src/data/mockChatData';
import { AVAILABLE_TAGS } from '@/src/features/chat/types';
import type { Tag, Conversation } from '@/src/features/chat/types';

const TAGS = AVAILABLE_TAGS;

export default function ChatSidebar() {
  // Use store instead of props
  const {
    conversations,
    activeConversationId,
    filters,
    setActiveConversation,
    setSearchQuery,
    setFilterTags,
    updateConversation,
  } = useChatStore();

  const [selectedTagFilter, setSelectedTagFilter] = useState<Tag | 'all'>('all');

  // Filter conversations using store filter state
  const filteredConversations = conversations.filter((conv: Conversation) => {
    const customer = getCustomerFromConversation(conv);
    const lastMessage = conv.messages.data[0];

    const matchesSearch =
      customer?.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      (lastMessage?.message || '').toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      conv.snippet.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesTag = selectedTagFilter === 'all' || conv.tags?.includes(selectedTagFilter);

    return matchesSearch && matchesTag;
  });

  const getTagColor = (tag: Tag) => {
    switch (tag) {
      case 'VIP':
        return 'bg-purple-500';
      case 'ສົນໃຈ':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getFilterTagColor = (tag: Tag | 'all') => {
    if (tag === 'all') {
      return selectedTagFilter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700';
    }
    return selectedTagFilter === tag
      ? `${getTagColor(tag)} text-white`
      : 'bg-gray-100 text-gray-700';
  };

  const formatTime = (dateString: string) => {
    const now = new Date();
    const messageDate = new Date(dateString);
    const diffInMs = now.getTime() - messageDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } else if (diffInDays < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
  };

  const handleTagFilterChange = (tag: Tag | 'all') => {
    setSelectedTagFilter(tag);
    // Update store filter
    setFilterTags(tag === 'all' ? [] : [tag]);
  };

  const handleToggleTag = (conversationId: string, tag: Tag) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (!conversation) return;

    const currentTags = conversation.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t: Tag) => t !== tag)
      : [...currentTags, tag];

    updateConversation(conversationId, { tags: newTags });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-gray-200">
      {/* Back to Website Button */}
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-3 hover:bg-sky-50 transition-colors border-b border-gray-200"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium text-gray-700">Back to Website</span>
      </Link>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-gray-800">{currentUser.name}</h2>
            <p className="text-sm text-green-500">Online</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleTagFilterChange('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${getFilterTagColor('all')}`}
          >
            All
          </button>
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagFilterChange(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${getFilterTagColor(tag)}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation: Conversation) => {
          const customer = getCustomerFromConversation(conversation);
          const lastMessage = conversation.messages.data[0];
          const isFromMe = lastMessage?.is_echo === true || lastMessage?.from.id === currentUser.id;
          const avatarUrl = customer ? `https://i.pravatar.cc/150?u=${customer.id}` : '';

          const handleTagClick = (e: React.MouseEvent<Element, MouseEvent>, tag: Tag) => {
            e.stopPropagation();
            handleToggleTag(conversation.id, tag);
          };

          return (
            <div
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                activeConversationId === conversation.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt={customer?.name || 'User'}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.unread_count > 0 && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {conversation.unread_count > 9 ? '9+' : conversation.unread_count}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">{customer?.name || 'Unknown'}</h3>
                  <span className="text-xs text-gray-500 shrink-0 ml-2">
                    {formatTime(conversation.updated_time)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate pr-2">
                    {isFromMe && 'You: '}
                    {lastMessage?.message || conversation.snippet}
                    {lastMessage?.attachments && '📎'}
                  </p>
                </div>
                {conversation.tags && conversation.tags.length > 0 && (
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {conversation.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={(e) => handleTagClick(e, tag)}
                        className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getTagColor(tag)} hover:opacity-80 transition-opacity`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
