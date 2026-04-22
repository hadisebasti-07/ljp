# Little Joy Play — Migration Implementation Plan

Migrating from WordPress (current host) to React + Firebase Hosting.
**Primary goal:** Zero SEO regression, full content parity, admin CMS, better conversion.

---

## Business Understanding

Little Joy Play is a children's enrichment and sensory play business in Singapore operating across multiple locations. Revenue comes from three streams: group classes (monthly subscriptions + ad hoc joy packages), private sessions (birthday parties, playdates), and physical products (playdough). The business is actively growing — new locations open periodically, new programmes launch (e.g. Mandarin Sensory Play), and seasonal promotions run throughout the year. The core audience is parents of children aged 0–6 years in Singapore.

**Key business characteristics that shape this build:**
- Locations change frequently — any map or address must be admin-editable, not hardcoded
- Programmes evolve — new classes launch, age ranges adjust, themes rotate monthly
- Singapore audience — WhatsApp is the primary enquiry channel, not email
- **Direct booking is available via `https://list.sg/@littlejoyplay`** — this is the primary conversion CTA across the site, not the contact form
- The contact form is secondary — for enquiries, private sessions, and general questions only
- SEO is already established — migration must preserve it completely

---

## Current Site Audit

| Property | Value |
|---|---|
| Platform | WordPress + WooCommerce |
| Domain | www.littlejoyplay.sg |
| Indexed pages | `/`, `/about/`, `/services/`, `/news/`, `/contact/` |
| Sitemap | /sitemap.xml (8 sub-sitemaps) |
| Shop | `/product/playdough-{1,2,3}/` |
| Known locations | Upper Bukit Timah, Trehaus @ Funan, East Coast Commune, Pasir Ris, Havelock, Potong Pasir, Holland Village |

---

## Phase 1 — URL & Route Fixes ⚠️ Do First

URL mismatches between our build and the live indexed site. These must be corrected before go-live or Google will treat them as new pages and the originals will 404.

| Live URL | Our Build | Fix Required |
|---|---|---|
| `/` | `/` | ✅ Correct |
| `/about/` | `/about/our-story` | Fix to `/about/` |
| `/services/` | `/programmes` | Rename to `/services/` |
| `/news/` | `/about/news` | Move to `/news/` |
| `/contact/` | `/contact` | Add trailing slash via Firebase rewrite |

- Set `www.littlejoyplay.sg` as canonical — redirect bare domain via `firebase.json`
- 301 redirect any future URL changes permanently

---

## Phase 2 — SEO Infrastructure

None of this exists in the current build. Required before DNS cutover.

- [ ] Per-page `<title>` and `<meta name="description">` matching live site exactly
- [ ] `<link rel="canonical">` on every page
- [ ] Open Graph tags (og:title, og:description, og:image, og:url) for social sharing
- [ ] Static `sitemap.xml` covering all 5 core pages (update when new pages added)
- [ ] `robots.txt` replicating current WordPress one
- [ ] Schema.org JSON-LD — `LocalBusiness` type with all location addresses, phone, opening hours
- [ ] Redirect bare `littlejoyplay.sg` → `www.littlejoyplay.sg` in `firebase.json`

---

## Phase 3 — Content Parity Fixes

Corrections and missing content found during audit of the live site.

**Programmes (`/services/`):**
- [ ] Little Bubs age range: **8–18 months** (we had 3–18 months)
- [ ] Add: sessions are 1 hour, parent-accompanied
- [ ] Add: food-grade safe materials
- [ ] Add: monthly themes that rotate regularly
- [ ] Add: repetition + new experience balance ("we keep an item the same to encourage repetition")
- [ ] Add: **Mandarin Sensory Play** programme (new — found on About page)
- [ ] Add FAQ section:
  - Are materials included in fees? Yes
  - Can my child attend multiple times a week? Yes
  - What if we miss a class? Monthly subscribers get one free makeup class
  - What are joy packages? Ad hoc drop-in sessions
  - What are the benefits of sensory play?

**Locations:**
- [ ] Add missing locations: **Havelock**, **Potong Pasir**, **Holland Village** (found on About page, not on homepage)
- [ ] Confirm full list and addresses with the team before build

---

## Phase 4 — Contact Page Parity

Three elements missing from our current contact page build.

**Google Maps:**
- Do NOT hardcode map embed URLs — locations change over time
- Store each location as a Firestore document with a `mapEmbedUrl` field
- Admin updates the embed URL in the dashboard when a location moves
- Frontend reads from Firestore dynamically — no code deploy needed
- Firestore schema per location:
  ```
  locations/{id} {
    name, address, phone, area (East/West),
    mapEmbedUrl, isActive, order
  }
  ```

**WhatsApp:**
- [ ] Floating WhatsApp button — fixed position, bottom-right on all pages
- [ ] Links to `https://wa.me/65XXXXXXXXXX` (confirm number with team — East or West or dedicated)
- [ ] Pre-filled message: "Hi, I'd like to enquire about Little Joy Play classes"
- [ ] Critical for Singapore audience — higher conversion than contact form

**Contact form:**
- [ ] Already wired to Firestore ✅
- [ ] Confirm field names match live site (Name, Numbers, Email, Location dropdown, Message)

---

## Phase 5 — Admin Dashboard

Protected at `/admin`, requires Firebase Auth login (email/password, invite-only).

### Locations Manager
- Add, edit, deactivate locations
- Fields: name, address, area (East/West), phone, Google Maps embed URL, active status
- Changes reflect immediately on homepage, contact page, and location pages

### Programmes Editor
- Edit name, description, age range, activities list, benefits
- Toggle programme visibility
- Add new programmes (e.g. when Mandarin Sensory Play or new themes launch)

### Promotions / Announcements Banner
- Admin creates a banner (text + optional CTA link) that appears sitewide or on specific pages
- Toggle on/off with start/end date
- Useful for: seasonal promos (20% off November classes), holiday workshops, new location openings

### News / Blog
- Create, edit, delete posts (Firestore `posts` collection)
- Markdown or rich text editor
- Posts appear on `/news/` in real time

### Contact Submissions Viewer
- Read all Firestore `contact_submissions`
- Status: New / In Progress / Done
- Filter by location, date

### Careers
- Admin can post open roles (teacher positions, etc.)
- Each role: title, location, description, how to apply
- Stored in Firestore `jobs` collection

---

## Phase 6 — Conversion & Growth Features

These go beyond content parity and actively improve the business.

### Age Finder Widget
A simple interactive tool on the homepage and `/services/` page.
- Parent inputs child's age in months
- Widget recommends the right programme
- Reduces enquiry friction — parents know what to ask for before they contact

### Testimonials Section
- Parent quotes displayed on homepage and `/services/`
- Stored in Firestore (admin-editable)
- Optional: pull from Google Reviews via Places API

### Instagram Feed Embed
- Embed the @littlejoyplay Instagram feed on the homepage or About page
- Shows real class photos, builds trust with new visitors
- Use a lightweight embed or Instagram Basic Display API

### Seasonal Promotions Page
- `/promotions/` page for active deals and seasonal workshops
- Driven by the admin Promotions system (Phase 5)
- Helps capture seasonal search traffic ("Christmas toddler workshop Singapore")

### Location-Specific Pages
- `/locations/upper-bukit-timah/`, `/locations/pasir-ris/`, etc.
- Each page: address, map, schedule for that location, nearby contact
- Big local SEO win — parents search "baby sensory class [neighbourhood]"
- All content admin-editable via Locations Manager

### Careers Page
- `/careers/` listing open teaching and admin roles
- Driven by Firestore `jobs` collection (admin posts roles)
- Supports business growth as they expand locations

### list.sg Booking Integration
Direct booking is available at `https://list.sg/@littlejoyplay`. This should be the primary CTA across the entire site — not the contact form.

**Link behaviour rule:**
- Internal pages (About, Programmes, Contact) → same tab via React Router `<Link>`
- External sites (list.sg, WhatsApp, Instagram) → new tab via `<a target="_blank" rel="noopener noreferrer">`
- WhatsApp links on mobile open the WhatsApp app directly — this is correct native behaviour

**Placements (all implemented):**
- [x] Header "Book a trial" button → list.sg, new tab
- [x] Hero "Join a group" CTA → list.sg, new tab
- [x] Booking strip below hero → list.sg, new tab
- [x] Each programme card "Book trial" pill → list.sg, new tab
- [x] Bottom CTA banner → list.sg, new tab
- [x] Contact page quick-action cards → list.sg + WhatsApp, new tab
- [x] Floating buttons (all pages) → WhatsApp + Book trial, new tab
- [x] Contact form retained for: private sessions, general questions, location enquiries

### Newsletter Signup
- Simple email capture form — "Get updates on new classes and promotions"
- Emails stored in Firestore or integrated with Mailchimp/SendGrid
- Replaces the MailPoet functionality from WordPress

---

## Phase 7 — Performance & Polish

- [ ] Replace all emoji placeholders with real images
- [ ] Add real logo image (currently text placeholder)
- [ ] Lazy-load all images
- [ ] Lighthouse score targets: Performance 90+, SEO 100, Accessibility 90+
- [ ] Test on iOS Safari + Android Chrome
- [ ] Test WhatsApp button on mobile (primary device for Singapore audience)
- [ ] Dark mode (optional, low priority)

---

## Phase 8 — Go-Live Checklist

Run through this before cutting DNS over.

**Content**
- [ ] All 5 core URLs return 200 with correct content
- [ ] No broken internal links
- [ ] All location addresses correct and maps loading
- [ ] Mandarin programme and all programmes accurate
- [ ] FAQ populated

**Technical**
- [ ] `www.` canonical redirect working
- [ ] `/sitemap.xml` accessible and correct
- [ ] `/robots.txt` accessible
- [ ] Contact form submits to Firestore successfully
- [ ] WhatsApp button works on mobile
- [ ] Google Maps iframes loading
- [ ] Admin dashboard accessible and functional

**SEO**
- [ ] All page titles and meta descriptions match live site
- [ ] Canonical tags present on all pages
- [ ] Schema.org JSON-LD valid (test with Google Rich Results Test)
- [ ] Keep WordPress site live until 2 weeks after DNS switch (do not take it down immediately)
- [ ] Submit updated sitemap to Google Search Console after DNS switch
- [ ] Monitor Search Console for crawl errors for 4 weeks post-migration

---

## Deferred — Future Phase

- Shop pages: `/product/playdough-{1,2,3}/`
- WooCommerce product migration or Firebase Commerce replacement
- Online class booking with date/time picker and payment
- MailPoet email marketing replacement (full automation)
- Parent portal (view bookings, class history)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Hosting | Firebase Hosting (CDN) |
| Database | Firestore (content + submissions + locations) |
| Auth | Firebase Auth (admin only) |
| Storage | Firebase Storage (images, assets) |
| Analytics | Firebase Analytics |
| Functions | Firebase Cloud Functions v2 |
| CMS | Custom admin dashboard (Phase 5) |
| Maps | Google Maps Embed API (URL stored in Firestore) |
| Messaging | WhatsApp Business API link (wa.me) |
