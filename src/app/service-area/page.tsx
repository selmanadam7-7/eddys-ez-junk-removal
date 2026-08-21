import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CITIES, BUSINESS, SERVICES } from '@/lib/business'
import { src, photo } from '@/lib/photos'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CtaStrip from '@/components/CtaStrip'
import { BtnLink, Arrow, Phone, Eyebrow } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Service area',
  description:
    'Eddy’s EZ Junk Removal serves Luray, Front Royal, Harrisonburg, New Market, Shenandoah, Stanley, Elkton and Woodstock — Page County and the Shenandoah Valley.',
  alternates: { canonical: '/service-area' },
}

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Page County & the Shenandoah Valley"
        title="Based in Luray."
        accent="Working the whole valley."
        sub="The shop is on Baker Drive. From there we run north to Front Royal and Woodstock, west over the mountain to New Market, and south to Harrisonburg and Elkton — roughly a 45-minute radius."
        image="truck-road-shenandoah"
        crumbs={[{ href: '/service-area', label: 'Service area' }]}
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

      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Eyebrow>Towns we cover</Eyebrow>
            <h2 className="display mt-5 text-3xl text-chrome sm:text-4xl lg:text-5xl">
              Eight towns, one truck, one number.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-4">
            {CITIES.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 60}>
                <Link
                  href={`/service-area/${c.slug}`}
                  className="group flex h-full flex-col bg-ink p-6 transition-colors hover:bg-steel lg:p-7"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="display text-2xl text-chrome transition-colors group-hover:text-acid">
                      {c.name}
                    </span>
                    <span className="shrink-0 text-[0.6875rem] font-bold uppercase tracking-widest text-acid">
                      {c.drive}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs text-slate">{c.county}</span>
                  <span className="mt-4 flex-1 text-sm leading-relaxed text-ash">{c.note}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-widest text-slate transition-colors group-hover:text-acid">
                    Junk removal in {c.name}
                    <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-edge bg-coal py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 className="display text-3xl text-chrome sm:text-4xl">
              Not on the list? Call anyway.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ash">
              The list is where we go most weeks, not a fence. We have run jobs out toward
              Charlottesville and up into Northern Virginia when the work was worth the drive — one
              of our reviews is from a family moving a son out of Charlottesville on short notice.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ash">
              If you are outside Page County, tell us where you are and how big the job is. Eddy will
              tell you straight whether it makes sense.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BtnLink href={BUSINESS.phoneHref} size="lg">
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </BtnLink>
              <BtnLink href="/book" variant="outline" size="lg">
                Book a pickup
              </BtnLink>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <figure className="relative aspect-4/3 overflow-hidden border border-edge">
              <Image
                src={src('truck-trailer-hillside')}
                alt={photo('truck-trailer-hillside').alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-ink to-transparent p-4 text-xs text-ash">
                The dump trailer goes on grass and gravel, so we can back it right up to the pile.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-edge bg-ink py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <h2 className="eyebrow text-slate">What we do in every one of them</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="border border-edge px-3.5 py-2 text-[0.8125rem] font-medium text-ash transition-colors hover:border-acid hover:text-acid"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  )
}
