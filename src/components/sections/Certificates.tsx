'use client'

import { useEffect, useRef } from 'react'
import { portfolioData } from '@/data/portfolio'
import ElectricBorder from '@/components/ui/ElectricBorder'

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        if (containerRef.current) {
          const certs = containerRef.current.querySelectorAll('.cert-card')
          
          gsap.set(containerRef.current, { perspective: 2000 })

          gsap.fromTo(
            certs,
            { y: 150, z: -300, rotationY: 25, rotationX: 10, opacity: 0 },
            {
              y: 0,
              z: 0,
              rotationY: 0,
              rotationX: 0,
              opacity: 1,
              duration: 1.4,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="certificates" className="section-padding" style={{ position: 'relative' }}>
      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '-2rem',
          left: '-2rem',
          fontFamily: 'var(--font-display)',
          fontSize: '20rem',
          opacity: 0.03,
          color: '#D4AF37',
          pointerEvents: 'none',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        04
      </div>

      <div ref={containerRef} className="container-main">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            CERTIFICATIONS & CREDENTIALS
          </div>
          <h2 className="text-h1" style={{ color: '#F5F5F5', marginBottom: '1rem' }}>
            Hall of Achievements
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-elegant)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1.15rem',
              color: '#A1A1AA',
              lineHeight: 1.8,
            }}
          >
            Validated expertise across engineering disciplines.
          </p>
        </div>

        {/* Certificate Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {portfolioData.certificates.map((cert, i) => (
            <ElectricBorder 
              key={i} 
              className="cert-card" 
              color="#D4AF37" 
              borderRadius={2}
              style={{ minHeight: '240px' }}
            >
              <div data-cursor-hover style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Corner brackets (bottom) */}
              <div className="cert-card-bottom-left" />
              <div className="cert-card-bottom-right" />

              {/* Card top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                {/* Org logo placeholder */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    color: '#A1A1AA',
                  }}
                >
                  {cert.organization[0] === '[' ? '?' : cert.organization[0]}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    color: '#D4AF37',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  CERTIFIED
                </span>
              </div>

              {/* Separator */}
              <div style={{ width: '100%', height: '1px', background: 'rgba(212,175,55,0.15)', marginBottom: '1rem' }} />

              {/* Body */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    color: '#D4AF37',
                    letterSpacing: '0.2em',
                    marginBottom: '0.5rem',
                  }}
                >
                  CERTIFICATE OF COMPLETION
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: '#F5F5F5',
                    lineHeight: 1.3,
                    marginBottom: '0.5rem',
                  }}
                >
                  {cert.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.8rem',
                    color: '#A1A1AA',
                    marginBottom: '0.25rem',
                  }}
                >
                  {cert.organization}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: '#A1A1AA',
                    marginBottom: '0.25rem',
                  }}
                >
                  {cert.date}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.3)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {cert.credentialId}
                </div>

                {/* Skill tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="skill-tag" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(212,175,55,0.15)', marginBottom: '0.75rem' }} />
                <a
                  href={cert.verifyUrl}
                  target={cert.verifyUrl !== '#' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  data-cursor-hover
                  onClick={(e) => {
                    if (cert.verifyUrl === '#') e.preventDefault()
                  }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(212,175,55,0.7)',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#D4AF37'
                    const arrow = e.currentTarget.querySelector('.verify-arrow') as HTMLElement
                    if (arrow) arrow.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(212,175,55,0.7)'
                    const arrow = e.currentTarget.querySelector('.verify-arrow') as HTMLElement
                    if (arrow) arrow.style.transform = 'translateX(0)'
                  }}
                >
                  VERIFY CREDENTIAL{' '}
                  <span className="verify-arrow" style={{ transition: 'transform 0.3s ease', display: 'inline-block' }}>
                    →
                  </span>
                </a>
              </div>
            </div>
            </ElectricBorder>
          ))}
        </div>

        {/* Below grid text */}
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-elegant)',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: '#A1A1AA',
            marginTop: '3rem',
            opacity: 0.7,
          }}
        >
          More certifications in progress.
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
