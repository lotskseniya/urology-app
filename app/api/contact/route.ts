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

export async function POST(request: NextRequest) {
    try {
        console.log('=== Contact Form API Called ===');
        
        const formData: ContactFormData = await request.json();
        console.log('Form data received:', formData);

        // Get doctors data
        const doctorsJson = process.env.DOCTORS_DATA;
        console.log('DOCTORS_DATA exists:', !!doctorsJson);
        
        if (!doctorsJson) {
            return NextResponse.json(
                { error: 'DOCTORS_DATA not configured' },
                { status: 500 }
            );
        }

        const doctors = JSON.parse(doctorsJson);
        console.log('Parsed doctors:', doctors.length);
        
        const doctor = doctors.find((d: any) => d.id === parseInt(formData.doctorId));
        console.log('Found doctor:', doctor);
        
        if (!doctor) {
            return NextResponse.json({ error: 'Doctor not found' }, { status: 400 });
        }

        // Get subject name from translations
        console.log('Getting translations for locale:', formData.locale);
        const tTeam = await getTranslations({ locale: formData.locale, namespace: 'team' });
        const globalTags = tTeam.raw('labels.globalTags') as Record<string, string>;
        const subjectName = globalTags[formData.subject] || formData.subject;
        console.log('Subject name:', subjectName);

        // Send to Google Apps Script
        const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
        console.log('Script URL exists:', !!scriptUrl);
        
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
        
        console.log('Sending to Google Script:', scriptUrl);
        console.log('Payload:', JSON.stringify(payload, null, 2));

        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('Google Script response status:', response.status);
        const result = await response.json();
        console.log('Google Script result:', result);

        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            console.error('Script error:', result.error);
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('=== Contact form error ===');
        console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
        console.error('Error message:', error instanceof Error ? error.message : String(error));
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}