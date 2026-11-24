'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

// Connect this player only when the original music asset is restored to the project.
const ORIGINAL_TRACK: string | null = null
const VOLUME_KEY = 'sw-music-volume'
const PREFERENCE_KEY = 'sw-music-preferred'

export function SoundToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [preferred, setPreferred] = useState(false)
  const [volume, setVolume] = useState(0.28)
  const available = ORIGINAL_TRACK !== null

  useEffect(() => {
    try {
      setPreferred(window.localStorage.getItem(PREFERENCE_KEY) === 'on')
      const storedVolume = window.localStorage.getItem(VOLUME_KEY)
      if (storedVolume !== null) {
        const parsedVolume = Number(storedVolume)
        if (Number.isFinite(parsedVolume)) setVolume(Math.min(1, Math.max(0, parsedVolume)))
      }
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio || !available) return

    if (enabled) {
      audio.pause()
      setEnabled(false)
      setPreferred(false)
      try {
        window.localStorage.setItem(PREFERENCE_KEY, 'off')
      } catch {
        // Playback controls remain usable when storage is unavailable.
      }
      return
    }

    try {
      await audio.play()
      setEnabled(true)
      setPreferred(true)
      window.localStorage.setItem(PREFERENCE_KEY, 'on')
    } catch {
      setEnabled(false)
      setPreferred(false)
      try {
        window.localStorage.setItem(PREFERENCE_KEY, 'off')
      } catch {
        // Playback controls remain usable when storage is unavailable.
      }
    }
  }

  const updateVolume = (value: number) => {
    setVolume(value)
    try {
      window.localStorage.setItem(VOLUME_KEY, String(value))
    } catch {
      // The selected volume still applies for this session.
    }
  }

  return (
    <div role="group" aria-label="Original background music controls" className="flex h-11 items-center gap-2 border border-silver/20 px-2.5 text-silver sm:px-3">
      {ORIGINAL_TRACK && <audio ref={audioRef} src={ORIGINAL_TRACK} loop preload="none" />}
      <button
        type="button"
        onClick={toggleMusic}
        disabled={!available}
        aria-label={available ? `Turn music ${enabled ? 'off' : 'on'}${preferred && !enabled ? ', saved preference is on' : ''}` : 'Music off — original track not available'}
        aria-pressed={enabled}
        title={available ? `Music ${enabled ? 'on' : 'off'}${preferred && !enabled ? ' — click to resume' : ''}` : 'Music off — original music file is missing'}
        className="inline-flex h-full shrink-0 items-center gap-1.5 text-[9px] font-semibold tracking-[0.12em] uppercase transition-colors hover:text-ghost disabled:cursor-not-allowed disabled:opacity-75 sm:gap-2 sm:text-[10px]"
      >
        {enabled ? <Volume2 aria-hidden="true" className="size-4 text-electric" /> : <VolumeX aria-hidden="true" className="size-4" />}
        <span>Music {enabled ? 'on' : 'off'}</span>
      </button>
      <label className="flex items-center" title={`Music volume ${Math.round(volume * 100)}%`}>
        <span className="sr-only">Music volume</span>
        <input
          aria-label="Music volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => updateVolume(Number(event.target.value))}
          className="h-1 w-10 cursor-pointer accent-electric sm:w-12"
        />
      </label>
      <span className="sr-only" role="status">{available ? '' : 'Original music track is unavailable. Music is off.'}</span>
    </div>
  )
}
