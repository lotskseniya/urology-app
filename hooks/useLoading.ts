'use client'

import { useState, useEffect } from 'react'

interface UseLoadingOptions {
  minimumLoadTime?: number // Minimum time to show loading (ms)
  check3DModel?: boolean // Whether to wait for 3D model
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { minimumLoadTime = 20000, check3DModel = true } = options
  const [isLoading, setIsLoading] = useState(true)
  const [is3DModelLoaded, setIs3DModelLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true
    const startTime = Date.now()

    // Function to check if minimum time has passed
    const checkMinimumTime = () => {
      const elapsedTime = Date.now() - startTime
      return elapsedTime >= minimumLoadTime
    }

    // Function to determine if loading is complete
    const checkLoadingComplete = () => {
      const minTimeReached = checkMinimumTime()
      const modelReady = check3DModel ? is3DModelLoaded : true

      return minTimeReached && modelReady
    }

    // Check loading status periodically
    const interval = setInterval(() => {
      if (isMounted && checkLoadingComplete()) {
        setIsLoading(false)
        clearInterval(interval)
      }
    }, 500)

    // Fallback: force hide after maximum time (minimumLoadTime + 10s)
    const maxTimeout = setTimeout(() => {
      if (isMounted) {
        console.warn('Loading screen timed out - forcing hide')
        setIsLoading(false)
      }
    }, minimumLoadTime + 10000)

    return () => {
      isMounted = false
      clearInterval(interval)
      clearTimeout(maxTimeout)
    }
  }, [minimumLoadTime, check3DModel, is3DModelLoaded])

  // Function to be called when 3D model is loaded
  const handle3DModelLoaded = () => {
    setIs3DModelLoaded(true)
  }

  return {
    isLoading,
    handle3DModelLoaded,
    is3DModelLoaded,
  }
}