'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const BeyondRealityWorld = dynamic(
  () => import('./beyond-reality-world').then((module) => module.BeyondRealityWorld),
  { ssr: false, loading: () => null },
)

export function WorldLoader() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 900)
    return () => window.clearTimeout(timeout)
  }, [])

  return ready ? <BeyondRealityWorld /> : null
}
