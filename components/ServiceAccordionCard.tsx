'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ServiceProcedure {
  name: string
  description: string
}

interface ServiceCardProps {
  id: string
  title: string
  slug: string
  preview: string
  description: string
  procedures: ServiceProcedure[]
  image: string
  isFirst?: boolean
  isExpanded: boolean
  onToggle: () => void
  locale: string
  subtitle?: string
  children?: React.ReactNode
  header?: string
}

const ServiceAccordionCard = ({
  title,
  header,
  slug,
  preview,
  description,
  procedures,
  image,
  isFirst = false,
  isExpanded,
  onToggle,
  locale,
  subtitle,
  children
}: ServiceCardProps) => {
  const t = useTranslations('common');
  const servicesT = useTranslations('services');
  const performedInDepartment = servicesT('performedInDepartment');

  // For non-first cards, render as stacked filing folders
  if (!isFirst) {
    return (
      <div className="relative w-full mb-4">
        {/* Stacked folder effect - bottom shadow layers */}
        <div className="absolute -bottom-2 left-4 right-4 h-3 bg-gray-400 rounded-b-xl"></div>
        <div className="absolute -bottom-1 left-2 right-2 h-2 bg-gray-300 rounded-b-xl"></div>

        {/* Main folder card */}
        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg">
          <button
            onClick={onToggle}
            className="w-full px-8 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg lg:text-xl font-bold text-[#8B3A3A] uppercase">
              {title}
            </h3>
            <ChevronDown
              className={`
                w-6 h-6 text-[#8B3A3A] transition-transform duration-300 flex-shrink-0
                ${isExpanded ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </button>

          <div
            className={`
                  transition-all duration-500 ease-in-out
                  ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                  overflow-hidden
                `}
          >
            <div className="px-8 pb-6 bg-white border-t border-gray-200 mt-0">
              <div className="py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image - properly implemented */}
                  {image && (
                    <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-gray-200">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {preview}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {description}
                      </p>

                      {procedures && procedures.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-bold text-[#8B3A3A] text-lg mb-4">
                            {performedInDepartment}
                          </h4>
                          {procedures.map((procedure, idx) => (
                            <div key={idx} className="border-l-4 border-[#8B3A3A] pl-4">
                              <h5 className="font-bold text-gray-900 mb-1">
                                {procedure.name}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {procedure.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/${locale}/services/${slug}`}
                      className="
                            mt-6 inline-flex items-center justify-center gap-2
                            px-6 py-3 bg-[#911F16] text-white rounded-full
                            hover:bg-[#6B2A2A] transition-colors duration-300
                            font-medium self-start
                          "
                    >
                      {t('learnMore')}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M7 3L14 10L7 17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // FIRST CARD - Filing cabinet with all services
  return (
    <div className="relative flex-1">
      {/* Subtitle positioned outside */}
      {subtitle && (
        <div className="flex-shrink-0 w-2/3 pt-1 absolute left-[28dvw] z-20">
          <p className="text-gray-600 xs:text-xs text-sm md:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}

      {/* Main content container */}
      <div className="relative flex flex-col pt-10 pb-8">
        {/* Single SVG background - both tab and stretching area */}
        <svg
          className="absolute top-0 left-[4.4%] w-[91.2%] h-full z-[-1]"
          viewBox="0 0 1566 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Complete path with rounded bottom */}
          <path
            d="M326.38 8H57.5403C32.1974 8 11.7613 28.4978 11.6733 53.8403L4.00053 130L4 950Q4 980 34 980L1532 980Q1562 980 1562 950L1562 130V154.878C1562 134.243 1558.11 123.944 1551.31 115.771C1543.94 106.922 1533.49 101.197 1522.06 99.752L1496.34 96.5H1403.34H412.716C403.23 96.5 393.679 93.741 388.893 85.551C382.559 74.7117 378.549 59.1904 376.065 43.8035C372.017 18.7231 351.785 8 326.38 8Z"
            fill="#911F16"
          />
        </svg>

        {/* Tab title */}
        <div className="pt-2 px-4 lg:px-8 relative z-10">
          <h2 className="text-lg lg:text-xl font-bold uppercase text-white" style={{ marginLeft: '11%', marginTop: '0.3%' }}>
            {header}
          </h2>
        </div>

        {/* White content area */}
        <div className="flex-1 px-20 lg:px-20 relative z-10 mt-12">
          {/* First service card */}
          <div className="relative w-full mb-4">
            {/* Stacked folder effect */}
            <div className="absolute -bottom-2 left-4 right-4 h-3 bg-gray-400 rounded-b-xl"></div>
            <div className="absolute -bottom-1 left-2 right-2 h-2 bg-gray-300 rounded-b-xl"></div>

            {/* Main folder card */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg">
              <button
                onClick={onToggle}
                className="w-full px-8 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg lg:text-xl font-bold text-[#8B3A3A] uppercase">
                  {title}
                </h3>
                <ChevronDown
                  className={`
                    w-6 h-6 text-[#8B3A3A] transition-transform duration-300 flex-shrink-0
                    ${isExpanded ? 'rotate-180' : 'rotate-0'}
                  `}
                />
              </button>

              {/* Expandable content */}
              <div
                className={`
                  transition-all duration-500 ease-in-out
                  ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                  overflow-hidden
                `}
              >
                <div className="px-8 pb-6 bg-white border-t border-gray-200 mt-0">
                  <div className="py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Image - properly implemented */}
                      {image && (
                        <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-gray-200">
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}

                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            {preview}
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            {description}
                          </p>

                          {procedures && procedures.length > 0 && (
                            <div className="space-y-4">
                              <h4 className="font-bold text-[#8B3A3A] text-lg mb-4">
                                {performedInDepartment}
                              </h4>
                              {procedures.map((procedure, idx) => (
                                <div key={idx} className="border-l-4 border-[#8B3A3A] pl-4">
                                  <h5 className="font-bold text-gray-900 mb-1">
                                    {procedure.name}
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {procedure.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <Link
                          href={`/${locale}/services/${slug}`}
                          className="
                            mt-6 inline-flex items-center justify-center gap-2
                            px-6 py-3 bg-[#911F16] text-white rounded-full
                            hover:bg-[#6B2A2A] transition-colors duration-300
                            font-medium self-start
                          "
                        >
                          {t('learnMore')}
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                              d="M7 3L14 10L7 17"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other service cards - same width constraint */}
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceAccordionCard