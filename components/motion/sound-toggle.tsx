'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false)
  const [available, setAvailable] = useState(true)
  const contextRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const voicesRef = useRef<OscillatorNode[]>([])

  useEffect(() => {
    setAvailable('AudioContext' in window)
    return () => {
      const context = contextRef.current
      if (context && context.state !== 'closed') void context.close()
    }
  }, [])

  const toggleSound = async () => {
    if (enabled) {
      const context = contextRef.current
      const master = masterRef.current
      if (context && master && context.state !== 'closed') {
        const stopAt = context.currentTime + 0.85
        master.gain.cancelScheduledValues(context.currentTime)
        master.gain.setTargetAtTime(0.0001, context.currentTime, 0.16)
        voicesRef.current.forEach((voice) => voice.stop(stopAt))
        window.setTimeout(() => {
          if (context.state !== 'closed') void context.close()
        }, 950)
      }
      contextRef.current = null
      masterRef.current = null
      voicesRef.current = []
      setEnabled(false)
      return
    }

    if (!('AudioContext' in window)) {
      setAvailable(false)
      return
    }

    try {
      const context = new window.AudioContext()
      contextRef.current = context
      const filter = context.createBiquadFilter()
      const master = context.createGain()
      filter.type = 'lowpass'
      filter.frequency.value = 150
      filter.Q.value = 0.55
      master.gain.setValueAtTime(0.0001, context.currentTime)
      master.gain.exponentialRampToValueAtTime(0.011, context.currentTime + 1.6)
      filter.connect(master)
      master.connect(context.destination)

      const voices = [55, 82.41].map((frequency, index) => {
        const voice = context.createOscillator()
        const level = context.createGain()
        voice.type = index === 0 ? 'sine' : 'triangle'
        voice.frequency.value = frequency
        level.gain.value = index === 0 ? 0.72 : 0.22
        voice.connect(level)
        level.connect(filter)
        voice.start()
        return voice
      })
      const drift = context.createOscillator()
      const driftDepth = context.createGain()
      drift.type = 'sine'
      drift.frequency.value = 0.075
      driftDepth.gain.value = 18
      drift.connect(driftDepth)
      driftDepth.connect(filter.frequency)
      drift.start()

      await context.resume()
      contextRef.current = context
      masterRef.current = master
      voicesRef.current = [...voices, drift]
      setEnabled(true)
    } catch {
      if (contextRef.current && contextRef.current.state !== 'closed') void contextRef.current.close()
      contextRef.current = null
      setAvailable(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggleSound}
      disabled={!available}
      aria-label={available ? `Turn ambient sound ${enabled ? 'off' : 'on'}` : 'Ambient sound is unavailable'}
      aria-pressed={enabled}
      title={available ? `Ambient sound ${enabled ? 'on' : 'off'}` : 'Ambient sound is unavailable'}
      className="inline-flex h-11 items-center gap-2 border border-silver/20 px-3 text-[9px] font-semibold tracking-[0.2em] text-silver uppercase transition-colors hover:border-electric/50 hover:text-ghost disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:text-[10px]"
    >
      {enabled ? <Volume2 aria-hidden="true" className="size-4 text-electric" /> : <VolumeX aria-hidden="true" className="size-4" />}
      <span className="hidden sm:inline">Sound {enabled ? 'on' : 'off'}</span>
    </button>
  )
}
