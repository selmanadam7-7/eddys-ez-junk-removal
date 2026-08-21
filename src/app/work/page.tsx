import type { Metadata } from 'next'
import { BUSINESS } from '@/lib/business'
import { PHOTOS, BEFORE_AFTER } from '@/lib/photos'
import PageHero from '@/components/PageHero'
import Gallery from '@/components/Gallery'
import BeforeAfter from '@/components/BeforeAfter'
import Reveal from '@/components/Reveal'
import CtaStrip from '@/components/CtaStrip'
import { BtnLink, Arrow, Phone, Eyebrow } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Our work',
  description: `${PHOTOS.length} photos from real junk removal, demolition and cleanout jobs across Luray and the Shenandoah Valley — including before-and-after shots of the same rooms.`,
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Every photo is ours"
        title={`${PHOTOS.length} photos.`}
        accent="Zero stock."
        sub="Shot on the job by the crew, in basements and garages and back yards around Page County and the valley. Some are mid-carry and some are the swept floor at the end."
        image="truck-loaded-brick-house"
        crumbs={[{ href: '/work', label: 'Our work' }]}
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

      {/* Before / after */}
      <section className="border-b border-edge bg-coal py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Eyebrow>Same room, same day</Eyebrow>
            <h2 className="display mt-5 max-w-2xl text-3xl text-chrome sm:text-4xl lg:text-5xl">
              Drag the handle across.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash">
              Four jobs where the crew shot the same angle at the start and the end. Nothing between
              those two photos except a few hours of carrying.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {BEFORE_AFTER.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 80}>
                <BeforeAfter before={p.before} after={p.after} label={p.where} priority={i < 2} />
                <div className="mt-4">
                  <h3 className="display text-xl text-chrome">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ash">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full gallery */}
      <section className="bg-ink py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <Eyebrow>The whole roll</Eyebrow>
            <h2 className="display mt-5 text-3xl text-chrome sm:text-4xl lg:text-5xl">
              Filter it however you like.
            </h2>
          </Reveal>

          <div className="mt-10">
            <Gallery />
          </div>
        </div>
      </section>

      <CtaStrip
        title="Your room could be in here next week."
        body={`Free estimate, no obligation. Call ${BUSINESS.phone} or send a photo of the pile and get a price back.`}
      />
    </>
  )
}
