import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS, CITIES } from '@/lib/business'
import { src, photo } from '@/lib/photos'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CtaStrip from '@/components/CtaStrip'
import { BtnLink, Arrow, Phone, Check, Stars, Eyebrow } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About Eddy',
  description: `Eddy's EZ Junk Removal is a family-owned crew of ${BUSINESS.crewSize} out of Luray, Virginia, run by ${BUSINESS.owner}. ${BUSINESS.yearsInBusiness} years in business, 5.0 stars, Thumbtack Top Pro.`,
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Family owned · Luray, Virginia"
        title="Three people, one truck,"
        accent="seven years."
        sub="Eddy's EZ is a small family-owned junk removal company. There is no dispatch center and no call queue — you get Eddy, and then you get Eddy's crew."
        image="card-dusk"
        crumbs={[{ href: '/about', label: 'About' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BtnLink href="/book" size="lg">
            Book a pickup
            <Arrow className="h-4 w-4" />
          </BtnLink>
          <BtnLink href={BUSINESS.phoneHref} variant="outline" size="lg">
            <Phone className="h-4 w-4 text-acid" />
            {BUSINESS.phone}
          </BtnLink>
        </div>
      </PageHero>

      {/* Story */}
      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Who shows up</Eyebrow>
            <h2 className="display mt-5 text-3xl text-chrome sm:text-4xl lg:text-5xl">
              You always know who is coming.
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-relaxed text-ash">
              <p>
                {BUSINESS.owner} has been hauling junk around Page County and the Shenandoah Valley
                for {BUSINESS.yearsInBusiness} years. The company is him, a crew of{' '}
                {BUSINESS.crewSize}, a Ram 2500, and a dump trailer — and on the bigger jobs he
                brings on more hands, up to five or seven people when a property needs it.
              </p>
              <p>
                That size is the point. Nobody hands your job to a franchise crew from two counties
                over. Eddy quotes it, Eddy schedules it, and Eddy is usually the one carrying the
                other end of the couch.
              </p>
              <p>
                The way he puts it on his own profile: dependable service, quality work, and honest
                communication from start to finish. Whether you are clearing out a garage, preparing
                for a move, or just need things hauled away, the promise is that it stays easy.
              </p>
              <p>
                Seven years of that has produced {BUSINESS.hires} booked jobs and{' '}
                {BUSINESS.reviewCount} reviews without a single one under five stars.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-2">
              {BUSINESS.attributes.map((a) => (
                <span
                  key={a}
                  className="border border-edge px-3 py-1.5 text-[0.75rem] font-semibold text-ash"
                >
                  {a}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <figure className="relative aspect-3/4 overflow-hidden border border-edge">
              <Image
                src={src('card-dusk')}
                alt={photo('card-dusk').alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
            <p className="mt-3 text-xs text-slate">
              Free estimates. Fast, reliable, affordable — it is printed on the card for a reason.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-b border-edge bg-coal">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'In business', v: `${BUSINESS.yearsInBusiness} yrs`, d: 'Family owned the whole time' },
            { k: 'Crew', v: String(BUSINESS.crewSize), d: 'Plus extra hands on big jobs' },
            { k: 'Jobs booked', v: `${BUSINESS.hires}+`, d: 'Through Thumbtack alone' },
            { k: 'Rating', v: '5.0', d: `${BUSINESS.reviewCount} reviews, 100% five star` },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 60} className="bg-coal p-7 lg:p-9">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-slate">
                {s.k}
              </p>
              <p className="display mt-3 text-5xl text-acid">{s.v}</p>
              <p className="mt-2 text-sm text-ash">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="display mt-5 max-w-2xl text-3xl text-chrome sm:text-4xl lg:text-5xl">
              Four rules that have not changed in seven years.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-edge sm:grid-cols-2">
            {[
              {
                t: 'Show up when we said we would',
                d: 'On time is the whole reputation. Customers write about it more than anything else — "they showed up on time and were friendly, helpful, and professional."',
              },
              {
                t: 'Quote it honest, then hold it',
                d: 'The price you hear on site is the price. When a job grows, we quote the addition fairly instead of tacking it on quietly.',
              },
              {
                t: 'Treat the house like ours',
                d: 'Doorframes, floors, landscaping. We move furniture out of a home, not out of a demolition site.',
              },
              {
                t: 'Finish it properly',
                d: 'Floor swept, holes filled, debris gone. On one job the crew reseeded every fence post hole without being asked, because the yard was not done until it looked done.',
              },
            ].map((r, i) => (
              <Reveal key={r.t} delay={(i % 2) * 70} className="bg-ink p-7 lg:p-9">
                <Check className="h-5 w-5 text-acid" />
                <h3 className="display mt-5 text-xl text-chrome">{r.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{r.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-edge bg-coal py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="display text-3xl text-chrome sm:text-4xl">The details</h2>
            <dl className="mt-8 divide-y divide-edge border-y border-edge">
              {[
                ['Owner', BUSINESS.owner],
                ['Shop', BUSINESS.address],
                ['Phone', BUSINESS.phone],
                ['Hours', `${BUSINESS.hours.days}, 6:00 AM – 11:00 PM`],
                ['Payment', BUSINESS.payments.join(', ')],
                ['Plus code', BUSINESS.plusCode],
                ['Service area', CITIES.map((c) => c.name).join(', ')],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-widest text-slate">
                    {k}
                  </dt>
                  <dd className="text-sm text-chrome">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <BtnLink href={BUSINESS.links.google} variant="outline" size="sm">
                Google listing
              </BtnLink>
              <BtnLink href={BUSINESS.links.thumbtack} variant="outline" size="sm">
                Thumbtack profile
              </BtnLink>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-edge bg-ink p-7 sm:p-9">
              <span className="flex text-acid">
                <Stars size={15} />
              </span>
              <blockquote className="mt-6">
                <p className="text-xl leading-snug font-medium text-chrome">
                  &ldquo;Eddy is respectful, professional, and truly a man of his word. I explained
                  my overall goals for cleaning up my investment property, and he took it from
                  there.&rdquo;
                </p>
              </blockquote>
              <footer className="mt-7 border-t border-edge pt-5">
                <p className="font-display text-sm font-extrabold uppercase text-chrome">
                  Corinne U.
                </p>
                <p className="mt-1 text-xs text-slate">Junk Removal · July 16, 2026</p>
              </footer>
            </div>

            <figure className="relative mt-6 aspect-16/10 overflow-hidden border border-edge">
              <Image
                src={src('rig-loaded-commercial')}
                alt={photo('rig-loaded-commercial').alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </figure>

            <p className="mt-4 text-xs text-slate">
              Want to see more?{' '}
              <Link href="/work" className="text-ash underline underline-offset-2 hover:text-acid">
                Seventy photos from real jobs
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaStrip
        title="Meet the crew on your driveway."
        body={`Free estimate, seven days a week. Call ${BUSINESS.phone} and Eddy picks up.`}
      />
    </>
  )
}
