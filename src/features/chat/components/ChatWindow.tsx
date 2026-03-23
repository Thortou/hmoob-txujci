'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import { useChatStore } from '@/src/stores/chatStore';
import { currentUser, getCustomerFromConversation } from '@/src/data/mockChatData';
import { AVAILABLE_TAGS } from '@/src/features/chat/types';
import type { Tag, Message } from '@/src/features/chat/types';
import { sendMessage } from '@/src/features/chat/api';

const TAGS = AVAILABLE_TAGS;

export default function ChatWindow() {
  // Use store instead of props
  const {
    getActiveConversation,
    getMessagesForConversation,
    voiceRecording,
    addMessage,
    setSendingMessage,
    updateConversation,
    startRecording: startStoreRecording,
    stopRecording: stopStoreRecording,
    setRecordingDuration,
    setRecordingBlob,
    // clearRecording, // Not used yet
  } = useChatStore();

  const conversation = getActiveConversation();
  const messages = conversation ? getMessagesForConversation(conversation.id) : [];

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Voice recording refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);

  // Check microphone permission
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasAudioPermission(true);
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        setHasAudioPermission(false);
      }
    };

    checkPermission();
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordingBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      startStoreRecording();
      setRecordingDuration(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration((voiceRecording.duration + 1));
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [startStoreRecording, setRecordingDuration, voiceRecording.duration]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    stopStoreRecording();
  }, [stopStoreRecording]);

  const toggleRecording = useCallback(() => {
    if (voiceRecording.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [voiceRecording.isRecording, startRecording, stopRecording]);

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

  const getTagButtonColor = (tag: Tag) => {
    const isTagged = conversation?.tags?.includes(tag);
    return isTagged
      ? `${getTagColor(tag)} text-white`
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  };

  const handleTagClick = (tag: Tag) => {
    if (conversation) {
      const currentTags = conversation.tags || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t: Tag) => t !== tag)
        : [...currentTags, tag];

      updateConversation(conversation.id, { tags: newTags });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !conversation) return;

    setSendingMessage(true);

    // Optimistic update
    const tempMessage = {
      id: `temp-${Date.now()}`,
      message: inputValue.trim(),
      from: currentUser,
      created_time: new Date().toISOString(),
      is_echo: true,
      status: 'sent' as const,
    };

    addMessage(conversation.id, tempMessage);
    const messageToSend = inputValue;
    setInputValue('');

    try {
      const response = await sendMessage({
        conversationId: conversation.id,
        message: messageToSend,
      });

      if (response.success) {
        // Message already added optimistically, server will confirm
        // In real implementation, you might update the message status here
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error - maybe remove the optimistic message or show error state
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!conversation) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            className="w-24 h-24 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Welcome to Chat</h2>
          <p className="text-gray-500">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  const customer = getCustomerFromConversation(conversation);
  const avatarUrl = customer ? `https://i.pravatar.cc/150?u=${customer.id}` : '';

  return (
    <div className="w-full h-full flex flex-col bg-[#e5ddd5]">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={customer?.name || 'User'}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{customer?.name || 'Unknown'}</h2>
            <p className="text-xs text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4ccc5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((message: Message, index: number) => {
          const isSent = message.is_echo === true || message.from.id === currentUser.id;
          const showAvatar = !isSent && (index === 0 || messages[index - 1]?.from.id !== message.from.id);
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isSent={isSent}
              showAvatar={showAvatar}
              avatarUrl={avatarUrl}
              customerName={customer?.name || ''}
            />
          );
        })}
        {conversation.typing && (
          <div className="flex items-center gap-2 mb-4">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {conversation && (
        <div className="bg-white px-4 py-2 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium"></span>
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${getTagButtonColor(tag)}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Input Area */}
      <div className="bg-white px-4 py-3 border-t border-gray-200">
        {voiceRecording.isRecording ? (
          // Recording UI
          <div className="flex items-center gap-3">
            <button
              onClick={toggleRecording}
              className="p-2.5 rounded-full transition-all bg-red-500 hover:bg-red-600 text-white animate-pulse"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" />
              </svg>
            </button>
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-red-500 rounded-full animate-[bounce_0.6s_infinite]"></div>
                  <div className="w-1 h-6 bg-red-500 rounded-full animate-[bounce_0.8s_infinite]"></div>
                  <div className="w-1 h-3 bg-red-500 rounded-full animate-[bounce_0.7s_infinite]"></div>
                  <div className="w-1 h-5 bg-red-500 rounded-full animate-[bounce_0.9s_infinite]"></div>
                  <div className="w-1 h-4 bg-red-500 rounded-full animate-[bounce_0.6s_infinite]"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">{formatDuration(voiceRecording.duration)}</span>
              </div>
            </div>
            <button
              onClick={toggleRecording}
              className="p-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
            </button>
          </div>
        ) : (
          // Normal input UI
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>
            {hasAudioPermission && (
              <button
                onClick={toggleRecording}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Record voice message"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-2.5 rounded-full transition-all ${inputValue.trim()
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Tag Footer Bar */}

    </div>
  );
}
