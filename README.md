# Pixora

Pixora is a Pinterest-inspired media search app for discovering photos and videos in one clean feed. Search once and Pixora shows mixed photo and video results together, with filter tabs when you want to view only photos or only videos.

## Features

- Mixed photo and video search results
- Pinterest-style masonry layout
- Infinite scroll with lazy loading
- Hover preview with title, save action, soft dimming, zoom, and green glow
- Large detail preview before opening the original source
- Download, save, and original-link actions from the preview
- Local collection saved in the browser
- Remove saved items from the collection
- Clean white UI with deep green accents

## Tech Stack

- React
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Unsplash API
- Pixabay Videos API

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```bash
VITE_UNSPLASH_KEY=your_unsplash_access_key
VITE_PIXABAY_KEY=your_pixabay_api_key
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Notes

Saved collection items are stored in `localStorage`, so they stay available after refreshing the browser on the same device.
