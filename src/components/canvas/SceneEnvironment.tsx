'use client'

import { Environment } from '@react-three/drei'

export default function SceneEnvironment() {
  return (
    <>
      {/* Gold key light — gives the ring its golden reflection */}
      <pointLight position={[3, 3, 2]} color="#D4AF37" intensity={10} />

      {/* Soft fill light from below */}
      <pointLight position={[-2, -2, 1]} color="#F6E27A" intensity={4} />

      {/* Cool rim light from behind — creates contrast */}
      <pointLight position={[0, 0, -4]} color="#8888ff" intensity={2} />

      {/* Very dim ambient */}
      <ambientLight intensity={0.15} />

      {/* Environment map for reflections */}
      <Environment preset="night" />
    </>
  )
}
