'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const loadingMessages = [
  'INITIALIZING SYSTEM...',
  'ESTABLISHING CONNECTION...',
  'DECRYPTING ASSETS...',
  'RENDERING ENVIRONMENT...',
  'SYSTEM READY.',
]

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [scramble, setScramble] = useState('0x00000000')
  const progressRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev))
    }, 400)

    // Tech scramble text effect
    const scrambleInterval = setInterval(() => {
      let str = ''
      const chars = '0123456789ABCDEF'
      for (let i = 0; i < 8; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
      }
      setScramble('0x' + str)
    }, 50)

    // Progress counter animation with GSAP
    const progress = { value: 0 }
    gsap.to(progress, {
      value: 100,
      duration: 2.2, // 2.2 seconds total loading time
      ease: 'power3.inOut',
      onUpdate: () => {
        if (progressRef.current) {
          progressRef.current.innerText = Math.round(progress.value).toString()
        }
      },
      onComplete: () => {
        clearInterval(messageInterval)
        clearInterval(scrambleInterval)
        setScramble('0x00000000') // settle on a final stable string
        setMessageIndex(loadingMessages.length - 1)
        
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = ''
        }, 500)
      }
    })

    return () => {
      clearInterval(messageInterval)
      clearInterval(scrambleInterval)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader-wrapper"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
          }}
        >
          {/* Split Gates */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100vh', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50vh',
              backgroundColor: '#050505',
              borderBottom: '1px solid rgba(212,175,55,0.2)'
            }}
          />
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '100vh', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50vh',
              backgroundColor: '#050505',
              borderTop: '1px solid rgba(212,175,55,0.2)'
            }}
          />

          {/* Content (Fades out first before gates open) */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2rem',
              color: '#F5F5F5',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(212,175,55,0.8)' }}>
                BHAVYA SRIVASTAVA <br/>
                PORTFOLIO OS // v2.0
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                {scramble}
              </div>
            </div>

            {/* Center progress */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline' }}>
                <div 
                  ref={progressRef}
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'clamp(5rem, 15vw, 12rem)', 
                    lineHeight: 1,
                    color: '#D4AF37',
                    textShadow: '0 0 60px rgba(212,175,55,0.3)'
                  }}
                >
                  0
                </div>
                <span style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  color: 'rgba(212,175,55,0.5)',
                  marginLeft: '10px'
                }}>
                  %
                </span>
              </div>
              
              {/* Messages */}
              <div 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                  color: '#A1A1AA',
                  marginTop: '1rem',
                  textTransform: 'uppercase'
                }}
              >
                {loadingMessages[messageIndex]}
              </div>

              {/* Advanced Loading Bar */}
              <div style={{ width: '240px', height: '2px', background: 'rgba(255,255,255,0.05)', marginTop: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '40%',
                    background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                    boxShadow: '0 0 10px #D4AF37'
                  }}
                />
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                COORDINATES LOCKED <br/>
                [26.8467°N 80.9462°E]
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                LOADING SEQUENCE <br/>
                [SYS_STARTUP]
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
