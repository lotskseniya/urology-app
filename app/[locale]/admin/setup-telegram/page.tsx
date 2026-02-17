'use client'

import { useState } from 'react'

interface TelegramMessage {
    chatId: string
    userName: string
    message: string
    date: string
}

interface TelegramUpdate {
    message?: {
        chat?: { id: number }
        from?: { first_name?: string; last_name?: string }
        text?: string
        date?: number
    }
}

export default function TelegramSetup() {
    const [messages, setMessages] = useState<TelegramMessage[]>([])
    const [checking, setChecking] = useState(false)
    const [error, setError] = useState('')

    const checkForMessages = async () => {
        setChecking(true)
        setError('')
        try {
            const response = await fetch('/api/telegram/get-updates')
            const data = await response.json()

            if (data.updates && data.updates.length > 0) {
                const allMessages = data.updates
                    .filter((update: TelegramUpdate) => update.message?.chat?.id)
                    .map((update: TelegramUpdate) => ({
                        chatId: update.message!.chat!.id.toString(),
                        userName: (update.message!.from?.first_name || '') +
                            (update.message!.from?.last_name ? ' ' + update.message!.from.last_name : ''),
                        message: update.message!.text || 'No text',
                        date: new Date((update.message!.date || 0) * 1000).toLocaleString('uk-UA')
                    }))

                // Remove duplicates (same chat ID)
                const uniqueMessages = allMessages.filter((msg: TelegramMessage, index: number, self: TelegramMessage[]) =>
                    index === self.findIndex((m) => m.chatId === msg.chatId)
                )

                setMessages(uniqueMessages)
            } else {
                setError('Повідомлень не знайдено. Надішліть повідомлення боту та спробуйте ще раз.')
            }
        } catch (err) {
            console.error(err)
            setError('Помилка при отриманні даних')
        }
        setChecking(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F5F3EF' }}>
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold mb-6" style={{ color: '#8B1E1E' }}>
                    Налаштування Telegram для лікарів
                </h1>

                <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="font-semibold mb-2">Інструкція:</p>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Відкрийте Telegram на телефоні</li>
                            <li>Знайдіть бот: <code className="bg-gray-200 px-2 py-1 rounded">@third_urology_kyiv_bot</code></li>
                            <li>Натисніть <strong>START</strong></li>
                            <li>Надішліть своє прізвище та імʼя, щоб я додала Ваш ID в систему</li>
                        </ol>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}
{/* 
                    {messages.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold" style={{ color: '#8B1E1E' }}>
                                Знайдено {messages.length} користувачів:
                            </h2>

                            {messages.map((msg, index) => (
                                <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-lg">{msg.userName}</p>
                                            <p className="font-mono text-sm text-gray-600 mt-1">
                                                Chat ID: <span className="font-bold text-black">{msg.chatId}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Останнє повідомлення: {msg.date}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(msg.chatId)}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                        >
                                            Копіювати ID
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    )
}