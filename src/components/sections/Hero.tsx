'use client'

import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolio'
import { useLenis } from '@/hooks/useLenis'
import { GridScan } from '@/components/ui/GridScan'

export default function Hero() {
  const lenis = useLenis()

  const scrollTo = (target: string) => {
    const el = document.querySelector(target)
    if (el && lenis) {
      lenis.scrollTo(el as HTMLElement, { duration: 1.4, offset: -80 })
    }
  }

  return (
    <section
      id="hero"
      style={{
        width: '100vw',
        height: '100svh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#D4AF37"
          gridScale={0.1}
          scanColor="#D4AF37"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          pointerEvents: 'none',
          textAlign: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-elegant)',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              color: '#F5F5F5',
              letterSpacing: '0.15em',
              margin: 0,
              lineHeight: 1.1,
              textAlign: 'center',
              position: 'relative'
            }}
          >
            BHAVYA
            <br />
            SRIVASTA<span style={{ position: 'relative', display: 'inline-block' }}>
              VA
              <img 
                src="/girl.png" 
                alt="3D Girl Character" 
                style={{ 
                  position: 'absolute', 
                  bottom: '-5%', // Massive drop
                  right: '-35%', // Shift her heavily to the right
                  height: '4em',
                  width: 'auto',
                  objectFit: 'contain',
                  zIndex: 20,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(-10px 10px 10px rgba(0,0,0,0.6))',
                  transform: 'translateY(40%)' // Force her hands flush onto the text
                }} 
              />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#D4AF37',
            letterSpacing: '0.3em',
            marginTop: '1.5rem',
            textTransform: 'uppercase'
          }}
        >
          Full-Stack Developer · AI Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ marginTop: '3rem', pointerEvents: 'auto' }}
        >
          <button
            data-cursor-hover
            onClick={() => scrollTo('#skills')}
            style={{
              border: '1px solid rgba(212,175,55,0.5)',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              color: '#F5F5F5',
              padding: '0.85rem 2.2rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = '#D4AF37'
              el.style.background = 'rgba(212,175,55,0.15)'
              el.style.color = '#D4AF37'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(212,175,55,0.5)'
              el.style.background = 'rgba(0,0,0,0.4)'
              el.style.color = '#F5F5F5'
            }}
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </section>
  )
}
