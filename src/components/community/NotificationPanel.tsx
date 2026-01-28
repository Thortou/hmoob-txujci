'use client';
import { useState, useCallback, memo, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
export type NotificationType =
  | 'like'
  | 'comment'
  | 'share'
  | 'follow'
  | 'mention'
  | 'badge'
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  avatar?: string;
  link?: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
  maxItems?: number;
  realtime?: boolean;
}
const NotificationIcon = memo(({ type }: { type: NotificationType }) => {
  const icons = {
    like: (
      <svg className="w-5 h-5" fill="#ef4444" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    ),
    comment: (
      <svg className="w-5 h-5" fill="#3b82f6" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    share: (
      <svg className="w-5 h-5" fill="#8b5cf6" viewBox="0 0 20 20">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 01-.398-.401c-.062-.061-.122-.127-.18-.196a3 3 0 00-.398-.402l4.94-2.47c.06-.068.12-.134.18-.196a2.99 2.99 0 01.18-.196A3 3 0 1015 8z" />
      </svg>
    ),
    follow: (
      <svg className="w-5 h-5" fill="#10b981" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    mention: (
      <svg className="w-5 h-5" fill="#f59e0b" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    badge: (
      <svg className="w-5 h-5" fill="#ec4899" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    system: (
      <svg className="w-5 h-5" fill="#6b7280" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 1.532-.948 2.286 1.56.38 2.6 2.6 1.56 2.98a1.532 1.532 0 012.286-.948c1.372.836 2.942-.734 2.106-2.106-.54-.886-.06-1.532.948-2.286zm0 2.66c-.546 0-1.178-.353-1.4-.938-.196-.516-.12-1.138.353-1.4.472-.196 1.04.12 1.4.588.545.546 1.178.353 1.4-.938.196-.516.12-1.138-.353-1.4-.472-.196-1.04-.12-1.4.588zm5.404 12.823c-1.22.342-2.4.72-3.428 1.123l-1.564-1.329c-.555-.47-1.42-.51-2.022-.096l-1.564 1.05c-1.057.71-2.44.39-3.107-.924l-.38-1.229c-.318-.962-1.4-1.573-2.412-1.296l-1.564.446c-.95.27-1.916-.35-2.412-1.123l.77-1.564c.478-.967.218-2.118-.77-2.412l-1.564-.446c-1.012-.277-1.664-1.296-1.296-2.412l.446-1.564c.29-.957-.35-1.916-1.123-2.412l-1.564-.77c-.967-.478-1.118-1.642-.446-2.412l.446-1.564c.277-1.012-.35-1.664-1.296-1.296l-1.564.446c-.95.29-1.916-.35-2.412-1.123l.77-1.564c.478-.967.218-2.118-.77-2.412l-1.564-.446c-1.012-.277-1.664-1.296-1.296-2.412l.446-1.564c.29-.957-.35-1.916-1.123-2.412l-1.564-.77c-.967-.478-1.118-1.642-.446-2.412l.446-1.564c.277-1.012-.35-1.664-1.296-1.296l-1.564.446c-.95.29-1.916-.35-2.412-1.123l.77-1.564c.478-.967.218-2.118-.77-2.412z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return icons[type] || icons.system;
});

NotificationIcon.displayName = 'NotificationIcon';

const NotificationItem = memo(({
  notification,
  onMarkAsRead,
  onDismiss,
}: {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}) => {
  const t = useTranslations('community.notifications');

  const handleClick = useCallback(() => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  }, [notification.read, notification.id, onMarkAsRead]);

  return (
    <div
      className={`
        relative p-3 sm:p-4 rounded-lg transition-all duration-200
        ${notification.read
          ? 'bg-gray-50 dark:bg-zinc-700/30 opacity-70'
          : 'bg-white dark:bg-zinc-800 border-l-4 border-sky-500'
        }
        hover:shadow-md
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <NotificationIcon type={notification.type} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {notification.link ? (
            <Link
              href={notification.link}
              onClick={handleClick}
              className="block"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                {notification.message}
              </p>
            </Link>
          ) : (
            <>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                {notification.message}
              </p>
            </>
          )}

          {/* Action */}
          {notification.actionUrl && notification.actionLabel && (
            <Link
              href={notification.actionUrl}
              className="inline-block mt-2 text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline"
            >
              {notification.actionLabel}
            </Link>
          )}

          {/* Timestamp */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {notification.timestamp}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {!notification.read && (
            <button
              onClick={handleClick}
              className="p-1.5 text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 rounded transition-colors"
              aria-label={t('markAsRead')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}
          <button
            onClick={() => onDismiss?.(notification.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
            aria-label={t('dismiss')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

NotificationItem.displayName = 'NotificationItem';

// ============================================================================
// Main Component
// ============================================================================

function NotificationPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  maxItems = 10,
  realtime = true,
}: NotificationPanelProps) {
  const t = useTranslations('community.notifications');
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayNotifications = notifications.slice(0, maxItems);

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
        aria-label={t('title')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full transform translate-x-1/4 -translate-y-1/4">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}

        {/* Live indicator */}
        {realtime && unreadCount > 0 && (
          <span className="absolute bottom-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-full sm:w-96 max-h-[500px] bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-zinc-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span>{t('title')}</span>
              {unreadCount > 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({unreadCount} {t('unread')})
                </span>
              )}
            </h3>
            {unreadCount > 0 && onMarkAllAsRead && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
              >
                {t('markAllRead')}
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[400px] p-2 space-y-2">
            {displayNotifications.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('empty')}</p>
              </div>
            ) : (
              displayNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                  onDismiss={onDismiss}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > maxItems && (
            <Link
              href="/notifications"
              className="block p-3 text-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
            >
              {t('viewAll')}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(NotificationPanel);
