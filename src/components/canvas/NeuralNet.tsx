'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function NeuralNet({ visible = false }: { visible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const nodeCount = 150
  const maxDist = 2.5

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3)
    const velocities = new Float32Array(nodeCount * 3)

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4

      velocities[i * 3] = (Math.random() - 0.5) * 0.003
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }

    return { positions, velocities }
  }, [])

  // Pre-allocate line geometry
  const maxLines = 800
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [])
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [])

  useFrame(() => {
    if (!visible || !pointsRef.current || !linesRef.current) return

    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array

    // Update node positions
    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]

      // Bounce at bounds
      if (Math.abs(pos[i * 3]) > 5) velocities[i * 3] *= -1
      if (Math.abs(pos[i * 3 + 1]) > 3) velocities[i * 3 + 1] *= -1
      if (Math.abs(pos[i * 3 + 2]) > 2) velocities[i * 3 + 2] *= -1
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Calculate connections
    let lineIdx = 0
    for (let i = 0; i < nodeCount && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < nodeCount && lineIdx < maxLines; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15

          linePositions[lineIdx * 6] = pos[i * 3]
          linePositions[lineIdx * 6 + 1] = pos[i * 3 + 1]
          linePositions[lineIdx * 6 + 2] = pos[i * 3 + 2]
          linePositions[lineIdx * 6 + 3] = pos[j * 3]
          linePositions[lineIdx * 6 + 4] = pos[j * 3 + 1]
          linePositions[lineIdx * 6 + 5] = pos[j * 3 + 2]

          // Gold color with distance-based alpha
          lineColors[lineIdx * 6] = 0.83 * opacity * 4
          lineColors[lineIdx * 6 + 1] = 0.686 * opacity * 4
          lineColors[lineIdx * 6 + 2] = 0.216 * opacity * 4
          lineColors[lineIdx * 6 + 3] = 0.83 * opacity * 4
          lineColors[lineIdx * 6 + 4] = 0.686 * opacity * 4
          lineColors[lineIdx * 6 + 5] = 0.216 * opacity * 4

          lineIdx++
        }
      }
    }

    // Update line geometry
    const lineGeo = linesRef.current.geometry
    lineGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions.slice(0, lineIdx * 6), 3)
    )
    lineGeo.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors.slice(0, lineIdx * 6), 3)
    )
    lineGeo.attributes.position.needsUpdate = true
    lineGeo.attributes.color.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx * 2)
  })

  if (!visible) return null

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={nodeCount}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#D4AF37"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.5} depthWrite={false} />
      </lineSegments>
    </group>
  )
}
