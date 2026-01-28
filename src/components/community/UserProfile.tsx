'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Reputation {
  level: number;
  points: number;
  nextLevel: number;
  rank: string;
}

export interface Stats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

export interface UserProfileProps {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  coverImage?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedDate: string;
  verified: boolean;
  badges: Badge[];
  reputation: Reputation;
  stats: Stats;
  isOwnProfile?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}
const Badge = memo(({ badge }: { badge: Badge }) => {
  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500',
  };

  return (
    <div
      className="group relative"
      title={`${badge.name}: ${badge.description}`}
    >
      <div
        className={`
          w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${rarityColors[badge.rarity]}
          flex items-center justify-center text-white text-xl sm:text-2xl
          shadow-lg transform group-hover:scale-110 transition-transform duration-200
        `}
      >
        {badge.icon}
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        <div className="font-semibold">{badge.name}</div>
        <div className="text-gray-300">{badge.description}</div>
      </div>
    </div>
  );
});

Badge.displayName = 'Badge';

// ============================================================================
// Main Component
// ============================================================================

function UserProfile({
  userId,
  username,
  displayName,
  avatar,
  coverImage,
  bio,
  location,
  website,
  joinedDate,
  verified,
  badges,
  reputation,
  stats,
  isOwnProfile = false,
  onFollow,
  onMessage,
}: UserProfileProps) {
  const t = useTranslations('community.profile');

  const progressPercentage = (reputation.points / reputation.nextLevel) * 100;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-32 sm:h-48 bg-gradient-to-br from-sky-400 to-purple-500">
        {coverImage && (
          <Image
            src={coverImage}
            alt="Cover"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Profile Header */}
      <div className="relative px-4 sm:px-6 pb-6">
        {/* Avatar */}
        <div className="absolute -top-16 sm:-top-20 left-4 sm:left-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-zinc-800 overflow-hidden bg-gray-100 dark:bg-zinc-700 shadow-lg">
            <Image
              src={avatar}
              alt={displayName}
              width={160}
              height={160}
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 sm:pt-20 gap-2 sm:gap-3">
          {!isOwnProfile && (
            <>
              <button
                onClick={onFollow}
                className="px-4 sm:px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                {t('follow')}
              </button>
              {onMessage && (
                <button
                  onClick={onMessage}
                  className="px-4 sm:px-6 py-2 border border-gray-300 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-700 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  {t('message')}
                </button>
              )}
            </>
          )}
          {isOwnProfile && (
            <Link
              href="/settings/profile"
              className="px-4 sm:px-6 py-2 border border-gray-300 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-700 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              {t('editProfile')}
            </Link>
          )}
        </div>

        {/* User Info */}
        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {displayName}
            </h1>
            {verified && (
              <svg
                className="w-6 h-6 text-sky-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label={t('verified')}
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1">@{username}</p>

          {bio && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {bio}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
            {location && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {location}
              </div>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                {new URL(website).hostname}
              </a>
            )}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {t('joined', { date: joinedDate })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {stats.posts.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('posts')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {stats.followers.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('followers')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {stats.following.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('following')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {stats.likes.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('likes')}
            </div>
          </div>
        </div>

        {/* Reputation */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {reputation.rank}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('level')} {reputation.level}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-400">
                {reputation.points.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('points')}
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 sm:h-3 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t('nextLevel', { points: reputation.nextLevel.toLocaleString() })}
          </p>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('badges')}
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {badges.map((badge) => (
                <Badge key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(UserProfile);
