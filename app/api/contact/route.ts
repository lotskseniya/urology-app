import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

interface ContactFormData {
    name: string;
    phone: string;
    email: string;
    birthDate: string;
    subject: string;
    message: string;
    doctorId: string;
    locale: string;
}

interface DoctorData {
    id: number;
    name: string;
    email: string;
    phone: string;
    telegramChatId: string;
    tags: number[];
}

export async function POST(request: NextRequest) {
    try {
        console.log('=== Contact Form API Called ===');
        
        const formData: ContactFormData = await request.json();
        console.log('Form data received:', formData);

        const doctorsJson = process.env.DOCTORS_DATA;
        console.log('DOCTORS_DATA exists:', !!doctorsJson);
        
        if (!doctorsJson) {
            return NextResponse.json(
                { error: 'DOCTORS_DATA not configured' },
                { status: 500 }
            );
        }

        const doctors = JSON.parse(doctorsJson) as DoctorData[];
        const doctor = doctors.find((d: DoctorData) => d.id === parseInt(formData.doctorId));
        
        if (!doctor) {
            return NextResponse.json({ error: 'Doctor not found' }, { status: 400 });
        }

        const tTeam = await getTranslations({ locale: formData.locale, namespace: 'team' });
        const globalTags = tTeam.raw('labels.globalTags') as Record<string, string>;
        const subjectName = globalTags[formData.subject] || formData.subject;

        const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
        
        if (!scriptUrl) {
            return NextResponse.json(
                { error: 'Google Script URL not configured' },
                { status: 500 }
            );
        }

        const payload = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            birthDate: formData.birthDate,
            subject: formData.subject,
            subjectName: subjectName,
            message: formData.message,
            doctorName: doctor.name,
            doctorEmail: doctor.email,
            doctorTelegramChatId: doctor.telegramChatId || '',
            telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || ''
        };

        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json() as { success: boolean; error?: string };

        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Contact form error:', error instanceof Error ? error.message : String(error));
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        );
    }
}