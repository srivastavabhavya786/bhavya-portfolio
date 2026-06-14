'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px) scale(${isHovering ? 0 : isClicking ? 2 : 1})`
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      setTimeout(() => setIsClicking(false), 150)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor-hover]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Lerped ring animation
    let animationFrame: number
    const animateRing = () => {
      const lerp = 0.10
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp

      if (ringRef.current) {
        const size = isHovering ? 56 : 32
        const offset = size / 2
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px) scale(${isClicking ? 0.7 : 1})`
        ringRef.current.style.borderColor = isHovering
          ? 'rgba(212, 175, 55, 0.8)'
          : 'rgba(212, 175, 55, 0.5)'
        ringRef.current.style.background = isHovering
          ? 'rgba(212, 175, 55, 0.08)'
          : 'transparent'
      }

      animationFrame = requestAnimationFrame(animateRing)
    }
    animateRing()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrame)
    }
  }, [isHovering, isClicking])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#F5F5F5',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'transform 0.05s linear',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1px solid rgba(212, 175, 55, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          background: 'transparent',
          transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease',
        }}
      />
      <style jsx global>{`
        @media (hover: none) {
          .cursor-dot, .cursor-ring { display: none !important; }
        }
      `}</style>
    </>
  )
}
