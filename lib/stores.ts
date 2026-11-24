'use client'

import { useSyncExternalStore } from 'react'

function createStore<T>(initial: T) {
  let value = initial
  const listeners = new Set<() => void>()
  return {
    get: () => value,
    set(next: T) {
      if (Object.is(next, value)) return
      value = next
      listeners.forEach((l) => l())
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

export const introStore = createStore(false)
export const quoteStore = createStore<string>('')

export function useIntroDone() {
  return useSyncExternalStore(introStore.subscribe, introStore.get, () => false)
}

export function useQuotePreset() {
  return useSyncExternalStore(quoteStore.subscribe, quoteStore.get, () => '')
}
