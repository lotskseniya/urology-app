'use client'

import React from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import { useLoading } from '@/hooks/useLoading'

interface ClientLoadingWrapperProps {
  children: React.ReactNode
}

export default function ClientLoadingWrapper({ children }: ClientLoadingWrapperProps) {
  const { isLoading } = useLoading({
    minimumLoadTime: 7000, // 7 seconds for testing
    check3DModel: false, // Set to true when you add 3D model
  })

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </>
  )
}