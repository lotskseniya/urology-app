import { getTranslations } from 'next-intl/server';
import HomeClient from '@/components/HomeClient';
import { Service } from '@/lib/types';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const tServices = await getTranslations('services');
  const rawServices = tServices.raw('items') as any[];

  // Ensure all required fields exist
  const services: Service[] = rawServices.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon || '',
    slug: service.slug,
    preview: service.preview || '',
    procedures: service.procedures || [],
    image: service.image || ''
  }));

  const servicesTitle = tServices('title');
  const servicesSubtitle = tServices('subtitle');

  return (
    <HomeClient
      services={services}
      locale={locale}
      servicesTitle={servicesTitle}
      servicesSubtitle={servicesSubtitle}
    />
  );
}