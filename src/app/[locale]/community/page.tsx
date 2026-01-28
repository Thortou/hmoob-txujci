import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import CommunityContent from './CommunityContent';

interface CommunityPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CommunityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'community' });

  return {
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords'),
    openGraph: {
      title: t('seo.og.title'),
      description: t('seo.og.description'),
      url: `https://yourdomain.com/${locale}/community`,
      siteName: "Learn Next",
      locale: locale,
      type: "website",
      images: [
        {
          url: t('seo.og.image'),
          width: 621,
          height: 402,
          alt: "Learn Next - Community"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: t('seo.og.title'),
      description: t('seo.og.description'),
      images: [t('seo.og.image')]
    },
    alternates: {
      canonical: `https://yourdomain.com/${locale}/community`,
      languages: {
        'en': 'https://yourdomain.com/en/community',
        'hm': 'https://yourdomain.com/hm/community',
        'la': 'https://yourdomain.com/la/community',
        'th': 'https://yourdomain.com/th/community',
        'vi': 'https://yourdomain.com/vi/community',
        'zh': 'https://yourdomain.com/zh/community',
        'ko': 'https://yourdomain.com/ko/community',
        'ja': 'https://yourdomain.com/ja/community'
      } as Record<string, string>
    }
  };
}

export default function CommunityPage() {
  return <CommunityContent />;
}
