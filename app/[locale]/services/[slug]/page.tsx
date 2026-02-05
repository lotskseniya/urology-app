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
  'reproductive-surgery'
] as const

const serviceTabs = [
  { slug: 'laparoscopic-surgery', title: 'ЛАПАРОСКОПІЧНА ХІРУРГІЯ' },
  { slug: 'endoscopic-surgery', title: 'ЕНДОСКОПІЧНА ХІРУРГІЯ' },
  { slug: 'reproductive-surgery', title: 'ОПЕРАЦІЇ НА СТАТЕВИХ ОРГАНАХ' },
  { slug: 'kidney-stone-treatment', title: 'ЛІКУВАННЯ СЕЧОКАМ\'ЯНОЇ ХВОРОБИ' },
  { slug: 'cancer-treatment', title: 'ЛІКУВАННЯ РАКУ' },
  { slug: 'robotic-surgery', title: 'РОБОТИЗОВАНА ХІРУРГІЯ' },
  { slug: 'mens-and-womens-health', title: 'ЧОЛОВІЧЕ ТА ЖІНОЧЕ ЗДОРОВ\'Я' },
]

interface TreatmentMethod {
  name: string
  description: string
}

function parseFormattedText(text: string) {
  const withBold = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#911F16]">$1</strong>')
  const withAsteriskBold = withBold.replace(/\*(.*?)\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
  const withBreaks = withAsteriskBold.replace(/<\/br>/g, '<br />')
  const withNewlines = withBreaks.replace(/\n/g, '<br />') // Add newline support
  return withNewlines
}

// Helper to check if translation exists and is not a key
function hasValidTranslation(value: string | undefined | null): boolean {
  if (!value) return false
  if (typeof value !== 'string') return false
  return !value.startsWith('servicePages.') && value.trim().length > 0
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
  const diagnosticsDescription = getArrayData('diagnostics.description')
  const preventionMethods = getArrayData('prevention.methods')
  const treatmentMethods = getTreatmentMethods()
  const treatmentAdvantages = getArrayData('treatment.advantages')
  const treatmentDescriptions = getArrayData('treatment.description')
  const subtitleArray = getArrayData('subtitle') // Get subtitle as array

  // Safe translation getters
  const subtitle = (() => {
    try {
      return t('subtitle')
    } catch {
      return ''
    }
  })()

  const diagnosticsTitle = (() => {
    try {
      return t('diagnostics.title')
    } catch {
      return ''
    }
  })()

  const diagnosticsIntro = (() => {
    try {
      return t('diagnostics.intro')
    } catch {
      return ''
    }
  })()

  const treatmentTitle = (() => {
    try {
      return t('treatment.title')
    } catch {
      return ''
    }
  })()

  const treatmentSubtitle = (() => {
    try {
      return t('treatment.subtitle')
    } catch {
      return ''
    }
  })()

  const treatmentAdditional = (() => {
    try {
      return t('treatment.additional')
    } catch {
      return ''
    }
  })()

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F5F3EF' }}>
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

      <div className="container mx-auto px-4 pb-8 max-w-[90dvw]">
        <div className="relative">
          <div
            className="relative rounded-3xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: '#FDFBF7',
              border: '4px solid #8B1E1E',
              marginBottom: '-2px'
            }}
          >
            <div className="p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#8B1E1E' }}>
                {t('title')}
              </h1>

              {/* Subtitle - supports both string and array format */}
              {subtitleArray.length > 0 ? (
                // Array format: multiple paragraphs
                <div className="text-lg text-gray-600 mb-8 leading-relaxed space-y-1">
                  {subtitleArray.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : hasValidTranslation(subtitle) ? (
                // String format: single paragraph
                <div
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: parseFormattedText(subtitle) }}
                />
              ) : null}

              {/* Main Image */}
              {images[0] && (
                <div className="relative w-full h-[480px] rounded-2xl overflow-hidden mb-12">
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
              {diagnosticMethods.length > 0 && hasValidTranslation(diagnosticsTitle) && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {diagnosticsTitle}
                  </h2>

                  {hasValidTranslation(diagnosticsIntro) && (
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {diagnosticsIntro}
                    </p>
                  )}

                  <ul className="space-y-2 mb-6">
                    {diagnosticMethods.map((method: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#911F16] text-xl mt-1">-</span>
                        <div
                          className="text-gray-700 text-lg flex-1"
                          dangerouslySetInnerHTML={{ __html: parseFormattedText(method) }}
                        />
                      </li>
                    ))}
                  </ul>

                  {diagnosticsDescription.length > 0 && (
                    <div className="space-y-2 my-6">
                      {diagnosticsDescription.map((data: string, index: number) => (
                        <div key={index} className="text-gray-700 text-lg">
                          <div dangerouslySetInnerHTML={{ __html: parseFormattedText(data) }} />
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Treatment Section */}
              {(treatmentMethods.length > 0 || treatmentDescriptions.length > 0) && hasValidTranslation(treatmentTitle) && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {treatmentTitle}
                  </h2>

                  {treatmentDescriptions.length > 0 && (
                    <div className="mb-8 space-y-3">
                      {treatmentDescriptions.map((desc: string, index: number) => (
                        <div
                          key={index}
                          className="text-lg text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: parseFormattedText(desc) }}
                        />
                      ))}
                    </div>
                  )}

                  {hasValidTranslation(treatmentSubtitle) && (
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                      {treatmentSubtitle}
                    </h3>
                  )}

                  <div className="space-y-6 mb-8">
                    {treatmentMethods.map((method: string | TreatmentMethod, index: number) => {
                      if (typeof method === 'string') {
                        const formattedText = parseFormattedText(method)
                        return (
                          <div
                            key={index}
                            className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#8B1E1E]"
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                          />
                        )
                      } else {
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

                  {/* Only show additional if it has valid content */}
                  {hasValidTranslation(treatmentAdditional) && (
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {treatmentAdditional}
                    </p>
                  )}

                  {treatmentAdvantages.length > 0 && (
                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600 mb-6">
                      <ul className="space-y-2">
                        {treatmentAdvantages.map((advantage: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                            <div
                              className="text-gray-700 text-lg flex-1"
                              dangerouslySetInnerHTML={{ __html: parseFormattedText(advantage) }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
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
                    <span className="text-3xl"></span>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {t('prevention.title')}
                    </h2>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {preventionMethods.map((method: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#911F16]">-</span>
                        <span className="text-gray-700 text-lg">{method}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="flex justify-center mt-12">
                <BookVisitBtn />
              </div>
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="flex justify-center gap-1 px-4 h-[70px]">
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