'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Ring() {
  const outerRef = useRef<THREE.Mesh>(null)
  const midRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const accentRef = useRef<THREE.Mesh>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Shared material properties
  const materialProps = useMemo(
    () => ({
      metalness: 1.0,
      roughness: 0.0,
      transmission: 0.2,
      thickness: 0.8,
      color: new THREE.Color('#ffffff'),
      envMapIntensity: 3.0,
      iridescence: 0.6,
      iridescenceIOR: 1.5,
      reflectivity: 1.0,
    }),
    []
  )

  // Orbiting particles around outer ring
  const particleCount = 100
  const particleData = useMemo(() => {
    // Generate soft circular texture
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

    const positions = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)
    const offsets = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      offsets[i] = angle
      speeds[i] = 0.15 + Math.random() * 0.15
      positions[i * 3] = Math.cos(angle) * 1.8
      positions[i * 3 + 1] = Math.sin(angle) * 1.8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }

    return { positions, speeds, offsets, texture: particleTexture }
  }, [])

  useFrame((state, delta) => {
    if (!outerRef.current || !midRef.current || !innerRef.current || !accentRef.current)
      return

    // Outer ring: slow rotation
    outerRef.current.rotation.y += delta * 0.18
    outerRef.current.rotation.x += delta * 0.04

    // Mid ring: different speed
    midRef.current.rotation.x += delta * 0.22
    midRef.current.rotation.z += delta * 0.06

    // Inner ring: fastest, opposite Z
    innerRef.current.rotation.z -= delta * 0.28
    innerRef.current.rotation.y += delta * 0.10

    // Accent ring: very slow, breathing
    accentRef.current.rotation.y -= delta * 0.12
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.015
    accentRef.current.scale.setScalar(breathe)

    // Update orbiting particles
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < particleCount; i++) {
        const angle = particleData.offsets[i] + time * particleData.speeds[i]
        positions[i * 3] = Math.cos(angle) * 1.8
        positions[i * 3 + 1] = Math.sin(angle) * 1.8
        positions[i * 3 + 2] =
          Math.sin(time * 0.5 + particleData.offsets[i]) * 0.15
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true

      // Apply outer ring's rotation to particles
      pointsRef.current.rotation.copy(outerRef.current.rotation)
    }
  })

  return (
    <group ref={groupRef} position={[2.2, 0, 0]}>
      {/* Outer ring */}
      <mesh ref={outerRef}>
        <torusGeometry args={[1.8, 0.025, 16, 300]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>

      {/* Mid ring — tilted 45° on X */}
      <mesh ref={midRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.3, 0.018, 16, 200]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>

      {/* Inner ring — tilted 30° on Z */}
      <mesh ref={innerRef} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.9, 0.014, 16, 150]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>

      {/* Accent ring — ultra thin, tilted 70° on Y */}
      <mesh ref={accentRef} rotation={[0, (70 * Math.PI) / 180, 0]}>
        <torusGeometry args={[1.55, 0.008, 8, 100]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>

      {/* Orbiting gold particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#D4AF37"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          map={particleData.texture}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
