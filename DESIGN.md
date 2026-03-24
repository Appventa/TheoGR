# Design System Specification: The Cinematic Lens

## 1. Overview & Creative North Star
This design system is engineered to function as a "Digital Gallery," shifting the focus from the interface to the work itself. The **Creative North Star** for this system is **"Atmospheric Depth."**

Unlike standard web layouts that rely on rigid grids and boxy containment, this system treats the screen as a cinematic frame. It breaks the "template" look through the use of intentional asymmetry—where white space (or in this case, "dark space") acts as a structural element—and high-contrast typography scales that mirror film title sequences. The goal is to move beyond a website and create an immersive, editorial experience that feels curated, not just assembled.

---

## 2. Colors: Tonal Depth & The Amber Glow
The palette is rooted in deep blacks and charcoal grays to allow video content to "pop," while utilizing a cinematic amber (`primary: #ffc965`) to guide the user's eye.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or containers. Traditional borders create a "boxed-in" feel that contradicts the cinematic flow.
- Boundaries must be defined solely through background color shifts.
- Example: A section using `surface-container-low` (#131313) should sit directly against the `background` (#0e0e0e) to create a soft, sophisticated edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to define depth:
- **Level 0 (Base):** `surface` (#0e0e0e) for the primary background.
- **Level 1 (Subtle Lift):** `surface-container-low` (#131313) for large content sections.
- **Level 2 (Active Elements):** `surface-container-highest` (#262626) for cards or interactive modules.

### The "Glass & Gradient" Rule
To elevate the "out-of-the-box" feel:
- **Glassmorphism:** Use semi-transparent surface colors (e.g., `surface-variant` at 60% opacity) with a `20px` backdrop-blur for floating navigation or overlays.
- **Signature Textures:** For main CTAs, do not use flat colors. Apply a subtle linear gradient transitioning from `primary` (#ffc965) to `primary-container` (#feb700) at a 135-degree angle to simulate the warmth of a lens flare.

---

## 3. Typography: Editorial Authority
Typography is our primary tool for establishing a "Director's Voice." We use two contrasting typefaces to balance character with utility.

- **Headlines (Space Grotesk):** This is our "Display" face. It is bold, idiosyncratic, and authoritative. Use `display-lg` (3.5rem) for hero statements with a `-0.02em` letter-spacing to create a tight, cinematic look.
- **Body & Labels (Manrope):** This is our functional workhorse. Manrope offers high readability at smaller scales (`body-md`: 0.875rem). It provides a clean, modern contrast to the expressive headlines.
- **Hierarchy as Identity:** Use extreme scale differences. A `display-lg` headline paired with a `label-sm` metadata tag creates an editorial pacing that feels like a high-end magazine or a film's credits.

---

## 4. Elevation & Depth: Tonal Layering
In "The Cinematic Lens," depth is not a shadow; it is a relationship between light and dark.

- **The Layering Principle:** Stack containers to create hierarchy. A `surface-container-lowest` card placed on a `surface-container-high` section creates a "recessed" look, while the inverse creates a "lifted" look.
- **Ambient Shadows:** When a floating element (like a modal) is required, use a shadow with a `40px` blur, `0%` spread, and the color set to `surface-container-lowest` at 50% opacity. This mimics natural light occlusion rather than a "drop shadow."
- **The "Ghost Border" Fallback:** If a border is essential for accessibility, use the `outline-variant` token (#484847) at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** Apply to global headers. Use `surface` at 70% opacity with a heavy backdrop-blur to allow the vibrant colors of video thumbnails to bleed through as the user scrolls.

---

## 5. Components: Minimalist Primitives

### Buttons
- **Primary:** Background `primary` (#ffc965), text `on-primary` (#5f4200). Use `rounded-sm` (0.125rem) for a sharp, professional edge.
- **Tertiary (Ghost):** No background. Use `label-md` in `primary`. On hover, add a `surface-variant` background at 20% opacity.

### Cards (The Gallery Item)
- **Rules:** No borders. No shadows.
- **Style:** Use `surface-container-low` (#131313). Images should have a `rounded-md` (0.375rem) corner. Text should be inset using spacing token `4` (1.4rem).
- **Interaction:** On hover, the image should subtly scale (1.05x) while the background shifts to `surface-container-high`.

### Input Fields
- **Style:** Underline only. Use `outline` (#767575) for the default state and `primary` (#ffc965) for the active state (2px thickness).
- **Label:** Use `label-sm` floating above the line.

### Video Progress Bar (Bespoke Component)
- **Track:** `surface-variant` (#262626).
- **Progress:** Linear gradient from `primary` to `secondary`.
- **Handle:** A simple `primary` dot, appearing only on hover.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins (e.g., `spacing-20` on the left, `spacing-10` on the right) to create a sense of movement.
- **Do** treat "Dark Space" as a luxury. Allow elements room to breathe using the `spacing-16` (5.5rem) and `spacing-24` (8.5rem) tokens.
- **Do** use `primary` sparingly. It is a "spotlight." If everything is amber, nothing is important.

### Don't
- **Don't** use 100% white (#ffffff) for large blocks of body text; use `on-surface-variant` (#adaaaa) to reduce eye strain and maintain a moody atmosphere.
- **Don't** use `rounded-full` for anything other than small utility tags or avatar icons. High-end cinematography is about frames and edges.
- **Don't** use standard "Slide-in" animations. Use "Fades" and "Scale-ups" (e.g., 0.98 to 1.0) to mimic a camera lens pulling focus.

---

## 7. Spacing & Rhythm
Rhythm is achieved through the consistent application of the Spacing Scale.
- **Section Padding:** Always use `spacing-20` (7rem) or `spacing-24` (8.5rem) for vertical breathing room between major content blocks.
- **Component Gaps:** Use `spacing-4` (1.4rem) for internal card padding and `spacing-6` (2rem) for gaps between related gallery items.