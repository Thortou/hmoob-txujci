'use client';
import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified?: boolean;
  badge?: string;
}

export interface PostStats {
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  image?: string;
  timestamp: string;
  stats: PostStats;
  liked?: boolean;
  bookmarked?: boolean;
}

export interface CommunityFeedProps {
  posts: Post[];
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

// ============================================================================
// Memoized Components for Performance
// ============================================================================

const ActionButton = memo(({
  icon,
  label,
  count,
  onClick,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  onClick?: () => void;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
      text-sm font-medium transition-all duration-200
      hover:bg-gray-100 dark:hover:bg-zinc-800
      focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
      ${active ? 'text-sky-600 dark:text-sky-400' : 'text-gray-600 dark:text-gray-400'}
    `}
    aria-label={`${label}${count ? `: ${count}` : ''}`}
  >
    {icon}
    {count !== undefined && count > 0 && (
      <span className="hidden sm:inline">{count.toLocaleString()}</span>
    )}
  </button>
));

ActionButton.displayName = 'ActionButton';

// ============================================================================
// Main Component
// ============================================================================

function CommunityFeed({
  posts,
  onLike,
  onComment,
  onShare,
  onBookmark,
  loading = false,
  hasMore = false,
  onLoadMore,
}: CommunityFeedProps) {
  const t = useTranslations('community.feed');

  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  // Optimistic like update
  const handleLike = useCallback((postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
    onLike?.(postId);
  }, [onLike]);

  // Optimistic bookmark update
  const handleBookmark = useCallback((postId: string) => {
    setBookmarkedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
    onBookmark?.(postId);
  }, [onBookmark]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Feed Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <button
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          aria-label={t('createPost')}
        >
          {t('createPost')}
        </button>
      </header>

      {/* Posts List */}
      <div className="space-y-4 sm:space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-zinc-700"
          >
            {/* Post Header */}
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Author Avatar */}
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="relative flex-shrink-0"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Author Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="font-semibold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate"
                      >
                        {post.author.name}
                      </Link>
                      {post.author.verified && (
                        <svg
                          className="w-4 h-4 text-sky-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-label="Verified"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {post.author.badge && (
                        <span className="px-1.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full">
                          {post.author.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      @{post.author.username} · {post.timestamp}
                    </div>
                  </div>
                </div>

                {/* More Options */}
                <button
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                  aria-label={t('moreOptions')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              {/* Post Content */}
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="relative w-full aspect-video sm:aspect-[2/1] bg-gray-100 dark:bg-zinc-900">
                <Image
                  src={post.image}
                  alt="Post image"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="p-4 sm:p-6 pt-4 border-t border-gray-200 dark:border-zinc-700">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <ActionButton
                  icon={
                    <svg
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
                        likedPosts.has(post.id) || post.liked
                          ? 'scale-110'
                          : ''
                      }`}
                      fill={likedPosts.has(post.id) || post.liked ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  }
                  label={t('like')}
                  count={post.stats.likes}
                  onClick={() => handleLike(post.id)}
                  active={likedPosts.has(post.id) || post.liked}
                />

                <ActionButton
                  icon={
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  }
                  label={t('comment')}
                  count={post.stats.comments}
                  onClick={() => onComment?.(post.id)}
                />

                <ActionButton
                  icon={
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  }
                  label={t('share')}
                  count={post.stats.shares}
                  onClick={() => onShare?.(post.id)}
                />

                <div className="flex-1" />

                <button
                  onClick={() => handleBookmark(post.id)}
                  className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    bookmarkedPosts.has(post.id) || post.bookmarked
                      ? 'text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                  }`}
                  aria-label={t('bookmark')}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill={bookmarkedPosts.has(post.id) || post.bookmarked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>

              {/* View Count */}
              {post.stats.views > 0 && (
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {post.stats.views.toLocaleString()} {t('views')}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <button
          onClick={onLoadMore}
          className="w-full py-3 px-6 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {t('loadMore')}
        </button>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">{t('empty')}</p>
        </div>
      )}
    </div>
  );
}

export default memo(CommunityFeed);
