import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { Service } from '@/lib/types';

interface RawDoctor {
    id: number;
    name: string;
    tags: number[];
    email?: string;
    phone?: string;
    telegramChatId?: string;
}

export default async function ContactsPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const tTeam = await getTranslations('team');

    const doctorsData = JSON.parse(process.env.DOCTORS_DATA || '[]') as RawDoctor[];
    const doctors = doctorsData.map((d: RawDoctor) => ({
        id: d.id,
        name: d.name,
        tags: d.tags,
    }));

    const globalTagsRaw = tTeam.raw('labels.globalTags') as Record<string, string>;
    const globalTags = Object.entries(globalTagsRaw).map(([id, name]) => ({
        id: parseInt(id),
        name: name
    }));

    return (
        <ContactForm
            locale={locale}
            doctors={doctors}
            globalTags={globalTags}
        />
    );
}