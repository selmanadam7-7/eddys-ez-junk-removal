import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS, SERVICES, CITIES } from '@/lib/business'
import { REVIEWS, RATED_HIGHLY_FOR } from '@/lib/reviews'
import { BEFORE_AFTER, PHOTOS, photo, src } from '@/lib/photos'
import { BtnLink, Eyebrow, Stars, SvcIcon, Phone, Arrow, Check, HazardRule } from '@/components/ui'
import BeforeAfter from '@/components/BeforeAfter'
import Reveal from '@/components/Reveal'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Proof />
      <HowItWorks />
      <Transformations />
      <Services />
      <Reviews />
      <Area />
      <Rig />
      <FinalCta />
    </>
  )
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-8rem)] overflow-hidden border-b border-edge lg:min-h-[calc(100svh-4.5rem)]">
      <Image
        src={src('rig-truck-trailer-field')}
        alt={photo('rig-truck-trailer-field').alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] brightness-[1.15] contrast-[1.05]"
      />
      {/* On narrow screens the copy sits over the whole frame, so it needs a full
          scrim; on wide screens the photo gets to breathe on the right. */}
      <div className="absolute inset-0 bg-ink/72 lg:hidden" />
      <div className="absolute inset-0 hidden bg-linear-to-r from-ink via-ink/82 to-ink/10 lg:block" />
      <div className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/30 to-ink/55 lg:via-transparent lg:to-ink/45" />

      {/* Ember drift, straight off the business card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[
          { l: '8%', b: '18%', d: '0s', dur: '6.5s' },
          { l: '14%', b: '10%', d: '1.8s', dur: '7.5s' },
          { l: '4%', b: '30%', d: '3.4s', dur: '8s' },
          { l: '21%', b: '22%', d: '2.6s', dur: '9s' },
          { l: '31%', b: '8%', d: '4.8s', dur: '7s' },
        ].map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{ left: e.l, bottom: e.b, animationDelay: e.d, animationDuration: e.dur }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-[calc(100svh-4.5rem)] lg:py-24">
        <div className="max-w-3xl">
          <Eyebrow className="mb-6">
            Luray · Page County · Shenandoah Valley
          </Eyebrow>

          <h1 className="display text-[3.25rem] leading-[0.86] xs:text-6xl sm:text-7xl lg:text-[7.5rem]">
            <span className="chrome-text block">Point at it.</span>
            <span className="block text-acid">It&rsquo;s gone.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
            Full-service junk removal and light demolition out of Luray, Virginia. You don&rsquo;t
            drag anything to the curb, you don&rsquo;t rent a dumpster, and you don&rsquo;t make four
            trips to the transfer station. We carry it out, load it up, and sweep behind us.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BtnLink href="/book" size="lg">
              Book a pickup
              <Arrow className="h-4 w-4" />
            </BtnLink>
            <BtnLink href={BUSINESS.phoneHref} variant="outline" size="lg">
              <Phone className="h-4 w-4 text-acid" />
              {BUSINESS.phone}
            </BtnLink>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-edge pt-8 sm:grid-cols-4">
            <Stat k="Rating" v="5.0" sub={`${BUSINESS.reviewCount} reviews`} accent />
            <Stat k="Years" v={String(BUSINESS.yearsInBusiness)} sub="family owned" />
            <Stat k="Jobs booked" v={`${BUSINESS.hires}+`} sub="and counting" />
            <Stat k="Open" v="6–11" sub="every single day" />
          </dl>
        </div>
      </div>
    </section>
  )
}

function Stat({
  k,
  v,
  sub,
  accent,
}: {
  k: string
  v: string
  sub: string
  accent?: boolean
}) {
  return (
    <div>
      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-slate">{k}</dt>
      <dd
        className={`display mt-1.5 text-4xl sm:text-[2.75rem] ${accent ? 'text-acid' : 'text-chrome'}`}
      >
        {v}
      </dd>
      <dd className="mt-1 text-xs text-ash">{sub}</dd>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Marquee() {
  const words = [
    'Junk removal',
    'Light demolition',
    'Construction debris',
    'Car hauling',
    'Estate cleanouts',
    'Storage units',
    'Appliances',
    'Brush & yard waste',
  ]
  const run = [...words, ...words]
  return (
    <section className="overflow-hidden border-b border-edge bg-coal py-4" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {run.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-xl font-extrabold uppercase tracking-tight text-ash/45 sm:text-2xl">
              {w}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 bg-acid" />
          </span>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Proof() {
  return (
    <section className="border-b border-edge bg-ink" aria-labelledby="proof-heading">
      <h2 id="proof-heading" className="sr-only">
        Why people hire Eddy&rsquo;s EZ
      </h2>
      <div className="mx-auto grid max-w-[1400px] gap-px bg-edge sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            t: 'Thumbtack Top Pro',
            d: `5.0 stars from ${BUSINESS.reviewCount} verified reviews. 100% of them five stars.`,
          },
          {
            t: 'Background checked',
            d: `${BUSINESS.owner} is verified through Thumbtack's background check.`,
          },
          {
            t: 'Same crew, every time',
            d: `A team of ${BUSINESS.crewSize}, family owned. You always know who is showing up.`,
          },
          {
            t: 'Price before we load',
            d: 'Free estimates, confirmed on site. Nothing goes on the truck until you say yes.',
          },
        ].map((c, i) => (
          <Reveal key={c.t} delay={i * 70} className="bg-ink p-6 lg:p-8">
            <Check className="h-5 w-5 text-acid" />
            <h3 className="display mt-4 text-lg text-chrome">{c.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ash">{c.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function HowItWorks() {
  const steps = [
    {
      n: '01',
      t: 'Tell us what it is',
      d: 'Call, text a photo of the pile, or run the booking form. Thirty seconds and Eddy knows the job.',
    },
    {
      n: '02',
      t: 'Get a price, free',
      d: 'A number up front, confirmed on site before anything is touched. It expands only if you ask it to.',
    },
    {
      n: '03',
      t: 'We do the carrying',
      d: 'Basement, attic, third floor, back of the shed. Loaded, hauled, disposed of, floor swept.',
    },
  ]
  return (
    <section className="relative border-b border-edge bg-coal py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <Reveal>
          <Eyebrow n="01">How it works</Eyebrow>
          <h2 className="display mt-5 max-w-2xl text-4xl text-chrome sm:text-5xl lg:text-6xl">
            Three steps. No dumpster in your driveway for a month.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-edge lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="relative bg-coal p-7 lg:p-9">
              <span className="display text-6xl text-iron lg:text-7xl">{s.n}</span>
              <h3 className="display mt-5 text-2xl text-chrome">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{s.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <BtnLink href="/book" size="lg">
              Start a booking
              <Arrow className="h-4 w-4" />
            </BtnLink>
            <p className="text-sm text-ash">
              Or just call{' '}
              <a href={BUSINESS.phoneHref} className="font-semibold text-acid underline underline-offset-4">
                {BUSINESS.phone}
              </a>{' '}
              — Eddy answers his own phone.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Transformations() {
  const [first, ...rest] = BEFORE_AFTER
  return (
    <section className="border-b border-edge bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <Reveal>
          <Eyebrow n="02">Real jobs, real photos</Eyebrow>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="display max-w-2xl text-4xl text-chrome sm:text-5xl lg:text-6xl">
              Drag the handle. Same room, same day.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ash">
              Every photo on this site is Eddy&rsquo;s own, shot on the job. Nothing is stock and
              nothing is staged.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <BeforeAfter before={first.before} after={first.after} label={first.where} priority />
            <div className="mt-4">
              <h3 className="display text-xl text-chrome">{first.title}</h3>
              <p className="mt-1.5 text-sm text-ash">{first.note}</p>
            </div>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
            {rest.slice(0, 2).map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <div className="flex flex-col gap-4 sm:flex-col lg:flex-row lg:items-center">
                  <div className="lg:w-1/2">
                    <BeforeAfter before={p.before} after={p.after} />
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className="display text-xl text-chrome">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-ash">{p.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={100}>
          <Link
            href="/work"
            className="mt-12 inline-flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-tight text-acid transition-colors hover:text-acid-bright"
          >
            See all {PHOTOS.length} job photos
            <Arrow className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Services() {
  return (
    <section className="border-b border-edge bg-coal py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <Reveal>
          <Eyebrow n="03">What we haul</Eyebrow>
          <h2 className="display mt-5 max-w-3xl text-4xl text-chrome sm:text-5xl lg:text-6xl">
            If it fits on the trailer, it goes on the trailer.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 70}>
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden bg-coal transition-colors hover:bg-steel"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={src(s.hero)}
                    alt={photo(s.hero).alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-coal via-coal/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <SvcIcon name={s.icon} className="h-7 w-7 text-acid" />
                  <h3 className="display mt-4 text-xl text-chrome">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ash">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-widest text-slate transition-colors group-hover:text-acid">
                    See the details
                    <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Reviews() {
  const featured = REVIEWS.filter((r) => r.featured)
  return (
    <section className="relative border-b border-edge bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <Reveal>
          <Eyebrow n="04">What customers say</Eyebrow>
          <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="display max-w-2xl text-4xl text-chrome sm:text-5xl lg:text-6xl">
              Twenty-five reviews. Every one of them five stars.
            </h2>
            <div className="shrink-0">
              <div className="flex items-center gap-3">
                <span className="display text-6xl text-acid">5.0</span>
                <div>
                  <span className="flex text-acid">
                    <Stars size={16} />
                  </span>
                  <p className="mt-1 text-xs text-ash">
                    {BUSINESS.reviewCount} verified reviews
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate">
                Rated highest for {RATED_HIGHLY_FOR.join(', ').toLowerCase()}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px bg-edge md:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 3).map((r, i) => (
            <Reveal key={r.author} delay={i * 80} className="flex flex-col bg-ink p-7">
              <span className="flex text-acid">
                <Stars size={13} />
              </span>
              <blockquote className="mt-5 flex-1">
                <p className="text-lg leading-snug font-medium text-chrome">
                  &ldquo;{r.pull}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-6 border-t border-edge pt-4">
                <p className="font-display text-sm font-extrabold uppercase tracking-tight text-chrome">
                  {r.author}
                </p>
                <p className="mt-1 text-xs text-slate">
                  {r.job} · {r.date}
                </p>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-tight text-acid transition-colors hover:text-acid-bright"
            >
              Read the full reviews
              <Arrow className="h-4 w-4" />
            </Link>
            <a
              href={BUSINESS.links.thumbtack}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ash underline underline-offset-4 hover:text-chrome"
            >
              Verify on Thumbtack
            </a>
            <a
              href={BUSINESS.links.google}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ash underline underline-offset-4 hover:text-chrome"
            >
              Find us on Google
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Area() {
  return (
    <section className="border-b border-edge bg-coal py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow n="05">Where we work</Eyebrow>
            <h2 className="display mt-5 text-4xl text-chrome sm:text-5xl">
              Based in Luray. Working the whole valley.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ash">
              The shop is on Baker Drive in Luray, so Page County gets the fastest turnaround we
              offer. From there we run north to Front Royal and Woodstock, west over the mountain to
              New Market, and south to Harrisonburg and Elkton.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ash">
              Outside the list? Call anyway. If the job is big enough, we travel.
            </p>
            <div className="mt-8">
              <BtnLink href="/service-area" variant="outline">
                See every town we cover
                <Arrow className="h-4 w-4" />
              </BtnLink>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul className="grid gap-px bg-edge sm:grid-cols-2">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-area/${c.slug}`}
                    className="group flex items-baseline justify-between gap-3 bg-coal p-5 transition-colors hover:bg-steel"
                  >
                    <span>
                      <span className="display block text-xl text-chrome transition-colors group-hover:text-acid">
                        {c.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate">{c.county}</span>
                    </span>
                    <span className="shrink-0 text-[0.6875rem] font-bold uppercase tracking-widest text-acid">
                      {c.drive}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Rig() {
  const strip = [
    'rig-loaded-commercial',
    'trailer-branded-driveway',
    'truck-bed-loaded-furniture',
    'truck-trailer-night-lot',
    'card-dusk',
    'truck-at-transfer-station',
  ]
  return (
    <section className="border-b border-edge bg-ink py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow n="06">The rig</Eyebrow>
              <h2 className="display mt-5 max-w-xl text-4xl text-chrome sm:text-5xl">
                One Ram 2500, one dump trailer, and a crew that shows up.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ash">
              The trailer goes on grass and gravel, which means we bring it to the pile instead of
              asking you to bag it and drag it to the road.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div className="no-bar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6">
          {strip.map((n) => {
            const p = photo(n)
            return (
              <figure
                key={n}
                className="relative aspect-3/4 w-[70vw] shrink-0 snap-start overflow-hidden border border-edge sm:w-[38vw] lg:w-[23vw]"
              >
                <Image
                  src={src(n)}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 38vw, 70vw"
                  className="object-cover"
                />
              </figure>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-coal">
      <Image
        src={src('yard-cleared-wide')}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-linear-to-t from-coal via-coal/85 to-coal/60" />
      <HazardRule />
      <div className="relative mx-auto max-w-[1400px] px-4 py-20 text-center sm:px-6 lg:py-28">
        <Reveal>
          <h2 className="display mx-auto max-w-3xl text-[2.75rem] leading-[0.9] sm:text-6xl lg:text-7xl">
            <span className="chrome-text">Get your </span>
            <span className="text-acid">garage back</span>
            <span className="chrome-text"> this week.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-ash">
            Free estimates, seven days a week, 6am to 11pm. Same-day and next-day pickups are normal
            around here.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <BtnLink href="/book" size="lg">
              Book a pickup
              <Arrow className="h-4 w-4" />
            </BtnLink>
            <BtnLink href={BUSINESS.phoneHref} variant="chrome" size="lg">
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </BtnLink>
          </div>
          <p className="mt-8 text-xs tracking-[0.2em] text-slate uppercase">
            {BUSINESS.tagline}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
