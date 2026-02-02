import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image';
import BookVisitBtn from "@/components/BookVisitBtn"

const validSlugs = [
  'kidney-stone-treatment',
  'endoskopichna-urologiya',
  'laparoskopichni-operatsiyi',
  'onkourologiya',
  'zhinocha-urologiya',
  'nevidkladna-urologiya'
] as const

interface TreatmentMethod {
  name: string
  description: string
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

  // Helper to safely get array data
  const getArrayData = (key: string): string[] => {
    try {
      const data = t.raw(key)
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  }

  // Helper to safely get treatment methods
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

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Link
          href={`/${locale}#services`}
          className="inline-flex items-center gap-2 text-[#911F16] hover:text-[#6B2A2A] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{tCommon('backToServices')}</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden bg-gray-200">
            {images[0] ? (
              <Image
                src={images[0]}
                alt={t('title')}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <span>Image placeholder</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Diagnostics Section */}
      {diagnosticMethods.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('diagnostics.title')}
              </h2>

              {t('diagnostics.intro') && (
                <p className="text-xl text-gray-700 mb-6">
                  {t('diagnostics.intro')}
                </p>
              )}

              <ul className="space-y-3 mb-6">
                {diagnosticMethods.map((method: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#911F16] text-xl mt-1">•</span>
                    <span className="text-gray-700 text-xl ">{method}</span>
                  </li>
                ))}
              </ul>

              {t('diagnostics.description') && (
                <p className="text-gray-600 text-xl  italic">
                  {t('diagnostics.description')}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Treatment Section */}
      {treatmentMethods.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('treatment.title')}
              </h2>

              {t('treatment.intro') && (
                <p className="text-xl  text-gray-700 mb-6">
                  {t('treatment.intro')}
                </p>
              )}

              {t('treatment.subtitle') && (
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  {t('treatment.subtitle')}
                </h3>
              )}

              <div className="space-y-6 mb-8">
                {treatmentMethods.map((method: string | TreatmentMethod, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    {typeof method === 'string' ? (
                      <p className="text-gray-700 text-xl ">{method}</p>
                    ) : (
                      <>
                        <h4 className="text-xl font-semibold text-[#911F16] mb-2">
                          {method.name}
                        </h4>
                        <p className="text-gray-700 text-xl">{method.description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {treatmentAdvantages.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    {tCommon('advantages')}
                  </h4>
                  <ul className="space-y-2">
                    {treatmentAdvantages.map((advantage: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-600 text-xl">✓</span>
                        <span className="text-gray-700 text-xl">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {t('treatment.aftercare') && (
                <p className="text-gray-600 text-xl italic">
                  {t('treatment.aftercare')}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Prevention Section */}
      {preventionMethods.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-3xl">🌿</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t('prevention.title')}
                </h2>
              </div>

              {t('prevention.intro') && (
                <p className="text-xl text-gray-700 mb-4">
                  {t('prevention.intro')}
                </p>
              )}

              <ul className="space-y-2 mb-6">
                {preventionMethods.map((method: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 text-xl ">
                    <span className="text-[#911F16] text-xl">-</span>
                    <span>{method}</span>
                  </li>
                ))}
              </ul>

              {t('prevention.description') && (
                <p className="text-gray-700 text-xl ">
                  {t('prevention.description')}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Consultation Section */}
      {t('consultation.title') && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-3xl">💬</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t('consultation.title')}
                </h2>
              </div>

              {t('consultation.description') && (
                <p className="text-xl text-gray-700">
                  {t('consultation.description')}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Additional Images */}
      {images.length > 1 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.slice(1).map((image: string, index: number) => (
                <div key={index} className="relative h-[300px] rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src={image}
                    alt={`${t('title')} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 mx-auto flex">
        <BookVisitBtn />
      </section>
    </main>
  )
}