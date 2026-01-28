'use client';
import { useState, useCallback, useEffect, useRef, memo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export type SearchResultType = 'user' | 'post' | 'topic' | 'tag';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  url: string;
  avatar?: string;
  thumbnail?: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => Promise<SearchResult[]>;
  placeholder?: string;
  maxResults?: number;
  showRecentSearches?: boolean;
}
const SearchResultIcon = memo(({ type }: { type: SearchResultType }) => {
  const icons = {
    user: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    ),
    post: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    topic: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tag: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 013.293 3.293l7 7a1 1 0 001.414 0l7-7zM9 12a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return icons[type] || icons.tag;
});

SearchResultIcon.displayName = 'SearchResultIcon';
function SearchBar({
  onSearch,
  placeholder,
  maxResults = 8,
  showRecentSearches = true,
}: SearchBarProps) {
  const t = useTranslations('community.search');
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const searchAbortController = useRef<AbortController | null>(null);

  // Load recent searches from localStorage
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Debounced search
  const performSearch = useCallback(async (searchQuery: string) => {
    // Cancel previous request
    if (searchAbortController.current) {
      searchAbortController.current.abort();
    }

    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    searchAbortController.current = new AbortController();

    try {
      const searchResults = await onSearch(searchQuery);
      setResults(searchResults.slice(0, maxResults));
      setShowResults(true);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        // console.error('Search error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [onSearch, maxResults]);

  // Handle input change with debounce
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  }, [performSearch]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            router.push(results[selectedIndex].url);
            setShowResults(false);
          } else if (query.trim()) {
            // Save to recent searches
            const newRecent = [query.trim(), ...recentSearches.filter((s) => s !== query.trim())].slice(0, 5);
            setRecentSearches(newRecent);
            localStorage.setItem('recentSearches', JSON.stringify(newRecent));
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setShowResults(false);
          }
          break;
        case 'Escape':
          setShowResults(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [results, selectedIndex, query, recentSearches, router]
  );

  // Clear search
  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
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

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t('placeholder')}
          className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
          aria-label={t('search')}
          autoComplete="off"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label={t('clear')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-10 pr-3 flex items-center">
            <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 rounded-lg shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
          {/* Recent Searches */}
          {!query && showRecentSearches && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('recent')}
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    performSearch(search);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors text-left"
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {query && (
            <>
              {results.length === 0 && !isLoading ? (
                <div className="p-8 text-center">
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
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('noResults')}</p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {results.map((result, index) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      className={`
                        flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors
                        ${index === selectedIndex ? 'bg-gray-50 dark:bg-zinc-700/50' : ''}
                      `}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {/* Icon/Thumbnail */}
                      <div className="flex-shrink-0">
                        {result.avatar ? (
                          <img
                            src={result.avatar}
                            alt={result.title}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : result.thumbnail ? (
                          <img
                            src={result.thumbnail}
                            alt={result.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-400">
                            <SearchResultIcon type={result.type} />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {result.title}
                        </div>
                        {result.subtitle && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {result.subtitle}
                          </div>
                        )}
                      </div>

                      {/* Type Badge */}
                      <div className="flex-shrink-0">
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 rounded-full capitalize">
                          {result.type}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Footer */}
          {query && results.length > 0 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="block p-3 text-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors border-t border-gray-200 dark:border-zinc-700"
            >
              {t('seeAll')}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(SearchBar);
