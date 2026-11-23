# Portfolio-temp

A polished, interactive portfolio for Madhavan, a Cloud and DevOps engineer focused on infrastructure, cybersecurity, and AI systems.

**Live Website:** [https://madhavan2012.indevs.in/](https://madhavan2012.indevs.in/)

## Features

- Responsive, accessible single-page experience
- Smooth scrolling and GSAP-powered motion
- Three.js background and scroll-linked frame animation
- Featured project showcase
- SEO metadata, structured data, sitemap, and PWA manifest
- Optimized production builds with vendor chunk splitting

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- Framer Motion
- Three.js and React Three Fiber
- Lenis

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
npm install
npm run dev
```

The development server is available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

The production bundle is written to `dist/`.

## Project Structure

```text
public/                 Static assets, manifest, sitemap, and robots.txt
src/
  assets/               Images and visual resources
  components/           Portfolio sections and reusable UI
  App.tsx               Application composition
  index.css             Global styles and design tokens
  main.tsx              React entry point
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |

## Deployment

Deploy the contents of `dist/` to a static host such as GitHub Pages, Netlify, or Vercel. Configure the host to serve `index.html` for all application routes if client-side routing is introduced.

## Author

**Madhavan**

- GitHub: [@madhavan0216](https://github.com/madhavan0216)
- Email: [madhavan2001vivo@gmail.com](mailto:madhavan2001vivo@gmail.com)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
