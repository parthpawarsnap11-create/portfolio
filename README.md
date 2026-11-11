# Portfolio — Parth N Pawar

Personal portfolio site: UX design and front-end development.

**Live:** https://parthpawarsnap11-create.github.io/portfolio/

A single-page site with a hero, featured case study, selected work, skills,
experience timeline, and contact section. Hand-coded HTML, CSS, and vanilla
JavaScript — no build step, no dependencies.

## Structure

```
.
├── index.html              # Single-page markup
├── assets/
│   ├── css/
│   │   └── styles.css      # Design system + all styling
│   ├── js/
│   │   └── main.js         # Nav, mobile menu, reveal-on-scroll
│   └── img/
│       ├── preview-desktop.png
│       └── preview-mobile.png
├── README.md
├── LICENSE
└── .gitignore
```

## Running locally

No build step. Either open `index.html` directly, or serve it:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Design notes

- **Type:** Fraunces (display) + DM Sans (UI), loaded from Google Fonts
- **Palette:** near-black green-tinted background, single green accent
- **Layout:** CSS Grid with breakpoints at 1040px, 940px, and 760px
- **Motion:** IntersectionObserver reveals, all disabled under
  `prefers-reduced-motion`

## Accessibility

- Skip link to main content
- Visible `:focus-visible` outlines throughout
- `aria-expanded` / `aria-controls` on the mobile menu toggle
- Escape closes the mobile menu and returns focus to the toggle
- All icon-only SVGs marked `aria-hidden`
- Full `prefers-reduced-motion` and print stylesheets

## Deployment

Served via GitHub Pages from the `main` branch, root directory.
Pushing to `main` triggers an automatic rebuild.

## Status

Content is partially placeholder — project descriptions for items 02–04,
the phone number, and the hero statistics still need real data.

## License

MIT — see [LICENSE](LICENSE).
