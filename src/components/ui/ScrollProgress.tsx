'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        zIndex: 1000,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(to right, #D4AF37, #F6E27A)',
          boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  )
}
