import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export default async function ContactsPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const t = await getTranslations('globalTags');

    // Get doctors from environment (without sensitive data for client)
    const doctorsData = JSON.parse(process.env.DOCTORS_DATA || '[]');
    const doctors = doctorsData.map((d: any) => ({
        id: d.id,
        name: d.name,
        tags: d.tags,
        // Don't expose email/phone/telegram to client
    }));

    // Get global tags from translations
    const globalTags = t.raw('tags') as Array<{ id: number; name: string }>;

    return (
        <ContactForm
            locale={locale}
            doctors={doctors}
            globalTags={globalTags}
        />
    );
}