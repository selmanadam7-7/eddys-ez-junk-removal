import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import type { ServiceIcon } from '@/lib/business'

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

const base =
  'inline-flex items-center justify-center gap-2.5 font-display font-extrabold uppercase tracking-tight transition-all duration-200 active:translate-y-px disabled:opacity-40 disabled:pointer-events-none'

const sizes = {
  sm: 'h-10 px-4 text-[0.8125rem]',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-7 text-base sm:h-[3.75rem] sm:px-9 sm:text-lg',
}

const variants = {
  acid:
    'bg-acid text-ink hover:bg-acid-bright shadow-[0_0_0_1px_var(--color-acid-deep),0_10px_30px_-10px_rgba(159,212,40,0.55)] hover:shadow-[0_0_0_1px_var(--color-acid-bright),0_14px_40px_-10px_rgba(194,245,58,0.7)]',
  chrome: 'bg-chrome text-ink hover:bg-white',
  outline:
    'border border-edge bg-coal/70 text-chrome hover:border-acid hover:text-acid backdrop-blur',
  ghost: 'text-ash hover:text-chrome',
}

type BtnProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: ReactNode
}

export function Btn({
  variant = 'acid',
  size = 'md',
  className = '',
  children,
  ...rest
}: BtnProps & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function BtnLink({
  variant = 'acid',
  size = 'md',
  className = '',
  children,
  href,
  ...rest
}: BtnProps & { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('sms:') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  Section furniture                                                  */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  n,
  className = '',
}: {
  children: ReactNode
  n?: string
  className?: string
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-acid ${className}`}>
      {n && (
        <span className="inline-flex h-5 min-w-5 items-center justify-center bg-acid px-1 text-[0.625rem] text-ink">
          {n}
        </span>
      )}
      <span>{children}</span>
    </p>
  )
}

export function Rule({ className = '' }: { className?: string }) {
  return <div className={`h-px w-full bg-edge ${className}`} />
}

export function HazardRule({ className = '' }: { className?: string }) {
  return <div className={`hazard h-1.5 w-full ${className}`} aria-hidden />
}

export function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.47 5.36 5.86.71-4.33 4.01 1.15 5.79L10 14.6l-5.15 2.87 1.15-5.79L1.67 7.67l5.86-.71L10 1.6z" />
        </svg>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Service icons — drawn to match the decal, not a generic icon set   */
/* ------------------------------------------------------------------ */

export function SvcIcon({ name, className = 'h-7 w-7' }: { name: ServiceIcon; className?: string }) {
  const common = {
    className,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'truck':
      return (
        <svg {...common}>
          <path d="M2 21V10h13v11" />
          <path d="M15 13h6l4 4.5V21h-3" />
          <circle cx="9" cy="24" r="2.6" />
          <circle cx="22" cy="24" r="2.6" />
          <path d="M11.6 24h7.8M2 21h4.4M5 7l2-2M10 6.5V4M14 7l-1-2" />
        </svg>
      )
    case 'hammer':
      return (
        <svg {...common}>
          <path d="M13 7l6-4 8 8-4 6-4-4" />
          <path d="M17 15L6 26a2.5 2.5 0 01-3.5-3.5L13.5 11" />
          <path d="M11 5l4 4" />
        </svg>
      )
    case 'brick':
      return (
        <svg {...common}>
          <path d="M3 11h26v6H3zM3 17h26v6H3z" />
          <path d="M11 11v6M21 11v6M7 17v6M16 17v6M25 17v6" />
          <path d="M6 8l2-3M13 7V4M20 8l1-3" />
        </svg>
      )
    case 'car':
      return (
        <svg {...common}>
          <path d="M4 20l1.8-5.4A3 3 0 018.6 12h8.8a3 3 0 012.8 2.6L21 20" />
          <path d="M2 20h22v3.5h-3M8 23.5h9" />
          <circle cx="7" cy="24" r="2.2" />
          <circle cx="20" cy="24" r="2.2" />
          <path d="M24 12l6 3v5h-3" />
        </svg>
      )
    case 'sofa':
      return (
        <svg {...common}>
          <path d="M5 16V9a2.5 2.5 0 015 0v3h6V9a2.5 2.5 0 015 0v7" />
          <path d="M3 16.5a2.5 2.5 0 015 0V21h10v-4.5a2.5 2.5 0 015 0V24H3z" />
          <path d="M6 24v2.5M20 24v2.5" />
        </svg>
      )
    case 'box':
      return (
        <svg {...common}>
          <path d="M4 11l12-5 12 5v12l-12 5-12-5z" />
          <path d="M4 11l12 5 12-5M16 16v12" />
          <path d="M10 8.5l12 5" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M6 26C4 18 8 8 24 6c1 12-5 18-12 18-3 0-5-1-6-2z" />
          <path d="M18 11L6 26" />
        </svg>
      )
    case 'washer':
      return (
        <svg {...common}>
          <rect x="6" y="4" width="20" height="24" rx="2.5" />
          <circle cx="16" cy="18" r="6" />
          <path d="M11 18c1.6-1.6 3.4-1.6 5 0s3.4 1.6 5 0" />
          <path d="M10.5 8.5h1M14 8.5h5" />
        </svg>
      )
  }
}

export function Phone({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M4.4 2.2a1.6 1.6 0 00-2 .5L1.5 4a2.6 2.6 0 00-.3 2.4c.9 2.6 2.6 5.1 4.8 7.3 2.2 2.2 4.7 3.9 7.3 4.8a2.6 2.6 0 002.4-.3l1.3-.9a1.6 1.6 0 00.5-2l-1.5-2.6a1.6 1.6 0 00-2-.7l-1.9.8a13.7 13.7 0 01-3-2.4 13.7 13.7 0 01-2.4-3l.8-1.9a1.6 1.6 0 00-.7-2L4.4 2.2z" />
    </svg>
  )
}

export function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Check({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
