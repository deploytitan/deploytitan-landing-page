export function Footer() {
  return (
    <footer className="py-10 border-t border-line relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo with gold accent matching Nav */}
        <div className="flex items-center">
          <span className="font-display font-medium text-base tracking-[-0.02em]">Deploy</span>
          <span className="font-display font-medium text-base tracking-[-0.02em] text-gold-dark">Titan</span>
        </div>

        {/* Gold accent separator — visible on desktop */}
        <div className="hidden md:block w-16 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <span className="text-xs text-ink-tertiary font-mono">&copy; 2026 Kizhak Inc. All rights reserved.</span>
      </div>
    </footer>
  )
}
