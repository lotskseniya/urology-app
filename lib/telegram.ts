interface TelegramParams {
    chatId: string;
    message: string;
}

export async function sendTelegramNotification({ chatId, message }: TelegramParams) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!token) {
        console.error('Telegram bot token not configured');
        return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            }),
        });

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
        throw error;
    }
}