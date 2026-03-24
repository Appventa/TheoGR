# MEMORY.md — TheosGR Portfolio

Project memory log for the Theo Kokkinidis cinematic portfolio site.
Updated at each successful milestone.

---

## Project Overview
- **Client:** Theo Kokkinidis, Video Director
- **Stack:** Vite + React 18 + TypeScript + Tailwind CSS v3 + Framer Motion
- **Design System:** "The Cinematic Lens" — see DESIGN.md
- **Repo:** https://github.com/Appventa/TheoGR
- **Languages:** Greek (default) + English (toggle)

---

## Milestones

### ✅ [2026-03-24] — Initial Scaffold, Build & GitHub Push
- Vite + React 18 + TypeScript project scaffolded manually (no CLI template)
- Tailwind CSS v3 configured with full design tokens from DESIGN.md
- `public/` folder renamed from `puplic/` typo — hero video at `public/Hero_BG_video_LOOP.mp4`
- All source files created: types, data, i18n, context, motion lib, all components
- TypeScript: zero errors (`npm run typecheck`)
- Production build: passes ✅ (`npm run build` — 913ms, 0 warnings)
- Hero video compressed 172MB → 40MB by user, tracked via Git LFS in `.gitattributes`
- Codebase + video pushed to `https://github.com/Appventa/TheoGR` ✅

---

## Architecture Notes

### i18n
- Custom `LanguageContext` — no external library
- Default language: Greek (`'el'`)
- `useLanguage()` returns `{ t, lang, toggleLang }`
- Translations in `src/i18n/translations.ts`

### Gallery
- 5 categories × 6 placeholder items (Unsplash URLs)
- Horizontal drag-scroll via `useDragScroll` hook (src/hooks/useDragScroll.ts)
- `didDrag` ref prevents accidental clicks during drag

### Client Logos Marquee
- Pure CSS `@keyframes marquee` — no JS
- Logos duplicated in array for seamless infinite loop (`translateX(-50%)`)
- Falls back to brand name text if logo image is missing (onError handler)

### Key File Paths
- Design tokens: `tailwind.config.ts`
- Translations: `src/i18n/translations.ts`
- Animation presets: `src/lib/motion.ts`
- Gallery data: `src/data/gallery.ts`
- Client logos: `src/data/clients.ts`
- Hero video: `public/Hero_BG_video_LOOP.mp4`

---

## Pending / Next Steps
- [ ] Replace placeholder Unsplash thumbnails with real video thumbnails
- [ ] Replace placeholder client logos in `public/logos/`
- [ ] Update mailto in `CtaSection.tsx` with real email
- [ ] Update social links in `Footer.tsx` with real profile URLs
- [ ] Add Vimeo/YouTube lightbox for video playback on card click
- [ ] Connect Vercel to GitHub repo for auto-deploy
