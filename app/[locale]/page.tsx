import { getTranslations } from 'next-intl/server';
import HomeClient from '@/components/HomeClient';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const tServices = await getTranslations('services');

  const services = tServices.raw('items');
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
