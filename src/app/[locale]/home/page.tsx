import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { Metadata } from 'next';
import BannerSlider from '../../../components/BannerSlider';
import { exampleSlides } from '../../../components/BannerSlider';
import Education from './education';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  // You could fetch translations here based on locale
  const title = locale === 'en'
    ? "Learn Next - Build Modern Web Applications with Hmong Culture"
    : "Learn Next - Hmong Culture & Modern Web Development";

  const description = locale === 'en'
    ? "Discover the power of Next.js with Hmong cultural integration. Learn about Hmong traditions, New Year celebrations, farming, weddings, and village life."
    : "Explore Hmong culture and learn modern web development with Next.js.";

  return {
    title,
    description,
    keywords: "Next.js, Hmong culture, Hmong New Year, web development, React, Tailwind CSS, Hmong traditions",
    openGraph: {
      title,
      description,
      url: `https://yourdomain.com/${locale}`,
      siteName: "Learn Next",
      locale: locale,
      type: "website",
      images: [
        {
          url: "/qeej5.png",
          width: 621,
          height: 402,
          alt: "Learn Next - Hmong Culture"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/qeej5.png"]
    },
    alternates: {
      canonical: `https://yourdomain.com/${locale}`,
      languages: {
        'en': 'https://yourdomain.com/en',
        'hm': 'https://yourdomain.com/hm',
        'la': 'https://yourdomain.com/la',
        'th': 'https://yourdomain.com/th',
        'vi': 'https://yourdomain.com/vi',
        'zh': 'https://yourdomain.com/zh',
        'ko': 'https://yourdomain.com/ko',
        'ja': 'https://yourdomain.com/ja'
      } as Record<string, string>
    }
  };
}

export default function Home() {
  const t = useTranslations('home');

  return (
    <main className="flex flex-col bg-zinc-50 dark:bg-zinc-900 min-h-screen">
      {/* Banner Slider Section */}
      <section className="w-full">
        <BannerSlider
          slides={exampleSlides}
          config={{
            autoplayDelay: 2500,
            autoplay: true,
            loop: true,
            pagination: true,
            navigation: true,
            keyboard: true,
            lazy: true,
            effect: 'slide',
            speed: 600,
          }}
        />
      </section>

      {/* Hero Content Section */}
      <section className="flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-sky-600">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('subtitle')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/about"
              className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition shadow-md"
            >
              {t('buttons.learnMore')}
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-sky-500 text-sky-600 rounded-lg hover:bg-sky-50 transition"
            >
              {t('buttons.getInTouch')}
            </Link>
            <Link
              href="/home/book-demo"
              className="px-6 py-3 border-2 border-sky-500 text-sky-600 rounded-lg hover:bg-sky-50 transition"
            >
              Book
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-3 text-sky-600">
              {t('features.fast.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('features.fast.description')}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-3 text-sky-600">
              {t('features.modern.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('features.modern.description')}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-3 text-sky-600">
              {t('features.easy.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('features.easy.description')}
            </p>
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center items-center">
        <Education/>
      </div>
    </main>
  );
}
