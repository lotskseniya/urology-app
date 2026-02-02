'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface StatItem {
    number: string
    label: string
}

const StatsSection = () => {
    const t = useTranslations('stats')

    const stats: StatItem[] = [
        {
            number: t('experience.number'),
            label: t('experience.label'),
        },
        {
            number: t('treatments.number'),
            label: t('treatments.label'),
        },
        {
            number: t('specialists.number'),
            label: t('specialists.label'),
        },
    ]

    useEffect(() => {
        if (CSS.registerProperty) {
            try {
                CSS.registerProperty({
                    name: '--angle-1',
                    syntax: '<angle>',
                    inherits: false,
                    initialValue: '-75deg',
                })
            } catch (e) {
            }
        }
    }, [])

    return (
        <>
            <style jsx>{`
        @supports not (background: paint(something)) {
          @property --angle-1 {
            syntax: '<angle>';
            inherits: false;
            initial-value: -75deg;
          }
        }
      `}</style>

            <section className="py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="xs:flex xs:flex-col xs:items-center md:grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="glass-stats-wrap">
                                <div className="glass-stat-card">
                                    <div className="stat-content">
                                        <div className="text-2xl md:text-2.5xl lg:text-3xl font-bold text-gray-800 mb-2">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm md:text-base lg:text-lg text-gray-700 font-medium text-center">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-button-shadow"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default StatsSection