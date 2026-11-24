'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const HERO_START_EVENT = 'sw:enter-dark-realm'

function CastleTower({ x, z, height, width = 1 }: { x: number; z: number; height: number; width?: number }) {
  return (
    <group position={[x, -2.8, z]} scale={width}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, height, 1.1]} />
        <meshStandardMaterial color="#100d16" roughness={0.82} metalness={0.3} />
      </mesh>
      <mesh position={[0, height + 0.72, 0]} castShadow>
        <coneGeometry args={[0.68, 1.65, 5]} />
        <meshStandardMaterial color="#09080e" roughness={0.72} metalness={0.28} />
      </mesh>
      <mesh position={[0, height * 0.48, 0.57]}>
        <planeGeometry args={[0.18, Math.min(height * 0.36, 2.3)]} />
        <meshBasicMaterial color="#a56bff" transparent opacity={0.34} />
      </mesh>
      <mesh position={[0, height * 0.48, 0.585]}>
        <planeGeometry args={[0.045, Math.min(height * 0.28, 1.9)]} />
        <meshBasicMaterial color="#d5b4ff" transparent opacity={0.48} />
      </mesh>
    </group>
  )
}

function Throne() {
  return (
    <group position={[0, -2.2, -1.8]}>
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[2.25, 3.35, 0.42]} />
        <meshStandardMaterial color="#100b16" metalness={0.72} roughness={0.4} />
      </mesh>
      <mesh position={[0, 3.1, 0]} castShadow>
        <coneGeometry args={[1.45, 1.65, 4]} />
        <meshStandardMaterial color="#16101f" metalness={0.7} roughness={0.36} />
      </mesh>
      <mesh position={[0, 1.1, 0.4]} castShadow>
        <boxGeometry args={[2.8, 0.38, 1.1]} />
        <meshStandardMaterial color="#20172a" metalness={0.78} roughness={0.3} />
      </mesh>
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} position={[x, 0.4, 0.35]} castShadow>
          <boxGeometry args={[0.28, 1.7, 0.75]} />
          <meshStandardMaterial color="#191320" metalness={0.78} roughness={0.32} />
        </mesh>
      ))}
      <mesh position={[0, 1.15, 0.23]}>
        <planeGeometry args={[0.13, 1.55]} />
        <meshBasicMaterial color="#9b61e9" transparent opacity={0.32} />
      </mesh>
    </group>
  )
}

function MountainRidge({ z, width, height, color }: { z: number; width: number; height: number; color: string }) {
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector2(-width / 2, -3.1),
      new THREE.Vector2(-width * 0.39, -1.3),
      new THREE.Vector2(-width * 0.25, -2.25),
      new THREE.Vector2(-width * 0.08, height),
      new THREE.Vector2(width * 0.03, -1.5),
      new THREE.Vector2(width * 0.2, -2.5),
      new THREE.Vector2(width * 0.34, 0.1),
      new THREE.Vector2(width * 0.43, -1.8),
      new THREE.Vector2(width / 2, -3.1),
    ]
    const shape = new THREE.Shape(points)
    return new THREE.ExtrudeGeometry(shape, { depth: 0.8, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.14, bevelThickness: 0.18 })
  }, [height, width])
  return (
    <mesh geometry={geometry} position={[0, -1.6, z]} receiveShadow>
      <meshStandardMaterial color={color} roughness={0.94} metalness={0.12} />
    </mesh>
  )
}

function Castle() {
  return (
    <group position={[-0.9, 0, -5.4]}>
      <mesh position={[0, -0.9, 0]} receiveShadow castShadow>
        <boxGeometry args={[7.8, 4.2, 1.7]} />
        <meshStandardMaterial color="#14101a" roughness={0.76} metalness={0.24} />
      </mesh>
      <mesh position={[0, 1.25, 0.88]}>
        <planeGeometry args={[5.7, 0.04]} />
        <meshBasicMaterial color="#796191" transparent opacity={0.55} />
      </mesh>
      <CastleTower x={-3.1} z={0} height={5.5} width={1.05} />
      <CastleTower x={3.1} z={0} height={5.5} width={1.05} />
      <CastleTower x={-1.7} z={-0.2} height={7.8} width={0.87} />
      <CastleTower x={1.7} z={-0.2} height={7.8} width={0.87} />
      <CastleTower x={0} z={-0.4} height={10.3} width={1.12} />
      {[-2.3, -1.15, 0, 1.15, 2.3].map((x) => (
        <mesh key={x} position={[x, -1.25, 0.89]}>
          <planeGeometry args={[0.36, 1.55]} />
          <meshBasicMaterial color="#a375d5" transparent opacity={0.14} />
        </mesh>
      ))}
      {[-4.3, 4.3].map((x) => <CastleTower key={x} x={x} z={-2.4} height={3.5} width={0.68} />)}
    </group>
  )
}

function Lightning() {
  const light = useRef<THREE.PointLight>(null)
  const line = useRef<THREE.Line>(null)
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(4.3, 7, -6), new THREE.Vector3(3.9, 5.6, -6),
      new THREE.Vector3(4.25, 4.8, -6), new THREE.Vector3(3.4, 3.3, -6),
      new THREE.Vector3(3.55, 2.2, -6), new THREE.Vector3(2.85, 1.2, -6),
    ]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime % 8
    const flash = t > 3.35 && t < 3.56 ? Math.sin(((t - 3.35) / 0.21) * Math.PI) : 0
    if (light.current) light.current.intensity = flash * 34
    if (line.current) (line.current.material as THREE.LineBasicMaterial).opacity = flash * 0.95
  })

  return (
    <group>
      <pointLight ref={light} position={[3.7, 3.8, -4]} color="#a76aff" distance={19} decay={2} />
      <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#e0c9ff', transparent: true, opacity: 0 }))} ref={line} />
    </group>
  )
}

function Feathers() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const birds = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    x: ((i * 37) % 19) - 9,
    y: ((i * 23) % 13) - 6,
    z: (i % 5) * 0.62 + 1.5,
    fall: 0.12 + (i % 4) * 0.035,
    phase: i * 1.71,
    scale: 0.35 + (i % 3) * 0.12,
  })), [])

  useFrame(({ clock }, delta) => {
    if (!mesh.current) return
    const t = clock.elapsedTime
    birds.forEach((bird, i) => {
      bird.y -= delta * bird.fall
      if (bird.y < -7) bird.y = 7
      dummy.position.set(bird.x + Math.sin(t * 0.34 + bird.phase) * 0.8, bird.y, bird.z)
      dummy.rotation.set(Math.sin(t * 0.28 + bird.phase) * 0.48, Math.sin(t * 0.18 + bird.phase), Math.cos(t * 0.24 + bird.phase) * 0.65)
      dummy.scale.set(bird.scale * 0.45, bird.scale * 1.3, bird.scale * 0.16)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, birds.length]}>
      <coneGeometry args={[0.34, 1, 5]} />
      <meshStandardMaterial color="#15101d" roughness={0.88} metalness={0.12} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

function Guardian() {
  const texture = useLoader(THREE.TextureLoader, '/images/character.webp')
  const group = useRef<THREE.Group>(null)
  const material = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false }), [texture])
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = -0.3 + Math.sin(clock.elapsedTime * 0.48) * 0.045
  })
  return (
    <group ref={group} position={[2.25, -0.35, 1.05]}>
      <mesh scale={[5.8, 8.7, 1]}>
        <planeGeometry args={[1, 1]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

function CameraSequence() {
  const { camera } = useThree()
  const startedAt = useRef<number | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const start = () => setActive(true)
    window.addEventListener(HERO_START_EVENT, start)
    return () => window.removeEventListener(HERO_START_EVENT, start)
  }, [])

  useFrame(({ clock }, delta) => {
    if (!active) return
    if (startedAt.current === null) startedAt.current = clock.elapsedTime
    const elapsed = clock.elapsedTime - startedAt.current
    const shots = [
      { time: 0, position: [0, 1, 17] as const, target: [0, 0, -3] as const },
      { time: 3.2, position: [-1.2, 1.4, 11] as const, target: [-0.8, 0, -2] as const },
      { time: 6.3, position: [0.1, 0.5, 8] as const, target: [0.5, 0.3, -1] as const },
      { time: 9.2, position: [1.35, 0.8, 5.8] as const, target: [2.1, 1.2, 0] as const },
      { time: 12.5, position: [0.25, 0.2, 10.2] as const, target: [0.3, 0, -1] as const },
    ]
    let index = 0
    while (index < shots.length - 1 && elapsed > shots[index + 1].time) index += 1
    const from = shots[index]
    const to = shots[Math.min(index + 1, shots.length - 1)]
    const raw = to.time === from.time ? 1 : THREE.MathUtils.clamp((elapsed - from.time) / (to.time - from.time), 0, 1)
    const eased = raw * raw * (3 - 2 * raw)
    const x = THREE.MathUtils.lerp(from.position[0], to.position[0], eased)
    const y = THREE.MathUtils.lerp(from.position[1], to.position[1], eased)
    const z = THREE.MathUtils.lerp(from.position[2], to.position[2], eased)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x, 1.6, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y, 1.6, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 1.6, delta)
    camera.lookAt(
      THREE.MathUtils.lerp(from.target[0], to.target[0], eased),
      THREE.MathUtils.lerp(from.target[1], to.target[1], eased),
      THREE.MathUtils.lerp(from.target[2], to.target[2], eased),
    )
  })
  return null
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#07060b']} />
      <fog attach="fog" args={['#090710', 9, 31]} />
      <ambientLight intensity={0.5} color="#a58dbb" />
      <directionalLight position={[-5, 7, 3]} intensity={2.1} color="#c9b7dc" castShadow />
      <spotLight position={[2, 7, 2]} target-position={[1, 0, -1]} intensity={75} angle={0.52} penumbra={0.8} color="#8750c7" distance={24} />
      <pointLight position={[-7, 0, -3]} intensity={16} color="#5c397f" distance={21} />
      <Castle />
      <Throne />
      <MountainRidge z={-11} width={27} height={3.5} color="#100d17" />
      <MountainRidge z={-8} width={23} height={2.2} color="#0c0a11" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.88, -2]} receiveShadow>
        <planeGeometry args={[46, 44]} />
        <meshStandardMaterial color="#08070b" roughness={0.98} metalness={0.08} />
      </mesh>
      <CastleTower x={-8.4} z={-3.5} height={6.5} width={1.1} />
      <CastleTower x={8} z={-4.3} height={5.7} width={1.2} />
      <Guardian />
      <Lightning />
      <Feathers />
      <CameraSequence />
    </>
  )
}

export default function HeroScene() {
  const [mobile, setMobile] = useState(false)
  const [webglReady, setWebglReady] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 700px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener('change', update)

    let context: WebGLRenderingContext | null = null
    try {
      const probe = document.createElement('canvas')
      context = (probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ??
        probe.getContext('webgl', { failIfMajorPerformanceCaveat: true })) as WebGLRenderingContext | null
      const debug = context?.getExtension('WEBGL_debug_renderer_info')
      const renderer = debug && context ? String(context.getParameter(debug.UNMASKED_RENDERER_WEBGL)) : ''
      setWebglReady(Boolean(context && !/swiftshader|llvmpipe|software/i.test(renderer)))
    } catch {
      setWebglReady(false)
    }
    context?.getExtension('WEBGL_lose_context')?.loseContext()

    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#07060b]">
      {webglReady ? (
        <Canvas
          dpr={mobile ? 1 : [1, 1.35]}
          camera={{ position: [0, 1, 17], fov: mobile ? 47 : 41, near: 0.1, far: 70 }}
          gl={{ antialias: !mobile, alpha: false, powerPreference: 'high-performance' }}
          shadows={!mobile}
          onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 0.88 }}
        >
          <Suspense fallback={null}><Scene /></Suspense>
        </Canvas>
      ) : (
        <div className="absolute inset-0">
          <img src="/images/realm-gothic.png" alt="" className="absolute inset-0 h-full w-full object-cover object-[48%_center] opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,7,0.88)_0%,rgba(5,4,7,0.48)_43%,rgba(5,4,7,0.06)_78%),linear-gradient(0deg,rgba(5,4,7,0.66),transparent_52%)]" />
          <img src="/images/character.webp" alt="" className="absolute right-[-10%] bottom-[-7%] h-[94svh] w-[min(75vw,940px)] object-contain object-bottom sm:right-[-2%] sm:w-[min(68vw,940px)]" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,transparent_19%,rgba(5,4,7,0.18)_64%,rgba(5,4,7,0.56)_100%)]" />
    </div>
  )
}
