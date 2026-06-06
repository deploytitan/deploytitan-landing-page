'use client'

import { useIsPresentationTool } from 'next-sanity/hooks'
import { useEffect, useRef } from 'react'

const GAP = 20
const SNAP_EASING = 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'

function snapPos(x: number, y: number, w: number, h: number) {
  const toRight = x + w / 2 > window.innerWidth / 2
  const toBottom = y + h / 2 > window.innerHeight / 2
  return {
    x: toRight ? window.innerWidth - w - GAP : GAP,
    y: toBottom ? window.innerHeight - h - GAP : GAP,
  }
}

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()
  const ref = useRef<HTMLAnchorElement>(null)
  const drag = useRef({ active: false, moved: false, ox: 0, oy: 0, ex: 0, ey: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { width: w, height: h } = el.getBoundingClientRect()
    el.style.left = `${GAP}px`
    el.style.top = `${window.innerHeight - h - GAP}px`
    el.style.visibility = 'visible'

    function down(e: PointerEvent) {
      e.preventDefault()
      const r = el!.getBoundingClientRect()
      drag.current = {
        active: true,
        moved: false,
        ox: e.clientX,
        oy: e.clientY,
        ex: r.left,
        ey: r.top,
      }
      el!.setPointerCapture(e.pointerId)
      el!.style.transition = 'none'
      el!.style.cursor = 'grabbing'
    }

    function move(e: PointerEvent) {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.ox
      const dy = e.clientY - drag.current.oy
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.current.moved = true
      el!.style.left = `${drag.current.ex + dx}px`
      el!.style.top = `${drag.current.ey + dy}px`
    }

    function up() {
      if (!drag.current.active) return
      drag.current.active = false
      const r = el!.getBoundingClientRect()
      const { x, y } = snapPos(r.left, r.top, r.width, r.height)
      el!.style.transition = `top 200ms ${SNAP_EASING}, left 200ms ${SNAP_EASING}`
      el!.style.left = `${x}px`
      el!.style.top = `${y}px`
      el!.style.cursor = 'grab'
    }

    function click(e: MouseEvent) {
      if (drag.current.moved) {
        e.preventDefault()
        drag.current.moved = false
      }
    }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('click', click)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.removeEventListener('click', click)
    }
  }, [])

  if (isPresentationTool) return null

  return (
    <>
      <style>{`@keyframes dt-ping{75%,100%{transform:scale(2);opacity:0}}`}</style>
      <a
        ref={ref}
        href="/api/draft-mode/disable"
        draggable={false}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          visibility: 'hidden',
          zIndex: 2147483647,
          cursor: 'grab',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '36px',
          padding: '0 14px 0 10px',
          borderRadius: '9999px',
          background: 'rgba(0,0,0,0.82)',
          boxShadow:
            '0 0 0 1px #171717, inset 0 0 0 1px rgba(255,255,255,0.14), 0px 16px 32px -8px rgba(0,0,0,0.24)',
          backdropFilter: 'blur(48px)',
          color: 'white',
          fontSize: '13px',
          fontWeight: 500,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <span style={{ position: 'relative', display: 'flex', width: 8, height: 8, flexShrink: 0 }}>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#e5484d',
              animation: 'dt-ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
            }}
          />
          <span
            style={{
              position: 'relative',
              borderRadius: '50%',
              width: 8,
              height: 8,
              background: '#ca2a30',
            }}
          />
        </span>
        Exit Draft Mode
      </a>
    </>
  )
}
