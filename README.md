# Mind Match

A small memory card-matching game built for **SEG3125 – Assignment 3** (Games for Exploring
Human Cognition). Flip cards, find the matching pairs, beat your time.

Built with **React + Vite**.

## Features
- **Levels** — Beginner (4×3), Intermediate (4×4), Advanced (6×4).
- **Configuration** — choose the card-face symbol set: Digits, Shapes, or Math symbols.
- **Feedback** — live timer, move counter, pairs-found tracker; star rating on the results screen.
- **Accessible** — keyboard playable, visible focus rings, respects `prefers-reduced-motion`,
  and match/mismatch are never signalled by colour alone.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
```

## Build for hosting
```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the production build locally
```
`vite.config.js` sets `base: './'`, so the `dist/` output works from any static host
(GitHub Pages, Netlify, etc.) including project subpaths.

## Project structure
```
src/
  game/
    config.js    # levels + symbol sets
    deck.js      # deck building + Fisher–Yates shuffle
    useGame.js   # game state (useReducer) + timer
  components/
    SetupScreen.jsx
    Board.jsx
    Card.jsx
    HUD.jsx
    EndScreen.jsx
  App.jsx        # screen orchestration
  index.css      # theme, layout, animations
```
