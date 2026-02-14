'use client'

import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'

const LanguageSwitcher = () => {
  const params = useParams()
  const pathname = usePathname()
  const currentLocale = params?.locale as string || 'uk'

  // Generate new path by replacing locale prefix
  const getLocalizedPath = (newLocale: string) => {
    return pathname.replace(`/${currentLocale}`, `/${newLocale}`)
  }

  return (
    <div className='relative inline-block'>
      <svg width="100" height="22" viewBox="0 0 100 22" className='absolute inset-0 pointer-events-none' style={{ overflow: 'visible' }}>
        {/* Left pill border - rounded left, concave right */}
        <path
          d="M 12.5,0 L 42.5,0 Q 47,0 48.5,3 Q 50,7.5 50,11 Q 50,14.5 48.5,19 Q 47,22 42.5,22 L 12.5,22 Q 0,22 0,11 Q 0,0 12.5,0 Z"
          fill="none"
          stroke="black"
          strokeWidth="1"
          strokeLinecap="round"
          clipPath="inset(0 1px 0 0)"
        />
        {/* Right pill border - concave left, rounded right */}
        <path
          d="M 51.5,3 Q 53,0 57.5,0 L 87.5,0 Q 100,0 100,11 Q 100,22 87.5,22 L 57.5,22 Q 53,22 51.5,19 Q 50,14.5 50,11 Q 50,7.5 51.5,3 Z"
          fill="none"
          stroke="black"
          strokeWidth="1"
          strokeLinecap="round"
          clipPath="inset(0 0 0 1px)"
        />
      </svg>

      <div className='flex relative'>
        <Link
          href={getLocalizedPath('uk')}
          className={`relative px-2.5 py-1 text-xs font-semibold uppercase transition-colors cursor-pointer ${currentLocale === 'uk' ? 'text-[#7B3F3F]' : 'text-[#8B4545]'
            }`}
          style={{
            clipPath: 'path("M 13,1.5 L 42,1.5 Q 46,1.5 47.5,4.5 Q 48.5,8 48.5,11 Q 48.5,14 47.5,17.5 Q 46,20.5 42,20.5 L 13,20.5 Q 1.5,20.5 1.5,11 Q 1.5,1.5 13,1.5 Z")',
            background: currentLocale === 'uk' ? '#f5f0ebab' : 'transparent',
            width: '50px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          UKR
        </Link>

        <Link
          href={getLocalizedPath('en')}
          className={`relative px-2.5 py-1 text-xs font-semibold uppercase transition-colors cursor-pointer ${currentLocale === 'en' ? 'text-white' : 'text-black'
            }`}
          style={{
            clipPath: 'path("M 2,4.5 Q 3.5,1.5 8,1.5 L 37,1.5 Q 48.5,1.5 48.5,11 Q 48.5,20.5 37,20.5 L 8,20.5 Q 3.5,20.5 2,17.5 Q 1.5,14 1.5,11 Q 1.5,8 2,4.5 Z")',
            background: currentLocale === 'en' ? '#cfcfcf88' : 'transparent',
            width: '50px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ENG
        </Link>
      </div>
    </div>
  )
}

export default LanguageSwitcher