import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES, BUSINESS } from '@/lib/business'
import { photo, src } from '@/lib/photos'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CtaStrip from '@/components/CtaStrip'
import { BtnLink, SvcIcon, Arrow, Check, Phone } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Junk removal, light demolition, construction debris, car hauling, estate and storage cleanouts, appliance removal and yard cleanup across Luray and the Shenandoah Valley.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we haul"
        title="Eight kinds of job."
        accent="One phone number."
        sub="Most of it is the same story — something heavy is in the way and nobody wants to touch it. Here is what that looks like in practice, and what each job actually includes."
        image="rig-loaded-commercial"
        crumbs={[{ href: '/services', label: 'Services' }]}
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

      <section className="bg-ink py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="grid gap-px bg-edge">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 60}>
                <article className="group grid gap-0 bg-ink lg:grid-cols-[minmax(0,26rem)_1fr]">
                  <Link
                    href={`/services/${s.slug}`}
                    className="relative aspect-16/10 overflow-hidden lg:aspect-auto lg:min-h-[19rem]"
                  >
                    <Image
                      src={src(s.hero)}
                      alt={photo(s.hero).alt}
                      fill
                      sizes="(min-width: 1024px) 26rem, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-ink/70 lg:to-ink" />
                  </Link>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-3">
                      <SvcIcon name={s.icon} className="h-6 w-6 text-acid" />
                      <span className="eyebrow text-slate">{s.short}</span>
                    </div>

                    <h2 className="display mt-4 text-3xl text-chrome sm:text-4xl">
                      <Link href={`/services/${s.slug}`} className="transition-colors hover:text-acid">
                        {s.name}
                      </Link>
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash">{s.blurb}</p>

                    <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                      {s.takes.map((t) => (
                        <li key={t} className="flex gap-2 text-[0.8125rem] text-ash">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-acid-deep" />
                          {t}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${s.slug}`}
                      className="mt-7 inline-flex w-fit items-center gap-2 font-display text-[0.8125rem] font-extrabold uppercase tracking-tight text-acid transition-colors hover:text-acid-bright"
                    >
                      {s.name} details
                      <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  )
}
