# SEO Audit Report — lptaxiheraklio.com

**Date:** 2026-05-28
**Pages:** 21 (9 service/info + 12 blog posts)
**Platform:** Astro (static) on Vercel
**Business:** LP Taxi Heraklion — taxi/transfer service, Heraklion, Crete

---

## SEO Health Score: 60 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 71 | 15.6 |
| Content Quality | 23% | 44 | 10.1 |
| On-Page SEO | 20% | 65 | 13.0 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance | 10% | 70 | 7.0 |
| AI Search Readiness | 10% | 54 | 5.4 |
| Images | 5% | 60 | 3.0 |
| **Total** | | | **59.6** |

---

## CRITICAL

### 1. Non-trailing-slash URLs serve 200 instead of 301
All internal links across every page (nav, footer, blog cards) use `/aboutus`, `/blog`, `/booktaxionline` etc. without trailing slashes. The server returns HTTP 200 on both `/aboutus` and `/aboutus/` — no redirect is enforced at the edge. Despite `trailingSlash: 'always'` in Astro config, the Vercel deployment serves both variants with 200 status. Canonical tags point to the trailing-slash version, but the duplicate 200 response splits PageRank and confuses crawlers.
**Affected:** All 20 inner pages.

### 2. noindex pages present in sitemap
`/privacy-policy/` and `/tell-us-your-opinion/` carry `<meta name="robots" content="noindex, follow">` but are listed in `sitemap-0.xml`. Conflicting signals: sitemap says "index this," meta tag says "don't."

### 3. Blog post `image` in BlogPosting schema is a plain URL string, not ImageObject
All 12 blog post schemas use:
```json
"image": "https://www.lptaxiheraklio.com/images/DSC_7943.jpg"
```
Google Article rich results require `ImageObject` with `url`, `width`, and `height`. Current format blocks rich result eligibility on all blog posts.

### 4. Blog index nested BlogPosting items missing required properties
All 12 entries in the `/blog/` page `blogPost` array are stub objects with only `headline`, `url`, and `image`. Missing: `datePublished`, `dateModified`, `author`, `description`. Invalid as BlogPosting entities.

### 5. Business name inconsistency (NAP)
Three distinct name variants across the site:
- `LP Taxi Heraklion` — homepage schema, about page schema
- `LP Taxi Service Heraklion` — about page body text
- `LP TAXI SERVICE` — footer logo/brand element

### 6. Airport prices page contains no prices
`/blog/heraklion-airport-taxi-prices/` — title and H1 promise "Heraklion Airport Taxi Prices" but the page provides no euro amounts anywhere. The fare table shows only distances and travel times. The word "euro" does not appear. Complete title-to-content mismatch on the highest-value commercial query.

---

## HIGH

### 7. non-www HTTPS redirect uses temporary 307 instead of 301/308
`https://lptaxiheraklio.com/` → 307 → `https://www.lptaxiheraklio.com/`. A 307 is temporary and does not consolidate PageRank. Should be 301 or 308.

### 8. Missing security response headers
Absent from all responses: `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, `Permissions-Policy`, `Referrer-Policy`. Only `Strict-Transport-Security` is present.

### 9. Homepage hero video `preload="none"` — no LCP image preload
The hero section uses a fullscreen `<video>` with `preload="none"`. No `<link rel="preload" as="image">` exists for any above-the-fold image. No `fetchpriority="high"` on any hero element. LCP on mobile at risk of exceeding 2.5s.

### 10. Publisher logo is SVG — blocks Article rich results
All blog posts use `logo-lp.svg` as the publisher logo in BlogPosting schema. Google Article rich results do not accept SVG. Must be PNG or JPG, max 600×60px, with `width` and `height` properties (currently missing).

### 11. `sameAs` array is empty
Homepage LocalBusiness schema has `"sameAs": []`. No links to Google Business Profile, TripAdvisor, social media, or any third-party profiles. Zero entity disambiguation signals for Knowledge Graph.

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
Page title, H1, and meta promise a culinary experience ("Taste of Heraklion," "culinary journey," "authentic flavors, ancient wineries"). The body contains exclusively historical architecture descriptions. The words "food," "wine," "restaurant," "cuisine," and "culinary" do not appear in body text.

### 14. Zero GBP signals on-site
No Google Maps embed, no Place ID reference, no `hasMap` schema property, no GBP URL in `sameAs`, no review widget, no "View on Google Maps" link on any page.

### 15. No `aggregateRating` in schema
The site claims "5★ Customer Rating" and "1000+ Happy Clients" in visible text but no `aggregateRating` schema exists anywhere. Google cannot generate star snippets in SERPs.

### 16. FAQ pricing questions answered with redirects, not data
FAQ questions 1 and 6 both ask about taxi prices. Both redirect to the booking form without providing a figure, range, or price floor. The two highest commercial-intent questions on the page go unanswered.

### 17. No dedicated service pages for primary commercial queries
No standalone `/heraklion-airport-taxi/` or `/heraklion-to-hersonissos-taxi/` service pages exist. Blog posts cover these routes but carry different ranking signals than service pages. No pricing page (`/taxi-prices/`) exists despite "fixed pricing" being a key differentiator.

---

## MEDIUM

### 18. All nav/footer internal links omit trailing slashes
Every internal link on every page uses `/aboutus`, `/blog`, `/faq` etc. without trailing slash, while canonical URLs all have trailing slashes. Structural inconsistency throughout all 21 pages.

### 19. Blog post hero `<img>` missing `fetchpriority="high"`, `width`, `height`
The LCP image on all 12 blog posts has no `fetchpriority`, no explicit dimensions. CLS risk if CSS is delayed.

### 20. Homepage carousel: visible slide has `loading="lazy"`, 13 images in DOM
Slide 0 (`IMG_1279.avif`) is visible on load but has `loading="lazy"`, causing browser to defer it. All 13 carousel images are in the DOM simultaneously.

### 21. Image caching headers: `max-age=0, must-revalidate`
All images in `/images/` directory served with `cache-control: public, max-age=0, must-revalidate`. No long-term browser caching for static image assets. Hashed `_astro/` assets correctly use `max-age=31536000, immutable`.

### 22. `openingHoursSpecification.closes` is `"23:59"` — not valid for 24/7
A 24-hour business must use `"closes": "00:00"`. Current value `"23:59"` implies a 1-minute daily gap.

### 23. Duplicate content: Knossos Palace described on 4 pages
Substantially similar descriptions on Homepage, `/taste-of-heraklion/`, `/blog/day-trips-from-heraklion/`, and `/crete-cruise/`. Shared verbatim phrase: "heart of the ancient Minoan civilization and Europe's oldest city."

### 24. Identical CTA block on all blog posts
The exact same "Ready to book your transfer?" block appears word-for-word at the bottom of all blog posts with no variation.

### 25. No llms.txt file
`/llms.txt` returns 404. No machine-readable content map for AI agents. Perplexity, Claude, and Bing Copilot have no structured page inventory to prioritize.

### 26. FAQ answers below AI citability threshold
FAQ answers average 37 words each — 74% below the 134-word minimum for reliable AI citation. Too thin to be cited as authoritative standalone passages.

### 27. `og:type` = `website` on blog index
`/blog/` uses `og:type=website` instead of `blog`. Blog posts correctly use `article`.

### 28. LocalBusiness schema `url` missing trailing slash
`"url": "https://www.lptaxiheraklio.com"` — missing trailing slash, inconsistent with all other schema references that use the trailing-slash form.

### 29. Phone format inconsistency
Schema: `+306943551122`, footer display: `+30 6943551122`, footer contact: `+30 694 355 1122`. Three formats for the same number.

### 30. `AboutPage` schema uses `Organization` not `LocalBusiness`
The `worksFor` reference on the about page types the company as `Organization` instead of linking back to the homepage `LocalBusiness` `@id`. Breaks entity consolidation.

### 31. TouristTrip `touristType` wrong value type
`/crete-cruise/` and `/taste-of-heraklion/` use plain strings (`"Sightseeing"`, `"Cultural"`) instead of the expected `Audience` object.

### 32. TouristTrip schemas missing `image` property
Both `/crete-cruise/` and `/taste-of-heraklion/` TouristTrip schemas have no `image`.

### 33. Gmail email as primary business contact
`lptaxiheraklion@gmail.com` is used throughout. Citation aggregators flag or de-prioritize listings with free email providers.

### 34. No external citations in any blog post
Zero outbound links to authoritative sources across all 12 blog posts. The airport prices post asserts regulatory facts about the Prefecture of Crete with no source link. Day trips post claims Europa Nostra award for Archanes with no link.

### 35. Templated blog post structure
All blog posts follow an identical template: intro → subheaded list → comparison section → distance table → identical CTA. No post departs from this structure. Google Sept 2025 QRG marker for programmatically-templated content.

### 36. Author "Lampros" — weak identity signals
First name only, no surname, no credentials, no LinkedIn, no external author profile, no VIAF identifier. The `author.url` links to `/aboutus/` which contains a generic bio with no verifiable facts.

### 37. Greek content invisible to search engines
The site has an EN/GR language toggle but Greek translations are served via client-side JavaScript (`data-i18n` + `localStorage`). No `hreflang="el"` exists. Greek content is not in server-rendered HTML and is not crawlable by Googlebot. Greek queries ("ταξί Ηράκλειο") cannot match any indexed content.

---

## LOW

### 38. sitemap-index.xml has no `<lastmod>` on child sitemap entry
The parent index doesn't signal its own freshness. Individual URLs in `sitemap-0.xml` do have `lastmod`.

### 39. IndexNow not implemented
No IndexNow key file or meta tag found. New blog posts rely entirely on crawl scheduling for Bing/Yandex discovery.

### 40. No AI crawler directives in robots.txt
No rules for GPTBot, ClaudeBot, PerplexityBot, or CCBot. Site content is freely indexed by AI training scrapers without any policy declaration.

### 41. `og:locale` hardcoded to `en_US`
A Greek taxi service targeting European tourists should use `en_GB` (dominant for Crete tourists). No `og:locale:alternate` for `el_GR`.

### 42. No `og:image:alt` tag
OG image is set on blog posts but no alt text accompanies it.

### 43. Readability scores below target
4 pages score below FK 50 (Difficult reading level). Target for consumer-facing service pages: FK 60+.
- Homepage: 35.1
- About Us: 33.2
- Taste of Heraklion: 36.8
- Taxi Safety: 45.8

### 44. No video content
Zero embedded video on any page. Video is the highest-correlation signal for AI citation. Only a background hero video (decorative, no content value) exists on homepage.

### 45. Web3Forms API key exposed in client HTML
Booking form embeds access key `46636252-...` in visible source. Can be harvested for spam submissions.

### 46. All 12 blog posts have identical `datePublished`
Posts published with dates `2026-04-28` (4 posts) and `2026-05-28` (8 posts) — only two publication dates across 12 posts. Reduces credibility of the publication timeline.

### 47. No Wikipedia, Reddit, or YouTube presence
Zero mentions of LP Taxi Heraklion on Wikipedia, Reddit, or YouTube. These are the three highest-correlation signals for AI citation.

---

## Score Comparison

| Metric | Previous Audit | Current | Change |
|--------|---------------|---------|--------|
| Overall Score | 50/100 | 60/100 | +10 |
| Technical SEO | — | 71/100 | — |
| Content Quality | — | 44/100 | — |
| On-Page SEO | — | 65/100 | — |
| Schema | — | 55/100 | — |
| Performance | — | 70/100 | — |
| AI Search | — | 54/100 | — |
| Images | — | 60/100 | — |

---

*47 findings: 6 Critical, 11 High, 20 Medium, 10 Low*
