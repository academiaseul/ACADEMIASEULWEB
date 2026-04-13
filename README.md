# Academia Seúl — Premium Korean Language Landing Page

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Remotion 4** — hero animated composition via `@remotion/player` (runs in-browser, no video file needed)
- **Framer Motion 11** — scroll animations, parallax, micro-interactions
- **Tailwind CSS 3** — utility styling with custom Korean color tokens
- **Lucide React** — icons

---

## Quick Start

```bash
cd academia-seoul

# 1. Install dependencies
npm install

# 2. Run Next.js dev server
npm run dev
# → http://localhost:3000

# 3. (Optional) Open Remotion Studio to preview the hero composition
npm run remotion
# → http://localhost:3001
```

---

## Project Structure

```
academia-seoul/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata
│   ├── globals.css         # Tailwind + custom utilities (glass, gradients…)
│   └── page.tsx            # Page composition
│
├── components/
│   ├── Navigation.tsx      # Sticky nav with scroll-aware blur
│   ├── Hero.tsx            # Full-screen hero — hosts the Remotion Player
│   ├── RemotionPlayer.tsx  # @remotion/player wrapper (dynamically imported)
│   ├── About.tsx           # Academy story + stats
│   ├── Courses.tsx         # 6-course grid with glassmorphism cards
│   ├── Benefits.tsx        # 8 benefit cards + scrolling marquee
│   ├── KoreanCulture.tsx   # K-drama / K-pop / Seoul storytelling section
│   ├── Testimonials.tsx    # 5-testimonial carousel
│   ├── CTASection.tsx      # Full-screen CTA with parallax
│   ├── Contact.tsx         # Lead-capture form + contact sidebar
│   └── Footer.tsx          # Links, social, copyright
│
├── remotion/
│   ├── HeroComposition.tsx # Remotion composition (typewriter, floating hangul, particles)
│   ├── Root.tsx            # Remotion root — registers compositions
│   └── index.ts            # Remotion entry point for studio CLI
│
├── next.config.mjs
├── tailwind.config.ts      # Custom tokens: seoul-red, seoul-blue, seoul-gold…
├── tsconfig.json
└── remotion.config.ts
```

---

## How the Remotion Hero Works

The hero section embeds a live Remotion composition via `@remotion/player`:

- **15-second looping animation** (450 frames @ 30fps)
- Runs entirely **in the browser** via React — no video file needed
- Animations are driven by `useCurrentFrame()` — no CSS transitions
- Features: floating Hangul characters, typewriter headline, particles, pulsing rings, spring-animated CTAs

The component is **dynamically imported** (`ssr: false`) in `Hero.tsx` to avoid hydration issues.

---

## Color Tokens

| Token                | Value     | Use                      |
|----------------------|-----------|--------------------------|
| `seoul-black`        | `#0a0a0f` | Dark backgrounds         |
| `seoul-white`        | `#fafaf5` | Light text / bg          |
| `seoul-red`          | `#C8001E` | Primary accent (Taegeuk) |
| `seoul-blue`         | `#003478` | Secondary accent         |
| `seoul-gold`         | `#D4AF37` | Tertiary / shimmer       |

---

## Production Deployment

```bash
npm run build
npm run start
```

For **Vercel** deployment, push to GitHub and connect the repo — zero config needed.

---

## Image Credits

Images sourced from [Unsplash](https://unsplash.com). Replace with licensed/original photography for production.

---

## To-Do for Production

- [ ] Connect contact form to backend API / CRM (Mailchimp, HubSpot, custom)
- [ ] Add real Google Analytics / Meta Pixel
- [ ] Replace Unsplash images with original photography
- [ ] Add sitemap.xml and robots.txt
- [ ] Configure proper WhatsApp API link
- [ ] Add real address to Google Maps embed in Contact section
