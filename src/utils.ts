import { useEffect, useRef, useCallback } from 'react'
import { animate, stagger } from 'animejs'

/**
 * Anime.js-powered scroll reveal hook.
 * Uses IntersectionObserver to trigger anime.js animations on elements with
 * data-reveal attribute. After animation completes, inline styles are removed
 * so they don't conflict with hover/interaction states.
 *
 * Usage: Add `data-reveal` to elements you want animated. Optionally add
 * `data-reveal-delay="N"` where N is the delay index (each unit = 80ms).
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>('[data-reveal]')
    if (elements.length === 0) return

    // Set initial state: hidden
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
              // Remove inline styles so hover/transitions work cleanly
              el.style.opacity = ''
              el.style.transform = ''
            },
          })
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return containerRef
}

/**
 * Anime.js-powered stagger reveal for a group of elements.
 * Triggers all matching children with a stagger delay when the container
 * enters the viewport. Useful for card grids, lists, etc.
 */
export function useStaggerReveal(selector: string, staggerDelay = 100) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>(selector)
    if (elements.length === 0) return

    // Set initial state
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
          onComplete: (_anim) => {
            // Clean up inline styles after all animations complete
            elements.forEach((el) => {
              el.style.opacity = ''
              el.style.transform = ''
            })
          },
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [selector, staggerDelay])

  return containerRef
}

/**
 * Helper: sleep for async scenario runners
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * cn - simple className joiner (no clsx dependency)
 */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * useSpotlight — attaches mousemove listeners to elements with .spotlight-card
 * class within the container, updating CSS custom properties for the gold
 * spotlight glow effect.
 */
export function useSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = (e.currentTarget as HTMLElement)
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
