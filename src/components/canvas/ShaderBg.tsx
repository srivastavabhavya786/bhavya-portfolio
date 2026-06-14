'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// Random function
float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Noise
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a) * u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm(in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st = rot * st * 2.0 + shift;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    // Aspect ratio correction isn't strictly needed if we want a uniform flow, 
    // but multiplying by 3.0 sets the scale of the smoke.
    vec2 st = vUv * 3.5;

    // Domain warping
    vec2 q = vec2(0.0);
    q.x = fbm(st + 0.00 * uTime);
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);

    float f = fbm(st + r);

    // Colors
    vec3 colorDark = vec3(0.03, 0.03, 0.03); // Deep background
    vec3 colorSmoke = vec3(0.08, 0.08, 0.09); // Lighter smoke
    vec3 colorGold = vec3(0.83, 0.686, 0.216); // Gold highlights

    // Blend base colors based on noise
    vec3 color = mix(colorDark, colorSmoke, clamp((f*f)*4.0, 0.0, 1.0));
    
    // Add gold swirling highlights in the denser areas of the smoke
    color = mix(color, colorGold, clamp(length(q), 0.0, 1.0) * 0.15);
    color = mix(color, colorGold, clamp(length(r.x), 0.0, 1.0) * 0.3 * f * f * f);

    // Subtle dark vignette to blend with the rest of the dark site
    float vignette = smoothstep(1.5, 0.3, length(vUv - vec2(0.5)));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}
`

export default function ShaderBg() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          typeof window !== 'undefined' ? window.innerWidth : 1920,
          typeof window !== 'undefined' ? window.innerHeight : 1080
        ),
      },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}
