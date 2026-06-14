'use client'

import { useEffect, useRef } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        // Animate elements
        if (elementsRef.current) {
          const children = elementsRef.current.querySelectorAll('.about-animate')
          gsap.set(elementsRef.current, { perspective: 1200 })
          gsap.fromTo(
            children,
            { y: 80, z: -150, rotationX: -45, opacity: 0 },
            {
              y: 0,
              z: 0,
              rotationX: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: '#about',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // Count-up stats
        if (statsRef.current) {
          const numbers = statsRef.current.querySelectorAll('.stat-number')
          numbers.forEach((el) => {
            const text = el.textContent || ''
            const numMatch = text.match(/\d+/)
            if (numMatch) {
              const target = parseInt(numMatch[0])
              const suffix = text.replace(numMatch[0], '')
              const obj = { val: 0 }
              gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: statsRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
                onUpdate: function () {
                  el.textContent = Math.round(obj.val) + suffix
                },
              })
            }
          })
        }
      })
    })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Large section number watermark */}
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
        01
      </div>

      <div
        ref={elementsRef}
        className="container-main"
        style={{
          display: 'grid',
          gridTemplateColumns: '45% 55%',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <div>
          <div className="about-animate section-label" style={{ marginBottom: '1.5rem' }}>
            ABOUT ME
          </div>
          <h2 className="about-animate text-h1" style={{ color: '#F5F5F5', marginBottom: '0.5rem' }}>
            The Engineer
          </h2>
          <div
            className="about-animate"
            style={{
              fontFamily: 'var(--font-elegant)',
              fontStyle: 'italic',
              fontSize: 'var(--text-h2)',
              color: '#A1A1AA',
              marginBottom: '1.5rem',
            }}
          >
            Behind the Code
          </div>
          <div
            className="about-animate"
            style={{
              width: '60px',
              height: '1px',
              background: '#D4AF37',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Right column */}
        <div>
          {portfolioData.about.map((para, i) => (
            <p
              key={i}
              className="about-animate"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                lineHeight: 1.9,
                color: '#A1A1AA',
                marginBottom: '1.5rem',
                fontSize: 'var(--text-body)',
              }}
            >
              {i === 0 ? (
                <>
                  <span style={{ color: '#F5F5F5', fontWeight: 500 }}>
                    {para.split(' ')[0]}
                  </span>{' '}
                  {para.split(' ').slice(1).join(' ')}
                </>
              ) : (
                para
              )}
            </p>
          ))}

          <p
            className="about-animate"
            style={{
              fontFamily: 'var(--font-elegant)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.8,
              color: '#D4AF37',
              fontSize: '1rem',
              marginBottom: '3rem',
            }}
          >
            {portfolioData.seeking}
          </p>

          {/* Stats row */}
          <div
            ref={statsRef}
            className="about-animate"
            style={{
              display: 'flex',
              gap: '0',
              flexWrap: 'wrap',
            }}
          >
            {portfolioData.stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0',
                }}
              >
                <div style={{ padding: '0 1.5rem', textAlign: 'center' }}>
                  <div
                    className="stat-number"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.5rem',
                      color: '#F5F5F5',
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '0.75rem',
                      color: '#A1A1AA',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginTop: '0.25rem',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
                {i < portfolioData.stats.length - 1 && (
                  <div
                    style={{
                      width: '1px',
                      height: '40px',
                      background: 'rgba(255,255,255,0.08)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .container-main {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
