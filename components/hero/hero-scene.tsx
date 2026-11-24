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

const gothicTowers = [
  { position: [-8.8, -3.5, -4.5] as [number, number, number], scale: 1.35, rotation: 0.08 },
  { position: [-5.9, -3.7, -8] as [number, number, number], scale: 0.82, rotation: -0.05 },
  { position: [8.8, -3.4, -4] as [number, number, number], scale: 1.42, rotation: -0.08 },
  { position: [5.8, -3.8, -8.5] as [number, number, number], scale: 0.78, rotation: 0.05 },
]

function GothicTower({ position, scale, rotation }: (typeof gothicTowers)[number]) {
  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.45, 2.4, 1.35]} />
        <meshStandardMaterial color="#100c18" metalness={0.75} roughness={0.48} />
      </mesh>
      <mesh position={[0, 2.65, 0]}>
        <boxGeometry args={[1.95, 0.3, 1.8]} />
        <meshStandardMaterial color="#191224" metalness={0.8} roughness={0.42} />
      </mesh>
      <mesh position={[0, 4.05, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.86, 2.7, 4]} />
        <meshStandardMaterial color="#0b0812" metalness={0.68} roughness={0.4} />
      </mesh>
      {[-0.42, 0, 0.42].map((x) => (
        <mesh key={x} position={[x, 1.24, 0.69]}>
          <boxGeometry args={[0.12, 0.72, 0.025]} />
          <meshBasicMaterial color="#9b4dff" transparent opacity={x === 0 ? 0.62 : 0.38} />
        </mesh>
      ))}
      <mesh position={[0, -0.16, 0]}>
        <boxGeometry args={[2.3, 0.38, 2.05]} />
        <meshStandardMaterial color="#0b0812" metalness={0.82} roughness={0.36} />
      </mesh>
    </group>
  )
}

function GothicArchitecture() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.elapsedTime
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.025, 1.2, 1 / 60)
    group.current.position.y = Math.sin(time * 0.18) * 0.07
  })

  return (
    <group ref={group}>
      {gothicTowers.map((tower, index) => (
        <GothicTower key={index} {...tower} />
      ))}
      <mesh position={[0, -2.25, -7]}>
        <boxGeometry args={[13.5, 0.55, 1.25]} />
        <meshStandardMaterial color="#100c18" metalness={0.8} roughness={0.5} />
      </mesh>
      <mesh position={[0, -1.94, -6.35]}>
        <boxGeometry args={[12.8, 0.035, 0.035]} />
        <meshBasicMaterial color="#6426b8" transparent opacity={0.55} />
      </mesh>
    </group>
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
      if (!gl) return false
      const rendererInfo = gl.getExtension('WEBGL_debug_renderer_info')
      const renderer = rendererInfo ? gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL) : ''
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      return !/swiftshader|llvmpipe|software/i.test(renderer)
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
        <ambientLight intensity={0.62} color="#c6a2ff" />
        <pointLight position={[-8, 4, 2]} intensity={26} color="#6426b8" distance={28} />
        <pointLight position={[8, 3, 0]} intensity={18} color="#9b4dff" distance={24} />
        <GothicArchitecture />
        <Particles count={isMobile ? 350 : 900} />
        <Feathers count={isMobile ? 10 : 22} />
      </Canvas>
    </div>
  )
}
