export { default as CommunityFeed } from './CommunityFeed';
export { default as TrendingTopics } from './TrendingTopics';
export { default as UserProfile } from './UserProfile';
export { default as DownloadCenter } from './DownloadCenter';
export { default as NotificationPanel } from './NotificationPanel';
export { default as SearchBar } from './SearchBar';

// Type exports
export type { Post, Author, PostStats } from './CommunityFeed';
export type { TrendingTopic } from './TrendingTopics';
export type { Badge, Reputation, Stats } from './UserProfile';
export type { DownloadItem, DownloadStatus } from './DownloadCenter';
export type { Notification, NotificationType } from './NotificationPanel';
export type { SearchResult, SearchResultType } from './SearchBar';
