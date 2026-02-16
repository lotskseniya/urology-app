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
  const tTeam = await getTranslations('team');

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

  // Get doctors from environment (without sensitive data)
  let doctors = [];
  try {
    const doctorsData = JSON.parse(process.env.DOCTORS_DATA || '[]');
    doctors = doctorsData.map((d: any) => ({
      id: d.id,
      name: d.name,
      tags: d.tags,
    }));
  } catch (error) {
    console.error('Failed to parse DOCTORS_DATA:', error);
    // Fallback test data
    doctors = [
      { id: 1, name: "Д-р Іванов І.І.", tags: [11, 23, 26, 32, 34] },
      { id: 2, name: "Д-р Петренко П.П.", tags: [28, 29, 38, 39, 40] }
    ];
  }

  // Get global tags from team.labels.globalTags
  const globalTagsRaw = tTeam.raw('labels.globalTags') as Record<string, string>;
  const globalTags = Object.entries(globalTagsRaw).map(([id, name]) => ({
    id: parseInt(id),
    name: name
  }));

  return (
    <HomeClient
      services={services}
      locale={locale}
      servicesTitle={servicesTitle}
      servicesSubtitle={servicesSubtitle}
      doctors={doctors}
      globalTags={globalTags}
    />
  );
}