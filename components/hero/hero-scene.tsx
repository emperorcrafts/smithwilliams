'use client'

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(200,160,255,0.8)')
  g.addColorStop(1, 'rgba(155,77,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeFeatherTexture() {
  const w = 128
  const h = 384
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!
  const vane = new Path2D()
  vane.moveTo(w / 2, 8)
  vane.bezierCurveTo(w * 0.95, h * 0.2, w * 0.92, h * 0.6, w / 2, h - 10)
  vane.bezierCurveTo(w * 0.08, h * 0.6, w * 0.05, h * 0.2, w / 2, 8)
  const g = ctx.createLinearGradient(0, 0, w, 0)
  g.addColorStop(0, '#0b0812')
  g.addColorStop(0.5, '#2c1e45')
  g.addColorStop(1, '#0b0812')
  ctx.fillStyle = g
  ctx.fill(vane)
  ctx.save()
  ctx.clip(vane)
  ctx.strokeStyle = 'rgba(120,90,170,0.35)'
  ctx.lineWidth = 1
  for (let y = 20; y < h; y += 7) {
    ctx.beginPath()
    ctx.moveTo(w / 2, y)
    ctx.lineTo(0, y + 26)
    ctx.moveTo(w / 2, y)
    ctx.lineTo(w, y + 26)
    ctx.stroke()
  }
  ctx.restore()
  ctx.strokeStyle = 'rgba(200,196,210,0.7)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(w / 2, 10)
  ctx.lineTo(w / 2, h)
  ctx.stroke()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const texture = useMemo(() => makeDotTexture(), [])
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    const pts = ref.current
    if (!pts) return
    const pos = pts.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + delta * (0.12 + (i % 7) * 0.02)
      if (y > 8) y = -8
      pos.setY(i, y)
    }
    pos.needsUpdate = true
    pts.rotation.y = THREE.MathUtils.lerp(pts.rotation.y, state.pointer.x * 0.12, 0.03)
    pts.rotation.x = THREE.MathUtils.lerp(pts.rotation.x, -state.pointer.y * 0.06, 0.03)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#b98cff"
      />
    </points>
  )
}

function Feathers({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const texture = useMemo(() => makeFeatherTexture(), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 22,
        y: (Math.random() - 0.5) * 16,
        z: Math.random() * 6 - 4,
        speed: 0.35 + Math.random() * 0.45,
        sway: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.8,
        rot: Math.random() * Math.PI,
        scale: 0.5 + Math.random() * 0.7,
      })),
    [count],
  )

  useFrame((state, delta) => {
    const mesh = ref.current
    if (!mesh) return
    const t = state.clock.elapsedTime
    seeds.forEach((s, i) => {
      s.y -= delta * s.speed
      if (s.y < -9) {
        s.y = 9
        s.x = (Math.random() - 0.5) * 22
      }
      s.rot += delta * s.spin
      dummy.position.set(s.x + Math.sin(t * 0.6 + s.sway) * 0.8, s.y, s.z)
      dummy.rotation.set(Math.sin(t + s.sway) * 0.6, s.rot, Math.sin(t * 0.8 + s.sway) * 0.9)
      dummy.scale.setScalar(s.scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.36, 1.08]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function HeroScene() {
  return (
    <SceneBoundary>
      <HeroCanvas />
    </SceneBoundary>
  )
}

function HeroCanvas() {
  const wrap = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [supported] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      const c = document.createElement('canvas')
      // Skip software renderers: the 2.5D layers already carry the scene without WebGL.
      const attrs = { failIfMajorPerformanceCaveat: true }
      const gl = (c.getContext('webgl2', attrs) ?? c.getContext('webgl', attrs)) as WebGLRenderingContext | null
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
      return !!gl
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!wrap.current || !supported) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting))
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [supported])

  if (!supported) return null

  return (
    <div ref={wrap} aria-hidden="true" className="absolute inset-0">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        eventSource={document.body}
        eventPrefix="client"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Particles count={isMobile ? 350 : 900} />
        <Feathers count={isMobile ? 10 : 22} />
      </Canvas>
    </div>
  )
}
