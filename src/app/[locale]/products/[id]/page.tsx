'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { khaubNcawsHmong } from '@/src/lib/mock-data.hmong';
import { message } from 'antd';

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

export default function ProductDetailPage() {
  const t = useTranslations('products');
  const params = useParams();
  const productId = parseInt(params.id as string);

  const product = khaubNcawsHmong.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState(product?.size || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = khaubNcawsHmong
    .filter(p => p.name === product.name && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    message.success(`${t('detail.addToCartSuccess')} ${product.name}`);
  };

  const handleBuyNow = () => {
    message.success(t('detail.buyNowSuccess'));
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.image,
            "offers": {
              "@type": "Offer",
              "price": product.price.replace('$', ''),
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": `https://yourdomain.com/products/${product.id}`
            },
            "description": t('detail.description'),
            "brand": {
              "@type": "Brand",
              "name": "Hmong Traditional Clothing"
            }
          })
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
      {/* Breadcrumb */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-amber-600 hover:text-amber-700 dark:text-amber-400">
              {t('detail.breadcrumb.home')}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-amber-600 hover:text-amber-700 dark:text-amber-400">
              {t('detail.breadcrumb.products')}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 dark:text-gray-400">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Product Image */}
            <motion.div variants={scaleIn} className="space-y-4">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-800 dark:to-zinc-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-amber-500 transition-all bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-800 dark:to-zinc-900"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} view ${i}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 100px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              variants={fadeInUp}
              className="space-y-6"
            >
              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                    {product.price}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('detail.description')}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t('detail.size')}: {selectedSize}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-amber-500 text-white shadow-lg scale-105'
                          : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t('detail.quantity')}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-xl font-bold text-gray-700 dark:text-gray-300"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-xl font-bold text-gray-700 dark:text-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t('detail.addToCart')}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t('detail.buyNow')}
                </button>
              </div>

              {/* Features */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <ul className="space-y-3">
                  {[
                    t('detail.features.traditional'),
                    t('detail.features.handmade'),
                    t('detail.features.premium'),
                    t('detail.features.authentic')
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-amber-700 dark:text-amber-400 mb-4">
                {t('detail.relatedProducts')}
              </h2>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  variants={scaleIn}
                  whileHover={{ y: -8 }}
                >
                  <Link
                    href={`/products/${relatedProduct.id}`}
                    className="block bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-100 dark:border-amber-900/30 group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Size: {relatedProduct.size}</span>
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          {relatedProduct.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Products */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('detail.backToProducts')}
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
