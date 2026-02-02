'use client'

import React, { useState } from 'react'
import ServiceAccordionCard from '@/components/ServiceAccordionCard'
import StatsSection from '@/components/Statssection'

interface Service {
    id: string
    title: string
    description: string
    icon: string
    slug: string
    [key: string]: unknown
}

interface ServicesSectionProps {
    services: Service[]
    locale: string
    title: string
    subtitle: string
}

const ServicesSection = ({ services, locale, title, subtitle }: ServicesSectionProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(services[0]?.id || null)

    return (
        <div>
            {/* First service with SVG background */}
            <ServiceAccordionCard
            preview={''} procedures={[]} image={''} {...services[0]}
            header={title} // Add this - passes "ПОСЛУГИ:" to the burgundy tab
            isFirst={true}
            isExpanded={expandedId === services[0].id}
            onToggle={() => setExpandedId(expandedId === services[0].id ? null : services[0].id)}
            locale={locale}
            subtitle={subtitle} // Use the subtitle prop instead of hardcoded text
            >
                {/* Pass all other services as children */}
                {services.slice(1).map((service) => (
                    <ServiceAccordionCard
                        preview={''} procedures={[]} image={''} key={service.id}
                        {...service}
                        isFirst={false}
                        isExpanded={expandedId === service.id}
                        onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
                        locale={locale}                    />
                ))}
            </ServiceAccordionCard>
            <StatsSection/>
        </div>
    )
}

export default ServicesSection





