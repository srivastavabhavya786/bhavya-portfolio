'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Suspense } from 'react'
import Particles from './Particles'
import ShaderBg from './ShaderBg'
import SceneEnvironment from './SceneEnvironment'

export default function Scene() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <SceneEnvironment />
          <ShaderBg />
          <Particles />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}
