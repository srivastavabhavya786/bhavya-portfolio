'use client'

import { useRef, useState, useEffect } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const emailRef = useRef<HTMLButtonElement>(null)
  const linkedinRef = useRef<HTMLAnchorElement>(null)

  const { identity } = portfolioData

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = identity.email
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Magnetic effect
  useEffect(() => {
    const handleMagnetic = (ref: React.RefObject<HTMLElement | null>) => {
      const el = ref.current
      if (!el) return

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * 0.2
        const deltaY = (e.clientY - centerY) * 0.2
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
        el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
      }

      const onLeave = () => {
        el.style.transform = 'translate(0, 0)'
        el.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    }

    const cleanup1 = handleMagnetic(emailRef)
    const cleanup2 = handleMagnetic(linkedinRef)

    return () => {
      cleanup1?.()
      cleanup2?.()
    }
  }, [])

  // GSAP scroll animation
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        const elements = document.querySelectorAll('.contact-animate')
        const container = document.querySelector('#contact')
        
        if (container) {
          gsap.set(container, { perspective: 1500 })
        }

        gsap.fromTo(
          elements,
          { y: 80, z: -200, rotationX: -30, scale: 0.9, opacity: 0 },
          {
            y: 0,
            z: 0,
            rotationX: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    })
  }, [])

  return (
    <section
      id="contact"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        {/* Label */}
        <div className="contact-animate section-label" style={{ marginBottom: '2rem' }}>
          LET&apos;S BUILD SOMETHING
        </div>

        {/* Heading */}
        <h2
          className="contact-animate"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            color: '#F5F5F5',
            fontWeight: 600,
            letterSpacing: '0.04em',
            lineHeight: 1,
            marginBottom: '2rem',
            textShadow: '0 0 80px rgba(212,175,55,0.15)',
          }}
        >
          CONNECT.
        </h2>

        {/* Descriptor */}
        <p
          className="contact-animate"
          style={{
            fontFamily: 'var(--font-elegant)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: '#A1A1AA',
            lineHeight: 1.8,
            marginBottom: '3rem',
          }}
        >
          Available for full-time opportunities, collaborations, and conversations about interesting problems.
        </p>

        {/* Contact links */}
        <div className="contact-animate" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginBottom: '3rem' }}>
          {/* Email */}
          <button
            ref={emailRef}
            data-cursor-hover
            onClick={copyEmail}
            className="magnetic-link"
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
              color: copied ? '#D4AF37' : '#F5F5F5',
              transition: 'color 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {copied ? 'COPIED ✓' : identity.email}
          </button>

          {/* LinkedIn */}
          <a
            ref={linkedinRef}
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="magnetic-link"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
              color: '#F5F5F5',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#D4AF37'
              const arrow = e.currentTarget.querySelector('.link-arrow') as HTMLElement
              if (arrow) arrow.style.transform = 'translateX(6px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#F5F5F5'
              const arrow = e.currentTarget.querySelector('.link-arrow') as HTMLElement
              if (arrow) arrow.style.transform = 'translateX(0)'
            }}
          >
            linkedin.com/in/bhavya-srivastava-0a8784286
            <span className="link-arrow" style={{ transition: 'transform 0.3s ease', display: 'inline-block' }}>
              →
            </span>
          </a>
        </div>

        {/* Gold line */}
        <div
          className="contact-animate"
          style={{
            width: '64px',
            height: '1px',
            background: '#D4AF37',
            margin: '0 auto 2rem',
            opacity: 0.5,
          }}
        />

        {/* Footer */}
        <p
          className="contact-animate"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          &copy; {new Date().getFullYear()} Bhavya Srivastava &middot; Crafted with precision.
        </p>
      </div>
    </section>
  )
}
