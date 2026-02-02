'use client'

import React from 'react'
import { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import StarBorder from './StarBorder'

const BookVisitBtn = () => {
    const t = useTranslations('navbar');
    const handleBooking = () => {
        const bookingSection = document.getElementById('booking')
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        if (CSS.registerProperty) {
            try {
                CSS.registerProperty({
                    name: '--angle-1',
                    syntax: '<angle>',
                    inherits: false,
                    initialValue: '-75deg'
                });
            } catch (e) {

            }
        }
    }, []);

    return (
        <>
            <style jsx>{`
        @supports not (background: paint(something)) {
          @property --angle-1 {
            syntax: "<angle>";
            inherits: false;
            initial-value: -75deg;
          }
        }
      `}</style>

            <div className="glass-button-wrap">
                <button
                    type="button"
                    onClick={handleBooking}
                    className="glass-booking-button px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 py-2.5 sm:py-3 md:py-3.5 group"
                >
                    <span className="button-content">
                        <span className='hidden xl:flex xl:items-center text-xs sm:text-sm font-medium uppercase text-center leading-tight'>
                            <span>{t('buttonFull')}</span>
                        </span>
                        <span className='hidden md:inline xl:hidden text-xs font-medium uppercase'>
                            {t('buttonFull')}
                        </span>
                        <span className='inline md:hidden text-xs font-medium'>
                            {t('buttonSm')}
                        </span>
                        <Image
                            src="/icons/arrow-right.svg"
                            alt='arrow'
                            width={16}
                            height={16}
                            className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300'
                        />
                    </span>
                </button>
                <div className="glass-button-shadow"></div>
            </div>
        </>
    );
}

export default BookVisitBtn