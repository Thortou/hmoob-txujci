'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Educaction() {
    const t = useTranslations('home.education');

    const images = [
        "/education1.jpeg",
        "/education2.jpeg",
        "/education3.jpeg",
        "/education4.jpeg",
    ];

    const aiImages = ["/ai1.jpeg", "/ai2.jpeg"];

    const items = [
        t('objectives.item1'),
        t('objectives.item2'),
        t('objectives.item3'),
        t('objectives.item4'),
    ];

    const items2 = [
        t('benefits.item1'),
        t('benefits.item2'),
        t('benefits.item3'),
    ];

    const ai = [
        t('ai.importance1'),
        t('ai.importance2'),
        t('ai.importance3'),
        t('ai.importance4'),
    ];

    return (
        <div className="about px-4 md:px-6 lg:px-8 w-full">
            {/* Education Section */}
            <div className="title">
                <h4 className="font-bold text-base md:text-lg mb-4">{t('title')}</h4>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Text Section */}
                    <div className="w-full md:w-1/2">
                        <p className="text-justify text-gray-600 text-sm md:text-base">
                            {t('description')}
                        </p>
                        <div className="propose mt-2">
                            <h4 className="mb-2 font-bold text-sm md:text-base">{t('objectives.title')}</h4>
                            {items.map((text, index) => (
                                <p key={index} className="text-gray-600 text-sm md:text-base">. {text}</p>
                            ))}
                        </div>
                        <div className="propose mt-2">
                            <h4 className="mb-2 font-bold text-sm md:text-base">{t('benefits.title')}</h4>
                            {items2.map((text, index) => (
                                <p key={index} className="text-gray-600 text-sm md:text-base">. {text}</p>
                            ))}
                        </div>
                    </div>

                    {/* Image Grid Section */}
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-2 md:gap-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative w-full h-32 md:h-40">
                                <Image
                                    src={img}
                                    alt="Education image"
                                    fill
                                    sizes="(min-width: 768px) 25vw, 50vw"
                                    className="object-cover rounded shadow"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Section */}
            <div className="use-ai p-4 md:p-6 mt-6">
                <h4 className="text-base md:text-lg font-bold">
                    {t('ai.title')}
                </h4>

                <div className="description mt-4 flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Image Section with Swiper */}
                    <div className="image-ai relative w-full md:w-1/2 lg:w-160 h-48 md:h-60 lg:h-80 ring bg-gray-100 rounded overflow-hidden">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            loop={true}
                            centeredSlides={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                                bulletClass: 'inline-block w-3 h-3 rounded-full bg-white/50 hover:bg-white',
                                bulletActiveClass: '!bg-white w-[40px]',
                            }}
                            className="w-full h-full"
                        >
                            {aiImages.map((img, index) => (
                                <SwiperSlide key={index} className="relative h-full w-full">
                                    <Image
                                        src={img}
                                        alt={`AI slide ${index + 1}`}
                                        fill
                                        sizes="(min-width: 1024px) 640px, (min-width: 768px) 50vw, 100vw"
                                        className="object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Detail Section */}
                    <div className="detail w-full md:w-1/2">
                        <p className="text-gray-600 mt-2 text-sm md:text-base">
                            {t('ai.description')}
                        </p>

                        <h4 className="mt-4 font-semibold text-sm md:text-base">{t('ai.importanceTitle')}</h4>
                        <div className="how-to mt-1">
                            {ai.map((data, index) => (
                                <p key={index} className="text-gray-600 text-sm md:text-base">{index + 1}. {data}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
