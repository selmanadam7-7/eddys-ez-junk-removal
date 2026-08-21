import Link from 'next/link'
import Image from 'next/image'
import { BUSINESS, SERVICES, CITIES } from '@/lib/business'
import { BtnLink, Phone, Stars, HazardRule } from './ui'

export default function SiteFooter() {
  const year = 2026

  return (
    <footer className="relative border-t border-edge bg-coal">
      <HazardRule className="opacity-70" />

      <div className="mx-auto max-w-[1400px] px-4 pt-14 pb-28 sm:px-6 lg:pb-14">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <Image
              src="/photos/logo.webp"
              alt={`${BUSINESS.name} logo`}
              width={1024}
              height={1024}
              className="w-52 max-w-full"
              sizes="208px"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">
              A small, family-owned crew out of Luray. {BUSINESS.yearsInBusiness} years hauling junk,
              tearing out fences, and clearing basements across the Shenandoah Valley.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {BUSINESS.attributes.map((a) => (
                <span
                  key={a}
                  className="border border-edge px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-ash"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="eyebrow mb-4 text-acid">Jobs we do</h2>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-ash transition-colors hover:text-chrome"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Areas */}
          <nav aria-label="Service area">
            <h2 className="eyebrow mb-4 text-acid">Where we work</h2>
            <ul className="space-y-2.5">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-area/${c.slug}`}
                    className="text-sm text-ash transition-colors hover:text-chrome"
                  >
                    {c.name}, VA
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow mb-4 text-acid">Get it hauled</h2>

            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-2.5 font-display text-3xl font-black tracking-tight text-chrome transition-colors hover:text-acid"
            >
              <Phone className="h-5 w-5 text-acid" />
              {BUSINESS.phone}
            </a>

            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-widest text-slate">
                  Shop
                </dt>
                <dd className="mt-1 text-ash">
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-widest text-slate">
                  Hours
                </dt>
                <dd className="mt-1 text-ash">{BUSINESS.hours.days}, 6:00 AM – 11:00 PM</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-widest text-slate">
                  We take
                </dt>
                <dd className="mt-1 text-ash">{BUSINESS.payments.join(' · ')}</dd>
              </div>
            </dl>

            <div className="mt-6 grid gap-2.5">
              <BtnLink href="/book" size="sm">
                Book a pickup
              </BtnLink>
              <div className="flex gap-2.5">
                <a
                  href={BUSINESS.links.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 border border-edge py-2.5 text-xs font-semibold text-ash transition-colors hover:border-acid hover:text-acid"
                >
                  <GoogleG className="h-3.5 w-3.5" />
                  Google
                </a>
                <a
                  href={BUSINESS.links.thumbtack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 border border-edge py-2.5 text-xs font-semibold text-ash transition-colors hover:border-acid hover:text-acid"
                >
                  <TT className="h-3.5 w-3.5" />
                  Thumbtack
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-edge pt-6 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS.name}. Licensed and insured. Background checked.
          </p>
          <p className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-acid">
              <Stars size={10} />
            </span>
            <span>
              {BUSINESS.rating.toFixed(1)} from {BUSINESS.reviewCount} verified customer reviews
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function GoogleG({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 11v3.1h5.2a4.5 4.5 0 01-4.4 3.3 5.1 5.1 0 110-10.2 4.6 4.6 0 013.2 1.3l2.3-2.3A8 8 0 0012.4 4a8.4 8.4 0 100 16.8c4.8 0 8-3.4 8-8.1 0-.6-.1-1.1-.2-1.7H12z" />
    </svg>
  )
}

function TT({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 3h16v4.6h-5.5V21h-5V7.6H4V3z" />
    </svg>
  )
}
