import { useState, useEffect } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMobile = () => {
    const next = !mobileOpen
    setMobileOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(250,250,249,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-line)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo with gold accent */}
          <a href="#" className="flex items-center group">
            <span className="font-display text-2xl font-medium tracking-[-0.02em]">Deploy</span>
            <span className="font-display text-2xl font-medium tracking-[-0.02em] text-gold-dark">Titan</span>
          </a>

          {/* Desktop links — gold underline on hover via .nav-link-underline CSS class */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#problem" className="text-sm text-ink-secondary hover:text-ink transition-colors nav-link-underline">Problem</a>
            <a href="#solution" className="text-sm text-ink-secondary hover:text-ink transition-colors nav-link-underline">Solution</a>
            <a href="#how-it-works" className="text-sm text-ink-secondary hover:text-ink transition-colors nav-link-underline">How it works</a>
            <a href="#outcomes" className="text-sm text-ink-secondary hover:text-ink transition-colors nav-link-underline">Outcomes</a>
          </div>

          {/* Desktop CTA — sharp edges, gold hover accent */}
          <div className="hidden md:block">
            <a
              href="#waitlist"
              className="inline-flex items-center bg-ink text-surface px-6 py-2.5 text-sm font-medium transition-all active:scale-[0.97] hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ borderRadius: '2px' }}
            >
              Join Waitlist
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={toggleMobile} className="md:hidden flex flex-col gap-[5px] p-2" aria-label="Menu">
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

        {/* Subtle gold line at bottom of nav when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        )}
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 bg-surface z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-400"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
        }}
      >
        <a href="#problem" onClick={closeMobile} className="font-display font-medium text-4xl tracking-[-0.02em] hover:text-gold-dark transition-colors">Problem</a>
        <a href="#solution" onClick={closeMobile} className="font-display font-medium text-4xl tracking-[-0.02em] hover:text-gold-dark transition-colors">Solution</a>
        <a href="#how-it-works" onClick={closeMobile} className="font-display font-medium text-4xl tracking-[-0.02em] hover:text-gold-dark transition-colors">How it works</a>
        <a href="#outcomes" onClick={closeMobile} className="font-display font-medium text-4xl tracking-[-0.02em] hover:text-gold-dark transition-colors">Outcomes</a>
        <a
          href="#waitlist"
          onClick={closeMobile}
          className="mt-4 inline-flex items-center bg-ink text-surface px-8 py-4 text-base font-medium hover:shadow-[0_0_0_1px_rgba(201,168,76,0.3)] transition-all"
          style={{ borderRadius: '2px' }}
        >
          Join Waitlist
        </a>
      </div>
    </>
  )
}
