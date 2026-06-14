'use client'

import { useEffect, useRef } from 'react'

interface GoldDividerProps {
  number?: string
}

export default function GoldDivider({ number }: GoldDividerProps) {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && lineRef.current) {
            lineRef.current.style.transform = 'scaleX(1)'
          }
        })
      },
      { threshold: 0, rootMargin: '-15% 0px' }
    )

    if (lineRef.current) {
      observer.observe(lineRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="gold-divider"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 0',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div
        ref={lineRef}
        style={{
          width: '100%',
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)',
          transform: 'scaleX(0)',
          transformOrigin: 'center center',
          transition: 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      />
      {number && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#050505',
            padding: '0 1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#D4AF37',
            letterSpacing: '0.2em',
            whiteSpace: 'nowrap',
          }}
        >
          / {number} /
        </div>
      )}
    </div>
  )
}
