import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/src/i18n/routing';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConsentBanner from "../../components/ConsentBanner";
import ScrollToTop from "../../components/ScrollToTop";

export const metadata: Metadata = {
  title: "Learn Next",
  description: "Building modern web applications with Next.js",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Check if we're on the chat page using headers
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isChatPage = pathname.includes('/chat');

  return (
    <NextIntlClientProvider messages={messages}>
      {!isChatPage && <Navbar />}
      <div className={isChatPage ? '' : 'pt-14'}>
        {children}
      </div>
      {!isChatPage && <Footer />}
      {!isChatPage && <ConsentBanner />}
      {!isChatPage && <ScrollToTop />}
    </NextIntlClientProvider>
  );
}
