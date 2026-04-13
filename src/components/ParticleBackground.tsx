import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  isGold: boolean
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    const PARTICLE_COUNT = 100
    const CONNECTION_DISTANCE = 160
    const MOUSE_RADIUS = 220
    const MOUSE_PUSH = 1.2
    const INK_RGB = '8, 5, 3'
    const GOLD_RGB = '201, 168, 76'

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = window.innerWidth * dpr
      canvas!.height = window.innerHeight * dpr
      canvas!.style.width = `${window.innerWidth}px`
      canvas!.style.height = `${window.innerHeight}px`
      ctx!.scale(dpr, dpr)
    }

    function initParticles() {
      particles = []
      const w = window.innerWidth
      const h = window.innerHeight
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const isGold = i < PARTICLE_COUNT * 0.2 // 20% gold nodes
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: isGold ? Math.random() * 2 + 1.2 : Math.random() * 1.5 + 0.8,
          opacity: isGold ? Math.random() * 0.25 + 0.15 : Math.random() * 0.12 + 0.06,
          isGold,
        })
      }
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      ctx!.clearRect(0, 0, w, h)

      // Update positions with mouse interaction
      for (const p of particles) {
        // Mouse repulsion
        const dmx = p.x - mx
        const dmy = p.y - my
        const distMouse = Math.sqrt(dmx * dmx + dmy * dmy)
        if (distMouse < MOUSE_RADIUS && distMouse > 0) {
          const force = (1 - distMouse / MOUSE_RADIUS) * MOUSE_PUSH
          p.vx += (dmx / distMouse) * force * 0.15
          p.vy += (dmy / distMouse) * force * 0.15
        }

        // Damping
        p.vx *= 0.985
        p.vy *= 0.985

        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE)
            const isGoldConn = particles[i].isGold || particles[j].isGold
            const rgb = isGoldConn ? GOLD_RGB : INK_RGB
            const baseAlpha = isGoldConn ? 0.12 : 0.06

            // Brighter near mouse
            const midX = (particles[i].x + particles[j].x) / 2
            const midY = (particles[i].y + particles[j].y) / 2
            const distToMouse = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2)
            const mouseBoost = distToMouse < MOUSE_RADIUS ? (1 - distToMouse / MOUSE_RADIUS) * 0.15 : 0

            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(${rgb}, ${alpha * baseAlpha + mouseBoost})`
            ctx!.lineWidth = isGoldConn ? 0.8 : 0.5
            ctx!.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const rgb = p.isGold ? GOLD_RGB : INK_RGB
        const distToMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
        const mouseBoost = distToMouse < MOUSE_RADIUS ? (1 - distToMouse / MOUSE_RADIUS) * 0.25 : 0

        // Glow ring on gold nodes near mouse
        if (p.isGold && distToMouse < MOUSE_RADIUS) {
          const glowAlpha = mouseBoost * 0.3
          ctx!.beginPath()
          ctx!.arc(p.x, p.y, p.radius + 4, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${GOLD_RGB}, ${glowAlpha})`
          ctx!.fill()
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${rgb}, ${p.opacity + mouseBoost})`
        ctx!.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    resize()
    initParticles()
    draw()

    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
