'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { portfolioData } from '@/data/portfolio'
import ElectricBorder from '@/components/ui/ElectricBorder'

function ProjectTiltCard({ project }: { project: any }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])
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
      className="project-card-wrapper"
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
        className="glass-card"
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
            padding: '2.5rem',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.05)',
            background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.9) 100%)',
            borderTop: '1px solid rgba(212,175,55,0.2)',
            height: '100%',
          }}
        >
        <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Title */}
          <h3 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.5rem', 
            color: '#F5F5F5', 
            marginBottom: '1rem',
            transform: 'translateZ(20px)',
            textShadow: '0 0 15px rgba(255,255,255,0.2)'
          }}>
            {project.title}
          </h3>
          
          {/* Separator */}
          <div style={{ width: '40px', height: '2px', background: '#D4AF37', marginBottom: '1.25rem', opacity: 0.6, transform: 'translateZ(10px)' }} />
          
          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'rgba(245,245,245,0.7)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            transform: 'translateZ(15px)',
            flex: 1
          }}>
            {project.description}
          </p>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', transform: 'translateZ(30px)', marginBottom: '1.5rem' }}>
            {project.technologies.map((tech: string) => (
              <span key={tech} style={{ 
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                padding: '0.3rem 0.6rem',
                background: 'rgba(212,175,55,0.05)', 
                border: '1px solid rgba(212,175,55,0.1)', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                color: '#D4AF37'
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem', transform: 'translateZ(25px)' }}>
            {project.github && (
              <a 
                href={project.github} 
                target={project.github !== '#' ? '_blank' : '_self'} 
                rel="noopener noreferrer" 
                onClick={(e) => {
                  if (project.github === '#') e.preventDefault()
                }}
                style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#F5F5F5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <span style={{ color: '#D4AF37' }}>{`<`}</span> GitHub <span style={{ color: '#D4AF37' }}>{`/>`}</span>
              </a>
            )}
            {project.link && (
              <a 
                href={project.link} 
                target={project.link !== '#' ? '_blank' : '_self'} 
                rel="noopener noreferrer" 
                onClick={(e) => {
                  if (project.link === '#') e.preventDefault()
                }}
                style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#F5F5F5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <span style={{ color: '#D4AF37' }}>{`[`}</span> Live Demo <span style={{ color: '#D4AF37' }}>{`]`}</span>
              </a>
            )}
          </div>
        </div>
        </ElectricBorder>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.project-card-wrapper')
          gsap.set(cardsRef.current, { perspective: 2500 })
          
          gsap.fromTo(
            cards,
            { y: 200, z: -600, rotationX: 30, rotationY: 20, opacity: 0 },
            {
              y: 0,
              z: 0,
              rotationX: 0,
              rotationY: 0,
              opacity: 1,
              duration: 1.5,
              stagger: 0.2,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    })
  }, [])

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
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
        03
      </div>

      <div className="container-main">
        <div className="section-label" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          FEATURED WORK
        </div>
        <h2 className="text-h1" style={{ color: '#F5F5F5', textAlign: 'center', marginBottom: '4rem' }}>
          Selected Projects
        </h2>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem',
            perspective: '2500px',
            position: 'relative',
            zIndex: 10
          }}
        >
          {portfolioData.projects.map((project) => (
            <ProjectTiltCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
