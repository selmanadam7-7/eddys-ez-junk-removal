import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CITIES, CITY_BY_SLUG, SERVICES, BUSINESS, SITE_URL } from '@/lib/business'
import { REVIEWS } from '@/lib/reviews'
import { src, photo, BEFORE_AFTER } from '@/lib/photos'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import BeforeAfter from '@/components/BeforeAfter'
import CtaStrip from '@/components/CtaStrip'
import { BtnLink, Arrow, Phone, Check, Stars, SvcIcon, Eyebrow } from '@/components/ui'

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const c = CITY_BY_SLUG[city]
  if (!c) return {}
  return {
    title: `Junk Removal in ${c.name}, VA`,
    description: `Full-service junk removal, cleanouts and light demolition in ${c.name}, ${c.county}. Free estimates, same-day and next-day pickups. Call ${BUSINESS.phone}.`,
    alternates: { canonical: `/service-area/${c.slug}` },
    openGraph: {
      title: `Junk Removal in ${c.name}, VA — Eddy’s EZ`,
      description: c.note,
      images: [{ url: '/photos/rig-truck-trailer-field.webp' }],
    },
  }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const c = CITY_BY_SLUG[city]
  if (!c) notFound()

  const idx = CITIES.findIndex((x) => x.slug === city)
  const review = REVIEWS[idx % REVIEWS.length]
  const pair = BEFORE_AFTER[idx % BEFORE_AFTER.length]
  const nearby = CITIES.filter((x) => x.slug !== city)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Junk Removal in ${c.name}, VA`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: {
      '@type': 'City',
      name: `${c.name}, Virginia`,
      containedInPlace: { '@type': 'AdministrativeArea', name: `${c.county}, Virginia` },
    },
    url: `${SITE_URL}/service-area/${c.slug}`,
    description: c.note,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        eyebrow={`${c.county} · ${c.drive} from the shop`}
        title="Junk removal in"
        accent={`${c.name}, VA.`}
        sub={c.note}
        image="rig-truck-trailer-field"
        crumbs={[
          { href: '/service-area', label: 'Service area' },
          { href: `/service-area/${c.slug}`, label: c.name },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BtnLink href="/book" size="lg">
            Book a {c.name} pickup
            <Arrow className="h-4 w-4" />
          </BtnLink>
          <BtnLink href={BUSINESS.phoneHref} variant="outline" size="lg">
            <Phone className="h-4 w-4 text-acid" />
            {BUSINESS.phone}
          </BtnLink>
        </div>
      </PageHero>

      {/* Local intro + services */}
      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="display text-3xl text-chrome sm:text-4xl">
              What we haul out of {c.name}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ash">
              Same crew, same trailer, same phone number wherever the job is. In {c.name} that means
              basements and garages for homeowners, turnovers for landlords, and debris runs for
              contractors mid-renovation.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ash">
              {c.drive === 'Home base'
                ? 'Being right here in town means we can usually be at your door the same day you call.'
                : `${c.name} is about ${c.drive.toLowerCase()} from the shop in Luray, so same-day is common and next-day is close to guaranteed.`}
            </p>

            <ul className="mt-8 space-y-3">
              {[
                'We carry it out — you never touch it',
                'Free estimate, confirmed on site before we load',
                'Open every day, 6am to 11pm',
                `${BUSINESS.payments.slice(0, 4).join(', ')} and more`,
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-ash">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <BtnLink href="/book" size="lg">
                Get a free estimate
                <Arrow className="h-4 w-4" />
              </BtnLink>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <BeforeAfter before={pair.before} after={pair.after} label={pair.where} />
            <p className="mt-4 text-sm leading-relaxed text-ash">
              <span className="font-semibold text-chrome">{pair.title}.</span> {pair.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-b border-edge bg-coal py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Eyebrow>Jobs in {c.name}</Eyebrow>
            <h2 className="display mt-5 text-3xl text-chrome sm:text-4xl">
              Everything we do, we do here.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 50}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col bg-coal p-6 transition-colors hover:bg-steel"
                >
                  <SvcIcon name={s.icon} className="h-6 w-6 text-acid" />
                  <h3 className="display mt-4 text-lg text-chrome group-hover:text-acid">
                    {s.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ash">{s.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Review + nearby */}
      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <div className="border border-edge bg-coal p-7 sm:p-9">
              <span className="flex text-acid">
                <Stars size={15} />
              </span>
              <blockquote className="mt-6">
                <p className="text-xl leading-snug font-medium text-chrome sm:text-2xl">
                  &ldquo;{review.pull}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-7 border-t border-edge pt-5">
                <p className="font-display text-sm font-extrabold uppercase text-chrome">
                  {review.author}
                </p>
                <p className="mt-1 text-xs text-slate">
                  {review.job} · {review.date} · Hired on {review.source}
                </p>
              </footer>
              <Link
                href="/reviews"
                className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-acid hover:text-acid-bright"
              >
                All {BUSINESS.reviewCount} reviews
                <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display text-2xl text-chrome sm:text-3xl">Nearby towns we cover</h2>
            <ul className="mt-6 grid gap-px bg-edge sm:grid-cols-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/service-area/${n.slug}`}
                    className="group flex items-baseline justify-between gap-3 bg-ink p-4 transition-colors hover:bg-steel"
                  >
                    <span>
                      <span className="display block text-base text-chrome group-hover:text-acid">
                        {n.name}
                      </span>
                      <span className="mt-0.5 block text-[0.6875rem] text-slate">{n.county}</span>
                    </span>
                    <span className="shrink-0 text-[0.625rem] font-bold uppercase tracking-widest text-acid">
                      {n.drive}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <figure className="relative mt-6 aspect-16/10 overflow-hidden border border-edge">
              <Image
                src={src('truck-townhouse-curb')}
                alt={photo('truck-townhouse-curb').alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <CtaStrip
        title={`Need something hauled in ${c.name}?`}
        body={`Free estimate, no obligation. Call ${BUSINESS.phone} or send a photo of the pile and get a price back.`}
      />
    </>
  )
}
