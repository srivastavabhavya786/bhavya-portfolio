'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PointCloudCursor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create point cloud
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Create a nice galaxy/sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 50 + Math.random() * 200; // Spread radius

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      sizes[i] = Math.random() * 2.0 + 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('basePosition', new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color('#D4AF37') }, // Gold theme
        mousePos: { value: new THREE.Vector3(9999, 9999, 0) },
        time: { value: 0 }
      },
      vertexShader: `
        uniform vec3 mousePos;
        uniform float time;
        attribute float size;
        attribute vec3 basePosition;
        varying float vAlpha;

        void main() {
          // Add some slow floating motion to all particles
          vec3 pos = basePosition;
          pos.x += sin(time * 0.5 + basePosition.y * 0.05) * 3.0;
          pos.y += cos(time * 0.3 + basePosition.x * 0.05) * 3.0;
          pos.z += sin(time * 0.4 + basePosition.z * 0.05) * 3.0;

          // Mouse interaction logic
          float dist = distance(pos.xy, mousePos.xy);
          float maxDist = 80.0; // Radius of mouse interaction
          
          vec3 finalPos = pos;
          float sizeMulti = 1.0;
          vAlpha = 0.25; // Base transparency of distant particles
          
          if (dist < maxDist) {
            float force = (maxDist - dist) / maxDist;
            
            // Repel particles smoothly away from the mouse
            vec2 dir = normalize(pos.xy - mousePos.xy);
            finalPos.xy += dir * force * 30.0;
            finalPos.z += force * 40.0; // Pop out towards the screen
            
            // Make them glow and grow near the mouse
            sizeMulti += force * 4.0;
            vAlpha += force * 0.75;
          }

          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_PointSize = size * sizeMulti * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        void main() {
          // Create a soft circular point instead of a square
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if (ll > 0.5) discard;
          
          // Soft gradient edge
          float alpha = (1.0 - (ll * 2.0)) * vAlpha;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Raycaster to map 2D mouse to 3D plane
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(9999, 9999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const targetPos = new THREE.Vector3(9999, 9999, 0);

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, targetPos);
    };

    window.addEventListener('pointermove', onPointerMove);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;
    
    // Smooth panning variables
    let targetRotationX = 0;
    let targetRotationY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      material.uniforms.time.value = elapsedTime;

      // Smoothly interpolate the uniform mouse position for fluid repulsion
      if (mouse.x !== 9999) {
        material.uniforms.mousePos.value.lerp(targetPos, 0.1);
      }

      // Smoothly tilt the entire point cloud based on cursor position
      if (mouse.x !== 9999) {
        targetRotationX = mouse.y * 0.15;
        targetRotationY = mouse.x * 0.15;
      }
      
      particles.rotation.x += (targetRotationX - particles.rotation.x) * 0.05;
      particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.05;

      // Add a constant slow rotation to make it feel alive
      particles.rotation.y += 0.001;
      particles.rotation.z += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        pointerEvents: 'none', 
        zIndex: 9998 
      }} 
    />
  );
}
