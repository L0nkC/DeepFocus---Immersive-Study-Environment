# Design System Document: The Immersive Study Experience

## 1. Overview & Creative North Star: "The Digital Sanctuary"
This design system is built to transform a standard productivity tool into a "Digital Sanctuary." We are moving away from the cluttered, "utility-first" aesthetic of traditional dashboards toward a high-end editorial experience that prioritizes psychological flow. 

The **Creative North Star** is **Atmospheric Depth**. By leveraging full-screen natural imagery paired with sophisticated glassmorphism, we create an interface that feels like it’s floating within an environment rather than sitting on top of a screen. We achieve a "premium" feel through intentional asymmetry—placing the timer off-center or allowing stats to breathe with massive amounts of negative space—breaking the rigid, boxed-in feeling of generic apps.

---

## 2. Colors: Tonal Depth & Atmospheric Transitions
Our palette is rooted in deep earth tones, designed to reduce eye strain and promote a parasympathetic nervous response.

### The "No-Line" Rule
**Designers are strictly prohibited from using 1px solid borders for sectioning.** Boundaries must be defined through background color shifts or tonal transitions. To separate a control panel from the main view, use `surface-container-low` against the `background` rather than a stroke.

### Surface Hierarchy & Nesting
Use the `surface-container` tiers to create organic depth. Treat the UI as layers of frosted glass:
*   **Base:** `background` (#121416) or a full-screen nature asset.
*   **Secondary Layer:** `surface-container-low` (#1a1c1e) for large side panels.
*   **Top Interaction Layer:** `surface-container-highest` (#333537) for active cards or modals.

### The "Glass & Gradient" Rule
Floating elements (timers, quick actions) must use Glassmorphism. 
*   **Formula:** `surface` color at 40-60% opacity + `backdrop-filter: blur(20px)`.
*   **Signature Textures:** For primary CTAs (e.g., "Start Focus"), use a subtle linear gradient from `primary` (#aecebe) to `primary-container` (#234034) at a 135-degree angle to provide a "soulful" tactile quality.

---

## 3. Typography: Editorial Clarity
We pair the geometric precision of **Manrope** for high-impact displays with the unmatched legibility of **Inter** for data-heavy stats.

*   **Display (Manrope):** Use `display-lg` (3.5rem) for the countdown timer. The large scale creates a sense of singular importance, stripping away distractions.
*   **Headlines (Manrope):** Use `headline-sm` (1.5rem) for section headers like "Choose Your Scenery."
*   **Body & Labels (Inter):** Use `body-md` (0.875rem) for descriptions and `label-md` (0.75rem) for micro-copy. 

**Brand Identity through Type:** Hierarchy is conveyed via weight and tracking. Increase letter-spacing on `label-sm` to 0.05rem for a sophisticated, airy feel in the stats panel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "heavy" for a minimalist sanctuary. We use light and transparency to lift objects.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The subtle shift in hex value creates a natural lift.
*   **Ambient Shadows:** For floating elements, use a diffused shadow: `box-shadow: 0 20px 40px rgba(12, 14, 16, 0.4)`. The shadow should be tinted with the background color, never pure black.
*   **The "Ghost Border":** If accessibility requires a border, use the `outline-variant` (#434844) at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism Depth:** The `surface-tint` (#aecebe) should be used as a very thin (0.5px) top-edge highlight on glass cards to mimic light catching the edge of a pane.

---

## 5. Components: Refined Interaction

### Buttons
*   **Primary:** Pill-shaped (`rounded-full`), using the signature `primary` to `primary-container` gradient. No border.
*   **Secondary:** Glass-morphic. `surface` at 20% opacity with a blur. Text in `on-surface`.
*   **Tertiary:** Text-only using `primary` color, with an underline that only appears on hover.

### Progress Bars (Focus Indicators)
*   **The "Ghost" Track:** The background track should use `surface-container-highest` at 30% opacity. 
*   **The Indicator:** A solid `primary` (#aecebe) fill. Avoid rounded end-caps on the progress fill to maintain a precise, architectural look.

### Scenery Selection Cards
*   **Constraint:** Forbid divider lines.
*   **Structure:** Use `spacing-4` (1.4rem) of vertical white space between cards. 
*   **State:** The "Selected" card should not have a thick border; instead, use a `surface-tint` glow and a `tertiary` (#ffb59e) "High-Contrast" dot indicator in the top right.

### Input Fields
*   **Styling:** Minimalist bottom-border only, using `outline-variant` at 40% opacity. Upon focus, the border transitions to `primary` with a soft glow.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. Place the timer in the left-third of the screen to leave the right-side nature visual unobstructed.
*   **Do** use `spacing-16` (5.5rem) or `spacing-20` (7rem) for padding between major UI clusters to ensure the "Calm" theme is felt.
*   **Do** use `tertiary` (#ffb59e) sparingly as a "Focus Alert" color for when a session ends.

### Don'ts:
*   **Don't** use 100% opaque black (#000000). Always use `background` (#121416) to maintain softness.
*   **Don't** use standard "Drop Shadows" (e.g., 0px 2px 4px). They feel dated and "app-like" rather than immersive.
*   **Don't** use dividers or lines to separate list items. Use the spacing scale (`spacing-3`) and background shifts.
*   **Don't** use bright, saturated "Action Blues." Stick to the earthy forest greens and slate tones provided in the palette.