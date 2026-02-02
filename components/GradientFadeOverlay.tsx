'use client'

import React from 'react'

interface GradientFadeOverlayProps {
  direction?: 'top-to-bottom' | 'bottom-to-top'
  color?: string
}

const GradientFadeOverlay = ({ 
  direction = 'top-to-bottom',
  color = 'rgba(253, 251, 247, 1)'
}: GradientFadeOverlayProps) => {
  
  const getGradient = () => {
    if (direction === 'top-to-bottom') {
      // Solid at top, transparent at bottom (for Services section)
      return `
        linear-gradient(
          to bottom,
          ${color} 0%,
          ${color.replace('1)', '0.95)')} 5%,
          ${color.replace('1)', '0.85)')} 15%,
          ${color.replace('1)', '0.7)')} 25%,
          ${color.replace('1)', '0.5)')} 40%,
          ${color.replace('1)', '0.3)')} 55%,
          ${color.replace('1)', '0.15)')} 70%,
          ${color.replace('1)', '0.05)')} 85%,
          ${color.replace('1)', '0)')} 100%
        )
      `
    } else {
      // Transparent at top, solid at bottom (for future sections)
      return `
        linear-gradient(
          to bottom,
          ${color.replace('1)', '0)')} 0%,
          ${color.replace('1)', '0.05)')} 15%,
          ${color.replace('1)', '0.15)')} 30%,
          ${color.replace('1)', '0.3)')} 45%,
          ${color.replace('1)', '0.5)')} 60%,
          ${color.replace('1)', '0.7)')} 75%,
          ${color.replace('1)', '0.85)')} 85%,
          ${color.replace('1)', '0.95)')} 95%,
          ${color} 100%
        )
      `
    }
  }
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        background: getGradient()
      }}
    />
  )
}

export default GradientFadeOverlay