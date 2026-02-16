import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        
        if (!token) {
            return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
        }

        const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
        const data = await response.json();

        return NextResponse.json({ updates: data.result || [] });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get updates' }, { status: 500 });
    }
}