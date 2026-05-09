'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProductsDropdown } from './ProductsDropdown'
import { SolutionsDropdown } from './SolutionsDropdown'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from '../shared/ThemeToggle'
import { useTheme } from '../../hooks/useTheme'
import { CONSOLE_URL } from '@/lib/env'

type DropdownKey = 'products' | 'solutions' | null

/** Keeps a dropdown mounted for `exitMs` after it logically closes so CSS exit
 *  animations can complete, then fully unmounts. */
function useAnimatedDropdown(key: DropdownKey, activeDropdown: DropdownKey, exitMs = 180) {
  const isOpen = activeDropdown === key
  const [mounted, setMounted] = useState(isOpen)
  const [visible, setVisible] = useState(isOpen)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isOpen) {
      if (timerRef.current) clearTimeout(timerRef.current)
      setMounted(true)
      // Small rAF tick so the browser paints the initial hidden state first,
      // giving the CSS transition something to transition FROM.
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
      timerRef.current = setTimeout(() => setMounted(false), exitMs)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isOpen, exitMs])

  return { mounted, visible }
}

export function Nav({ barHeight = 0 }: { barHeight?: number }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const { resolved } = useTheme()

  const products = useAnimatedDropdown('products', activeDropdown)
  const solutions = useAnimatedDropdown('solutions', activeDropdown)

  // Close everything on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ESC closes everything
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setMobileOpen(false)
        document.body.style.overflow = ''
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const toggleDropdown = useCallback((key: DropdownKey) => {
    setActiveDropdown((prev) => (prev === key ? null : key))
  }, [])

  const closeDropdown = useCallback(() => setActiveDropdown(null), [])

  const toggleMobile = () => {
    const next = !mobileOpen
    setMobileOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed right-0 left-0 z-50 transition-all duration-500"
        style={{
          top: barHeight,
          background: scrolled
            ? resolved === 'dark'
              ? 'rgba(13,12,10,0.92)'
              : 'rgba(250,250,249,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-line)' : '1px solid transparent',
        }}
      >
        <div className="max-w-page mx-auto flex h-20 items-center justify-between gap-8 px-6 md:justify-normal lg:px-12">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center">
            <span className="font-display text-2xl font-medium tracking-[-0.02em]">Deploy</span>
            <span className="font-display text-primary-dark text-2xl font-medium tracking-[-0.02em]">
              Titan
            </span>
          </Link>

          {/* Desktop centre nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {/* Products dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                aria-expanded={activeDropdown === 'products'}
                aria-haspopup="true"
                className="text-ink-secondary hover:text-ink nav-link-underline flex items-center gap-1 text-sm transition-colors"
              >
                Products
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-px transition-transform duration-200"
                  style={{ transform: activeDropdown === 'products' ? 'rotate(180deg)' : 'none' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {products.mounted && (
                <div
                  className="transition-[opacity,transform] duration-[180ms] ease-out"
                  style={{
                    opacity: products.visible ? 1 : 0,
                    transform: products.visible
                      ? 'translateY(0) scale(1)'
                      : 'translateY(-6px) scale(0.98)',
                    pointerEvents: products.visible ? 'auto' : 'none',
                    transformOrigin: 'top center',
                  }}
                >
                  <ProductsDropdown onClose={closeDropdown} />
                </div>
              )}
            </div>

            {/* Solutions dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('solutions')}
                aria-expanded={activeDropdown === 'solutions'}
                aria-haspopup="true"
                className="text-ink-secondary hover:text-ink nav-link-underline flex items-center gap-1 text-sm transition-colors"
              >
                Solutions
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-px transition-transform duration-200"
                  style={{ transform: activeDropdown === 'solutions' ? 'rotate(180deg)' : 'none' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {solutions.mounted && (
                <div
                  className="transition-[opacity,transform] duration-[180ms] ease-out"
                  style={{
                    opacity: solutions.visible ? 1 : 0,
                    transform: solutions.visible
                      ? 'translateY(0) scale(1)'
                      : 'translateY(-6px) scale(0.98)',
                    pointerEvents: solutions.visible ? 'auto' : 'none',
                    transformOrigin: 'top center',
                  }}
                >
                  <SolutionsDropdown onClose={closeDropdown} />
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="text-ink-secondary hover:text-ink nav-link-underline text-sm transition-colors"
            >
              Pricing
            </Link>

            <Link
              href="/blog"
              className="text-ink-secondary hover:text-ink nav-link-underline text-sm transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Desktop auth */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <ThemeToggle className="mr-1" />
            <a
              href={`${CONSOLE_URL}/login`}
              className="bg-ink text-surface inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.97]"
              style={{ borderRadius: '2px' }}
            >
              Get started
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMobile}
            className="flex flex-col gap-[5px] p-2 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className="bg-ink block h-[1.5px] w-5 origin-center transition-all"
              style={{ transform: mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }}
            />
            <span
              className="bg-ink block h-[1.5px] w-5 transition-all"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="bg-ink block h-[1.5px] w-5 origin-center transition-all"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }}
            />
          </button>
        </div>

        {/* Gold shimmer accent under nav when scrolled */}
        {scrolled && (
          <div className="via-primary/20 absolute bottom-0 left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />
        )}
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && <MobileNav onClose={closeMobile} barHeight={barHeight} />}
    </>
  )
}
