# Tinder for Shitposting

A parody "Tinder-style" swipe deck for shitposts: swipe right to like a post, left to pass, and see what matches your terrible sense of humor. Draggable cards, like/dislike buttons, rewind, and a running tally of your likes — all client-side, no backend, no login.

> Live demo: https://girishlade111.github.io/tinder-for-shitposting/

## Features

- **Swipe deck UI** — drag cards left/right (or use buttons) Tinder-style
- **Hardcoded shitposts** — a deck of parody posts with avatars, timestamps, likes/retweets/replies
- **Like & pass counters** — track how many posts you liked vs. passed
- **Rewind** — bring back the last swiped card
- **Match feedback** — playful "match" reaction when you like a post
- **Keyboard-friendly actions** — like/pass via buttons
- **Dark UI theme** — shadcn/ui components with smooth card animations

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **Language:** TypeScript
- **UI:** React, Tailwind CSS, shadcn/ui (Radix primitives), lucide-react icons
- **Analytics:** @vercel/analytics (no-op on static export)

## Quick Start

```bash
# install dependencies
pnpm install

# run the dev server
pnpm dev
# open http://localhost:3000

# build the static site
pnpm build
# output goes to ./out
```

Requires Node.js 18+.

## Project Structure

```
.
├── app/
│   ├── layout.tsx        # Root layout (fonts, theme provider)
│   ├── page.tsx          # Home page — renders the swiper
│   └── globals.css       # Global Tailwind styles
├── components/
│   ├── shitpost-swiper.tsx  # Swipe deck: drag, like/pass, rewind, counters
│   ├── ui/               # shadcn/ui primitives
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts          # cn() class merge helper
├── public/               # Static assets
├── styles/
│   └── globals.css       # Additional global styles
└── next.config.mjs       # next config (output: 'export', basePath for gh-pages)
```

## How It Works

`shitpost-swiper.tsx` is a client component holding the deck in React state. Each card is draggable via pointer events; a horizontal drag past the threshold triggers a like (right) or pass (left) animation, pops the card off the stack, and updates the counters. A history stack powers the rewind button. All posts live in the component itself — edit that file to change the deck.

## Environment Variables

None required — the app is fully client-side.

## Deployment

This project builds to a static export (`output: 'export'`) and is deployed to **GitHub Pages** at https://girishlade111.github.io/tinder-for-shitposting/.

```bash
pnpm build   # -> ./out
```

Note: `next.config.mjs` sets `basePath: '/tinder-for-shitposting'` so asset URLs resolve under the GitHub Pages subpath. If you deploy to a root domain or Vercel instead, remove the `basePath` line.

## License

MIT — free to use and remix.

---

Built by Girish Lade — https://ladestack.in
