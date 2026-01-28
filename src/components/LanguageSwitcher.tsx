"use client";

import { useState } from "react";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/src/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const locales = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'la', label: 'ລາວ', flag: '🇱🇦' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'th', label: 'ไทย', flag: '🇹🇭' },
    { code: 'hm', label: 'Hmoob', flag: '🇰🇬' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' }
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const currentLocale = locales.find(l => l.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-zinc-800 rounded-lg hover:bg-sky-50 dark:hover:bg-zinc-700 transition border border-gray-300 dark:border-zinc-600"
      >
        <span className="text-lg">{currentLocale?.flag}</span>
        <span className="text-sm font-medium">{currentLocale?.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 overflow-hidden z-50">
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              className={`w-full px-4 py-2 text-left hover:bg-sky-50 dark:hover:bg-zinc-700 transition flex items-center gap-3 ${
                loc.code === locale ? 'bg-sky-100 dark:bg-zinc-700' : ''
              }`}
            >
              <span className="text-lg">{loc.flag}</span>
              <span className="text-sm">{loc.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
