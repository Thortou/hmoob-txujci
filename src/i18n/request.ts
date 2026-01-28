import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import enNav from '@/messages/en/nav.json';
import enHome from '@/messages/en/home.json';
import enAbout from '@/messages/en/about.json';
import enContact from '@/messages/en/contact.json';
import enProducts from '@/messages/en/products.json';
import enFooter from '@/messages/en/footer.json';
import enConsent from '@/messages/en/consent.json';
import enBanner from '@/messages/en/banner.json';
import enScrollToTop from '@/messages/en/scrollToTop.json';
import enCommunity from '@/messages/en/community.json';

import laNav from '@/messages/la/nav.json';
import laHome from '@/messages/la/home.json';
import laAbout from '@/messages/la/about.json';
import laContact from '@/messages/la/contact.json';
import laProducts from '@/messages/la/products.json';
import laFooter from '@/messages/la/footer.json';
import laConsent from '@/messages/la/consent.json';
import laBanner from '@/messages/la/banner.json';
import laScrollToTop from '@/messages/la/scrollToTop.json';
import laCommunity from '@/messages/la/community.json';

import jaNav from '@/messages/ja/nav.json';
import jaHome from '@/messages/ja/home.json';
import jaAbout from '@/messages/ja/about.json';
import jaContact from '@/messages/ja/contact.json';
import jaProducts from '@/messages/ja/products.json';
import jaFooter from '@/messages/ja/footer.json';
import jaConsent from '@/messages/ja/consent.json';
import jaBanner from '@/messages/ja/banner.json';
import jaScrollToTop from '@/messages/ja/scrollToTop.json';
import jaCommunity from '@/messages/ja/community.json';

import koNav from '@/messages/ko/nav.json';
import koHome from '@/messages/ko/home.json';
import koAbout from '@/messages/ko/about.json';
import koContact from '@/messages/ko/contact.json';
import koProducts from '@/messages/ko/products.json';
import koFooter from '@/messages/ko/footer.json';
import koConsent from '@/messages/ko/consent.json';
import koBanner from '@/messages/ko/banner.json';
import koScrollToTop from '@/messages/ko/scrollToTop.json';
import koCommunity from '@/messages/ko/community.json';

import zhNav from '@/messages/zh/nav.json';
import zhHome from '@/messages/zh/home.json';
import zhAbout from '@/messages/zh/about.json';
import zhContact from '@/messages/zh/contact.json';
import zhProducts from '@/messages/zh/products.json';
import zhFooter from '@/messages/zh/footer.json';
import zhConsent from '@/messages/zh/consent.json';
import zhBanner from '@/messages/zh/banner.json';
import zhScrollToTop from '@/messages/zh/scrollToTop.json';
import zhCommunity from '@/messages/zh/community.json';

import thNav from '@/messages/th/nav.json';
import thHome from '@/messages/th/home.json';
import thAbout from '@/messages/th/about.json';
import thContact from '@/messages/th/contact.json';
import thProducts from '@/messages/th/products.json';
import thFooter from '@/messages/th/footer.json';
import thConsent from '@/messages/th/consent.json';
import thBanner from '@/messages/th/banner.json';
import thScrollToTop from '@/messages/th/scrollToTop.json';
import thCommunity from '@/messages/th/community.json';

import hmNav from '@/messages/hm/nav.json';
import hmHome from '@/messages/hm/home.json';
import hmAbout from '@/messages/hm/about.json';
import hmContact from '@/messages/hm/contact.json';
import hmProducts from '@/messages/hm/products.json';
import hmFooter from '@/messages/hm/footer.json';
import hmConsent from '@/messages/hm/consent.json';
import hmBanner from '@/messages/hm/banner.json';
import hmScrollToTop from '@/messages/hm/scrollToTop.json';
import hmCommunity from '@/messages/hm/community.json';

import viNav from '@/messages/vi/nav.json';
import viHome from '@/messages/vi/home.json';
import viAbout from '@/messages/vi/about.json';
import viContact from '@/messages/vi/contact.json';
import viProducts from '@/messages/vi/products.json';
import viFooter from '@/messages/vi/footer.json';
import viConsent from '@/messages/vi/consent.json';
import viBanner from '@/messages/vi/banner.json';
import viScrollToTop from '@/messages/vi/scrollToTop.json';
import viCommunity from '@/messages/vi/community.json';


export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the locale of the request
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messagesMap: Record<string, any> = {
    en: {
      nav: enNav,
      home: enHome,
      about: enAbout,
      contact: enContact,
      footer: enFooter,
      consent: enConsent,
      banner: enBanner,
      scrollToTop: enScrollToTop,
      community: enCommunity,
      products: enProducts,    },
    la: {
      nav: laNav,
      home: laHome,
      about: laAbout,
      contact: laContact,
      footer: laFooter,
      consent: laConsent,
      banner: laBanner,
      scrollToTop: laScrollToTop,
      community: laCommunity,
      products: laProducts,    },
    ja: {
      nav: jaNav,
      home: jaHome,
      about: jaAbout,
      contact: jaContact,
      footer: jaFooter,
      consent: jaConsent,
      banner: jaBanner,
      scrollToTop: jaScrollToTop,
      community: jaCommunity,
      products: jaProducts,    },
    ko: {
      nav: koNav,
      home: koHome,
      about: koAbout,
      contact: koContact,
      footer: koFooter,
      consent: koConsent,
      banner: koBanner,
      scrollToTop: koScrollToTop,
      community: koCommunity,
      products: koProducts,    },
    zh: {
      nav: zhNav,
      home: zhHome,
      about: zhAbout,
      contact: zhContact,
      footer: zhFooter,
      consent: zhConsent,
      banner: zhBanner,
      scrollToTop: zhScrollToTop,
      community: zhCommunity,
      products: zhProducts,    },
    th: {
      nav: thNav,
      home: thHome,
      about: thAbout,
      contact: thContact,
      footer: thFooter,
      consent: thConsent,
      banner: thBanner,
      scrollToTop: thScrollToTop,
      community: thCommunity,
      products: thProducts,    },
    hm: {
      nav: hmNav,
      home: hmHome,
      about: hmAbout,
      contact: hmContact,
      footer: hmFooter,
      consent: hmConsent,
      banner: hmBanner,
      scrollToTop: hmScrollToTop,
      community: hmCommunity,
      products: hmProducts,    },
    vi: {
      nav: viNav,
      home: viHome,
      about: viAbout,
      contact: viContact,
      footer: viFooter,
      consent: viConsent,
      banner: viBanner,
      scrollToTop: viScrollToTop,
      community: viCommunity,
      products: viProducts,    },
  };

  const messages = messagesMap[locale] || messagesMap.en;

  return {
    locale,
    messages,
  };
});
