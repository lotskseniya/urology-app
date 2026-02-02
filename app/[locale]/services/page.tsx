'use client'

import { useTranslations } from 'next-intl'
import ServicesSection from '@/components/servicesSection'

export default function ServicesPage() {
  const t = useTranslations('services')

  const services = [
    {
      id: 'service1',
      title: t('service1.title'),
      description: t('service1.description'),
      icon: t('service1.icon'),
      slug: t('service1.slug')
    },
    {
      id: 'service2',
      title: t('service2.title'),
      description: t('service2.description'),
      icon: t('service2.icon'),
      slug: t('service2.slug')
    },
    // ... more services
  ]

  return (
    <main className="min-h-screen">
      <ServicesSection
        services={services}
        locale="uk" // or get from params
        title={t('title')}
        subtitle={t('subtitle')}
      />
    </main>
  )
}