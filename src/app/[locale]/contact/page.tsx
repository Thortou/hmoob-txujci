"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { Form, Input, Textarea, SubmitButton, message } from '@/src/components/forms';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = (values: any) => {
    setLoading(true);
    console.log("Form submitted:", values);

    // Simulate API call
    setTimeout(() => {
      message.success(t('form.successMessage'));
      setLoading(false);
    }, 1000);
  };

  const contactInfo = {
    phone: "+856 20 5599 9111",
    email: "thortouher@gmail.com",
    facebook: "Hmoob txuj ci",
    address: "ນະຄອນຫລວງວຽງຈັນ, ໄຊເສດຖາ, ຈອມມະນີໃຕ້",
    instagram: "https://instagram.com/yourprofile",
    tiktok: "https://tiktok.com/@yourprofile",
    line: "https://line.me/yourprofile",
    youtube: "https://www.youtube.com/@ThortouHER"
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Learn Next - Hmong Culture",
              "email": contactInfo.email,
              "telephone": contactInfo.phone,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": contactInfo.address,
                "addressCountry": "LA"
              },
              "url": "https://yourdomain.com"
            }
          })
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-200 to-slate-700 dark:from-sky-800 dark:to-blue-900 py-16 px-4">
          <div className="max-w-6xl mx-auto text-center pt-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-sky-100 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Information Section */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-4 lg:p-6">
              <h2 className="md:text-2xl text-xl font-bold text-sky-600 dark:text-sky-400 mb-4">
                {t('contactInfo.title')}
              </h2>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {t('contactInfo.phone')}
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {t('contactInfo.email')}
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {t('contactInfo.facebook')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {contactInfo.facebook}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-slate-50 to-slate-50 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {t('contactInfo.address')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.162 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4 4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Instagram
                    </h3>
                    <a
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      @yourprofile
                    </a>
                  </div>
                </div>

                {/* TikTok */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      TikTok
                    </h3>
                    <a
                      href={contactInfo.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      @yourprofile
                    </a>
                  </div>
                </div>

                {/* LINE */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.08 2 11.1c0 3.03 1.68 5.73 4.28 7.36-.11.87-.37 2.47-.42 2.64-.06.23.07.32.27.23.18-.08 2.48-1.06 3.49-1.5.68.1 1.39.15 2.1.15 2.1.15.19 0 .38-.01.57-.02l-.01.02c1.77.44 3.39.17 4.69-.77l1.37 1.36c.23.23.6.23.83 0 .83-.23.23-.6 0-.83l-1.39-1.39c.72-.92 1.16-2.12 1.16-3.5 0-1.85-.89-3.5-2.27-4.64-.07-.06-.15-.12-.22-.17.15-.14-.29-.42-.44-.44-1.5-1.76 1.26-4.45-.54-5.92-.1-.08-.2-.15-.3-.22-.15-.11-.31-.2-.48-.28l.01-.01c-1.77-.83-4.01-.35-5.36 1.09-.18.19-.34.4-.48.61-.05.08-.1.16-.15-.24-.07-.19-.15-.37-.25-.55-1.06-1.95-3.49-2.67-5.44-1.61-.14.08-.27.16-.4.25l-.01-.01c-1.37 1.02-1.95 2.78-1.45 4.45.07.24.16.47.27.69-.23.04-.46.09-.68.15-2.12.62-3.48 2.7-3.18 4.89.03.21.08.42.14.62-.12.14-.24.29-.34.44-1.31 1.95-.87 4.59 1.02 5.99.17.13.35.24.53.34l.01.01c.06.03.12.07.19.1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      LINE
                    </h3>
                    <a
                      href={contactInfo.line}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      Add on LINE
                    </a>
                  </div>
                </div>

                {/* YouTube */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      YouTube
                    </h3>
                    <a
                      href={contactInfo.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      Subscribe to Channel
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section - Using Form Components */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-4 lg:p-6">
              <h2 className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-4">
                {t('form.title')}
              </h2>

              <Form
                onFinish={handleFinish}
                layout="vertical"
                className="space-y-4"
              >
                <Input
                  label={t('form.name')}
                  name="name"
                  required
                  placeholder={t('form.placeholders.name')}
                  className="w-full"
                />

                <Input
                  label={t('form.email')}
                  name="email"
                  required
                  type="email"
                  placeholder={t('form.placeholders.email')}
                  className="w-full"
                  rules={[
                    { type: 'email', message: t.raw('contactInfo.email') || 'Please enter a valid email address' }
                  ]}
                />

                <Input
                  label={t('form.subject')}
                  name="subject"
                  required
                  placeholder={t('form.placeholders.subject')}
                  className="w-full"
                />

                <Textarea
                  label={t('form.message')}
                  name="message"
                  required
                  placeholder={t('form.placeholders.message')}
                  rows={6}
                  className="w-full"
                />

                <SubmitButton
                  text={t('form.submitButton')}
                  loading={loading}
                  block
                  className="w-full px-8 py-4 h-auto text-lg font-semibold"
                />
              </Form>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 pb-6">
              <h2 className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">
                {t('location.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('location.description')}
              </p>
            </div>

            <div className="w-full h-96 lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1113.7383762517202!2d102.64271883803616!3d18.001062059978416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sla!4v1769399930581!5m2!1sen!2sla"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('buttons.backToHome')}</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
