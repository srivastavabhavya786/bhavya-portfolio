'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null)

  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 450

  const { positions, colors, speeds, phases, texture } = useMemo(() => {
    // Generate soft circular texture for particles
    let particleTexture = null
    if (typeof window !== 'undefined') {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)
        particleTexture = new THREE.CanvasTexture(canvas)
      }
    }

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)

    const goldColor = new THREE.Color('#D4AF37')
    const whiteColor = new THREE.Color('#F5F5F5')

    for (let i = 0; i < count; i++) {
      // Random position
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8

      // 30% gold, 70% white
      const isGold = Math.random() < 0.3
      const color = isGold ? goldColor : whiteColor
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      // Random sizes
      sizes[i] = 0.006 + Math.random() * 0.016

      // Individual speed and phase
      speeds[i] = 0.3 + Math.random() * 0.7
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, colors, sizes, speeds, phases, texture: particleTexture }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return

    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const speed = speeds[i]
      const phase = phases[i]

      // Subtle sine wave drift
      posArr[i * 3 + 1] += Math.sin(time * speed + phase) * 0.0008
      posArr[i * 3] += Math.cos(time * speed * 0.5 + phase) * 0.0004

      // Wrap bounds
      if (posArr[i * 3] > 10) posArr[i * 3] = -10
      if (posArr[i * 3] < -10) posArr[i * 3] = 10
      if (posArr[i * 3 + 1] > 6) posArr[i * 3 + 1] = -6
      if (posArr[i * 3 + 1] < -6) posArr[i * 3 + 1] = 6
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.12} /* Slightly larger since it's a soft gradient now */
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        map={texture}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
