'use client'

import { useState } from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

interface Doctor {
    id: number
    name: string
    tags: number[]
}

interface ContactFormProps {
    locale: string
    doctors: Doctor[]
    globalTags: { id: number; name: string }[]
}

export default function ContactForm({ locale, doctors, globalTags }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        birthDate: '',
        subject: '',
        message: '',
        selectedDoctor: ''
    })

    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])

    // Filter doctors based on selected subject tag
    const handleSubjectChange = (subjectTagId: string) => {
        setFormData({ ...formData, subject: subjectTagId })

        if (!subjectTagId) {
            setFilteredDoctors([])
            return
        }

        const tagId = parseInt(subjectTagId)
        const matchingDoctors = doctors.filter(doctor =>
            doctor.tags.includes(tagId)
        )
        setFilteredDoctors(matchingDoctors)
    }

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Find selected doctor
    const doctor = doctors.find(d => d.id === parseInt(formData.selectedDoctor))
    const selectedTag = globalTags.find(t => t.id === parseInt(formData.subject))

    if (!doctor) {
        alert('Будь ласка, оберіть лікаря')
        return
    }

    try {
        // Get full doctor data from API
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                doctorId: formData.selectedDoctor,
                locale
            })
        })

        const result = await response.json()

        if (result.success) {
            alert('Ваш запит успішно відправлено! Лікар зв\'яжеться з вами найближчим часом.')
            setFormData({
                name: '',
                phone: '',
                email: '',
                birthDate: '',
                subject: '',
                message: '',
                selectedDoctor: ''
            })
            setFilteredDoctors([])
        } else {
            alert('Помилка при відправці форми. Спробуйте ще раз.')
        }
    } catch (error) {
        console.error('Form submission error:', error)
        alert('Помилка при відправці форми. Спробуйте ще раз.')
    }
}

    return (
        <section className="py-16 px-4" style={{ backgroundColor: '#F5F3EF' }} id='booking'>
            <div className="max-w-6xl mx-auto">
                <div
                    className="rounded-3xl shadow-2xl p-12"
                    style={{
                        backgroundColor: '#FDFBF7',
                        border: '4px solid #8B1E1E'
                    }}
                >
                    <h2 className="text-4xl font-bold text-center mb-8" style={{ color: '#2C3E50' }}>
                        Відправити запит на Консультацію
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column - Contact Info */}
                        <div className="space-y-8">
                            <p className="text-gray-600 mb-6">
                                Ви можете обрати лікаря, до якого б хотіли записатись на прийом
                            </p>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8B1E1E' }}>
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Адреса:</p>
                                    <p className="text-gray-600">м. Київ, вул. Чорних Запорожців 26</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8B1E1E' }}>
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">My Email:</p>
                                    <p className="text-gray-600">mymail@gmail.com</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8B1E1E' }}>
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Телефон</p>
                                    <p className="text-gray-600">00-1234 00000</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <input
                                type="text"
                                placeholder="Ім'я, Прізвище, По-батькові*"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B1E1E] outline-none bg-transparent"
                            />

                            {/* Phone */}
                            <input
                                type="tel"
                                placeholder="Телефон*"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B1E1E] outline-none bg-transparent"
                            />

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B1E1E] outline-none bg-transparent"
                            />

                            {/* Birth Date and Subject */}
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    placeholder="Дата Народження *"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    required
                                    className="px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B1E1E] outline-none bg-transparent"
                                />

                                <select
                                    value={formData.subject}
                                    onChange={(e) => handleSubjectChange(e.target.value)}
                                    required
                                    className="px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B1E1E] outline-none bg-transparent"
                                >
                                    <option value="">Тема звернення</option>
                                    {globalTags.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Doctor Selection - shows after subject is selected */}
                            {filteredDoctors.length > 0 && (
                                <select
                                    value={formData.selectedDoctor}
                                    onChange={(e) => setFormData({ ...formData, selectedDoctor: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B1E1E] outline-none bg-transparent"
                                >
                                    <option value="">Оберіть лікаря</option>
                                    {filteredDoctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                    ))}
                                </select>
                            )}

                            {/* Message */}
                            <textarea
                                placeholder="Повідомлення (по бажанню - можете коротко описати)"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-[#8B1E1E] outline-none bg-transparent resize-none"
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-4 rounded-full font-semibold text-white transition-all hover:shadow-lg"
                                style={{ backgroundColor: '#8B1E1E' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B2A2A'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B1E1E'}
                            >
                                ВІДПРАВИТИ ЗАПИТ
                            </button>

                            {/* Privacy Notice */}
                            <p className="text-xs text-gray-500 text-center">
                                Інформація про Ваші данні є конфіденційною, і необхідна нам для ...... відповідно до Наказу МОЗ ........
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}














