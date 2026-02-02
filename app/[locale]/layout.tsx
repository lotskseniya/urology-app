import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import SkyBackground from '@/components/SkyBackground';
import CloudsAnimation from '@/components/CloudsAnimation';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="fixed inset-0 w-full h-full -z-10">
        <SkyBackground />
        <CloudsAnimation />
      </div>

      <Navbar />
      <main>
        {children}
      </main>
    </NextIntlClientProvider>
  );
}
