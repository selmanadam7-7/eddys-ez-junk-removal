# Eddy's EZ Junk Removal

Marketing site for **Eddy's EZ Junk Removal LLC** — a family-owned junk removal, light demolition and hauling company in Luray, Virginia, serving Page County and the Shenandoah Valley.

Next.js 16 (App Router) · Tailwind v4 · TypeScript · fully static.

## Running it

```bash
npm install && npm run dev -- --port 4479
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Static production build (30 prerendered pages) |
| `npm run lint` | ESLint |

## Where the content lives

Everything factual about the business is in three files. Change these, not the pages.

| File | Holds |
| --- | --- |
| `src/lib/business.ts` | Name, phone, address, hours, the 8 services, the 8 towns, load-size ladder |
| `src/lib/reviews.ts` | Verbatim customer reviews and rating breakdown |
| `src/lib/photos.ts` | Photo manifest with alt text, categories, and the verified before/after pairs |

`SITE_URL` in `business.ts` drives canonicals, OG tags, the sitemap and JSON-LD — set it to the real domain before launch.

## Content provenance

Every photo, review and business fact on this site came from the client's own public presence:

- **Photos** (`public/photos/`, 70 images) — the owner's uploads to their Google Business Profile and the 78-photo project gallery on their Thumbtack Top Pro page. No stock imagery.
- **Reviews** — verbatim from verified Thumbtack hires. Nothing rewritten or embellished.
- **Brand** — the black / chrome / acid-green palette and "Fast · Reliable · Affordable" line are taken from the company's own truck decal and business card.

Four before/after pairs in `photos.ts` were each confirmed to be the same space photographed at the start and end of one job.

## Booking

There is **no backend**. The five-step form in `src/components/BookingForm.tsx` builds a formatted job ticket and hands it to the customer's own messaging app as an `sms:` deep link to the business line, with tap-to-call and copy-to-clipboard fallbacks. Drafts persist in `localStorage` and are restored through an explicit "Resume" prompt.

To add a real backend later, replace the `submit()` handler with a POST and keep the SMS link as the fallback path.

## SEO

- `LocalBusiness` / `Service` / `FAQPage` / `Review` JSON-LD
- Generated `sitemap.xml` and `robots.txt`
- Per-page canonicals, Open Graph and Twitter cards
- Dedicated pages for all 8 services × 8 service-area towns

## Notes

- The client has no social media accounts. Google Business and Thumbtack are the only external profiles linked, and both are in `BUSINESS.links`.
- No prices are published anywhere on the site — the pricing page explains the volume model only. Add real figures to `LOAD_SIZES` if the client wants rates shown.
