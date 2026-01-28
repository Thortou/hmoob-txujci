'use client';

/**
 * BannerSlider Component
 *
 * A modern hero banner slider using Swiper.js with:
 * - Autoplay with configurable delay
 * - Infinite loop
 * - Pagination dots
 * - Navigation arrows
 * - Touch/swipe support
 * - Responsive behavior
 * - Lazy loading images
 * - Keyboard navigation
 * - ARIA labels for accessibility
 *
 * @example
 * ```tsx
 * import BannerSlider from '@/components/BannerSlider';
 *
 * export default function Home() {
 *   return <BannerSlider />;
 * }
 * ```
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Keyboard, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ============================================================================
// Types
// ============================================================================

/**
 * Call-to-action button configuration
 */
export interface CTAButton {
  /** Button label text */
  label: string;
  /** Navigation link or action URL */
  link: string;
  /** Optional: Open link in new tab */
  openInNewTab?: boolean;
  /** Optional: Button style variant */
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * Individual slide data structure
 */
export interface BannerSlide {
  id: string | number;
  image: string;
  title: string;
  description?: string;
  cta?: CTAButton;
  className?: string;
}

// ============================================================================
// Example Slide Data
// ============================================================================

/**
 * Example banner slides data
 * Replace with your actual banner images and content
 */
export const exampleSlides: BannerSlide[] = [
  {
    id: 1,
    image: '/banner1.png',
    title: 'Welcome to Our Platform',
    description: 'Discover amazing features and possibilities with our cutting-edge solution.',
    cta: {
      label: 'Get Started',
      link: '/about',
      variant: 'primary',
    },
  },
  {
    id: 2,
    image: '/banner2.png',
    title: 'Build Something Great',
    description: 'Join thousands of users who are already transforming their workflow.',
    cta: {
      label: 'Learn More',
      link: '/contact',
      variant: 'secondary',
    },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    title: 'Modern Solutions',
    description: 'Experience the future of productivity with our innovative tools.',
    cta: {
      label: 'Explore Now',
      link: '/about',
      variant: 'outline',
    },
  }
];

// ============================================================================
// Slider Configuration
// ============================================================================

/**
 * Default slider configuration options
 */
interface SliderConfig {
  /** Autoplay delay in milliseconds (default: 5000ms = 5 seconds) */
  autoplayDelay?: number;
  /** Enable/disable autoplay (default: true) */
  autoplay?: boolean;
  /** Enable/disable infinite loop (default: true) */
  loop?: boolean;
  /** Show pagination dots (default: true) */
  pagination?: boolean;
  /** Show navigation arrows (default: true) */
  navigation?: boolean;
  /** Enable keyboard navigation (default: true) */
  keyboard?: boolean;
  /** Enable lazy loading for images (default: true) */
  lazy?: boolean;
  /** Animation type: 'slide' or 'fade' (default: 'slide') */
  effect?: 'slide' | 'fade';
  /** Slide transition speed in milliseconds (default: 600) */
  speed?: number;
}

const defaultConfig: SliderConfig = {
  autoplayDelay: 5000,
  autoplay: true,
  loop: true,
  pagination: true,
  navigation: true,
  keyboard: true,
  lazy: true,
  effect: 'slide',
  speed: 600,
};

// ============================================================================
// Main Component
// ============================================================================

interface BannerSliderProps {
  /** Array of slide data (uses exampleSlides if not provided) */
  slides?: BannerSlide[];
  /** Slider configuration options */
  config?: SliderConfig;
  /** Optional: Custom CSS class for the slider container */
  className?: string;
}

export default function BannerSlider({
  slides = exampleSlides,
  config = defaultConfig,
  className = '',
}: BannerSliderProps) {
  const t = useTranslations('banner');

  // Get translated slide data from messages
  const translatedSlides: BannerSlide[] = t.raw('slides').map((slide: {
    id: number;
    title: string;
    description: string;
    cta: {
      label: string;
      link: string;
    };
  }) => ({
    id: slide.id,
    image: slide.id === 1 ? '/banner1.png' : slide.id === 2 ? '/banner2.png' : 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    title: slide.title,
    description: slide.description,
    cta: slide.cta ? {
      label: slide.cta.label,
      link: slide.cta.link,
      variant: slide.id === 1 ? 'primary' : slide.id === 2 ? 'secondary' : 'outline',
    } : undefined,
  }));

  // Use translated slides if no custom slides provided
  const finalSlides = slides === exampleSlides ? translatedSlides : slides;

  // Get navigation translations
  const navTranslations = {
    prevSlide: t('navigation.prevSlide'),
    nextSlide: t('navigation.nextSlide'),
    firstSlide: t('navigation.firstSlide'),
    lastSlide: t('navigation.lastSlide'),
    // paginationBullet: t('navigation.paginationBullet'),
  };

  // Track if component is mounted on client (SSR compatibility)
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts on client
  // This ensures Swiper only renders on client-side, preventing hydration errors
  // Note: This is a legitimate pattern for client-only components in Next.js SSR
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted) {
    // Placeholder while loading (prevents hydration mismatch)
    return (
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const finalConfig = { ...defaultConfig, ...config };

  return (
    <div className={`banner-slider-container ${className}`}>
      <Swiper
        // Core modules
        modules={[Autoplay, Pagination, Navigation, Keyboard, A11y]}

        // Autoplay configuration
        autoplay={
          finalConfig.autoplay
            ? {
                delay: finalConfig.autoplayDelay,
                disableOnInteraction: false, // Continue autoplay after user interaction
                pauseOnMouseEnter: true, // Pause when mouse hovers
              }
            : false
        }

        // Loop configuration
        loop={finalConfig.loop}

        // Pagination configuration
        pagination={
          finalConfig.pagination
            ? {
                clickable: true,
                dynamicBullets: true, // Show only visible bullets for many slides
              }
            : false
        }

        // Navigation configuration
        navigation={
          finalConfig.navigation
            ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            : false
        }

        // Keyboard navigation
        keyboard={{
          enabled: finalConfig.keyboard,
          onlyInViewport: true, // Only work when slider is visible
        }}

        // Accessibility
        a11y={{
          enabled: true,
          prevSlideMessage: navTranslations.prevSlide,
          nextSlideMessage: navTranslations.nextSlide,
          firstSlideMessage: navTranslations.firstSlide,
          lastSlideMessage: navTranslations.lastSlide,
          // paginationBulletMessage: navTranslations.paginationBullet,
        }}

        // Effect and transitions
        effect={finalConfig.effect}
        speed={finalConfig.speed}
        fadeEffect={{ crossFade: true }} // For fade effect

        // Additional options
        grabCursor={true} // Show grab cursor on hover
        watchSlidesProgress={true} // For better lazy loading
        preventInteractionOnTransition={false}

        // Responsive breakpoints
        breakpoints={{
          // Mobile: 1 slide per view
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // Tablet: 1 slide per view
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // Desktop: 1 slide per view
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}

        className="banner-swiper w-full h-full"
      >
        {finalSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Slide Content */}
            <div
              className={`relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden ${slide.className || ''}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {finalConfig.lazy ? (
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={slide.id === finalSlides[0]?.id} // Prioritize first slide
                  />
                ) : (
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
              </div>

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* Text Content */}
              <div className="relative h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white z-10">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 max-w-2xl drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Description */}
                {slide.description && (
                  <p className="text-base md:text-lg lg:text-xl max-w-xl mb-6 md:mb-8 text-gray-100 drop-shadow-md">
                    {slide.description}
                  </p>
                )}

                {/* CTA Button */}
                {slide.cta && (
                  <a
                    href={slide.cta.link}
                    target={slide.cta.openInNewTab ? '_blank' : undefined}
                    rel={slide.cta.openInNewTab ? 'noopener noreferrer' : undefined}
                    className={getButtonClasses(slide.cta.variant)}
                    aria-label={`Go to ${slide.cta.label}`}
                  >
                    {slide.cta.label}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        {finalConfig.navigation && (
          <>
            <button
              className="swiper-button-prev absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full transition-all duration-300 group"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="swiper-button-next absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full transition-all duration-300 group"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Pagination will be automatically rendered by Swiper */}
      </Swiper>

      {/* Custom Styles for Swiper Pagination */}
      <style jsx global>{`
        .banner-swiper .swiper-pagination {
          bottom: 20px !important;
        }

        .banner-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          background: white;
          width: 32px;
          border-radius: 6px;
        }

        /* Dark mode pagination adjustments */
        @media (prefers-color-scheme: dark) {
          .banner-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.4);
          }
        }

        /* Navigation arrows on very small screens */
        @media (max-width: 480px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 36px;
            height: 36px;
          }

          .swiper-button-prev svg,
          .swiper-button-next svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get CSS classes for CTA button based on variant
 */
function getButtonClasses(variant: CTAButton['variant'] = 'primary'): string {
  const baseClasses =
    'inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';

  const variants: Record<string, string> = {
    primary: 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-white',
    secondary:
      'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500 shadow-lg',
    outline:
      'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white',
  };

  return `${baseClasses} ${variants[variant] || variants.primary}`;
}
