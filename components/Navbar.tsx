'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import BookVisitBtn from './BookVisitBtn'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const t = useTranslations('navbar');
    const pathname = usePathname();

    const isHomePage = pathname === '/uk' || pathname === '/en' || pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            const threshold = isHomePage ? 120 : -1;
            const isScrolled = window.scrollY > threshold;
            setScrolled(isScrolled);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    return (
        <header className={`
            sticky top-0 z-50 transition-all duration-300
            ${scrolled ? 'bg-[#F5F3EF] shadow-md' : 'bg-transparent'}
        `}>
            <nav className='w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4'>
                <div className='flex items-center justify-between gap-8 xl:gap-12 2xl:gap-16'>

                    {/* Logo and Title */}
                    <Link
                        href="/"
                        className='flex items-center gap-2 sm:gap-3 min-w-fit flex-shrink-0'
                    >
                        <Image
                            src="/icons/logo.png"
                            alt='logo'
                            width={16}
                            height={16}
                            className='h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0'
                        />
                        <div className='hidden md:flex flex-col leading-tight'>
                            <span className='text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap'>
                                {t('nameDepartment')}
                            </span>
                            <span className='text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap'>
                                {t('nameClinicFull')}
                            </span>
                        </div>
                        <div className='flex md:hidden flex-col leading-tight'>
                            <span className='text-xs font-medium text-gray-800'>
                                {t('nameDepartment')}
                            </span>
                            <span className='text-[9px] text-gray-600'>
                                {t('nameClinicSm')}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation (xl and above) */}
                    <div className='hidden xl:flex items-center justify-between flex-1'>
                        <LanguageSwitcher />


                        <ul className='flex items-center gap-6 2xl:gap-12 list-none absolute right-90'>
                            <li>
                                <Link
                                    href="/services"
                                    className='text-[19px] font-medium text-gray-900 hover:text-burgundy transition-colors whitespace-nowrap'
                                >
                                    {t('services')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/team"
                                    className='text-[19px] font-medium text-gray-900 hover:text-burgundy transition-colors whitespace-nowrap'
                                >
                                    {t('team')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacts"
                                    className='text-[19px] font-medium text-gray-900 hover:text-burgundy transition-colors whitespace-nowrap'
                                >
                                    {t('contacts')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Tablet Navigation (lg to xl) */}
                    <div className='hidden lg:flex xl:hidden items-center justify-between gap-8 flex-1'>
                        <LanguageSwitcher />

                        <ul className='flex items-center gap-4 list-none'>
                            <li>
                                <Link
                                    href="/services"
                                    className='text-base font-medium text-gray-900 hover:text-burgundy transition-colors'
                                >
                                    {t('services')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/team"
                                    className='text-base font-medium text-gray-900 hover:text-burgundy transition-colors'
                                >
                                    {t('team')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacts"
                                    className='text-base font-medium text-gray-900 hover:text-burgundy transition-colors'
                                >
                                    {t('contacts')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Button - Right aligned */}
                    <div className='sm:flex flex-shrink-0 xl:ml-38 2xl:ml-65'>
                        <BookVisitBtn />
                    </div>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors flex-shrink-0'
                        aria-label='Toggle menu'
                    >
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            ) : (
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className='lg:hidden mt-4 pb-4 border-t pt-4 space-y-4 animate-slideDown'>
                        <LanguageSwitcher />

                        <ul className='flex flex-col gap-3 list-none'>
                            <li>
                                <Link
                                    href="/services"
                                    className='text-sm font-medium text-gray-700 hover:text-gray-900 block'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('services')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/team"
                                    className='text-sm font-medium text-gray-700 hover:text-gray-900 block'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('team')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacts"
                                    className='text-sm font-medium text-gray-700 hover:text-gray-900 block'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('contacts')}
                                </Link>
                            </li>
                        </ul>

                        <div className='block sm:hidden'>
                            <BookVisitBtn />
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar