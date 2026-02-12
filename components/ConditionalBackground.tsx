'use client'

import { usePathname } from 'next/navigation'
import SkyBackground from '@/components/SkyBackground'
import CloudsAnimation from '@/components/CloudsAnimation'

export default function ConditionalBackground() {
    const pathname = usePathname()
    const isHomePage = pathname === '/uk' || pathname === '/en' || pathname === '/'

    if (!isHomePage) return null

    return (
        <div className="fixed inset-0 w-full h-full -z-10">
            <SkyBackground />
            <CloudsAnimation />
        </div>
    )
}