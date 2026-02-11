'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  surname: string
  photo: string
  position: string
  experienceSince: number
  timeline: string[]
  fields: string[]
  languages: string[]
  tags: number[]
}

const TeamSection = () => {
  const t = useTranslations('team')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Get team members from translations
  const memberIds = Array.from({ length: 22 }, (_, i) => `member${i + 1}`)

  const members: TeamMember[] = memberIds.map((id) => ({
    id,
    name: t(`members.${id}.name`),
    surname: t(`members.${id}.surname`),
    photo: t(`members.${id}.photo`),
    position: t.raw(`members.${id}.position`),
    experienceSince: t.raw(`members.${id}.experienceSince`),
    timeline: t.raw(`members.${id}.timeline`),
    fields: t.raw(`members.${id}.fields`),
    languages: t.raw(`members.${id}.languages`),
    tags: t.raw(`members.${id}.tags`),
  }))

  // Start with card index 1 (member2) so we show member1, member2, member3 with member2 centered
  const [currentIndex, setCurrentIndex] = useState(1);
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({});

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = 480 // Increased card width for desktop
    const gap = 32
    const scrollPosition = index * (cardWidth + gap) - (container.offsetWidth / 2) + (cardWidth / 2)

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    })

    setCurrentIndex(index)
  }

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : members.length - 1
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentIndex < members.length - 1 ? currentIndex + 1 : 0
    scrollToIndex(newIndex)
  }

  // Handle scroll to update current index
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const containerCenter = scrollLeft + (container.offsetWidth / 2)
      const cardWidth = 480
      const gap = 32
      const newIndex = Math.round((containerCenter - (cardWidth / 2)) / (cardWidth + gap))

      // Clamp index to valid range
      const clampedIndex = Math.max(0, Math.min(newIndex, members.length - 1))

      if (clampedIndex !== currentIndex) {
        setCurrentIndex(clampedIndex)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentIndex, members.length])

  // Center card index 1 (member2) on mount
  useEffect(() => {
    if (scrollContainerRef.current && members.length > 0) {
      // Small delay to ensure DOM is ready
      setTimeout(() => scrollToIndex(1), 100)
    }
  }, [members.length])

  const toggleExpanded = (memberId: string) => {
    setExpandedMembers(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  return (
    <section className="py-10 md:py-22 bg-[#F5F3EF] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="Previous team member"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-800" />
          </button>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar py-6"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {members.map((member, index) => {
              const isCenter = index === currentIndex

              return (
                <div
                  key={member.id}
                  className={`flex-shrink-0 snap-center transition-all duration-500 ${isCenter
                    ? 'scale-102 z-10'
                    : 'scale-95 opacity-80'
                    }`}
                  style={{
                    width: '480px',
                    height: `${isCenter
                      ? 'auto'
                      : '60rem'
                      }`
                  }}
                  onClick={() => scrollToIndex(index)}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                    {/* Photo with overlays */}
                    <div className={`relative overflow-hidden bg-gray-200 transition-all duration-500 ${isCenter ? 'h-86' : 'h-70'
                      }`}>
                      <Image
                        src={member.photo}
                        alt={`${member.name} ${member.surname}`}
                        fill
                        className="object-cover"
                      />

                      {/* Name Overlay - Bottom Left */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10">
                        <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4 inline-block w-full">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                            {member.surname}
                          </h3>
                          <h4 className="text-lg md:text-xl font-semibold text-white/90">
                            {member.name}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 relative">
                      <div className="mb-2 pb-2 border-b border-gray-200">
                        {/* Position */}
                        {Array.isArray(member.position) ? (
                          <div className="text-sm text-[#8B3A3A] mt-0">
                            {member.position.map((line, idx) => (
                              <p key={idx}>{line}</p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-[#8B3A3A] mb-1 mt-3">{member.position}</p>
                        )}
                        {/* Years of Experience */}
                        <p className="text-sm font-semibold text-gray-600">
                          {t('labels.experience')} {new Date().getFullYear() - member.experienceSince} {t('labels.years')}
                        </p>

                        {/* Languages - Top Right */}
                        {member.languages && member.languages.length > 0 && (
                          <div className="absolute top-0 right-4 flex gap-2 z-10">
                            {member.languages.map((lang, idx) => (
                              <span
                                key={idx}
                                className="w-[40px] py-1 flex justify-center bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full shadow-md"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Timeline */}
                      {member.timeline && Array.isArray(member.timeline) && member.timeline.length > 0 && (
                        <div className="mb-2">
                          <h5 className="text-ml font-semibold text-gray-700 mb-2">
                            {t('labels.timeline')}
                          </h5>
                          <ul className="text-ml text-gray-600 space-y-0">
                            {member.timeline.map((item, idx) => {
                              const isEmpty = !item || !item.trim();

                              if (isEmpty) {
                                return <li key={idx} className="h-4 list-none"></li>;
                              }

                              return (
                                <li key={idx} className="flex items-start">
                                  <span className="text-[#8B3A3A] mr-2">•</span>
                                  <span>{item}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}


                      {/* Fields of Work - Expandable */}
                      {member.fields && member.fields.length > 0 && (
                        <div className="mb-4">
                          {member.fields.length > 5 ? (
                            <button
                              onClick={() => toggleExpanded(member.id)}
                              className="flex items-center justify-between w-full mb-2 hover:opacity-70 transition-opacity"
                            >
                              <h5 className="text-ml font-semibold text-gray-700">
                                {t('labels.fields')}
                              </h5>
                              <svg
                                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${expandedMembers[member.id] ? 'rotate-180' : ''
                                  }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          ) : (
                            <h5 className="text-ml font-semibold text-gray-700 mb-2">
                              {t('labels.fields')}
                            </h5>
                          )}

                          <ul className="text-ml text-gray-600 space-y-0">
                            {member.fields
                              .slice(0, expandedMembers[member.id] ? member.fields.length : 5)
                              .map((field, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-[#8B3A3A] mr-2">•</span>
                                  <span>{field}</span>
                                </li>
                              ))}
                          </ul>

                          {/* Show count of hidden items with arrow */}
                          {member.fields.length > 5 && !expandedMembers[member.id] && (
                            <button
                              onClick={() => toggleExpanded(member.id)}
                              className="mt-2 text-sm text-gray-500 italic flex items-center gap-1 hover:text-gray-700 transition-colors"
                            >
                              <span>+{member.fields.length - 5}</span>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="Next team member"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-800" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {members.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`transition-all duration-300 rounded-full ${index === currentIndex
                ? 'w-8 h-2 bg-[#8B3A3A]'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to team member ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default TeamSection