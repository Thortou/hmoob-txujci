import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-sky-200 dark:bg-zinc-800 py-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-sky-800 dark:text-sky-400">
              {t('title')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('tagline')}
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition"
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition"
            >
              {t('nav.contact')}
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
