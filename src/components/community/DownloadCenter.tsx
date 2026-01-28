'use client';
import { useState, useCallback, memo } from 'react';
import { useTranslations } from 'next-intl';
export type DownloadStatus = 'pending' | 'downloading' | 'paused' | 'completed' | 'failed';

export interface DownloadItem {
  id: string;
  name: string;
  size: number;
  downloaded: number;
  speed: number;
  status: DownloadStatus;
  url: string;
  thumbnail?: string;
  category?: string;
}

export interface DownloadCenterProps {
  downloads: DownloadItem[];
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
  onClearCompleted?: () => void;
}

const ProgressBar = memo(({ progress, status }: { progress: number; status: DownloadStatus }) => {
  const t = useTranslations('community.download');

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'paused':
        return 'bg-yellow-500';
      default:
        return 'bg-sky-500';
    }
  };

  return (
    <div className="relative w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
      <div
        className={`h-full ${getStatusColor()} transition-all duration-300`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

const DownloadItem = memo(({
  item,
  onPause,
  onResume,
  onCancel,
  onRetry,
}: {
  item: DownloadItem;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
}) => {
  const t = useTranslations('community.download');
  const progress = (item.downloaded / item.size) * 100;

  const formatSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatSpeed = (bytesPerSecond: number) => {
    return `${formatSize(bytesPerSecond)}/s`;
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-100 dark:bg-zinc-700 flex-shrink-0 overflow-hidden">
          {item.thumbnail ? (
            <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white truncate">{item.name}</h4>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <span>{formatSize(item.size)}</span>
            <span>•</span>
            <span>
              {item.status === 'completed'
                ? t('completed')
                : `${formatSize(item.downloaded)} / ${formatSize(item.size)}`}
            </span>
            {item.status === 'downloading' && item.speed > 0 && (
              <>
                <span>•</span>
                <span>{formatSpeed(item.speed)}</span>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <ProgressBar progress={progress} status={item.status} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            {item.status === 'pending' && (
              <>
                <button
                  onClick={() => onResume?.(item.id)}
                  className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {t('start')}
                </button>
                <button
                  onClick={() => onCancel?.(item.id)}
                  className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {t('cancel')}
                </button>
              </>
            )}
            {item.status === 'downloading' && (
              <>
                <button
                  onClick={() => onPause?.(item.id)}
                  className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                  aria-label={t('pause')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onCancel?.(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label={t('cancel')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
            {item.status === 'paused' && (
              <>
                <button
                  onClick={() => onResume?.(item.id)}
                  className="p-2 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors"
                  aria-label={t('resume')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onCancel?.(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label={t('cancel')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
            {item.status === 'completed' && (
              <button
                onClick={() => window.open(item.url, '_blank')}
                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {t('open')}
              </button>
            )}
            {item.status === 'failed' && (
              <button
                onClick={() => onRetry?.(item.id)}
                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {t('retry')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

DownloadItem.displayName = 'DownloadItem';

// ============================================================================
// Main Component
// ============================================================================

function DownloadCenter({
  downloads,
  onPause,
  onResume,
  onCancel,
  onRetry,
  onClearCompleted,
}: DownloadCenterProps) {
  const t = useTranslations('community.download');

  const [filter, setFilter] = useState<DownloadStatus | 'all'>('all');

  const filteredDownloads = downloads.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const completedCount = downloads.filter((d) => d.status === 'completed').length;
  const downloadingCount = downloads.filter((d) => d.status === 'downloading').length;
  const totalSpeed = downloads
    .filter((d) => d.status === 'downloading')
    .reduce((sum, d) => sum + d.speed, 0);

  const formatSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <svg
              className="w-6 h-6 text-sky-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {t('title')}
          </h2>
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              {t('clearCompleted')}
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-zinc-700/50 rounded-lg">
            <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
              {downloads.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('total')}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-zinc-700/50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {downloadingCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('downloading')}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-zinc-700/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {completedCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t('completed')}</div>
          </div>
        </div>

        {/* Speed Indicator */}
        {downloadingCount > 0 && (
          <div className="mt-4 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('totalSpeed')}</span>
            <span className="font-semibold text-sky-600 dark:text-sky-400">
              {formatSize(totalSpeed)}/s
            </span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {(['all', 'downloading', 'completed', 'failed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                ${
                  filter === status
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-600'
                }
              `}
            >
              {t(`filter.${status}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Downloads List */}
      <div className="p-4 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto">
        {filteredDownloads.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">{t('empty')}</p>
          </div>
        ) : (
          filteredDownloads.map((item) => (
            <DownloadItem
              key={item.id}
              item={item}
              onPause={onPause}
              onResume={onResume}
              onCancel={onCancel}
              onRetry={onRetry}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default memo(DownloadCenter);
