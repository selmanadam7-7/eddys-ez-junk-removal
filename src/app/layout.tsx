import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CallBar from '@/components/CallBar'
import { BUSINESS, SITE_URL, SERVICES, CITIES } from '@/lib/business'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eddy's EZ Junk Removal — Junk Removal in Luray & the Shenandoah Valley",
    template: "%s | Eddy's EZ Junk Removal",
  },
  description:
    'Family-owned junk removal, light demolition, construction debris and car hauling in Luray, Front Royal, Harrisonburg and across the Shenandoah Valley. 5.0 stars, 25 reviews, Thumbtack Top Pro. Free estimates — call (443) 623-4488.',
  keywords: [
    'junk removal Luray VA',
    'junk removal Shenandoah Valley',
    'Page County junk removal',
    'construction debris removal Luray',
    'estate cleanout Virginia',
    'appliance removal Front Royal',
    'light demolition Luray VA',
    'car hauling Luray',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: "Eddy's EZ Junk Removal — Luray & the Shenandoah Valley",
    description:
      'Point at it, it’s gone. Full-service junk removal and light demolition across the Shenandoah Valley. 5.0 stars from 25 reviews. Free estimates.',
    images: [{ url: '/photos/rig-truck-trailer-field.webp', width: 1800, height: 1350 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Eddy's EZ Junk Removal — Luray, VA",
    description: 'Full-service junk removal across the Shenandoah Valley. Free estimates.',
    images: ['/photos/rig-truck-trailer-field.webp'],
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#07080a',
  width: 'device-width',
  initialScale: 1,
}

const schema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS.name,
  alternateName: "Eddy's EZ Junk Removal",
  url: SITE_URL,
  telephone: '+1-443-623-4488',
  founder: { '@type': 'Person', name: BUSINESS.owner },
  image: `${SITE_URL}/photos/rig-truck-trailer-field.webp`,
  logo: `${SITE_URL}/photos/logo.webp`,
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: BUSINESS.payments.join(', '),
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.state,
    postalCode: BUSINESS.zip,
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.lat, longitude: BUSINESS.lng },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '06:00',
      closes: '23:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BUSINESS.rating,
    reviewCount: BUSINESS.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  areaServed: CITIES.map((c) => ({
    '@type': 'City',
    name: c.name,
    containedInPlace: { '@type': 'AdministrativeArea', name: `${c.county}, Virginia` },
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Junk removal and hauling services',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.short },
      url: `${SITE_URL}/services/${s.slug}`,
    })),
  },
  sameAs: [BUSINESS.links.google, BUSINESS.links.thumbtack],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <head>
        {/* Without JS the reveal blocks would stay invisible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-acid focus:px-4 focus:py-2 focus:text-ink focus:font-bold"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CallBar />
      </body>
    </html>
  )
}
