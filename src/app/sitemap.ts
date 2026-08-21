import type { MetadataRoute } from 'next'
import { SERVICES, CITIES, SITE_URL } from '@/lib/business'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-08-20')

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/book', priority: 0.95 },
    { path: '/services', priority: 0.9 },
    { path: '/work', priority: 0.8 },
    { path: '/reviews', priority: 0.8 },
    { path: '/pricing', priority: 0.8 },
    { path: '/service-area', priority: 0.8 },
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.7 },
  ]

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: r.priority,
    })),
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...CITIES.map((c) => ({
      url: `${SITE_URL}/service-area/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ]
}
