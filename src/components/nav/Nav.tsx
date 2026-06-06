'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProductsDropdown } from './ProductsDropdown'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from '../shared/ThemeToggle'
import { Button } from '../shared/Button'
import { BrandLogo } from '../shared/BrandLogo'
import { useTheme } from '../../hooks/useTheme'
import { CREATE_ACCOUNT_URL } from '@/lib/env'

/** Trap Tab/Shift-Tab within `container`. Call the returned cleanup when done. */
function trapFocus(container: HTMLElement): () => void {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  if (!focusable.length) return () => {}
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  const handler = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
  container.addEventListener('keydown', handler)
  return () => container.removeEventListener('keydown', handler)
}

type DropdownKey = 'products' | null

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
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const productsDropdownRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { resolved } = useTheme()

  const products = useAnimatedDropdown('products', activeDropdown)

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

  // ESC closes everything and returns focus to trigger
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setMobileOpen(false)
        document.body.style.overflow = ''
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Move focus into dropdown panel when it opens
  useEffect(() => {
    if (activeDropdown === 'products' && productsDropdownRef.current) {
      const first = productsDropdownRef.current.querySelector<HTMLElement>('a, button')
      first?.focus()
    }
  }, [activeDropdown])

  // Focus trap in mobile nav
  useEffect(() => {
    if (!mobileOpen || !mobileNavRef.current) return
    const first = mobileNavRef.current.querySelector<HTMLElement>('a, button')
    first?.focus()
    const cleanup = trapFocus(mobileNavRef.current)
    return cleanup
  }, [mobileOpen])

  const toggleDropdown = useCallback((key: DropdownKey) => {
    setActiveDropdown((prev) => (prev === key ? null : key))
  }, [])

  const closeDropdown = useCallback(() => setActiveDropdown(null), [])

  const isProductsActive = pathname.startsWith('/products')

  const toggleMobile = () => {
    const next = !mobileOpen
    setMobileOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
    hamburgerRef.current?.focus()
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
        }}
      >
        {/* Bottom border rendered below the dropdown panels so it doesn't bleed through */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-px transition-opacity duration-500"
          style={{
            background: 'var(--color-line)',
            opacity: scrolled ? 1 : 0,
            zIndex: -1,
          }}
          aria-hidden="true"
        />
        <div className="max-w-page mx-auto flex h-20 items-center justify-between gap-8 px-6 md:justify-normal lg:px-12">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center">
            <BrandLogo
              priority
              className="h-6 w-auto transition-opacity duration-200 group-hover:opacity-70"
            />
          </Link>

          {/* Desktop centre nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {/* Products dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                aria-expanded={activeDropdown === 'products'}
                aria-haspopup="menu"
                className={`nav-link-underline flex items-center gap-1 text-sm transition-colors ${isProductsActive ? 'nav-link-active text-primary-accessible' : 'text-ink-secondary hover:text-ink'}`}
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
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {products.mounted && (
                <div
                  ref={productsDropdownRef}
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

            <Link
              href="/blog"
              className={`nav-link-underline text-sm transition-colors ${pathname.startsWith('/blog') ? 'nav-link-active text-primary-accessible' : 'text-ink-secondary hover:text-ink'}`}
            >
              Blog
            </Link>

            <Link
              href="/journey"
              className={`nav-link-underline text-sm transition-colors ${pathname.startsWith('/journey') ? 'nav-link-active text-primary-accessible' : 'text-ink-secondary hover:text-ink'}`}
            >
              My Journey
            </Link>

            <Link
              href="/pricing"
              className={`nav-link-underline text-sm transition-colors ${pathname === '/pricing' ? 'nav-link-active text-primary-accessible' : 'text-ink-secondary hover:text-ink'}`}
            >
              Pricing
            </Link>

            <Link
              href="/about"
              className={`nav-link-underline text-sm transition-colors ${pathname === '/about' ? 'nav-link-active text-primary-accessible' : 'text-ink-secondary hover:text-ink'}`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`nav-link-underline text-sm transition-colors ${pathname === '/contact' ? 'nav-link-active text-primary-accessible' : 'text-ink-secondary hover:text-ink'}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop auth */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <ThemeToggle className="mr-1" />
            <Button
              as="a"
              href={CREATE_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              Create account
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
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </div>

          {/* Mobile hamburger — p-3 for 44px touch target */}
          <button
            ref={hamburgerRef}
            onClick={toggleMobile}
            className="flex flex-col gap-[5px] p-3 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
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
        <div
          className="absolute bottom-0 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-[color:var(--color-primary)] to-transparent transition-opacity duration-500"
          style={{ opacity: scrolled ? 0.35 : 0 }}
          aria-hidden="true"
        />
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <MobileNav ref={mobileNavRef} id="mobile-nav" onClose={closeMobile} barHeight={barHeight} />
      )}
    </>
  )
}
