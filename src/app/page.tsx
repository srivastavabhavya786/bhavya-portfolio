'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for all components — no SSR for Three.js components
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })
const HUD = dynamic(() => import('@/components/ui/HUD'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), { ssr: false })
const NavBar = dynamic(() => import('@/components/ui/NavBar'), { ssr: false })

// Section components
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false })
const About = dynamic(() => import('@/components/sections/About'), { ssr: false })
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false })
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false })
const Certificates = dynamic(() => import('@/components/sections/Certificates'), { ssr: false })
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false })

// UI components
const GoldDivider = dynamic(() => import('@/components/ui/GoldDivider'), { ssr: false })
const Preloader = dynamic(() => import('@/components/ui/Preloader'), { ssr: false })
const PointCloudCursor = dynamic(() => import('@/components/ui/PointCloudCursor'), { ssr: false })

export default function Home() {
  return (
    <>
      <Preloader />
      {/* Fixed 3D Canvas — z-index 0 */}
      <Scene />
      
      {/* Global Point Cloud Cursor */}
      <PointCloudCursor />

      {/* HTML Content — z-index 1, scrolls over canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <NavBar />
        <HUD />
        <ScrollProgress />

        <main>
          <Hero />
          <GoldDivider number="01" />
          <About />
          <GoldDivider number="02" />
          <Skills />
          <GoldDivider number="03" />
          <Projects />
          <GoldDivider number="04" />
          <Certificates />
          <GoldDivider number="05" />
          <Contact />
        </main>
      </div>
    </>
  )
}
