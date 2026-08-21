import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESS, CITIES } from '@/lib/business'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { BtnLink, Arrow, Phone, Stars } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Call or text Eddy's EZ Junk Removal at ${BUSINESS.phone}. Open every day, 6am to 11pm. ${BUSINESS.address}.`,
  alternates: { canonical: '/contact' },
}

const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.address)}&z=13&ie=UTF8&iwloc=&output=embed`

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Open every day, 6am–11pm"
        title="Call. Text a photo."
        accent="Get a price."
        sub="Eddy answers his own phone. If he is under a couch when you call, leave a message or send a picture of the pile and he will come straight back to you."
        image="truck-trailer-night-lot"
        crumbs={[{ href: '/contact', label: 'Contact' }]}
      />

      <section className="border-b border-edge bg-ink py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="border border-edge bg-coal p-7 sm:p-9">
              <p className="eyebrow text-slate">Call or text</p>
              <a
                href={BUSINESS.phoneHref}
                className="mt-4 flex items-center gap-3 font-display text-4xl font-black tracking-tight text-chrome transition-colors hover:text-acid sm:text-5xl"
              >
                <Phone className="h-7 w-7 shrink-0 text-acid" />
                {BUSINESS.phone}
              </a>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <BtnLink href={BUSINESS.phoneHref} size="lg" className="flex-1">
                  Call now
                </BtnLink>
                <BtnLink href={BUSINESS.smsHref} variant="outline" size="lg" className="flex-1">
                  Send a text
                </BtnLink>
              </div>

              <dl className="mt-9 divide-y divide-edge border-y border-edge">
                {[
                  ['Hours', `${BUSINESS.hours.days}, 6:00 AM – 11:00 PM`],
                  ['Shop', BUSINESS.address],
                  ['Plus code', BUSINESS.plusCode],
                  ['Owner', BUSINESS.owner],
                  ['Payment', BUSINESS.payments.join(', ')],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-widest text-slate">
                      {k}
                    </dt>
                    <dd className="text-sm text-chrome">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7">
                <p className="eyebrow mb-3 text-slate">Find us online</p>
                <div className="flex flex-wrap gap-3">
                  <BtnLink href={BUSINESS.links.google} variant="outline" size="sm">
                    Google Business listing
                  </BtnLink>
                  <BtnLink href={BUSINESS.links.thumbtack} variant="outline" size="sm">
                    Thumbtack Top Pro profile
                  </BtnLink>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate">
                  Eddy&rsquo;s EZ doesn&rsquo;t run social accounts — the work goes on Google and
                  Thumbtack instead, where every review is tied to a verified hire.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-edge bg-coal p-7 sm:p-9">
              <h2 className="display text-2xl text-chrome sm:text-3xl">
                Booking online beats phone tag
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ash">
                Five short questions and Eddy gets the whole job on his phone at once — what it is,
                how much, where, and when. Most people hear back within the hour.
              </p>
              <BtnLink href="/book" size="lg" className="mt-6">
                Book a pickup
                <Arrow className="h-4 w-4" />
              </BtnLink>

              <div className="mt-8 flex items-center gap-3 border-t border-edge pt-6">
                <span className="display text-4xl text-acid">5.0</span>
                <div>
                  <span className="flex text-acid">
                    <Stars size={13} />
                  </span>
                  <p className="mt-1 text-xs text-ash">
                    {BUSINESS.reviewCount} verified reviews ·{' '}
                    <Link href="/reviews" className="underline underline-offset-2 hover:text-acid">
                      read them
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden border border-edge">
              <iframe
                src={mapEmbed}
                title={`Map showing ${BUSINESS.name} in ${BUSINESS.city}, Virginia`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-80 w-full"
                style={{
                  // Flips Google's light map into the site's dark palette
                  // without losing road or label legibility.
                  filter: 'invert(0.92) hue-rotate(180deg) saturate(0.65) contrast(0.92)',
                }}
              />
            </div>

            <div className="mt-6 border border-edge bg-coal p-6">
              <p className="eyebrow mb-3 text-slate">Towns we cover</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
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
    </>
  )
}
