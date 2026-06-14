'use client'

import { useEffect, useState } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { portfolioData } from '@/data/portfolio'

export default function HUD() {
  const scrollProgress = useScrollProgress()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const progressPercent = Math.round(scrollProgress * 100)
  const barFill = Math.round(scrollProgress * 16)
  const progressBar = '█'.repeat(barFill) + '░'.repeat(16 - barFill)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
        opacity: visible ? 0.4 : 0,
        transition: 'opacity 1.5s ease',
      }}
    >
      {/* Bottom-left — scroll progress */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          left: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}
      >
        <div className="hud-label" style={{ color: '#A1A1AA', marginBottom: '6px' }}>
          SCROLL
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ color: 'rgba(212,175,55,0.6)' }}>{progressBar}</span>
          &nbsp;&nbsp;{progressPercent}%
        </div>
      </div>

      {/* Bottom-right — coordinates + session */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          right: 'clamp(1.5rem, 3vw, 2.5rem)',
          textAlign: 'right',
        }}
      >
        <div
          className="hud-label"
          style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '4px' }}
        >
          {portfolioData.identity.coordinates.lat}&nbsp;&nbsp;
          {portfolioData.identity.coordinates.lng}
        </div>
        <div className="hud-label" style={{ color: 'rgba(255,255,255,0.15)' }}>
          BSR-{new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}
