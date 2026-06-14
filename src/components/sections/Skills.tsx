'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { portfolioData } from '@/data/portfolio'
import ElectricBorder from '@/components/ui/ElectricBorder'

const iconMap: Record<string, string> = {
  code: '⟨/⟩',
  layout: '◧',
  server: '⬡',
  cpu: '◎',
  database: '⛁',
  tool: '⚙',
}

function TiltCard({ skill, iconMap }: { skill: any; iconMap: Record<string, string> }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])
  const brightness = useTransform(mouseYSpring, [-0.5, 0.5], [1.2, 0.8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="skill-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%',
      }}
    >
      <motion.div
        className="glass-card skill-card"
        style={{
          rotateX,
          rotateY,
          filter: `brightness(${brightness})`,
          transformStyle: 'preserve-3d',
          height: '100%',
        }}
      >
        <ElectricBorder
          color="#D4AF37"
          speed={1}
          chaos={0.12}
          borderRadius={8}
          style={{
            padding: '2rem',
            minHeight: '200px',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.05)',
            background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.9) 100%)',
            borderTop: '1px solid rgba(212,175,55,0.2)',
            height: '100%'
          }}
        >
        <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
          {/* Icon + category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', transform: 'translateZ(20px)' }}>
            <span style={{ fontSize: '1.2rem', color: '#D4AF37', textShadow: '0 0 10px rgba(212,175,55,0.5)' }}>
              {iconMap[skill.icon] || '◆'}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#D4AF37',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textShadow: '0 0 10px rgba(212,175,55,0.3)',
              }}
            >
              {skill.category}
            </span>
          </div>
          {/* Separator */}
          <div style={{ width: '32px', height: '1px', background: '#D4AF37', marginBottom: '1.25rem', opacity: 0.5, transform: 'translateZ(10px)' }} />
          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', transform: 'translateZ(30px)' }}>
            {skill.technologies.map((tech: string) => (
              <span key={tech} className="skill-tag" style={{ background: 'rgba(212,175,55,0.03)', border: '1px solid rgba(212,175,55,0.1)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} data-cursor-hover>
                {tech}
              </span>
            ))}
          </div>
        </div>
        </ElectricBorder>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const barsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        // Animate cards
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.skill-card-wrapper')
          gsap.set(cardsRef.current, { perspective: 2000 })
          gsap.fromTo(
            cards,
            { y: 150, z: -400, rotationX: 45, rotationY: -15, opacity: 0 },
            {
              y: 0,
              z: 0,
              rotationX: 0,
              rotationY: 0,
              opacity: 1,
              duration: 1.4,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // Animate proficiency bars
        if (barsRef.current) {
          const rows = barsRef.current.querySelectorAll('.proficiency-row')
          const fills = barsRef.current.querySelectorAll('.bar-fill')
          
          gsap.set(barsRef.current, { perspective: 1200 })
          
          // 3D row entrance
          gsap.fromTo(
            rows,
            { rotationX: -90, transformOrigin: "top center", opacity: 0, y: 50 },
            {
              rotationX: 0,
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.1,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: barsRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          )

          fills.forEach((fill, i) => {
            const level = fill.getAttribute('data-level') || '0'
            gsap.fromTo(
              fill,
              { width: '0%' },
              {
                width: `${level}%`,
                duration: 1.4,
                delay: 0.4 + i * 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                  trigger: barsRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            )
          })
        }
      })
    })
  }, [])

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '-2rem',
          right: '-2rem',
          fontFamily: 'var(--font-display)',
          fontSize: '20rem',
          opacity: 0.03,
          color: '#D4AF37',
          pointerEvents: 'none',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        02
      </div>

      <div className="container-main">
        <div className="section-label" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          TECHNICAL ARSENAL
        </div>
        <h2 className="text-h1" style={{ color: '#F5F5F5', textAlign: 'center', marginBottom: '4rem' }}>
          Skills & Technologies
        </h2>

        {/* Category Cards Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '6rem',
            perspective: '2000px',
          }}
        >
          {portfolioData.skills.map((skill) => (
            <TiltCard key={skill.category} skill={skill} iconMap={iconMap} />
          ))}
        </div>

        {/* Proficiency Bars */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-label">PROFICIENCY LEVELS</span>
        </div>

        <div
          ref={barsRef}
          style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {portfolioData.proficiency.map((skill) => (
            <div key={skill.name} className="proficiency-row" style={{ transformStyle: 'preserve-3d' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '0.85rem', color: '#F5F5F5' }}>
                  {skill.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#D4AF37',
                  }}
                >
                  {skill.level}%
                </span>
              </div>
              <div className="proficiency-track">
                <div className="proficiency-fill bar-fill" data-level={skill.level} style={{ width: '0%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
