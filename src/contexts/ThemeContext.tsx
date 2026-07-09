'use client'

import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  resolved: ResolvedTheme
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'dt-theme'

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'system') return getSystemTheme()
  return mode
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement
  if (resolved === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

function readStoredMode(): ThemeMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  } catch {
    // ignore
  }
  return 'system'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with 'light' so server HTML and first client render agree.
  // The real stored/system preference is applied after mount in the effect below.
  const [mode, setModeState] = useState<ThemeMode>('light')
  const [resolved, setResolvedState] = useState<ResolvedTheme>('light')
  const [mounted, setMounted] = useState(false)

  // After mount: read the real preference and sync the DOM before normal effects.
  useLayoutEffect(() => {
    const real = readStoredMode()
    const nextResolved = resolveTheme(real)
    setModeState(real)
    setResolvedState(nextResolved)
    applyTheme(nextResolved)
    setMounted(true)
  }, [])

  // Keep the DOM in sync whenever mode changes after mount.
  useEffect(() => {
    if (!mounted) return
    const nextResolved = resolveTheme(mode)
    setResolvedState(nextResolved)
    applyTheme(nextResolved)
  }, [mode, mounted])

  // Listen for OS preference changes when mode is 'system'.
  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const nextResolved = resolveTheme('system')
      setResolvedState(nextResolved)
      applyTheme(nextResolved)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  const setMode = (next: ThemeMode) => {
    const nextResolved = resolveTheme(next)
    setModeState(next)
    setResolvedState(nextResolved)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
    applyTheme(nextResolved)
  }

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
