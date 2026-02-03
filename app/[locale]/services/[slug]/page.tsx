import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import BookVisitBtn from "@/components/BookVisitBtn"

const validSlugs = [
  'kidney-stone-treatment',
  'endoscopic-surgery',
  'laparoscopic-surgery',
  'robotic-surgery',
  'cancer-treatment',
  'mens-and-womens-health',
  'reproductive-organ-surgery'
] as const

// Service tabs for bottom bookmarks
const serviceTabs = [
  { slug: 'mens-and-womens-health', title: 'ЧОЛОВІЧЕ ТА ЖІНОЧЕ ЗДОРОВ\'Я' },
  { slug: 'laparoscopic-surgery', title: 'ЛАПАРОСКОПІЧНА ХІРУРГІЯ' },
  { slug: 'cancer-treatment', title: 'ЛІКУВАННЯ РАКУ' },
  { slug: 'robotic-surgery', title: 'РОБОТИЗОВАНА ХІРУРГІЯ' },
  { slug: 'reproductive-organ-surgery', title: 'ОПЕРАЦІЇ НА ЗОВНІШНІХ СТАТЕВИХ ОРГАНАХ' },
  { slug: 'kidney-stone-treatment', title: 'ЛІКУВАННЯ ДОБРОЯКІСНОЇ ГІПЕРПЛАЗІЇ ПЕРЕДМІХУРОВОЇ ЗАЛОЗИ' },
  { slug: 'endoscopic-surgery', title: 'МАЛА ХІРУРГІЯ' },
]
interface TreatmentMethod {
  name: string
  description: string
}

// Helper to parse formatted text with bold and line breaks
function parseFormattedText(text: string) {
  // Replace **text** with bold
  const withBold = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#911F16]">$1</strong>')
  // Replace *text* with bold
  const withAsteriskBold = withBold.replace(/\*(.*?)\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
  // Replace </br> with line breaks
  const withBreaks = withAsteriskBold.replace(/<\/br>/g, '<br />')
  return withBreaks
}

export function generateStaticParams() {
  return validSlugs.flatMap((slug) => [
    { locale: 'uk', slug },
    { locale: 'en', slug }
  ])
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!validSlugs.includes(slug as typeof validSlugs[number])) {
    notFound()
  }

  const t = await getTranslations(`servicePages.${slug}`)
  const tCommon = await getTranslations('common')

  const getArrayData = (key: string): string[] => {
    try {
      const data = t.raw(key)
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  }

  const getTreatmentMethods = (): (string | TreatmentMethod)[] => {
    try {
      const data = t.raw('treatment.methods')
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  }

  const images = getArrayData('images')
  const diagnosticMethods = getArrayData('diagnostics.methods')
  const preventionMethods = getArrayData('prevention.methods')
  const treatmentMethods = getTreatmentMethods()
  const treatmentAdvantages = getArrayData('treatment.advantages')
  const treatmentDescriptions = getArrayData('treatment.description')

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5F3EF' }}>
      {/* Navigation */}
      <nav className="w-full py-6" style={{ backgroundColor: '#F5F3EF' }}>
        <div className="container mx-auto px-4 pt-20">
          <Link
            href={`/${locale}#services`}
            className="inline-flex items-center gap-2 text-[#911F16] hover:text-[#6B2A2A] transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Повернутися до послуг</span>
          </Link>
        </div>
      </nav>

      {/* File Folder Container */}
      <div className="container mx-auto px-4 pb-8 max-w-[90dvw]">
        <div className="relative">
          {/* Main file content */}
          <div
            className="relative rounded-3xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: '#FDFBF7',
              border: '4px solid #8B1E1E',
              marginBottom: '-2px'
            }}
          >
            <div className="p-12">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#8B1E1E' }}>
                {t('title')}
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-600 mb-8">
                {t('subtitle')}
              </p>

              {/* Main Image */}
              {images[0] && (
                <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-12">
                  <Image
                    src={images[0]}
                    alt={t('title')}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Diagnostics Section */}
              {diagnosticMethods.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">🔬</span>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {t('diagnostics.title')}
                    </h2>
                  </div>

                  {t('diagnostics.intro') && (
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {t('diagnostics.intro')}
                    </p>
                  )}

                  <ul className="space-y-3 mb-6">
                    {diagnosticMethods.map((method: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#911F16] text-xl mt-1">-</span>
                        <span className="text-gray-700 text-lg">{method}</span>
                      </li>
                    ))}
                  </ul>

                  {t('diagnostics.description') && (
                    <p className="text-gray-600 text-lg italic">
                      {t('diagnostics.description')}
                    </p>
                  )}
                </section>
              )}

              {/* Treatment Section */}
              {(treatmentMethods.length > 0 || treatmentDescriptions.length > 0) && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">💊</span>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {t('treatment.title')}
                    </h2>
                  </div>

                  {t('treatment.intro') && (
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {t('treatment.intro')}
                    </p>
                  )}

                  {/* Treatment Descriptions (if exists) */}
                  {treatmentDescriptions.length > 0 && (
                    <div className="mb-8 space-y-4">
                      {treatmentDescriptions.map((desc: string, index: number) => (
                        <p key={index} className="text-lg text-gray-700 leading-relaxed">
                          {desc}
                        </p>
                      ))}
                    </div>
                  )}

                  {t('treatment.subtitle') && (
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                      {t('treatment.subtitle')}
                    </h3>
                  )}

                  {/* Treatment Methods with rich formatting */}
                  <div className="space-y-6 mb-8">
                    {treatmentMethods.map((method: string | TreatmentMethod, index: number) => {
                      if (typeof method === 'string') {
                        // Handle formatted string with bold, breaks, etc.
                        const formattedText = parseFormattedText(method)

                        return (
                          <div
                            key={index}
                            className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#8B1E1E]"
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                          />
                        )
                      } else {
                        // Handle object format
                        return (
                          <div key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#8B1E1E]">
                            <h4 className="text-lg font-bold text-[#911F16] mb-2">
                              {method.name}
                            </h4>
                            <div
                              className="text-gray-700 text-lg"
                              dangerouslySetInnerHTML={{ __html: parseFormattedText(method.description) }}
                            />
                          </div>
                        )
                      }
                    })}
                  </div>

                  {treatmentAdvantages.length > 0 && (
                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600 mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span>✓</span>
                        {tCommon('advantages')}
                      </h4>
                      <ul className="space-y-2">
                        {treatmentAdvantages.map((advantage: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700 text-lg">{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {t('treatment.aftercare') && (
                    <p className="text-gray-600 text-lg italic">
                      {t('treatment.aftercare')}
                    </p>
                  )}
                </section>
              )}

              {/* Additional Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 gap-6 mb-12">
                  {images.slice(1).map((image: string, index: number) => (
                    <div key={index} className="relative h-[300px] rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${t('title')} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Prevention Section */}
              {preventionMethods.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">🌿</span>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {t('prevention.title')}
                    </h2>
                  </div>

                  {t('prevention.intro') && (
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      {t('prevention.intro')}
                    </p>
                  )}

                  <ul className="space-y-2 mb-6">
                    {preventionMethods.map((method: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#911F16]">-</span>
                        <span className="text-gray-700 text-lg">{method}</span>
                      </li>
                    ))}
                  </ul>

                  {t('prevention.description') && (
                    <p className="text-gray-700 text-lg">
                      {t('prevention.description')}
                    </p>
                  )}
                </section>
              )}

              {/* Consultation Section */}
              {t('consultation.title') && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">💬</span>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {t('consultation.title')}
                    </h2>
                  </div>

                  {t('consultation.description') && (
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t('consultation.description')}
                    </p>
                  )}
                </section>
              )}

              {/* CTA Button */}
              <div className="flex justify-center mt-12">
                <BookVisitBtn />
              </div>
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="flex justify-center gap-1 px-12">
            {serviceTabs.map((tab) => (
              <Link
                key={tab.slug}
                href={`/${locale}/services/${tab.slug}`}
                className={`
                  relative px-6 py-4 text-xs font-bold uppercase text-center
                  transition-all duration-300 rounded-b-xl
                  ${slug === tab.slug
                    ? 'bg-[#8B1E1E] text-white -translate-y-1 z-10'
                    : 'bg-[#6B2A2A] text-white/80 hover:bg-[#8B1E1E] hover:-translate-y-0.5'
                  }
                `}
                style={{
                  minWidth: '140px',
                  maxWidth: '200px',
                  flex: '1'
                }}
              >
                {tab.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}







// import BookVisitBtn from "@/components/BookVisitBtn"

// <BookVisitBtn />