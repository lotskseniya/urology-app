'use client'

import { useTranslations } from 'next-intl';
import ServicesSection from '@/components/servicesSection';
import TeamSection from '@/components/TeamSection';
import TreatmentSteps from '@/components/TreatmentSteps'
import Image from 'next/image';

interface Service {
    id: string
    title: string
    description: string
    icon: string
    slug: string
    [key: string]: unknown // For any additional properties
}

interface HomeClientProps {
    services: Service[];
    locale: string;
    servicesTitle: string;
    servicesSubtitle: string;
}

export default function HomeClient({ services, locale, servicesTitle, servicesSubtitle }: HomeClientProps) {
    const t = useTranslations('hero');

    return (
        <>
            {/* Hero Section */}
            <section className="relative flex justify-top h-screen w-full overflow-hidden">
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id="card-with-tab" clipPathUnits="objectBoundingBox">
                            <path d="
                                M 0.729,0.962 
                                H 0.951 
                                C 0.966,0.962 0.978,0.942 0.978,0.918 
                                L 0.982,0.067 
                                C 0.982,0.042 0.970,0.022 0.955,0.022 
                                H 0.044 
                                C 0.029,0.022 0.017,0.042 0.017,0.067 
                                V 0.864 
                                C 0.017,0.889 0.029,0.909 0.044,0.909 
                                H 0.115 
                                C 0.115,0.909 0.645,0.906 0.687,0.906 
                                C 0.729,0.906 0.712,0.962 0.729,0.962 
                                Z
                            " />
                        </clipPath>
                    </defs>
                </svg>

                <div
                    className="relative flex flex-col py-26 px-4 h-[90dvh] gap-y-8 w-[90dvw] mx-auto z-10"
                    style={{
                        clipPath: 'url(#card-with-tab)',
                        background: 'linear-gradient(180deg, #FDFBF7 0%, #f5f3ef8a 100%)',
                        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #F0F4F8',
                    }}
                >
                    {/* Top section with heading and image */}
                    <div className="relative flex items-start justify-between">
                        {/* Left side text */}
                        <div className="ml-[4vw] w-[40dvw]">
                            <h1 className="font-montserrat text-[4.16vw] tracking-[-.035em] leading-[85%]">
                                <span className="font-medium animate-fadeInUp pl-[7.1vw]" style={{ animationDelay: '200ms' }}>
                                    {t('belief')}
                                </span>
                                <span className="font-bold animate-fadeInUp pl-[.7vw]" style={{ animationDelay: '300ms' }}>
                                    {t('in')}
                                </span>
                                <br />
                                <span className="block font-bold animate-fadeInUp text-right mr-[35%]" style={{ animationDelay: '300ms' }}>
                                    {t('health')}
                                </span>
                                <p className="block font-bold animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                                    {t('withoutCompromises').split('компр')[0]}
                                    <span className="text-[#333333]">
                                        {t('withoutCompromises').includes('компр') ? 'компр' : 'compro'}
                                        {t('compromises')}
                                    </span>
                                </p>
                            </h1>
                        </div>

                        {/* Center image/kidney */}
                        <div className="absolute left-[30%] top-[100%] w-[40vw] h-[25vw]">
                            <Image
                                src="/images/hero-section-image.png"
                                alt="Kidney"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="absolute bottom-16 2xl:bottom-16 md:bottom-8 sm:bottom-20 left-0 right-0 flex justify-end items-end px-4">
                        {/* Right side text */}
                        <div className="mr-[4vw] md:mr-[2vw] 2xl:w-[28dvw] md:w-[22dvw] sm:w-[32dvw] text-right">
                            <h2 className="font-montserrat text-dark-main font-bold text-[3vw] leading-tight mb-6">
                                {t('forEvery')}<br />
                                {t('every')}<br />
                                {t('patient')}
                            </h2>
                            <p
                                className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed uppercase tracking-wide"
                                style={{ fontSize: 'clamp(0.625rem, 0.8vw, 0.875rem)' }}
                            >
                                {t('fastEffective1')}
                                {t('fastEffective2')}
                            </p>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-fadeInUp {
                        animation: fadeInUp 0.8s ease-out forwards;
                        opacity: 0;
                    }
                `}</style>
            </section>

            {/* Services Section */}
            <div>
                <ServicesSection
                    services={services}
                    locale={locale}
                    title={servicesTitle}
                    subtitle={servicesSubtitle}
                />
            </div>


            <TeamSection />

            <TreatmentSteps />
        </>
    );
}