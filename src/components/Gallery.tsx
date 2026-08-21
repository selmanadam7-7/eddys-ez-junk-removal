'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { PHOTOS, CATEGORY_LABELS, src, type PhotoCategory } from '@/lib/photos'

export default function Gallery() {
  const [cat, setCat] = useState<PhotoCategory | 'all'>('all')
  const [open, setOpen] = useState<number | null>(null)

  const shown = cat === 'all' ? PHOTOS : PHOTOS.filter((p) => p.cat === cat)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? null : (i + dir + shown.length) % shown.length)),
    [shown.length]
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  const active = open === null ? null : shown[open]

  return (
    <>
      {/* Filters */}
      <div className="no-bar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {CATEGORY_LABELS.map((c) => {
          const n = c.id === 'all' ? PHOTOS.length : PHOTOS.filter((p) => p.cat === c.id).length
          if (!n) return null
          const on = cat === c.id
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCat(c.id)
                setOpen(null)
              }}
              className={`shrink-0 border px-3.5 py-2 text-[0.8125rem] font-semibold whitespace-nowrap transition-colors ${
                on
                  ? 'border-acid bg-acid text-ink'
                  : 'border-edge text-ash hover:border-slate hover:text-chrome'
              }`}
            >
              {c.label}
              <span className={`ml-2 text-[0.6875rem] ${on ? 'text-ink/60' : 'text-slate'}`}>
                {n}
              </span>
            </button>
          )
        })}
      </div>

      {/* Even tiles — a contact sheet, not a ragged masonry. Full frames live in the lightbox. */}
      <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block aspect-square overflow-hidden border border-edge focus-visible:border-acid"
            aria-label={`Open photo: ${p.alt}`}
          >
            <Image
              src={src(p.name)}
              alt={p.alt}
              fill
              sizes="(min-width: 1280px) 19vw, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              loading={i < 10 ? 'eager' : 'lazy'}
            />
            <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 p-2.5 text-left text-[0.6875rem] leading-snug text-chrome transition-transform duration-300 group-hover:translate-y-0">
              {p.alt}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          <div className="flex items-center justify-between border-b border-edge px-4 py-3">
            <p className="text-xs text-slate">
              {open! + 1} / {shown.length}
            </p>
            <button
              type="button"
              onClick={close}
              className="flex h-9 w-9 items-center justify-center border border-edge text-chrome transition-colors hover:border-acid hover:text-acid"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center p-4 sm:p-8">
            <Image
              src={src(active.name)}
              alt={active.alt}
              width={active.w}
              height={active.h}
              sizes="90vw"
              className="max-h-full w-auto max-w-full object-contain"
              priority
            />

            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-2 flex h-12 w-12 items-center justify-center border border-edge bg-coal/80 text-chrome transition-colors hover:border-acid hover:text-acid sm:left-6"
              aria-label="Previous photo"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-2 flex h-12 w-12 items-center justify-center border border-edge bg-coal/80 text-chrome transition-colors hover:border-acid hover:text-acid sm:right-6"
              aria-label="Next photo"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="border-t border-edge px-4 py-4 text-center text-sm text-ash">{active.alt}</p>
        </div>
      )}
    </>
  )
}
