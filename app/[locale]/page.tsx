import { getTranslations } from 'next-intl/server';
import HomeClient from '@/components/HomeClient';
import { Service } from '@/lib/types';

interface ServiceProcedure {
  name: string;
  description: string;
}

interface RawService {
  id: string;
  title: string;
  description: string;
  icon?: string;
  slug: string;
  preview?: string;
  procedures?: ServiceProcedure[];
  image?: string;
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const tServices = await getTranslations('services');
  const rawServices = tServices.raw('items') as RawService[];

  const services: Service[] = rawServices.map((service: RawService) => ({
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