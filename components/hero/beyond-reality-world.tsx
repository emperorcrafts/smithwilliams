'use client'

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { RefObject } from 'react'
import * as THREE from 'three'

const chapterIds = ['top', 'gaming', 'creative', 'digital', 'about', 'contact', 'final-exit']
const fallbackStops = [0, 0.16, 0.34, 0.52, 0.7, 0.86, 1]

type ChapterGroup = THREE.Group & { baseMaterials?: Array<{ material: THREE.Material; opacity: number }> }

function updateChapter(group: ChapterGroup, opacity: number) {
  if (!group.baseMaterials) {
    group.baseMaterials = []
    group.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.forEach((material) => {
        const transparentMaterial = material.clone()
        transparentMaterial.transparent = true
        transparentMaterial.depthWrite = false
        object.material = Array.isArray(object.material) ? object.material.map((current) => current === material ? transparentMaterial : current) : transparentMaterial
        group.baseMaterials?.push({ material: transparentMaterial, opacity: material.opacity })
      })
    })
  }

  group.visible = opacity > 0.015
  group.scale.setScalar(0.92 + opacity * 0.08)
  group.position.y = (1 - opacity) * -0.2
  group.baseMaterials.forEach(({ material, opacity: baseOpacity }) => {
    material.opacity = baseOpacity * opacity
  })
}

function Spire({ x, z, height, width = 1 }: { x: number; z: number; height: number; width?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height * 0.25, 0]}>
        <boxGeometry args={[width, height * 0.5, width]} />
        <meshStandardMaterial color="#15101d" metalness={0.8} roughness={0.42} />
      </mesh>
      <mesh position={[0, height * 0.68, 0]}>
        <boxGeometry args={[width * 1.28, 0.18, width * 1.28]} />
        <meshStandardMaterial color="#2a1b39" metalness={0.85} roughness={0.34} />
      </mesh>
      <mesh position={[0, height * 0.93, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[width * 0.64, height * 0.55, 4]} />
        <meshStandardMaterial color="#0b0910" metalness={0.72} roughness={0.35} />
      </mesh>
      <mesh position={[0, height * 0.3, width / 2 + 0.009]}>
        <boxGeometry args={[0.035, height * 0.28, 0.015]} />
        <meshBasicMaterial color="#9b4dff" transparent opacity={0.72} />
      </mesh>
    </group>
  )
}

function GothicKeep() {
  return (
    <group>
      <Spire x={-4.2} z={-1} height={6.3} width={1.25} />
      <Spire x={4.1} z={-1.8} height={7.2} width={1.5} />
      <Spire x={-7.1} z={-4} height={4.3} width={0.9} />
      <Spire x={7} z={-4.5} height={4.8} width={1} />
      <mesh position={[0, 1.25, -2.6]}>
        <boxGeometry args={[5.5, 4.2, 1.7]} />
        <meshStandardMaterial color="#100c17" metalness={0.78} roughness={0.46} />
      </mesh>
      <mesh position={[0, 3.7, -2.58]}>
        <coneGeometry args={[3.65, 2.7, 4]} />
        <meshStandardMaterial color="#09070d" metalness={0.76} roughness={0.36} />
      </mesh>
      <mesh position={[0, -1.15, 0]}>
        <boxGeometry args={[20, 0.3, 8]} />
        <meshStandardMaterial color="#100c17" metalness={0.72} roughness={0.48} />
      </mesh>
      <mesh position={[0, -0.97, 1.4]}>
        <boxGeometry args={[12, 0.025, 0.035]} />
        <meshBasicMaterial color="#6426b8" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

function Arena() {
  return (
    <group>
      <mesh position={[0, -1.2, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[7, 8.5, 0.35, 12, 1, true]} />
        <meshStandardMaterial color="#171021" metalness={0.86} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.98, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6.9, 0.035, 8, 72]} />
        <meshBasicMaterial color="#9b4dff" transparent opacity={0.9} />
      </mesh>
      {[-5.3, 0, 5.3].map((x, i) => (
        <group key={x} position={[x, 0.2 + (i === 1 ? 0.7 : 0), -3.7]} rotation={[0, (i - 1) * -0.22, 0]}>
          <mesh>
            <boxGeometry args={[3.5, 2.25, 0.2]} />
            <meshStandardMaterial color="#0c0912" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[3.18, 1.93]} />
            <meshBasicMaterial color={i === 1 ? '#311450' : '#1d1128'} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, -1.25, 0]}>
            <boxGeometry args={[0.12, 2.3, 0.3]} />
            <meshStandardMaterial color="#30203b" metalness={0.88} roughness={0.32} />
          </mesh>
        </group>
      ))}
      <Spire x={-9} z={-5} height={5} width={0.9} />
      <Spire x={9} z={-5} height={5} width={0.9} />
    </group>
  )
}

function Gallery() {
  return (
    <group>
      {[-5, -1.7, 1.7, 5].map((x, i) => (
        <group key={x} position={[x, Math.sin(i * 1.5) * 0.6, -2.7 - (i % 2) * 1.2]} rotation={[0, (i - 1.5) * -0.12, (i % 2 ? 1 : -1) * 0.04]}>
          <mesh>
            <boxGeometry args={[2.55, 3.2, 0.18]} />
            <meshStandardMaterial color="#a9a3b8" metalness={0.9} roughness={0.28} />
          </mesh>
          <mesh position={[0, 0, 0.105]}>
            <boxGeometry args={[2.35, 3, 0.035]} />
            <meshStandardMaterial color={i % 2 ? '#26123b' : '#15101e'} emissive="#351958" emissiveIntensity={0.4} metalness={0.42} roughness={0.45} />
          </mesh>
          <mesh position={[0, -2, 0]}>
            <cylinderGeometry args={[0.12, 0.2, 1.8, 8]} />
            <meshStandardMaterial color="#30243a" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -1.45, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[5.5, 5.5, 0.08, 48]} />
        <meshBasicMaterial color="#6426b8" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

function DigitalKingdom() {
  return (
    <group>
      <Spire x={-6.2} z={-3} height={8} width={1.1} />
      <Spire x={6.2} z={-3} height={9.2} width={1.3} />
      {[-3.4, 0, 3.4].map((x, i) => (
        <group key={x} position={[x, 0.15 + (i === 1 ? 0.6 : 0), -2]} rotation={[0, (i - 1) * -0.16, 0]}>
          <mesh>
            <boxGeometry args={[2.9, 1.9, 0.16]} />
            <meshStandardMaterial color="#181321" metalness={0.92} roughness={0.28} />
          </mesh>
          <mesh position={[0, 0, 0.09]}>
            <planeGeometry args={[2.66, 1.66]} />
            <meshBasicMaterial color={i === 1 ? '#401d66' : '#170e21'} transparent opacity={0.88} />
          </mesh>
          <mesh position={[0, -1.1, -0.18]}>
            <boxGeometry args={[0.08, 2.1, 0.14]} />
            <meshStandardMaterial color="#362345" metalness={0.8} roughness={0.32} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 30]} />
        <meshBasicMaterial color="#4b2271" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function CreatorMonument() {
  return (
    <group>
      <mesh position={[0, 1, -3]}>
        <torusGeometry args={[2.9, 0.045, 10, 88]} />
        <meshBasicMaterial color="#9b4dff" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 1, -3]}>
        <torusGeometry args={[3.6, 0.018, 8, 88]} />
        <meshBasicMaterial color="#c6a2ff" transparent opacity={0.42} />
      </mesh>
      <Spire x={-6.5} z={-3.4} height={5.5} width={0.75} />
      <Spire x={6.5} z={-3.4} height={5.5} width={0.75} />
      <mesh position={[0, -2.1, -3]}>
        <cylinderGeometry args={[1.1, 2, 2.5, 8]} />
        <meshStandardMaterial color="#21182c" metalness={0.88} roughness={0.28} />
      </mesh>
    </group>
  )
}

function SocialGate() {
  return (
    <group>
      {[-4.2, -1.4, 1.4, 4.2].map((x, i) => (
        <group key={x} position={[x, 0, -3.2]} rotation={[0, (i - 1.5) * -0.1, 0]}>
          <mesh>
            <torusGeometry args={[1.15, 0.085, 12, 48]} />
            <meshStandardMaterial color={i % 2 ? '#9b4dff' : '#c6a2ff'} emissive="#6426b8" emissiveIntensity={0.7} metalness={0.72} roughness={0.24} />
          </mesh>
          <mesh position={[0, 0, -0.08]}>
            <circleGeometry args={[1.05, 40]} />
            <meshBasicMaterial color="#32134d" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -1.75, 0]}>
            <cylinderGeometry args={[0.45, 0.85, 2.2, 6]} />
            <meshStandardMaterial color="#17111e" metalness={0.86} roughness={0.33} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Particles({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      values[i * 3] = Math.sin(i * 127.1) * 10
      values[i * 3 + 1] = Math.cos(i * 311.7) * 6
      values[i * 3 + 2] = -2 - ((i * 17) % 80) / 10
    }
    return values
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, state.pointer.x * 0.08, 1.2, delta)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -state.pointer.y * 0.04, 1.2, delta)
    const positionsAttribute = ref.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      const nextY = positionsAttribute.getY(i) + delta * (0.035 + (i % 5) * 0.012)
      positionsAttribute.setY(i, nextY > 7 ? -7 : nextY)
    }
    positionsAttribute.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c6a2ff" size={0.055} sizeAttenuation transparent opacity={0.72} depthWrite={false} />
    </points>
  )
}

function WorldChoreography({ mobile, reducedMotion }: { mobile: boolean; reducedMotion: boolean }) {
  const { camera } = useThree()
  const keep = useRef<ChapterGroup>(null)
  const arena = useRef<ChapterGroup>(null)
  const gallery = useRef<ChapterGroup>(null)
  const kingdom = useRef<ChapterGroup>(null)
  const creator = useRef<ChapterGroup>(null)
  const gate = useRef<ChapterGroup>(null)
  const finale = useRef<ChapterGroup>(null)
  const pointer = useRef<THREE.Group>(null)
  const groups = [keep, arena, gallery, kingdom, creator, gate, finale]
  const stops = useRef(fallbackStops)

  useEffect(() => {
    const refreshStops = () => {
      const availableScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      stops.current = chapterIds.map((id, index) => {
        const chapter = document.getElementById(id)
        if (!chapter) return fallbackStops[index]
        const documentTop = chapter.getBoundingClientRect().top + window.scrollY
        return THREE.MathUtils.clamp(documentTop / availableScroll, 0, 1)
      })
      stops.current[0] = 0
      stops.current[stops.current.length - 1] = 1
    }

    refreshStops()
    window.addEventListener('resize', refreshStops, { passive: true })
    const observer = new ResizeObserver(refreshStops)
    observer.observe(document.body)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', refreshStops)
    }
  }, [])

  useFrame((state, delta) => {
    const availableScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    const progress = THREE.MathUtils.clamp(window.scrollY / availableScroll, 0, 1)
    const chapterProgress = THREE.MathUtils.clamp((window.scrollY + window.innerHeight * 0.34) / availableScroll, 0, 1)
    const anchors = stops.current
    let left = 0
    while (left < anchors.length - 2 && chapterProgress > anchors[left + 1]) left++
    const start = anchors[left]
    const end = Math.max(anchors[left + 1], start + 0.001)
    const blend = THREE.MathUtils.smoothstep(chapterProgress, start, end)

    groups.forEach((group, index) => {
      if (!group.current) return
      const opacity = index === left ? 1 - blend : index === left + 1 ? blend : 0
      updateChapter(group.current, opacity)
    })

    const cameraX = THREE.MathUtils.lerp(-0.75, 0.75, progress) + (reducedMotion ? 0 : state.pointer.x * 0.18)
    const cameraY = THREE.MathUtils.lerp(0.1, 0.55, progress) + (reducedMotion ? 0 : state.pointer.y * 0.08)
    const cameraZ = mobile ? 13.5 : 11.2
    camera.position.x = reducedMotion ? 0 : THREE.MathUtils.damp(camera.position.x, cameraX, 0.72, delta)
    camera.position.y = reducedMotion ? 0.15 : THREE.MathUtils.damp(camera.position.y, cameraY, 0.72, delta)
    camera.position.z = reducedMotion ? cameraZ : THREE.MathUtils.damp(camera.position.z, cameraZ, 0.72, delta)
    camera.lookAt(cameraX * 0.14, 0.35, -2.2)

    if (pointer.current && !reducedMotion) {
      pointer.current.rotation.y = THREE.MathUtils.damp(pointer.current.rotation.y, state.pointer.x * 0.025, 0.8, delta)
      pointer.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.08
    }
  })

  return (
    <>
      <WorldChoreographyGroups refs={groups} pointer={pointer} />
      <ambientLight intensity={0.42} color="#c6a2ff" />
      <hemisphereLight args={['#b58aff', '#08060d', 0.35]} />
      <pointLight position={[-7, 4, 2]} intensity={30} color="#6426b8" distance={34} />
      <pointLight position={[7, 2, -2]} intensity={21} color="#9b4dff" distance={30} />
      <spotLight position={[0, 10, 4]} angle={0.6} penumbra={1} intensity={14} color="#c6a2ff" distance={35} />
      <Particles count={mobile ? 55 : 180} reducedMotion={reducedMotion} />
    </>
  )
}

function WorldChoreographyGroups({ refs, pointer }: { refs: RefObject<ChapterGroup | null>[]; pointer: RefObject<THREE.Group | null> }) {
  const [keep, arena, gallery, kingdom, creator, gate, finale] = refs
  return (
    <group ref={pointer}>
      <group ref={keep}><GothicKeep /></group>
      <group ref={arena}><Arena /></group>
      <group ref={gallery}><Gallery /></group>
      <group ref={kingdom}><DigitalKingdom /></group>
      <group ref={creator}><CreatorMonument /></group>
      <group ref={gate}><SocialGate /></group>
      <group ref={finale}><GothicKeep /><mesh position={[0, -1, -6]}><torusGeometry args={[5.6, 0.025, 8, 80]} /><meshBasicMaterial color="#9b4dff" transparent opacity={0.8} /></mesh></group>
    </group>
  )
}

function AtmosphericFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-[-12%] bg-cover bg-[center_45%] opacity-45 saturate-[0.65] transition-[background-position] duration-[1800ms]"
        style={{ backgroundImage: "url('/images/realm-gothic.png')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_40%,rgba(100,38,184,0.2),transparent_58%),linear-gradient(180deg,rgba(5,4,7,0.38),rgba(5,4,7,0.83))]" />
      <div className="absolute inset-x-[-15%] bottom-[-28%] h-[58%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(100,38,184,0.25),transparent_66%)] blur-3xl" />
      <div className="absolute inset-x-[-20%] bottom-[-70%] h-[90%] origin-top bg-[linear-gradient(rgba(155,77,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(155,77,255,0.08)_1px,transparent_1px)] bg-[size:56px_56px] opacity-55 [transform:perspective(700px)_rotateX(67deg)]" />
      <div className="absolute top-[18%] right-[10%] h-[50vh] w-[24vw] min-w-40 border-x border-t border-electric/10 [clip-path:polygon(45%_0,55%_0,100%_100%,0_100%)]" />
      <div className="absolute top-[32%] right-[17%] size-40 rounded-full border border-electric/25 shadow-[0_0_60px_rgba(100,38,184,0.14),inset_0_0_50px_rgba(100,38,184,0.12)]" />
    </div>
  )
}

class WorldBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export function BeyondRealityWorld() {
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMobile(window.matchMedia('(max-width: 767px)').matches)
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    try {
      const canvas = document.createElement('canvas')
      const attributes = { failIfMajorPerformanceCaveat: true }
      const context = (canvas.getContext('webgl2', attributes) ?? canvas.getContext('webgl', attributes)) as WebGLRenderingContext | null
      if (context) {
        const rendererInfo = context.getExtension('WEBGL_debug_renderer_info')
        const renderer = rendererInfo ? context.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL) : ''
        context.getExtension('WEBGL_lose_context')?.loseContext()
        setSupported(!/swiftshader|llvmpipe|software/i.test(renderer))
      }
    } catch {
      setSupported(false)
    }

    setReady(true)
  }, [])

  if (!ready) return null
  if (!supported) return <AtmosphericFallback />

  return (
    <WorldBoundary fallback={<AtmosphericFallback />}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Canvas
          frameloop="always"
          dpr={mobile ? 1 : [1, 1.5]}
          camera={{ position: [0, 0.15, mobile ? 13.5 : 11.2], fov: 47, near: 0.1, far: 90 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          style={{ pointerEvents: 'none' }}
        >
          <WorldChoreography mobile={mobile} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
    </WorldBoundary>
  )
}
