'use client';

/**
 * ScrollToTop Component
 *
 * A floating button that appears when scrolling down, allowing users to
 * quickly return to the top of the page with smooth animation.
 *
 * @example
 * ```tsx
 * import ScrollToTop from '@/components/ScrollToTop';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       {children}
 *       <ScrollToTop />
 *     </>
 *   );
 * }
 * ```
 */

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ScrollToTopProps {
  /** Show button after scrolling this many pixels (default: 300) */
  showAfter?: number;
  /** Scroll behavior (default: 'smooth') */
  behavior?: ScrollBehavior;
  /** Custom CSS class for the button */
  className?: string;
  /** Button position: 'bottom-right', 'bottom-left', 'bottom-center' (default: 'bottom-right') */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

export default function ScrollToTop({
  showAfter = 300,
  behavior = 'smooth',
  className = '',
  position = 'bottom-right',
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('scrollToTop');

  useEffect(() => {
    // Toggle button visibility based on scroll position
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Clean up
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: behavior,
    });
  };

  // Position classes
  const positionClasses: Record<string, string> = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2',
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed z-50
        w-9 h-9 sm:w-10 sm:h-10
        flex items-center justify-center
        bg-sky-500 hover:bg-sky-600
        text-white
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300
        transform hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
        ${positionClasses[position]}
        ${className}
      `}
      aria-label={t('ariaLabel')}
      title={t('ariaLabel')}
    >
      {/* Up Arrow Icon */}
      <svg
        className="w-4 h-4 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
