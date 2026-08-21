'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BUSINESS } from '@/lib/business'
import { Phone } from './ui'

/** Sticky thumb-reach bar. Junk removal is a phone business; this is the whole point. */
export default function CallBar() {
  const pathname = usePathname()
  if (pathname === '/book') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="hazard h-[3px]" aria-hidden />
      <div className="grid grid-cols-2 border-t border-edge bg-coal/95 backdrop-blur-xl">
        <a
          href={BUSINESS.phoneHref}
          className="flex h-14 items-center justify-center gap-2 font-display text-sm font-extrabold uppercase tracking-tight text-chrome"
        >
          <Phone className="h-4 w-4 text-acid" />
          Call now
        </a>
        <Link
          href="/book"
          className="flex h-14 items-center justify-center gap-2 bg-acid font-display text-sm font-extrabold uppercase tracking-tight text-ink"
        >
          Book a pickup
        </Link>
      </div>
    </div>
  )
}
