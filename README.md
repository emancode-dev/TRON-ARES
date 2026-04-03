# TRON: ARES Landing Page

A cinematic fan-made landing page for **TRON: ARES**, built with **Vite**, **vanilla JavaScript**, **HTML**, and **CSS**. The site blends neon sci-fi styling, animated card-based hero visuals, background video transitions, an interactive media gallery, and a beta signup section into a polished one-page experience.

## GitHub Description

TRON: ARES-inspired cinematic landing page built with Vite, vanilla JS, HTML, and CSS.

## Overview

This project is a single-page promotional experience designed around a futuristic TRON aesthetic. It features:

- A cinematic hero section with layered TCG-style feature cards
- Scroll-aware background video switching between sections
- An editorial-style overview layout with stacked visual cards
- A responsive gameplay and media showcase
- An interactive video gallery with keyboard and touch support
- A beta signup form with lightweight client-side feedback
- A custom robot favicon and image fallback handling for card artwork

## Tech Stack

- Vite
- HTML5
- CSS3
- Vanilla JavaScript

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```text
tron-ares/
├─ public/
│  └─ assets/
│     ├─ images/
│     └─ videos/
├─ src/
│  ├─ main.js
│  └─ style.css
├─ index.html
├─ package.json
└─ README.md
```

## Key Functionality

### `src/main.js`

Handles the interactive behavior across the page:

- Section-based background video transitions
- Scroll reveal animations
- Mobile navigation toggle
- Smooth scrolling
- Video gallery carousel controls
- Beta form messaging
- Hero card parallax
- Card image fallback logic

### `src/style.css`

Contains the full visual system, including:

- Layout and responsive behavior
- TRON-inspired neon theming
- TCG card styling
- Overview card composition
- Gallery, footer, and CTA presentation

## Assets

Images and videos are served from:

- `public/assets/images`
- `public/assets/videos`

## Notes

- This is a **fan concept project** inspired by TRON.
- The footer already reflects that TRON-related assets belong to their respective owners.
- The site is built as a static front-end experience and does not include a backend or real signup processing.

## License

This repository currently has no explicit license. Add one if you plan to publish or distribute it publicly.
