
'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface LoadingScreenProps {
    isLoading: boolean
    onLoadComplete?: () => void
}

const LoadingScreen = ({ isLoading, onLoadComplete }: LoadingScreenProps) => {
    const [progress, setProgress] = useState(0)
    const [isDiving, setIsDiving] = useState(false)

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval)
                        setTimeout(() => setIsDiving(true), 300)
                        return 100
                    }
                    return prev + 6.67
                })
            }, 500)
            return () => clearInterval(interval)
        }
    }, [isLoading])

    useEffect(() => {
        if (isDiving && onLoadComplete) {
            const timeout = setTimeout(() => {
                onLoadComplete()
            }, 800) // fade 
            return () => clearTimeout(timeout)
        }
    }, [isDiving, onLoadComplete])


    const images = [
        '/images/loading/1.png',
        '/images/loading/2.png',
        '/images/loading/3.png',
    ]

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={
                        isDiving
                            ? {
                                scale: 3,
                                opacity: 1,
                            }
                            : { scale: 1, opacity: 1 }
                    }
                    exit={{ opacity: 0, scale: 3 }}
                    transition={
                        isDiving
                            ? { duration: 1.0, ease: 'easeIn' }
                            : { duration: 0.5 }
                    }
                    className="fixed inset-0 flex flex-col overflow-hidden origin-center"
                    style={{ backgroundColor: '#550e09', zIndex: 9999 }}
                >
                    <motion.div
                        className="pt-8 md:pt-16 px-4"
                        animate={isDiving ? { opacity: [1, 1, 0], y: [0, 0, -50] } : {}}
                        transition={
                            isDiving
                                ? {
                                    duration: 1.0,
                                    opacity: { times: [0, 0.8, 1] }, // Stay visible until 80% of animation
                                    y: { times: [0, 0.8, 1] }
                                }
                                : {}
                        }
                    >
                        <div className="relative">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white/30 whitespace-nowrap">
                                Завантажуємо простір турботи…
                            </h2>

                            <div
                                className="absolute inset-0 overflow-hidden transition-all duration-300"
                                style={{
                                    clipPath: progress >= 100
                                        ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                                        : progress >= 50
                                            ? `polygon(
                        0 0,
                        ${(progress - 50) * 2}% 0,
                        100% ${100 - (progress - 50) * 2}%,
                        100% 100%,
                        0 100%
                      )`
                                            : `polygon(
                        0 ${100 - progress * 2}%,
                        ${progress * 2}% 100%,
                        0 100%
                      )`,
                                }}
                            >
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white whitespace-nowrap">
                                    Завантажуємо простір турботи…
                                </h2>
                            </div>
                        </div>
                    </motion.div>

                    {/* Images - middle one bigger */}
                    <div className="flex-1 flex items-center justify-center px-4">
                        <div className="flex items-end justify-center gap-1 md:gap-2">
                            {images.map((imagePath, index) => {
                                const isMiddle = index === 1

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={
                                            isDiving && isMiddle
                                                ? {
                                                    opacity: [1, 1, 0], // Stay visible, then fade at end
                                                    y: 0,
                                                    scale: 6,
                                                    zIndex: 50,
                                                }
                                                : isDiving
                                                    ? {
                                                        opacity: 0,
                                                        scale: 0.5,
                                                        y: 100,
                                                    }
                                                    : {
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1,
                                                    }
                                        }
                                        transition={
                                            isDiving
                                                ? {
                                                    duration: 1.0,
                                                    ease: 'easeIn',
                                                    opacity: {
                                                        times: [0, 0.6, 1], // Stay visible 75% of animation, fade last 25%
                                                        duration: 1.0,
                                                    },
                                                }
                                                : { delay: index * 0.1, duration: 0.5 }
                                        }
                                        className="relative flex-shrink-0"
                                        style={{ zIndex: isMiddle && isDiving ? 50 : index }}
                                    >
                                        <div
                                            className={`bg-white overflow-hidden shadow-xl relative ${isMiddle ? 'w-70 h-90' : 'w-66 h-86'
                                                }`}
                                        >
                                            <Image
                                                src={imagePath}
                                                alt={`Loading image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Percentage progress */}
                    <motion.div
                        className="pb-12 md:pb-16"
                        animate={isDiving ? { opacity: 0, y: 50 } : {}}
                        transition={{ duration: 1.0 }}
                    >
                        <p className="text-white text-md font-bold text-center">
                            {progress.toFixed(0)}%
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingScreen