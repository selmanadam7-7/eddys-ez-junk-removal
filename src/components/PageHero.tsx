import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { photo, src } from '@/lib/photos'
import { Eyebrow } from './ui'

export default function PageHero({
  eyebrow,
  title,
  accent,
  sub,
  image,
  crumbs,
  children,
}: {
  eyebrow: string
  title: ReactNode
  accent?: string
  sub?: string
  image?: string
  crumbs?: { href: string; label: string }[]
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-edge bg-coal">
      {image && (
        <>
          <Image
            src={src(image)}
            alt={photo(image).alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70 brightness-110"
          />
          <div className="absolute inset-0 bg-ink/70 lg:hidden" />
          <div className="absolute inset-0 hidden bg-linear-to-r from-ink via-ink/88 to-ink/30 lg:block" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent lg:via-transparent" />
        </>
      )}

      <div className="relative mx-auto max-w-[1400px] px-4 pt-12 pb-16 sm:px-6 lg:pt-16 lg:pb-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate">
              <li>
                <Link href="/" className="hover:text-acid">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={c.href} className="hover:text-acid">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Eyebrow>{eyebrow}</Eyebrow>

        <h1 className="display mt-5 max-w-4xl text-[2.75rem] leading-[0.9] xs:text-5xl sm:text-6xl lg:text-7xl">
          <span className="chrome-text">{title}</span>
          {accent && <span className="text-acid"> {accent}</span>}
        </h1>

        {sub && <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash">{sub}</p>}

        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  )
}
