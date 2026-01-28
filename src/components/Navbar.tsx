"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import LanguageSwitcher from "./LanguageSwitcher";
import { routing } from '@/src/i18n/routing';
import Image from "next/image";
function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  type Locale = (typeof routing.locales)[number];
  function getPathWithoutLocale(pathname: string) {
    const locales = routing.locales as readonly Locale[];
    const segments = pathname.split("/");

    if (segments[1] && locales.includes(segments[1] as Locale)) {
      return "/" + segments.slice(2).join("/");
    }

    return pathname;
  }

  const pathname = usePathname();
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  const isActive =
    pathWithoutLocale === href ||
    pathWithoutLocale.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`hover:text-sky-600 transition relative ${isActive ? "text-sky-600 font-semibold" : ""
        }`}
      onClick={onClick}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-600"></span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const logo = '/qeej5.png'
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 py-1 h-14 shadow-md bg-sky-200">
      <Link href="/" className="md:text-2xl text-lg text-slate-500 font-bold hover:text-sky-700 transition">
        <Image
          src={logo}
          alt="Hmoob Txuj CI logo"
          width={70}
          height={45}
          className="object-cover absolute md:left-1 left-1 top-3 scale-x-[-1] rotate-4"
        />
        <Image
          src={logo}
          alt="Hmoob Txuj CI logo"
          width={70}
          height={45}
          className="object-cover absolute md:left-41 left-26 top-3 -rotate-4"
        /> 
        HMOOB TXUJ CI
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10 items-center">
        <NavLink href="/home">{t('home')}</NavLink>
        <NavLink href="/about">{t('about')}</NavLink>
        <NavLink href="/products">{t('products')}</NavLink>
        <NavLink href="/contact">{t('contact')}</NavLink>
        <NavLink href="/community">{t('community')}</NavLink>
        <LanguageSwitcher />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-sky-200 md:hidden flex flex-col items-center gap-4 py-4 shadow-md">
          <NavLink href="/home" onClick={() => setIsOpen(false)}>
            {t('home')}
          </NavLink>
          <NavLink href="/about" onClick={() => setIsOpen(false)}>
            {t('about')}
          </NavLink>
          <NavLink href="/products" onClick={() => setIsOpen(false)}>
            {t('products')}
          </NavLink>
          <NavLink href="/contact" onClick={() => setIsOpen(false)}>
            {t('contact')}
          </NavLink>
          <NavLink href="/community" onClick={() => setIsOpen(false)}>
            {t('community')}
          </NavLink>
          <LanguageSwitcher />
        </div>
      )}
    </nav>
  );
}
