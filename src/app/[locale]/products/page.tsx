'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { khaubNcawsHmong } from '@/src/lib/mock-data.hmong';

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

// Product Card Component
function ProductCard({ product, index }: { product: typeof khaubNcawsHmong[0], index: number }) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      <Link
        href={`/products/${product.id}`}
        className="block bg-white dark:bg-zinc-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100 dark:border-amber-900/30 group"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-800 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Info */}
        <div className="p-3">
          {/* Product Name */}
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>

          {/* Size Badge */}
          <div className="inline-flex items-center px-2 py-0.5 mb-2 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
            <span className="mr-1">Size:</span>
            <span>{product.size}</span>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {product.price}
            </span>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsPage() {
  const t = useTranslations('products');

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": khaubNcawsHmong.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "image": product.image,
                "offers": {
                  "@type": "Offer",
                  "price": product.price.replace('$', ''),
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                }
              }
            }))
          })
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-12 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-600 to-slate-800 animate-pulse"></div>
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8"
          >
            {t('subtitle')}
          </motion.p>

          {/* Product Count */}
          {/* <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg"
          >
            <span className="text-gray-700 dark:text-gray-300">
              <span className="font-bold text-amber-600 dark:text-amber-400">{khaubNcawsHmong.length}</span> {t('productCount')}
            </span>
          </motion.div> */}
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {khaubNcawsHmong.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
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
                href="/contact"
                className="px-8 py-4 bg-white text-amber-600 rounded-xl font-bold hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('callToAction.contactButton')}
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                {t('callToAction.aboutButton')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    </>
  );
}
