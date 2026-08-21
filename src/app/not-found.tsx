import Link from 'next/link'
import { BUSINESS, SERVICES } from '@/lib/business'
import { BtnLink, Arrow, Phone } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:py-32">
        <p className="eyebrow text-acid">Error 404</p>
        <h1 className="display mt-5 max-w-2xl text-5xl sm:text-6xl lg:text-7xl">
          <span className="chrome-text">This one already</span>{' '}
          <span className="text-acid">got hauled off.</span>
        </h1>
        <p className="mt-6 max-w-lg text-base text-ash">
          The page you were after isn&rsquo;t here. Everything else is still where you left it.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <BtnLink href="/" size="lg">
            Back to the home page
            <Arrow className="h-4 w-4" />
          </BtnLink>
          <BtnLink href={BUSINESS.phoneHref} variant="outline" size="lg">
            <Phone className="h-4 w-4 text-acid" />
            {BUSINESS.phone}
          </BtnLink>
        </div>

        <div className="mt-14 border-t border-edge pt-8">
          <p className="eyebrow mb-4 text-slate">Jobs we do</p>
          <ul className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="border border-edge px-3.5 py-2 text-[0.8125rem] text-ash transition-colors hover:border-acid hover:text-acid"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
