"use client";

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import Link from "next/link";

export type ConsentStatus = 'pending' | 'accepted' | 'blocked';

const CONSENT_KEY = 'cookie_consent';

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  const saved = localStorage.getItem(CONSENT_KEY);
  return (saved as ConsentStatus) || 'pending';
}

export function setConsentStatus(status: ConsentStatus) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, status);
}

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('consent');

  useEffect(() => {
    // Check if user has already made a choice
    const status = getConsentStatus();
    if (status === 'pending') {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsentStatus('accepted');
    setIsVisible(false);

    // Enable analytics/tracking here
    // Example: window.gtag('consent', 'update', {'analytics_storage': 'granted'});
    console.log('Consent accepted - analytics enabled');
  };

  const handleBlock = () => {
    setConsentStatus('blocked');
    setIsVisible(false);

    // Disable analytics/tracking here
    // Example: window.gtag('consent', 'update', {'analytics_storage': 'denied'});
    console.log('Consent blocked - analytics disabled');
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
    >
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-sky-600 dark:text-sky-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2
              id="consent-title"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              {t('title')}
            </h2>
          </div>
          <p
            id="consent-description"
            className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {t('description')}
          </p>
        </div>

        {/* Additional Info */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-zinc-700/50 rounded-xl">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('details')}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleBlock}
            className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-800"
            aria-label={t('blockAria')}
          >
            {t('block')}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition font-medium text-sm shadow-lg shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800"
            aria-label={t('acceptAria')}
          >
            {t('accept')}
          </button>
        </div>

        {/* Privacy Link */}
        <div className="mt-4 text-center">
          <Link
            href="/privacy"
            className="text-xs text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t('learnMore')}
          </Link>
        </div>
      </div>
    </div>
  );
}
