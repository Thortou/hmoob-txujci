'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Section Card Component
function SectionCard({
  title,
  subtitle,
  description,
  items,
  icon,
  index,
  extraText = ''
}: {
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  icon: string;
  index: number;
  extraText?: string;
}) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-100 dark:border-amber-900/30"
    >
      <div className="relative h-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl" role="img" aria-label="icon">
            {icon}
          </span>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-400">
              {title}
            </h3>
            <p className="text-sm md:text-base text-amber-600 dark:text-amber-500 font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
          {description}
        </p>

        <ul className="space-y-3">
          {items.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm md:text-base"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                ✓
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>

        {extraText && (
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
            <p className="text-sm md:text-base text-amber-800 dark:text-amber-300 italic">
              {extraText}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Value Card Component
function ValueCard({
  title,
  description,
  icon,
  index
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={scaleIn}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-800 dark:to-zinc-900 rounded-xl p-6 border border-amber-200 dark:border-amber-800/30 hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300"
    >
      <div className="text-5xl mb-4" role="img" aria-label="icon">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-amber-800 dark:text-amber-400 mb-3">
        {title}
      </h4>
      <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function AboutPage() {
  const t = useTranslations('about');

  const sections = [
    {
      key: 'newYear' as const,
      icon: '🎉',
      items: 'traditions',
      extraText: 'duration'
    },
    {
      key: 'farming' as const,
      icon: '🌾',
      items: 'practices',
      extraText: 'philosophy'
    },
    {
      key: 'wedding' as const,
      icon: '💒',
      items: 'traditions',
      extraText: 'symbolism'
    },
    {
      key: 'villageLife' as const,
      icon: '🏘️',
      items: 'activities',
      extraText: 'values'
    }
  ];

  const valueIcons = ['👨‍👩‍👧‍👦', '🤝', '📚', '🌱'];

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": t('title'),
            "description": t('hero.description'),
            "image": "/qeej5.png"
          })
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-4 md:pt-32 md:pb-8 px-4">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-sky-900 animate-pulse"></div>
          </div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-6xl mx-auto text-center relative z-10"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-3xl -mt-10 md:text-5xl py-4 lg:text-6xl font-bold mb-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-amber-700 dark:text-amber-400 font-medium mb-1"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="max-w-3xl mx-auto"
            >
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                {t('hero.description')}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Cultural Traditions Section */}
        <section className="py-4 md:py-10 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
            >
              {sections.map((section, index) => (
                <SectionCard
                  key={section.key}
                  title={t(`sections.${section.key}.title`)}
                  subtitle={t(`sections.${section.key}.subtitle`)}
                  description={t(`sections.${section.key}.description`)}
                  items={t.raw(`sections.${section.key}.${section.items}`)}
                  icon={section.icon}
                  index={index}
                  extraText={t(`sections.${section.key}.${section.extraText}`)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-4 md:py-10 px-4 md:px-6 bg-white/50 dark:bg-zinc-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-4">
                {t('values.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                {t('values.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {t.raw('values.items').map((item: { title: string; description: string }, index: number) => (
                <ValueCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={valueIcons[index]}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-4">
                {t('gallery.title')}
              </h2>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {t.raw('gallery.images').map((image: { alt: string }, index: number) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg group"
                >
                  <Image
                    src={['/education1.jpeg', '/education2.jpeg', '/education3.jpeg', '/education4.jpeg'][index]}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={scaleIn}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('callToAction.title')}
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                {t('callToAction.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/community"
                  className="px-8 py-4 bg-white text-amber-600 rounded-xl font-bold hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t('callToAction.button')}
                </Link>
                <Link
                  href="/home"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
                >
                  {t('callToAction.secondaryButton')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
