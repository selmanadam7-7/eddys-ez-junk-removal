import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, SERVICE_BY_SLUG, CITIES, BUSINESS, SITE_URL } from '@/lib/business'
import { REVIEWS } from '@/lib/reviews'
import { photo, src, BEFORE_AFTER } from '@/lib/photos'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import BeforeAfter from '@/components/BeforeAfter'
import CtaStrip from '@/components/CtaStrip'
import { BtnLink, Arrow, Check, Phone, Stars, SvcIcon, Eyebrow } from '@/components/ui'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = SERVICE_BY_SLUG[slug]
  if (!s) return {}
  return {
    title: `${s.name} in Luray & the Shenandoah Valley`,
    description: `${s.blurb.slice(0, 150)}… Free estimates from Eddy’s EZ Junk Removal. Call ${BUSINESS.phone}.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.name} — Eddy’s EZ Junk Removal`,
      description: s.short,
      images: [{ url: `/photos/${s.hero}.webp` }],
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = SERVICE_BY_SLUG[slug]
  if (!s) notFound()

  const others = SERVICES.filter((x) => x.slug !== slug).slice(0, 4)
  const review = REVIEWS[SERVICES.findIndex((x) => x.slug === slug) % REVIEWS.length]
  const pair =
    BEFORE_AFTER.find((p) => s.photos.includes(p.before) && s.photos.includes(p.after)) ?? null

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.blurb,
    serviceType: s.name,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: CITIES.map((c) => ({ '@type': 'City', name: `${c.name}, VA` })),
    url: `${SITE_URL}/services/${s.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }}
      />

      <PageHero
        eyebrow={s.short}
        title={s.name}
        sub={s.blurb}
        image={s.hero}
        crumbs={[
          { href: '/services', label: 'Services' },
          { href: `/services/${s.slug}`, label: s.name },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BtnLink href="/book" size="lg">
            Book this job
            <Arrow className="h-4 w-4" />
          </BtnLink>
          <BtnLink href={BUSINESS.phoneHref} variant="outline" size="lg">
            <Phone className="h-4 w-4 text-acid" />
            {BUSINESS.phone}
          </BtnLink>
        </div>
      </PageHero>

      {/* What it covers */}
      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <SvcIcon name={s.icon} className="h-9 w-9 text-acid" />
            <h2 className="display mt-6 text-3xl text-chrome sm:text-4xl">
              What goes on the trailer
            </h2>
            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {s.takes.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-ash">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-9 border-l-2 border-acid bg-coal py-4 pr-5 pl-5">
              <p className="text-sm leading-relaxed text-ash">
                Household chemicals, paint, tires, propane tanks, and asbestos have special disposal
                rules. Tell us what you have and we&rsquo;ll sort out what we can take and what has
                to go somewhere else.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            {pair ? (
              <div>
                <BeforeAfter before={pair.before} after={pair.after} label={pair.where} />
                <p className="mt-4 text-sm text-ash">
                  <span className="font-semibold text-chrome">{pair.title}.</span> {pair.note}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {s.photos.slice(0, 4).map((n) => (
                  <figure key={n} className="relative aspect-square overflow-hidden border border-edge">
                    <Image
                      src={src(n)}
                      alt={photo(n).alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 45vw"
                      className="object-cover"
                    />
                  </figure>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Photos */}
      <section className="border-b border-edge bg-coal py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Eyebrow>{s.name} — on the job</Eyebrow>
            <h2 className="display mt-5 max-w-2xl text-3xl text-chrome sm:text-4xl">
              Photos from real {s.name.toLowerCase()} jobs.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.photos.map((n, i) => {
              const p = photo(n)
              return (
                <Reveal key={n} delay={(i % 3) * 60}>
                  <figure className="relative aspect-4/3 overflow-hidden border border-edge">
                    <Image
                      src={src(n)}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </figure>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={100}>
            <Link
              href="/work"
              className="mt-9 inline-flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-tight text-acid hover:text-acid-bright"
            >
              See the full gallery
              <Arrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ + review */}
      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="display text-3xl text-chrome sm:text-4xl">Questions we get asked</h2>
            <dl className="mt-8 divide-y divide-edge border-y border-edge">
              {s.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="font-display text-lg font-extrabold text-chrome">{f.q}</dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-ash">{f.a}</dd>
                </div>
              ))}
              <div className="py-6">
                <dt className="font-display text-lg font-extrabold text-chrome">
                  How do you charge?
                </dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-ash">
                  By volume — how much room the load takes on the trailer.{' '}
                  <Link href="/pricing" className="text-acid underline underline-offset-2">
                    Here is exactly how that works
                  </Link>
                  .
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-edge bg-coal p-7">
              <span className="flex text-acid">
                <Stars size={14} />
              </span>
              <blockquote className="mt-5">
                <p className="text-lg leading-snug font-medium text-chrome">
                  &ldquo;{review.pull}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-6 border-t border-edge pt-4">
                <p className="font-display text-sm font-extrabold uppercase text-chrome">
                  {review.author}
                </p>
                <p className="mt-1 text-xs text-slate">
                  {review.job} · {review.date}
                </p>
              </footer>
              <Link
                href="/reviews"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-acid hover:text-acid-bright"
              >
                All {BUSINESS.reviewCount} reviews
                <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-5 border border-edge bg-coal p-7">
              <p className="eyebrow text-slate">{s.name} in</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {CITIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/service-area/${c.slug}`}
                      className="text-sm text-ash hover:text-acid"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="border-b border-edge bg-coal py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <h2 className="eyebrow text-slate">Other jobs we do</h2>
          <div className="mt-6 grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group flex items-center gap-4 bg-coal p-5 transition-colors hover:bg-steel"
              >
                <SvcIcon name={o.icon} className="h-6 w-6 shrink-0 text-acid" />
                <span className="min-w-0">
                  <span className="display block text-base text-chrome group-hover:text-acid">
                    {o.name}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-slate">{o.short}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip
        title={`Need ${s.name.toLowerCase()} this week?`}
        body={`Free estimate, no obligation. We run ${BUSINESS.hours.days.toLowerCase()} from 6am to 11pm and same-day pickups are normal.`}
      />
    </>
  )
}
