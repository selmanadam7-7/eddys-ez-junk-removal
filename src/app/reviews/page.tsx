import type { Metadata } from 'next'
import { BUSINESS, SITE_URL } from '@/lib/business'
import { REVIEWS, RATED_HIGHLY_FOR, REVIEW_KEYWORDS } from '@/lib/reviews'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import CtaStrip from '@/components/CtaStrip'
import { BtnLink, Arrow, Stars } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Reviews',
  description: `Eddy's EZ Junk Removal has a 5.0 rating from ${BUSINESS.reviewCount} verified reviews — 100% five stars. Read them in full.`,
  alternates: { canonical: '/reviews' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS.name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BUSINESS.rating,
    reviewCount: BUSINESS.reviewCount,
    bestRating: 5,
  },
  review: REVIEWS.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    datePublished: r.date,
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.body,
  })),
}

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        eyebrow="Verified customer reviews"
        title={`${BUSINESS.reviewCount} reviews.`}
        accent="All five stars."
        sub="Every review below is verbatim from a customer who hired Eddy through Thumbtack. Nothing is edited, and you can verify all of them on the profile."
        image="yard-cleared-wide"
        crumbs={[{ href: '/reviews', label: 'Reviews' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BtnLink href={BUSINESS.links.thumbtack} variant="outline" size="lg">
            Verify on Thumbtack
            <Arrow className="h-4 w-4" />
          </BtnLink>
          <BtnLink href={BUSINESS.links.google} variant="outline" size="lg">
            Find us on Google
            <Arrow className="h-4 w-4" />
          </BtnLink>
        </div>
      </PageHero>

      {/* Rating summary */}
      <section className="border-b border-edge bg-ink">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-edge lg:grid-cols-3">
          <div className="bg-ink p-8 lg:p-10">
            <div className="flex items-end gap-4">
              <span className="display text-7xl text-acid">5.0</span>
              <div className="pb-2">
                <span className="flex text-acid">
                  <Stars size={16} />
                </span>
                <p className="mt-1.5 text-xs text-ash">
                  {BUSINESS.reviewCount} reviews · {BUSINESS.hires} jobs booked
                </p>
              </div>
            </div>
            <ul className="mt-7 space-y-2">
              {[5, 4, 3, 2, 1].map((n) => (
                <li key={n} className="flex items-center gap-3">
                  <span className="w-3 text-xs text-slate">{n}</span>
                  <span className="h-1.5 flex-1 bg-iron">
                    <span
                      className="block h-full bg-acid"
                      style={{ width: n === 5 ? '100%' : '0%' }}
                    />
                  </span>
                  <span className="w-9 text-right text-xs text-slate">
                    {n === 5 ? '100%' : '0%'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ink p-8 lg:p-10">
            <h2 className="eyebrow text-slate">Rated highest for</h2>
            <ul className="mt-5 space-y-3">
              {RATED_HIGHLY_FOR.map((t) => (
                <li key={t} className="display text-2xl text-chrome">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-slate">
              Thumbtack calculates these from the ratings customers give on individual categories
              after a job.
            </p>
          </div>

          <div className="bg-ink p-8 lg:p-10">
            <h2 className="eyebrow text-slate">Words customers use</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {REVIEW_KEYWORDS.map((k) => (
                <li
                  key={k.word}
                  className="border border-edge px-3 py-1.5 text-sm text-ash"
                  style={{ fontSize: `${0.8 + k.count / 22}rem` }}
                >
                  {k.word}
                  <span className="ml-1.5 text-[0.625rem] text-acid">{k.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Full reviews */}
      <section className="bg-coal py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <h2 className="display text-3xl text-chrome sm:text-4xl">In their own words</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.author} delay={(i % 2) * 70}>
                <article className="flex h-full flex-col border border-edge bg-ink p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-lg font-extrabold uppercase tracking-tight text-chrome">
                        {r.author}
                      </p>
                      <p className="mt-1 text-xs text-slate">
                        {r.job} · {r.date}
                      </p>
                    </div>
                    <span className="flex shrink-0 text-acid">
                      <Stars size={13} />
                    </span>
                  </div>

                  <blockquote className="mt-6 flex-1 space-y-4">
                    {r.body.split('\n\n').map((para, j) => (
                      <p key={j} className="text-sm leading-relaxed text-ash">
                        {para}
                      </p>
                    ))}
                  </blockquote>

                  {r.details && (
                    <p className="mt-6 border-t border-edge pt-4 text-xs leading-relaxed text-slate">
                      {r.details}
                    </p>
                  )}

                  <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-widest text-acid-deep">
                    Hired on {r.source}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 border border-edge bg-ink p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-ash">
              These five are the full-length reviews from the profile. The other{' '}
              {BUSINESS.reviewCount - REVIEWS.length} are shorter — all five stars, all verified
              hires.{' '}
              <a
                href={BUSINESS.links.thumbtack}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-acid underline underline-offset-2"
              >
                Read every one on Thumbtack
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaStrip
        title="Add yours next."
        body={`Free estimate, seven days a week. Call ${BUSINESS.phone} or book online and Eddy will get right back to you.`}
      />
    </>
  )
}
