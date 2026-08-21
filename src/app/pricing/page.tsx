import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESS, LOAD_SIZES } from '@/lib/business'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CtaStrip from '@/components/CtaStrip'
import { BtnLink, Arrow, Check, Phone, Eyebrow } from '@/components/ui'

export const metadata: Metadata = {
  title: 'How pricing works',
  description:
    'Junk removal is priced by volume — how much room your load takes on the trailer. Free estimates, price confirmed on site before anything is loaded.',
  alternates: { canonical: '/pricing' },
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="No surprises"
        title="You get the price"
        accent="before we load."
        sub="Junk removal is priced by volume — how much room your stuff takes up on the trailer. Not by the hour, not by the item, and never after the fact."
        image="trailer-branded-driveway"
        crumbs={[{ href: '/pricing', label: 'Pricing' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BtnLink href="/book" size="lg">
            Get a free estimate
            <Arrow className="h-4 w-4" />
          </BtnLink>
          <BtnLink href={BUSINESS.smsHref} variant="outline" size="lg">
            Text a photo of the pile
          </BtnLink>
        </div>
      </PageHero>

      {/* Volume ladder */}
      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Eyebrow n="01">The volume ladder</Eyebrow>
            <h2 className="display mt-5 max-w-2xl text-3xl text-chrome sm:text-4xl lg:text-5xl">
              Find your pile on here.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash">
              A quarter load costs about a quarter of a full load. Where you land on this ladder is
              most of the price. The rest is stairs, distance, and anything that needs taking apart
              first.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-5">
            {LOAD_SIZES.map((s, i) => (
              <Reveal key={s.id} delay={i * 60} className="bg-ink p-6">
                <Gauge fill={s.fraction} />
                <h3 className="display mt-5 text-xl text-chrome">{s.label}</h3>
                <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-widest text-acid">
                  {s.truck}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ash">{s.example}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What moves the number */}
      <section className="border-b border-edge bg-coal py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow n="02">What moves the number</Eyebrow>
            <h2 className="display mt-5 text-3xl text-chrome sm:text-4xl">
              Four things, and you can see all of them coming.
            </h2>
            <dl className="mt-8 divide-y divide-edge border-y border-edge">
              {[
                {
                  t: 'How much there is',
                  d: 'The main one. More room on the trailer means more dump fees on our end, and that is what you are really paying for.',
                },
                {
                  t: 'Stairs and distance to the truck',
                  d: 'A basement two flights down takes longer than a curb pile. Tell us up front and it is baked into the quote, not added later.',
                },
                {
                  t: 'Whether it has to come apart first',
                  d: 'A shed, a fence, a deck, built-in cabinets — that is demolition time on top of hauling time.',
                },
                {
                  t: 'Special disposal items',
                  d: 'Mattresses, tires, appliances with refrigerant, paint and chemicals all cost extra at the transfer station. We pass through what it actually costs.',
                },
              ].map((x) => (
                <div key={x.t} className="py-6">
                  <dt className="font-display text-lg font-extrabold text-chrome">{x.t}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ash">{x.d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-edge bg-ink p-7 lg:sticky lg:top-28">
              <h3 className="display text-2xl text-chrome">What you can count on</h3>
              <ul className="mt-6 space-y-4">
                {[
                  ['The estimate is free', 'Come out, look at it, quote it. No charge and no obligation if you pass.'],
                  [
                    'The price is confirmed on site',
                    'Before a single item goes on the truck, you hear the number and you say yes or no.',
                  ],
                  [
                    'It only grows if you grow it',
                    'One customer kept finding more work as the job went. Eddy quoted each addition fair and finished on time.',
                  ],
                  [
                    'You pay when it is done',
                    `${BUSINESS.payments.slice(0, 5).join(', ')} and more. Nothing up front.`,
                  ],
                  ['Cleanup is included', 'Sweeping the floor is not a line item. It is just how the job ends.'],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                    <span>
                      <span className="block text-sm font-semibold text-chrome">{t}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ash">{d}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-edge pt-6">
                <p className="text-sm leading-relaxed text-ash">
                  Every job is different, so we don&rsquo;t publish a flat rate that would be wrong
                  for half the people reading it. Send a photo instead — you&rsquo;ll have a real
                  number in minutes.
                </p>
                <a
                  href={BUSINESS.phoneHref}
                  className="mt-5 flex items-center gap-2.5 font-display text-2xl font-black tracking-tight text-chrome transition-colors hover:text-acid"
                >
                  <Phone className="h-5 w-5 text-acid" />
                  {BUSINESS.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Compare */}
      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Eyebrow n="03">The alternatives</Eyebrow>
            <h2 className="display mt-5 max-w-2xl text-3xl text-chrome sm:text-4xl lg:text-5xl">
              What it costs to do it yourself.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-px bg-edge lg:grid-cols-3">
            {[
              {
                t: 'Rent a roll-off dumpster',
                d: 'A container sits in your driveway for a week, you still do all the lifting, and you pay for the whole box whether you fill it or not. Weight overages are extra.',
                bad: true,
              },
              {
                t: 'Borrow a truck and go yourself',
                d: 'Two or three trips to the transfer station, a Saturday gone, tipping fees at the gate, and whatever your back has to say about the fridge.',
                bad: true,
              },
              {
                t: 'Call Eddy',
                d: 'One visit. We bring the trailer to the pile, do the carrying, pay the tipping fees, sweep up, and leave. You picked where to stand.',
                bad: false,
              },
            ].map((c) => (
              <Reveal
                key={c.t}
                className={`p-7 lg:p-8 ${c.bad ? 'bg-ink' : 'bg-acid/[0.06]'}`}
              >
                <h3
                  className={`display text-xl ${c.bad ? 'text-ash' : 'text-acid'}`}
                >
                  {c.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{c.d}</p>
                {!c.bad && (
                  <BtnLink href="/book" size="sm" className="mt-6">
                    Book a pickup
                    <Arrow className="h-3.5 w-3.5" />
                  </BtnLink>
                )}
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate">
            Curious what a job like yours involved?{' '}
            <Link href="/work" className="text-ash underline underline-offset-2 hover:text-acid">
              Look through the photos
            </Link>{' '}
            or{' '}
            <Link href="/reviews" className="text-ash underline underline-offset-2 hover:text-acid">
              read what customers said about the pricing
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaStrip
        title="Get a real number today."
        body="Send a photo, get a price. Free estimates seven days a week, 6am to 11pm."
      />
    </>
  )
}

function Gauge({ fill }: { fill: number }) {
  return (
    <span className="block w-20" aria-hidden>
      <svg viewBox="0 0 64 48" className="w-full">
        <defs>
          <clipPath id={`pbed-${Math.round(fill * 100)}`}>
            <rect x="6" y="14" width="46" height="20" />
          </clipPath>
        </defs>
        <rect
          x="6"
          y={34 - 20 * fill}
          width="46"
          height={20 * fill}
          clipPath={`url(#pbed-${Math.round(fill * 100)})`}
          className="fill-acid"
        />
        <path d="M6 14v20h46V14" fill="none" className="stroke-edge" strokeWidth="2" />
        <path d="M6 34h48" fill="none" className="stroke-edge" strokeWidth="2" />
        <circle cx="18" cy="38" r="3.5" fill="none" className="stroke-edge" strokeWidth="2" />
        <circle cx="42" cy="38" r="3.5" fill="none" className="stroke-edge" strokeWidth="2" />
        <path d="M52 24h6" fill="none" className="stroke-edge" strokeWidth="2" />
      </svg>
    </span>
  )
}
