'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function StepImages({ images }: { images: string[] }) {
    const isSingle = images.length === 1

    if (isSingle) {
        return (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm">
                <Image src={images[0]} alt="" fill className="object-cover" sizes="40vw" />
            </div>
        )
    }

    return (
        <div className="flex gap-3 min-h-0 w-full" style={{ height: 'calc(100vh - 200px)' }}>
            {images.map((src, idx) => (
                <div key={idx} className="relative flex-1 min-h-0 overflow-hidden rounded-sm">
                    <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
                </div>
            ))}
        </div>
    )
}

export default function TreatmentSteps() {
    const t = useTranslations('treatmentSteps')
    const sectionRef = useRef<HTMLDivElement>(null)

    const steps = [
        {
            number: 1,
            title: t('steps.consultation.title'),
            descriptions: [t('steps.consultation.desc1'), t('steps.consultation.desc2')],
            images: t.raw('steps.consultation.images') as string[],
        },
        {
            number: 2,
            title: t('steps.examination.title'),
            descriptions: [t('steps.examination.desc1'), t('steps.examination.desc2')],
            images: t.raw('steps.examination.images') as string[],
        },
        {
            number: 3,
            title: t('steps.treatment.title'),
            descriptions: [t('steps.treatment.desc1'), t('steps.treatment.desc2')],
            images: t.raw('steps.treatment.images') as string[],
        },
        {
            number: 4,
            title: t('steps.observation.title'),
            descriptions: [t('steps.observation.desc1'), t('steps.observation.desc2')],
            images: t.raw('steps.observation.images') as string[],
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray<HTMLElement>('.treatment-step')

            panels.forEach((panel, i) => {
                // Pin every panel for one full scroll "page" worth of distance
                // The last panel just stays — no need to animate it away
                ScrollTrigger.create({
                    trigger: panel,
                    start: 'top top',
                    // Each panel stays pinned while the NEXT one scrolls over it
                    // pinSpacing: false means panels stack on top of each other
                    pin: true,
                    pinSpacing: false,
                })

                // For every panel except the last, animate clip-path as the NEXT panel
                // scrolls into view — creating the trapezoid "paper peel" on the EXIT
                if (i < panels.length - 1) {
                    const nextPanel = panels[i + 1]

                    ScrollTrigger.create({
                        trigger: nextPanel,
                        start: 'top bottom',   // when next panel's top hits viewport bottom
                        end: 'top top',        // when next panel reaches top of viewport
                        scrub: true,
                        onUpdate: (self) => {
                            const p = self.progress
                            // Use eased progress so it starts slow and only gets dramatic near the end
                            const easedP = p * p  // quadratic ease — barely moves at start, accelerates at end
                            const shift = easedP * 12  // reduced from 20 to 12

                            gsap.set(panel, {
                                clipPath: `polygon(0% 100%, 100% 100%, ${100 + shift}% 0%, ${shift}% 0%)`,
                                transformOrigin: 'bottom right',
                                rotation: easedP * 2,  // also reduced rotation
                            })

                            const content = panel.querySelector<HTMLElement>('.step-body')
                            if (content) {
                                gsap.set(content, {
                                    opacity: 1 - easedP * 0.5,
                                    scale: 1 - easedP * 0.03,
                                })
                            }
                        },
                        onLeaveBack: () => {
                            gsap.to(panel, {
                                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                                rotation: -2,
                                duration: 0.4,
                                ease: 'power2.out',
                            })
                            gsap.to(panel, {
                                rotation: 0,
                                delay: 0.3,
                                duration: 0.3,
                            })
                            const content = panel.querySelector<HTMLElement>('.step-body')
                            if (content) {
                                gsap.to(content, { opacity: 1, scale: 1, duration: 0.3 })
                            }
                        },
                    })
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={sectionRef} className="w-full bg-burgundy">
            {/* Section heading — sits above all pinned panels */}
            <div
                className="mx-auto px-8 py-16"
                style={{ backgroundColor: '#F5F3EF' }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    {t('title')}
                </h2>
            </div>

            {/* Steps — each one is 100vh, they stack/pin */}
            {steps.map((step, index) => (
                <div
                    key={step.number}
                    className="treatment-step relative w-full"
                    style={{
                        height: '100vh',
                        backgroundColor: '#F5F3EF',
                        borderTop: '1px solid #1a1a1a',
                        zIndex: index + 1,
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        // Each next panel slides OVER the previous, so higher z-index
                        willChange: 'clip-path',
                    }}
                >
                    {/* Header row */}
                    <div className="flex items-center gap-12 px-8 py-5 h-16 border-b border-gray-200">
                        <span className="text-xs font-bold text-gray-500 w-6 flex-shrink-0">
                            {step.number}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
                            {step.title}
                        </span>
                    </div>

                    {/* Main content — centered vertically in remaining space */}
                    <div className="step-body px-8 py-20 h-[calc(100vh-64px)] flex items-start">
                        <div className="grid grid-cols-2 gap-16 ml-[72px] w-full">

                            {/* Image block  */}
                            <div className="flex items-center">
                                <StepImages images={step.images} />
                            </div>

                            {/* Big title */}
                            <div className="">
                                <h3 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                                    {step.title}
                                </h3>

                                {/* Descriptions */}
                                <div className="flex flex-col absolute bottom-[30dvh] gap-4">
                                    {step.descriptions.map((desc, idx) => (
                                        <p key={idx} className="text-gray-600 text-lg leading-relaxed">
                                            {desc}
                                        </p>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}