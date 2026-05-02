import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProductsDropdown } from './ProductsDropdown'
import { SolutionsDropdown } from './SolutionsDropdown'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from '../shared/ThemeToggle'
import { useTheme } from '../../hooks/useTheme'

const APP_URL = (import.meta.env.VITE_APP_URL as string) || 'https://app.deploytitan.com'

type DropdownKey = 'products' | 'solutions' | null

export function Nav({ barHeight = 0 }: { barHeight?: number }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const { resolved } = useTheme()

  // Close everything on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

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
        className="fixed left-0 right-0 z-50 transition-all duration-500"
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
        <div className="max-w-page justify-between md:justify-normal mx-auto px-6 lg:px-12 flex items-center h-20 gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group">
            <span className="font-display text-2xl font-medium tracking-[-0.02em]">Deploy</span>
            <span className="font-display text-2xl font-medium tracking-[-0.02em] text-primary-dark">
              Titan
            </span>
          </Link>

          {/* Desktop centre nav */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Products dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                aria-expanded={activeDropdown === 'products'}
                aria-haspopup="true"
                className="flex items-center gap-1 text-sm text-ink-secondary hover:text-ink transition-colors nav-link-underline"
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
              {activeDropdown === 'products' && <ProductsDropdown onClose={closeDropdown} />}
            </div>

            {/* Solutions dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('solutions')}
                aria-expanded={activeDropdown === 'solutions'}
                aria-haspopup="true"
                className="flex items-center gap-1 text-sm text-ink-secondary hover:text-ink transition-colors nav-link-underline"
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
              {activeDropdown === 'solutions' && <SolutionsDropdown onClose={closeDropdown} />}
            </div>

            <Link
              to="/pricing"
              className="text-sm text-ink-secondary hover:text-ink transition-colors nav-link-underline"
            >
              Pricing
            </Link>

            <Link
              to="/customers"
              className="text-sm text-ink-secondary hover:text-ink transition-colors nav-link-underline"
            >
              Customers
            </Link>
          </div>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <ThemeToggle className="mr-1" />
            <a
              href={`${APP_URL}/signin`}
              className="text-sm text-ink-secondary hover:text-ink transition-colors px-4 py-2.5"
            >
              Sign in
            </a>
            <a
              href="/early-access"
              className="inline-flex items-center gap-2 bg-ink text-surface px-5 py-2.5 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
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
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className="block w-5 h-[1.5px] bg-ink transition-all origin-center"
              style={{ transform: mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }}
            />
            <span
              className="block w-5 h-[1.5px] bg-ink transition-all"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[1.5px] bg-ink transition-all origin-center"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }}
            />
          </button>
        </div>

        {/* Gold shimmer accent under nav when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        )}
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && <MobileNav onClose={closeMobile} barHeight={barHeight} />}
    </>
  )
}
