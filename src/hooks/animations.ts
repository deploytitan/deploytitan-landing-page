'use client'

import { useCallback, useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

/**
 * Anime.js-powered scroll reveal hook.
 * Respects prefers-reduced-motion: skips animation and reveals elements instantly.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>('[data-reveal]')
    if (elements.length === 0) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      // Just ensure elements are visible — no animation
      elements.forEach((el) => {
        el.style.opacity = ''
        el.style.transform = ''
      })
      return
    }

    elements.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const el = entry.target as HTMLElement
          observer.unobserve(el)

          const delayIndex = parseInt(el.dataset.revealDelay || '0', 10)
          const delay = delayIndex * 80

          animate(el, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay,
            ease: 'outExpo',
            onComplete: () => {
              el.style.opacity = ''
              el.style.transform = ''
            },
          })
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return containerRef
}

/**
 * Anime.js-powered stagger reveal for a group of elements.
 */
export function useStaggerReveal(selector: string, staggerDelay = 100) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>(selector)
    if (elements.length === 0) return

    elements.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()

        animate(elements, {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 600,
          delay: stagger(staggerDelay),
          ease: 'outExpo',
          onComplete: () => {
            elements.forEach((el) => {
              el.style.opacity = ''
              el.style.transform = ''
            })
          },
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [selector, staggerDelay])

  return containerRef
}

/**
 * useSpotlight — attaches mousemove listeners to .spotlight-card elements.
 */
export function useSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--spotlight-x', `${x}px`)
    card.style.setProperty('--spotlight-y', `${y}px`)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll<HTMLElement>('.spotlight-card')
    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove)
      })
    }
  }, [handleMouseMove])

  return containerRef
}
