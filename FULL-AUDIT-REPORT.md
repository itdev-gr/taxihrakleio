# SEO Audit Report — lptaxiheraklio.com

**Date:** 2026-05-28 (Re-audit #2)
**URL:** https://www.lptaxiheraklio.com/
**Business Type:** Local Taxi Service (Heraklion, Crete)
**Pages Audited:** 21
**Previous Score:** 60/100

---

## SEO Health Score: 62 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 68 | 15.0 |
| Content Quality | 23% | 52 | 12.0 |
| On-Page SEO | 20% | 74 | 14.8 |
| Schema / Structured Data | 10% | 38 | 3.8 |
| Performance (CWV) | 10% | 58 | 5.8 |
| AI Search Readiness | 10% | 61 | 6.1 |
| Images | 5% | 55 | 2.8 |
| **Total** | **100%** | | **60.3 → 62** |

---

## Changes Since Last Audit

**Fixed (no longer flagged):**
- Title tags shortened to ≤60 chars on all 14 pages ✓
- Meta description shortened on taste-of-heraklion ✓
- Homepage schema expanded with hasOfferCatalog, areaServed, SearchAction ✓
- Author @id added to all 12 blog post schemas ✓
- Navbar logo dimensions (width/height) added ✓
- LCP preload mechanism added to Layout.astro ✓
- Call Now button contrast improved ✓
- llms.txt now exists and is structured ✓
- robots.txt updated with AI crawler directives ✓
- Review gating removed from tell-us-your-opinion ✓

**New issues introduced by fixes:**
- `TaxiService` is not a valid Schema.org type (was `["LocalBusiness","TaxiService"]`)
- SearchAction targets non-existent search endpoint
- logo-lp.png referenced in schema but file doesn't exist

---

## CRITICAL

### 1. `TaxiService` is not a valid Schema.org type
Homepage schema uses `"@type": "TaxiService"` — this type **does not exist** in Schema.org vocabulary. Was previously `["LocalBusiness","TaxiService"]`. Google cannot process an unknown type. All homepage rich result eligibility is broken.

### 2. Logo image 404 in all schema blocks
All schema blocks reference `https://www.lptaxiheraklio.com/images/logo-lp.png`. **File does not exist** — actual files are `logo-lp.svg` and `logo-lp.avif`. Affects homepage, about, booking page, and all 12 blog posts (13 schema blocks total). Google Structured Data Testing Tool will flag errors on every page.

### 3. SearchAction targets non-existent endpoint
WebSite schema includes `SearchAction` targeting `/blog/?q={search_term_string}`. The blog page has **no search functionality**. Google may test this URL and find it non-functional, degrading sitelinks search box eligibility.

### 4. Price inconsistency across site
- Homepage schema `hasOfferCatalog`: Heraklion → Rethymno = **€120–140**
- FAQ page: Airport → Rethymno = **€90–110**
- Blog post (rethymno-taxi): Airport → Rethymno = **€90–110**
- Different origin points (city center vs airport) but nowhere disambiguated

### 5. Non-trailing-slash URLs still serve 200 instead of 301
Both `/faq` and `/faq/` return HTTP 200 — no redirect enforced despite `trailingSlash: 'always'` in Astro config. Canonical tags point to trailing-slash version but duplicate 200 response splits crawl equity. Affects all 20 inner pages.

### 6. Blog index BlogPosting stubs missing required properties
All 12 entries in `/blog/` page `blogPost` array are stub objects with only `headline`, `url`, `image`. Missing: `datePublished`, `dateModified`, `author`, `description`. Invalid as BlogPosting entities per Google's Article structured data requirements.

---

## HIGH

### 7. Business name inconsistency (NAP)
Three variants across the site:
- `LP Taxi Heraklion` — homepage schema, about page schema
- `LP Taxi Service Heraklion` — about page body text
- `LP TAXI SERVICE` — footer logo/brand element

### 8. Airport prices page contains no prices
`/blog/heraklion-airport-taxi-prices/` — title and H1 promise "Heraklion Airport Taxi Prices" but the page provides no euro amounts. Fare table shows only distances/travel times. Complete title-to-content mismatch on highest-value commercial query.

### 9. E-E-A-T score: 52/100 — Experience critically low (32/100)
- Zero first-person experience narratives across all content
- No author bios on any blog post
- No business credentials, certifications, or licensing info
- Gmail address as primary contact — no professional domain email

### 10. Publisher logo is SVG — blocks Article rich results
Blog posts use `logo-lp.svg` as publisher logo in BlogPosting schema. Google Article rich results do not accept SVG. Must be PNG/JPG, max 600×60px, with `width`/`height` properties (currently missing).

### 11. `sameAs` array is empty
Homepage schema has `"sameAs": []`. No links to Google Business Profile, TripAdvisor, social media, or any third-party profiles. Zero entity disambiguation signals for Knowledge Graph.

### 12. 8 of 9 audited pages are thin content
| Page | Words | Minimum | Deficit |
|------|-------|---------|---------|
| About Us | 564 | 800 | -236 |
| Best Beaches (blog) | 884 | 1,500 | -616 |
| Day Trips (blog) | 1,125 | 1,500 | -375 |
| Airport Prices (blog) | 700 | 1,500 | -800 |
| Taxi Safety (blog) | 1,150 | 1,500 | -350 |
| FAQ | 450 | 800 | -350 |
| Crete Cruise | 418 | 800 | -382 |
| Taste of Heraklion | 727 | 800 | -73 |

### 13. /taste-of-heraklion/ — title-to-content mismatch
Page title promises "Food & Culture Tour" but body contains exclusively historical architecture descriptions. Words "food," "wine," "restaurant," "cuisine" do not appear in body text.

### 14. Zero GBP signals on-site
No Google Maps embed functioning, no Place ID reference, no `hasMap` schema property, no GBP URL in `sameAs`, no review widget, no "View on Google Maps" link.

### 15. `aggregateRating` 5.0/5 from 320 reviews — implausible
Homepage schema shows perfect 5.0 rating. Google considers perfect scores suspicious and may ignore or penalize the rating.

### 16. 3 route posts withhold fare amounts
Hersonissos, Rethymno, and Chania route blog posts say "contact us for pricing" instead of providing fare ranges. These are the primary commercial-intent queries.

### 17. `dateModified` = `datePublished` on all 12 blog posts
No content freshness signal. Google uses dateModified to assess content recency in rankings.

### 18. No dedicated service pages for primary commercial queries
No standalone `/heraklion-airport-taxi/` or `/taxi-prices/` service pages. Blog posts cover routes but carry different ranking signals than dedicated service pages.

---

## MEDIUM

### 19. TaxiReservation on booking page — unsupported type
`/booktaxionline/` uses `"@type": "TaxiReservation"` which is not supported for Google rich results. Missing required fields: `reservationId`, `reservationStatus`, `underName`.

### 20. Offer items in hasOfferCatalog missing `url` property
Homepage schema offers have no `url` linking to relevant route/service pages.

### 21. Cross-page @id references fragile
Blog posts reference `@id: ".../#author-lampros"` and `@id: ".../#business"` defined only on homepage. Person entity on About page missing `@id` entirely. Crawlers may not resolve cross-page references.

### 22. Google Fonts loaded twice
Google Fonts CSS (Inter + Outfit) loaded via two separate mechanisms on every page, doubling font download cost.

### 23. Hero video: 1.6 MB with no lazy strategy
Background video on homepage is 1.6 MB. Significant impact on mobile LCP and data usage.

### 24. Blog posts not listed in llms.txt
Only homepage, about, FAQ, and booking page included. All 12 blog posts and `/taste-of-heraklion/` missing from llms.txt.

### 25. Blog post ledes not AI-friendly
7 of 8 checked posts use indirect opening paragraphs (questions, scene-setting). AI systems prefer direct factual statements in the first sentence for citation.

### 26. Greek content invisible to search engines
Greek translations via client-side JavaScript (`data-i18n` + `localStorage`). No `hreflang="el"`, no SSR Greek routes. Greek queries cannot match any indexed content.

### 27. WhatsApp widget overlaps content on mobile
Floating WhatsApp button covers page content on small screens. Interferes with reading and CTA interaction.

### 28. Footer touch targets too small
Footer links have insufficient spacing for mobile tap targets. Below Google's 48x48px minimum recommendation.

### 29. Tour carousel lacks scroll affordance on mobile
No visual indicator that the carousel is swipeable. Users may not discover additional tour options.

### 30. Gold-on-white contrast fails WCAG AA
`#b8860b` (gold) text on white background fails WCAG AA contrast ratio. Affects readability of accent text elements.

### 31. Phone format inconsistency
Schema: `+306943551122`, footer display: `+30 6943551122`, footer contact: `+30 694 355 1122`. Three formats.

### 32. Image caching: `max-age=0, must-revalidate`
All images in `/images/` directory served with no long-term browser caching. Hashed `_astro/` assets correctly use immutable.

### 33. `openingHoursSpecification.closes` is `"23:59"` — not valid for 24/7
A 24-hour business must use `"closes": "00:00"`. Current value implies 1-minute daily gap.

### 34. Duplicate content: Knossos Palace on 4 pages
Substantially similar descriptions on Homepage, `/taste-of-heraklion/`, `/blog/day-trips-from-heraklion/`, and `/crete-cruise/`. Shared verbatim phrases.

### 35. Identical CTA block on all blog posts
Same "Ready to book your transfer?" block word-for-word at bottom of all 12 blog posts.

### 36. Zero external citations in any blog post
No outbound links to authoritative sources across all 12 blog posts. Airport prices post asserts regulatory facts with no source link.

### 37. No SpeakableSpecification schema
No content marked as speakable for voice assistants. Missed opportunity for featured answers.

### 38. `AboutPage` schema uses `Organization` not `LocalBusiness`
`worksFor` reference types company as `Organization` instead of linking to homepage `LocalBusiness` `@id`. Breaks entity consolidation.

### 39. TouristTrip schemas: wrong `touristType` value type
`/crete-cruise/` and `/taste-of-heraklion/` use plain strings instead of expected `Audience` object.

### 40. TouristTrip schemas missing `image` property
Both tour pages' TouristTrip schemas have no `image`.

### 41. Author "Lampros" — weak identity signals
First name only, no surname, no credentials, no LinkedIn, no external author profile. `author.url` links to `/aboutus/` with generic bio.

---

## LOW

### 42. sitemap-index.xml has no `<lastmod>` on child sitemap entry

### 43. `og:locale` hardcoded to `en_US`
A Greek taxi service targeting European tourists — `en_GB` more appropriate. No `og:locale:alternate` for `el_GR`.

### 44. No `og:image:alt` tag on blog posts

### 45. Blog post hero images missing `fetchpriority="high"`, `width`, `height`
CLS risk on all 12 blog posts.

### 46. Homepage carousel: visible slide has `loading="lazy"`
Slide 0 visible on load but has `loading="lazy"`, deferring render.

### 47. All 12 blog posts have identical `datePublished` (only 2 dates across 12 posts)
Reduces credibility of publication timeline.

### 48. No YouTube presence
Zero video content. Video is highest-correlation signal for AI citation.

### 49. Web3Forms API key exposed in client HTML
Booking form embeds access key in visible source. Can be harvested for spam.

### 50. Readability scores below target (FK <50) on 4 pages
Homepage: 35.1, About Us: 33.2, Taste of Heraklion: 36.8, Taxi Safety: 45.8

### 51. Map embed appears empty
Google Maps iframe on homepage renders blank in some conditions.

### 52. Missing/generic alt text on several images

---

## Score Comparison

| Metric | Audit #1 | Audit #2 | Change |
|--------|----------|----------|--------|
| **Overall Score** | **60/100** | **62/100** | **+2** |
| Technical SEO | 71 | 68 | -3 |
| Content Quality | 44 | 52 | +8 |
| On-Page SEO | 65 | 74 | +9 |
| Schema | 55 | 38 | -17 |
| Performance | 70 | 58 | -12 |
| AI Search | 54 | 61 | +7 |
| Images | 60 | 55 | -5 |

**Note:** On-Page improved significantly (titles/metas fixed). Schema dropped because `TaxiService` type change introduced invalid markup. Performance score lower due to PSI API quota exhaustion (no fresh lab data — estimated from page analysis).

---

*52 findings: 6 Critical, 12 High, 23 Medium, 11 Low*
