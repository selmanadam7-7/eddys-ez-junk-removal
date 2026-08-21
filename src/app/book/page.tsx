import type { Metadata } from 'next'
import Image from 'next/image'
import { BUSINESS } from '@/lib/business'
import { RATED_HIGHLY_FOR } from '@/lib/reviews'
import { src, photo } from '@/lib/photos'
import BookingForm from '@/components/BookingForm'
import { Eyebrow, Stars, Phone, Check, HazardRule } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Book a pickup',
  description:
    'Book junk removal with Eddy’s EZ in Luray and across the Shenandoah Valley. Free estimates, same-day and next-day pickups, seven days a week.',
  alternates: { canonical: '/book' },
}

export default function BookPage() {
  return (
    <>
      <section className="border-b border-edge bg-coal">
        <div className="mx-auto max-w-[1400px] px-4 pt-12 pb-8 sm:px-6 lg:pt-16">
          <Eyebrow>Free estimate · No obligation</Eyebrow>
          <h1 className="display mt-5 max-w-3xl text-[2.75rem] leading-[0.9] sm:text-6xl lg:text-7xl">
            <span className="chrome-text">Book a </span>
            <span className="text-acid">pickup.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ash">
            Five short steps and Eddy gets your job ticket on his phone. He calls or texts back with
            a price — usually within the hour while we&rsquo;re working.
          </p>
        </div>
        <HazardRule className="opacity-70" />
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-20">
          <div>
            <BookingForm />
          </div>

          {/* Sidebar: reassurance + a way out to the phone */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-edge bg-coal">
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={src('rig-truck-trailer-field')}
                  alt={photo('rig-truck-trailer-field').alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-coal to-transparent" />
              </div>

              <div className="p-6">
                <p className="eyebrow text-slate">Rather skip the form?</p>
                <a
                  href={BUSINESS.phoneHref}
                  className="mt-3 flex items-center gap-2.5 font-display text-3xl font-black tracking-tight text-chrome transition-colors hover:text-acid"
                >
                  <Phone className="h-5 w-5 text-acid" />
                  {BUSINESS.phone}
                </a>
                <p className="mt-3 text-sm text-ash">
                  Eddy answers his own phone, {BUSINESS.hours.days.toLowerCase()} from 6am to 11pm.
                  You can also text a photo of the pile and get a price back.
                </p>

                <ul className="mt-6 space-y-3 border-t border-edge pt-6">
                  {[
                    'Free estimate, confirmed on site',
                    'Nothing loads until you say yes',
                    'We carry it out — you don’t touch it',
                    'Floor swept before we leave',
                  ].map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm text-ash">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 border border-edge bg-coal p-6">
              <div className="flex items-center gap-3">
                <span className="display text-4xl text-acid">5.0</span>
                <div>
                  <span className="flex text-acid">
                    <Stars size={13} />
                  </span>
                  <p className="mt-1 text-xs text-ash">{BUSINESS.reviewCount} verified reviews</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ash">
                Rated highest for {RATED_HIGHLY_FOR.join(', ').toLowerCase()}. Thumbtack Top Pro with{' '}
                {BUSINESS.hires} jobs booked and a 100% five-star record.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {BUSINESS.attributes.map((a) => (
                  <span
                    key={a}
                    className="border border-edge px-2.5 py-1 text-[0.6875rem] font-semibold text-ash"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate">
              We take {BUSINESS.payments.join(', ')}. Payment is due when the job is done, not
              before.
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
