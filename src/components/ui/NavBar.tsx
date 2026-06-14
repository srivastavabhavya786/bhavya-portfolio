'use client'

import { useState, useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'

const navLinks = [
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Credentials', target: '#certificates' },
  { label: 'Connect', target: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      // Detect active section
      const sections = navLinks.map((l) => l.target.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (target: string) => {
    setMobileOpen(false)
    if (target === '#top') {
      lenis?.scrollTo(0, { duration: 1.4 })
      return
    }
    const el = document.querySelector(target)
    if (el && lenis) {
      lenis.scrollTo(el as HTMLElement, { duration: 1.4, offset: -80 })
    }
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: `${scrolled ? '1rem' : '1.5rem'} clamp(1.5rem, 5vw, 4rem)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: scrolled ? 'rgba(5, 5, 5, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          transition: 'all 0.5s ease',
        }}
      >
        {/* Logo */}
        <button
          data-cursor-hover
          onClick={() => scrollTo('#top')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img 
            src="/logo.png" 
            alt="Bhavya Srivastava Logo" 
            style={{ 
              height: '40px', 
              width: 'auto',
              filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.3))',
              transition: 'filter 0.3s ease'
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLElement).style.filter = 'drop-shadow(0 0 20px rgba(212,175,55,0.8))'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLElement).style.filter = 'drop-shadow(0 0 10px rgba(212,175,55,0.3))'
            }}
          />
        </button>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.target.replace('#', '')
            return (
              <button
                key={link.label}
                data-cursor-hover
                onClick={() => scrollTo(link.target)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: '0.82rem',
                  color: isActive ? '#D4AF37' : '#A1A1AA',
                  letterSpacing: '0.08em',
                  position: 'relative',
                  paddingTop: '8px',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = '#F5F5F5'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = '#A1A1AA'
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#D4AF37',
                    }}
                  />
                )}
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-toggle"
          data-cursor-hover
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1px',
              backgroundColor: '#D4AF37',
              transition: 'transform 0.3s ease',
              transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '1px',
              backgroundColor: '#D4AF37',
              opacity: mobileOpen ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '1px',
              backgroundColor: '#D4AF37',
              transition: 'transform 0.3s ease',
              transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#050505',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.label}
            data-cursor-hover
            onClick={() => scrollTo(link.target)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: '#F5F5F5',
              letterSpacing: '0.06em',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease ${i * 0.1}s`,
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
