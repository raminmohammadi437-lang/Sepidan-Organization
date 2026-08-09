# Design System

## Source concepts

- `concepts/public-homepage.png`
- `concepts/staff-login.png`
- `concepts/admin-dashboard.png`
- `concepts/eduleb-inspired-home.png`
- `concepts/eduleb-inspired-sections.png`
- `concepts/eduleb-inspired-portal.png`
- `concepts/eduleb-inspired-dashboard.png`

## Brand tokens

- Deep navy: `#0F1D2E` — headings, portal navigation, high-emphasis text
- Sepidan blue: `#1299D5` — primary actions, links, selection, and focus
- Sepidan yellow: `#FFCE2F` — restrained brand accent
- Sepidan caramel: `#CF9262` — restrained brand accent
- Vibrant teal: `#00C2A8` — positive status
- Light gray: `#F2F4F7` — alternate bands and application background
- White: `#FFFFFF` — primary public background and portal surfaces
- Body text: `#1D2939`
- Muted text: `#667085`

## UI rules

- 29LT Zawi is the shared local type family for English and Dari, with Regular, Medium, Bold, ExtraBold, and Black weights.
- English uses left-to-right layout; Dari uses right-to-left layout and mirrors navigation, content flow, portal panels, and the dashboard sidebar.
- Public pages use open sections and generous whitespace. Cards are reserved for functional forms.
- Dashboard uses a navy sidebar, white data panels, thin gray borders, 12–16px radii, and restrained shadows.
- Sepidan blue is the primary action color. Teal is reserved for positive status, while yellow and caramel are supporting accents.
- Real UI labels and controls remain HTML text.
- Logo and central photography are raster assets. Interface icons are consistent outline SVGs.
- Desktop content container: 1180px. Public gutters: 20px mobile, 32px desktop.
- Motion is limited to the program marquee, navigation, focus, drawer, toast, and button feedback. The marquee eases to a stop on hover, has a dedicated pause control, and respects reduced-motion preferences.
- The language choice persists between public pages and the staff portal using local browser storage.

## Responsive behavior

- Public header becomes a drawer-style mobile menu below 768px.
- Public two-column sections stack on mobile.
- Portal login drops the navy brand panel on small screens while keeping the logo and security message.
- Dashboard sidebar becomes an off-canvas drawer and tables gain horizontal scrolling.
