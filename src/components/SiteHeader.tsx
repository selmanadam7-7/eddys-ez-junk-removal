'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BUSINESS, SERVICES, CITIES } from '@/lib/business'
import { BtnLink, Phone, Stars } from './ui'

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Our work' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/service-area', label: 'Service area' },
  { href: '/about', label: 'About' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Top strip: rating + hours. Real numbers, no filler. */}
      <div className="hidden border-b border-edge/70 bg-coal lg:block">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-6 text-[0.7rem] tracking-wide text-ash">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-acid">
              <Stars size={11} />
              <span className="font-semibold text-chrome">5.0</span>
              <span className="text-slate">
                · {BUSINESS.reviewCount} reviews · Thumbtack Top&nbsp;Pro
              </span>
            </span>
            <span className="text-slate">·</span>
            <span>{BUSINESS.hoursShort}</span>
          </div>
          <div className="flex items-center gap-5">
            <span>Serving Luray &amp; the Shenandoah Valley</span>
            <span className="text-slate">·</span>
            <span className="text-chrome">Free estimates</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          solid ? 'border-b border-edge bg-ink/92 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${BUSINESS.name} home`}>
            <Wordmark />
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-[0.8125rem] font-semibold tracking-wide transition-colors ${
                    active ? 'text-acid' : 'text-ash hover:text-chrome'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-acid" aria-hidden />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <a
              href={BUSINESS.phoneHref}
              className="hidden items-center gap-2 px-3 py-2 font-display text-lg font-extrabold tracking-tight text-chrome transition-colors hover:text-acid sm:flex"
            >
              <Phone className="h-4 w-4 text-acid" />
              {BUSINESS.phone}
            </a>
            <BtnLink href="/book" size="sm" className="hidden xs:inline-flex">
              Book a pickup
            </BtnLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center border border-edge bg-coal text-chrome lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 h-0.5 w-5 bg-current transition-all duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <div className="hazard h-[3px] w-full opacity-80" aria-hidden />
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-[4.5rem] max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-edge bg-coal transition-transform duration-300 ${
            open ? 'translate-y-0' : '-translate-y-3 opacity-0'
          }`}
        >
          {/* Any link inside closes the drawer — delegation beats a route effect. */}
          <nav
            className="px-5 py-6"
            aria-label="Mobile"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('a')) setOpen(false)
            }}
          >
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between border-b border-edge/60 py-3.5 font-display text-2xl font-extrabold uppercase tracking-tight text-chrome"
                  >
                    {item.label}
                    <span className="text-acid">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-7 mb-3 text-slate">Jobs we do</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block py-1 text-[0.8125rem] text-ash hover:text-acid"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-7 mb-3 text-slate">Towns</p>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-area/${c.slug}`}
                    className="text-[0.8125rem] text-ash hover:text-acid"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3">
              <BtnLink href="/book" size="lg">
                Book a pickup
              </BtnLink>
              <BtnLink href={BUSINESS.phoneHref} variant="outline" size="lg">
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </BtnLink>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

function Wordmark() {
  return (
    <span className="flex items-baseline gap-[0.3rem] leading-none">
      <span className="chrome-text font-display text-[1.35rem] font-black uppercase tracking-[-0.04em] sm:text-2xl">
        Eddy&rsquo;s
      </span>
      <span className="bg-acid px-1.5 py-0.5 font-display text-[1.1rem] font-black uppercase italic tracking-[-0.05em] text-ink sm:text-xl">
        EZ
      </span>
      <span className="hidden font-display text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ash sm:inline">
        Junk Removal
      </span>
    </span>
  )
}
