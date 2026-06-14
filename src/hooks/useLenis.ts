'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const checkLenis = () => {
      const instance = (window as unknown as { __lenis: Lenis | null }).__lenis
      if (instance) {
        setLenis(instance)
      } else {
        requestAnimationFrame(checkLenis)
      }
    }
    checkLenis()
  }, [])

  return lenis
}
