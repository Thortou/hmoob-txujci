'use client';
import { useState, useEffect, useRef, memo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
export interface TrendingTopic {
  id: string;
  tag: string;
  posts: number;
  change?: 'up' | 'down' | 'same';
  category?: string;
}

export interface TrendingTopicsProps {
  topics: TrendingTopic[];
  realtime?: boolean;
  onUpdate?: (topics: TrendingTopic[]) => void;
  maxItems?: number;
}
function TrendingTopics({
  topics,
  realtime = true,
  onUpdate,
  maxItems = 10,
}: TrendingTopicsProps) {
  const t = useTranslations('community.trending');
  const [liveTopics, setLiveTopics] = useState<TrendingTopic[]>(topics.slice(0, maxItems));
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize lastUpdate on client-side mount
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setLastUpdate(new Date());
    }, 0);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Simulate real-time updates (replace with actual WebSocket/SSE)
  useEffect(() => {
    if (!realtime) return;

    const interval = setInterval(() => {
      // Simulate topic rank changes
      setLiveTopics((prev) => {
        const updated = [...prev];
        // Randomly increment post counts
        updated.forEach((topic) => {
          if (Math.random() > 0.7) {
            topic.posts += Math.floor(Math.random() * 100);
          }
        });
        // Sort by posts
        updated.sort((a, b) => b.posts - a.posts);
        return updated;
      });

      // Defer the lastUpdate update to next tick to avoid cascading renders
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setLastUpdate(new Date());
      }, 0);
    }, 5000); // Update every 5 seconds

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [realtime]);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(liveTopics);
    }
  }, [liveTopics, onUpdate]);

  return (
    <aside className="w-full bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <svg
              className="w-5 h-5 text-sky-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            {t('title')}
          </h2>
          {realtime && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t('live')}
            </div>
          )}
        </div>
        {realtime && lastUpdate && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('lastUpdate', { time: lastUpdate.toLocaleTimeString() })}
          </p>
        )}
      </div>

      {/* Topics List */}
      <div className="divide-y divide-gray-200 dark:divide-zinc-700 max-h-[500px] overflow-y-auto">
        {liveTopics.map((topic, index) => (
          <Link
            key={topic.id}
            href={`/trending/${topic.tag.substring(1)}`}
            className="block p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              {/* Rank */}
              <div
                className={`
                  flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-sm
                  ${
                    index === 0
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                      : index === 1
                      ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700'
                      : index === 2
                      ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                      : 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400'
                  }
                `}
              >
                {index + 1}
              </div>

              {/* Topic Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {topic.tag}
                  </span>
                  {topic.change === 'up' && (
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {topic.change === 'down' && (
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1">
                  {topic.category && (
                    <span className="text-xs px-2 py-0.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full">
                      {topic.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {topic.posts.toLocaleString()} {t('posts')}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More Link */}
      <div className="p-4 bg-gray-50 dark:bg-zinc-700/30 border-t border-gray-200 dark:border-zinc-700">
        <Link
          href="/trending"
          className="block text-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
        >
          {t('showAll')}
        </Link>
      </div>
    </aside>
  );
}

export default memo(TrendingTopics);
