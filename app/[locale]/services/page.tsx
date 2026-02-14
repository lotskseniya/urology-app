import { getTranslations } from 'next-intl/server';
import ServicesSection from '@/components/servicesSection';
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

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations('services');
  const rawServices = t.raw('items') as RawService[];

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

  return (
    <main className="">
      <ServicesSection
        services={services}
        locale={locale}
        title={t('title')}
        subtitle={t('subtitle')}
      />
    </main>
  );
}