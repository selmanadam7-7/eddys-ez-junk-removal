'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { photo, src } from '@/lib/photos'

type Props = {
  before: string
  after: string
  label?: string
  priority?: boolean
  className?: string
}

/**
 * Drag-to-reveal comparison of two real photos of the same space,
 * taken by the crew at the start and end of the same job.
 */
export default function BeforeAfter({
  before,
  after,
  label,
  priority = false,
  className = '',
}: Props) {
  const [pct, setPct] = useState(52)
  const [dragging, setDragging] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const b = photo(before)
  const a = photo(after)

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPct(Math.min(97, Math.max(3, next)))
  }, [])

  useEffect(() => {
    if (!dragging) return
    const move = (e: PointerEvent) => {
      e.preventDefault()
      setFromClientX(e.clientX)
    }
    const up = () => setDragging(false)
    window.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [dragging, setFromClientX])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPct((p) => Math.max(3, p - 4))
    if (e.key === 'ArrowRight') setPct((p) => Math.min(97, p + 4))
    if (e.key === 'Home') setPct(3)
    if (e.key === 'End') setPct(97)
  }

  return (
    <div
      ref={wrapRef}
      className={`group relative aspect-4/3 w-full select-none overflow-hidden border border-edge bg-steel ${className}`}
      onPointerDown={(e) => {
        setDragging(true)
        setFromClientX(e.clientX)
      }}
      style={{ touchAction: 'pan-y' }}
    >
      {/* After (full bleed underneath) */}
      <Image
        src={src(after)}
        alt={a.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="object-cover"
      />

      {/* Before (clipped to the left of the handle) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src={src(before)}
          alt={b.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute top-3 left-3 z-20 bg-ink/85 px-2.5 py-1 font-display text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] text-ember backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 z-20 bg-acid px-2.5 py-1 font-display text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] text-ink">
        After
      </span>

      {label && (
        <span className="pointer-events-none absolute bottom-3 left-3 z-20 max-w-[75%] bg-ink/85 px-2.5 py-1.5 text-[0.75rem] font-medium text-chrome backdrop-blur-sm">
          {label}
        </span>
      )}

      {/* Handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-acid"
        style={{ left: `${pct}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            type="button"
            role="slider"
            aria-label="Drag to compare before and after"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={onKey}
            onPointerDown={(e) => {
              e.stopPropagation()
              setDragging(true)
            }}
            className="pointer-events-auto flex h-11 w-11 cursor-ew-resize items-center justify-center rounded-full border-2 border-ink bg-acid text-ink shadow-[0_6px_24px_-6px_rgba(0,0,0,0.9)] transition-transform duration-150 hover:scale-105 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M7.5 5L3 10l4.5 5M12.5 5l4.5 5-4.5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
