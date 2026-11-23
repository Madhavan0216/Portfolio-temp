# Project Architecture

## 1. Project Overview
**Purpose**: A highly interactive, performant, and visually stunning 3D personal portfolio for Madhavan, a Cloud & DevOps Engineer.
**Goals**: To showcase technical expertise, past projects (e.g., GHOSTLINK, JARVIS AI, NETMONITOR), and experience through an immersive digital experience that acts as a testament to the creator's engineering capabilities.
**Visual Design Language**: 
- Cinematic, dark-mode aesthetics with glassmorphism ("floating holographic islands").
- Accent colors heavily utilizing greens (`#3d7a46` to `#86c48f` gradients).
- High-end visual fidelity utilizing noise overlays, custom halftone patterns, blooms, and blurs.
- Deep integration of modern typography (`Inter` for body, `Instrument Serif` for display text).
**Core Technologies**: React, Vite, TailwindCSS (v4), GSAP (ScrollTrigger), Framer Motion, Three.js, React Three Fiber, Rapier (Physics), Lenis (Smooth Scrolling).

---

## 2. Complete Folder Structure

```
project/
├── .gitignore               # Git ignored files
├── index.html               # Entry HTML file, mounts React root
├── package.json             # Dependencies and npm scripts
├── package-lock.json        # Locked dependency versions
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration with chunk splitting
├── pics/                    # Raw/Original picture assets
│   ├── GHOSTLINK.png        # Project image
│   ├── JARVIS AI.png        # Project image
│   ├── NETMONITOR.png       # Project image
│   └── iam.jpeg             # Profile picture
├── public/                  # Public static assets served at root
│   ├── favicon.svg          # Site favicon
│   ├── icons.svg            # SVG icons sprite
│   ├── manifest.json        # PWA/Web manifest
│   ├── og-image-spec.txt    # OpenGraph image specs
│   ├── robots.txt           # Crawler instructions
│   ├── sitemap.xml          # SEO sitemap
│   └── frames2/             # Pre-rendered video and image sequence for background
│       └── Create_a_perfect_seamless_loop.mp4
│       └── frame_000001.webp to frame_000961.webp (approx)
└── src/                     # Application source code
    ├── main.tsx             # React DOM rendering entry point
    ├── App.tsx              # Root React component containing the layout and providers
    ├── index.css            # Global CSS, Tailwind entry, design tokens, keyframes
    ├── vite-env.d.ts        # Vite environment types
    ├── assets/              # Assets processed by Vite
    │   ├── ghostlink.png
    │   ├── netmonitor.png
    │   ├── jarvis_ai.png
    │   └── iam.jpeg
    └── components/          # React components
        ├── About.tsx                 # About section
        ├── ClickSpark.tsx            # Cursor click spark animation
        ├── Contact.tsx               # Contact section
        ├── CustomCursor.tsx          # Custom CSS-based cursor with trailing effect
        ├── Experience.tsx            # Experience timeline section
        ├── Explorations.tsx          # Explorations section (currently unused in App.tsx)
        ├── GlareHover.tsx            # Reusable hover glare effect wrapper
        ├── Hero.tsx                  # Hero landing section
        ├── Journal.tsx               # Blog/Thoughts section
        ├── Lanyard.tsx               # 3D interactive physics lanyard (R3F)
        ├── LoadingScreen.tsx         # Preloader synchronized with image sequence loading
        ├── ProfileCard.tsx           # Interactive 3D tilt profile card
        ├── ScrollFramesAnimation.tsx # Canvas-based image sequence scroll animation
        ├── SelectedWorks.tsx         # Projects showcase section
        ├── Skills.tsx                # Skills matrix section
        ├── Stats.tsx                 # Statistics summary section
        ├── TiltedCard.tsx            # Generic tilt card wrapper
        ├── card.glb                  # 3D model for the lanyard badge
        ├── lanyard.png               # Texture for the lanyard string
        ├── seo/
        │   ├── SkipLink.tsx          # A11y skip navigation link
        │   └── StructuredData.tsx    # SEO structured data injection
        └── ui/                       # Micro-interactions and UI elements
            ├── BackgroundVideo.tsx   # Background video component (unused in root)
            ├── BackgroundWebGL.tsx   # Three.js particle background system
            ├── GlitchText.tsx        # GSAP text glitch animation
            ├── Magnetic.tsx          # GSAP magnetic hover effect wrapper
            ├── TextReveal.tsx        # GSAP 3D text reveal animation
            └── WaveText.tsx          # GSAP wave character animation
```

---

## 3. Technology Stack

- **React (`^19.2.6`)**: Core UI library.
- **Vite (`^8.0.12`)**: Fast development server and bundler. Used for optimized chunk splitting.
- **TypeScript (`~6.0.2`)**: Static typing.
- **TailwindCSS (`^4.3.0`)**: Utility-first CSS framework. Used in conjunction with custom CSS in `index.css`.
- **Three.js (`^0.184.0`)**: Core WebGL 3D rendering library. Used directly in `BackgroundWebGL.tsx`.
- **React Three Fiber (`^9.6.1`)**: React wrapper for Three.js. Used for building the declarative 3D `Lanyard` scene.
- **React Three Drei (`^10.7.7`)**: Helpers for R3F. Used for `Environment`, `Lightformer`, `Html`, and `useGLTF`.
- **React Three Rapier (`^2.2.0`)**: Physics engine for R3F. Used to simulate the swinging lanyard and rope joints.
- **GSAP (`^3.15.0`)**: Advanced animation library. Drives scroll-triggered reveals, custom cursor physics, and micro-interactions (`Magnetic`, `WaveText`, `GlitchText`).
- **Framer Motion (`^12.40.0`)**: Declarative animations. Used for section reveals (`About`, `Skills`, `Experience`, `SelectedWorks`, `LoadingScreen`).
- **Lenis (`^1.3.23`)**: Smooth scrolling library. Hijacks native scroll to provide cinematic buttery-smooth scrolling, synchronized with GSAP ScrollTrigger.
- **Meshline (`^3.3.1`)**: Used within the `Lanyard` to draw the physical lanyard string texture along a curve.
- **ReactBits Components**: `ProfileCard`, `TiltedCard` (adapted). Used for interactive UI elements.

---

## 4. Application Architecture

**Root Flow**:
`main.tsx` mounts `App.tsx`. `App.tsx` handles the orchestration of the global scroll (Lenis), loading state, global overlays (Noise, Cursor), and the main page layout.

**Layout Hierarchy**:
```
App
├── SkipLink (A11y)
├── BackgroundWebGL (Fixed global 3D particles)
├── Noise Overlay (Fixed CSS grain)
├── CustomCursor (Fixed custom cursor logic)
├── ClickSpark (Global click effect)
├── LoadingScreen (Conditional, tracks frame loading)
└── ScrollFramesAnimation (Wraps main content, manages canvas image sequence)
    ├── Hero (Contains Nav and Lanyard)
    ├── About
    ├── Skills
    ├── Experience
    ├── SelectedWorks
    ├── Journal
    ├── Stats
    └── Contact
```

The application is a single-page scrolling experience. Routing is handled natively via anchor links matching section IDs.

---

## 5. Component Inventory

### `App`
- **Purpose**: Root orchestrator. Initializes Lenis, configures GSAP ticker, manages loading state, and wraps sections.
- **Location**: `src/App.tsx`
- **State**: `isLoading` (boolean), `frameProgress` (number).
- **Dependencies**: Lenis, GSAP, React Hooks.
- **Children**: `LoadingScreen`, `Hero`, `CustomCursor`, `BackgroundWebGL`, `ScrollFramesAnimation`, all content sections.

### `Hero`
- **Purpose**: Landing section with navigation, title, dynamic roles, and the 3D Lanyard.
- **Location**: `src/components/Hero.tsx`
- **Props**: None.
- **State**: `activeNav`, `roleIndex`, `scrolled`, `menuOpen`.
- **Animations**: GSAP `blur-in` stagger, `animate-role-fade-in` CSS keyframes.
- **Children**: `Magnetic`, `WaveText`, `GlitchText`, `TextReveal`, `Lanyard`.

### `Lanyard`
- **Purpose**: Interactive 3D physics-based swinging badge.
- **Location**: `src/components/Lanyard.tsx`
- **Props**: `position`, `gravity`, `fov`, `transparent`.
- **State**: `isMobile`, `dragged`, `hovered`.
- **Dependencies**: R3F, Drei, Rapier, Meshline, `card.glb`.
- **Children**: `Band` (internal), `ProfileCard` (rendered inside Drei `Html`).

### `ProfileCard`
- **Purpose**: A highly interactive, holographic, tilt-responsive 3D card.
- **Location**: `src/components/ProfileCard.tsx`
- **Props**: `name`, `title`, `handle`, `status`, `avatarUrl`, etc.
- **State**: Managed via a custom `tiltEngine` without React state for performance, modifying CSS variables directly.
- **Animations**: CSS `pc-holo-bg` keyframes, direct DOM style manipulation for tilt.
- **Dependencies**: Framer Motion (partially), custom vanilla JS math.

### `ScrollFramesAnimation`
- **Purpose**: Renders an image sequence to a `<canvas>` tied to scroll position, serving as a dynamic background layer.
- **Location**: `src/components/ScrollFramesAnimation.tsx`
- **State**: `ready`.
- **Dependencies**: Native Canvas API, Fetch API, `ImageBitmap`.
- **Performance Notes**: Skips frames on low-end devices (`detectStep`). Draws at half resolution and scales via CSS to save GPU bandwidth. Uses `requestAnimationFrame` and `ImageBitmap` for 0-copy GPU uploads.

### `LoadingScreen`
- **Purpose**: Masks the site while image frames and critical assets load.
- **Location**: `src/components/LoadingScreen.tsx`
- **State**: `count`, `wordIndex`.
- **Animations**: Framer Motion for text cycling. RAF for counting up to `targetProgress`.

### `CustomCursor`
- **Purpose**: Replaces the native cursor with a dot and a lagged ring with trailing dots.
- **Location**: `src/components/CustomCursor.tsx`
- **State**: None (uses refs and vanilla JS for max performance).
- **Animations**: Custom RAF loop manipulating `transform` directly.

### `BackgroundWebGL`
- **Purpose**: Renders a slowly rotating, mouse-reactive starfield/particle system in the background.
- **Location**: `src/components/ui/BackgroundWebGL.tsx`
- **State**: None.
- **Dependencies**: Three.js (Vanilla).
- **Performance**: Scales particle count and FPS based on hardware concurrency. Pauses on `visibilitychange`.

### `About`, `Skills`, `Experience`, `SelectedWorks`, `Journal`, `Stats`, `Contact`
- **Purpose**: Content sections.
- **Animations**: Framer Motion `whileInView` for scroll reveals. Wrapped in `GlareHover` for interactive lighting.

### `GlareHover`
- **Purpose**: Adds a mouse-tracking radial gradient "glare" effect to cards.
- **Location**: `src/components/GlareHover.tsx`
- **State**: `glare` ({x, y, opacity}).

### `TiltedCard`
- **Purpose**: Generic 3D tilt effect for images (used for the profile picture in About).
- **Location**: `src/components/TiltedCard.tsx`
- **Dependencies**: Framer Motion `useMotionValue`, `useSpring`, `useTransform`.

### `Magnetic`, `WaveText`, `TextReveal`, `GlitchText`
- **Purpose**: GSAP-driven micro-interactions for text and buttons.
- **Location**: `src/components/ui/`

---

## 6. Hero Section Deep Analysis

**Layout**: 
- `100vh` full screen, `overflow-hidden`.
- Fixed navigation bar at the top, reacting to scroll (`scrolled` state adds shadow/blur).
- Centralized content (Titles, Roles, Description, CTA).
- Absolute positioned Lanyard component aligned to the right side (hidden on mobile).
- Absolute bottom scroll indicator.

**Background System**:
- The global `BackgroundWebGL` particles sit at `z-index: -1`.
- The global `ScrollFramesAnimation` canvas sits at `z-index: 0`.
- The `noise-overlay` sits globally at `z-index: 9998`.
- Hero content sits at `z-index: 10`.

**Typography System**:
- `COLLECTION '26` (Eyebrow): Small, uppercase, tracked out.
- `Madhavan` (H1): Massive, fluid size (`clamp(4rem, 15vw, 10.5rem)`), `Instrument Serif` italic. Wrapped in `TextReveal`.
- Dynamic Role Pill: Uses `GlitchText` inside an interval-driven React state swap.

**Navigation System**:
- Desktop: Uses `Magnetic` wrapping buttons with `WaveText` on hover.
- Mobile: Hamburger menu toggling absolute positioned dropdown.

**Lanyard Integration**:
- Positioned absolutely inside Hero: `right-[-10%] sm:right-[-5%] lg:right-0 w-[50%] lg:w-[40%]`.
- Uses `pointer-events-none md:pointer-events-auto` to allow interaction only on larger screens.
- Contains the `ProfileCard` nested inside an R3F `<Html>` wrapper.

**Rendering Order**:
1. Background WebGL / Canvas Sequence
2. Hero Section Container
3. Hero Content (Text, Buttons)
4. Lanyard Canvas (z-index managed by R3F and absolute positioning)
5. Fixed Navigation (z-index 50)

---

## 7. Animation Architecture

- **Lenis Smooth Scroll**: Modifies native scroll to be continuous. GSAP Ticker is synchronized to Lenis `raf`.
- **Hero Reveal (`GSAP`)**: `gsap.fromTo('.blur-in')` animates opacity, blur, and Y-translation on mount.
- **3D Text Reveal (`GSAP`)**: `TextReveal.tsx` animates characters individually with 3D rotation (`rotateX: -90`), blur, and Y-translation on scroll entry.
- **Magnetic Buttons (`GSAP`)**: Calculates cursor distance from element center and applies a `power3.out` translation. Snaps back with `elastic.out`.
- **Wave & Glitch Text (`GSAP`)**: 
  - `Wave`: Staggered Y-translation on characters on hover.
  - `Glitch`: Rapid randomized X/Y skew and text-shadow on hover.
- **Section Reveals (`Framer Motion`)**: All content sections use `<motion.div>` with `whileInView`, fading up with a spring/ease transition (`ease: [0.25, 0.1, 0.25, 1]`).
- **Hover Glares (`React State`)**: `GlareHover.tsx` tracks mouse and updates an absolute radial gradient.
- **Custom Cursor (`Vanilla JS`)**: Independent RAF loop calculating lerp (0.11) for the main ring and a separate physics follow for the trails.
- **Lanyard Physics (`Rapier`)**: Simulates 4 rigid bodies connected by spherical/rope joints. Interactive dragging uses kinematic positioning.
- **Scroll Sequence (`Vanilla Canvas`)**: Scroll position directly dictates the frame index drawn to the canvas.

---

## 8. Scroll Architecture

**Scroll Library**: `@studio-freight/lenis`.
**Configuration**: `duration: 1.0`, `touchMultiplier: 2`, `syncTouch: false`.
**Synchronization**: `lenis.on('scroll', ScrollTrigger.update)`. GSAP ticker calls `lenis.raf`. GSAP `lagSmoothing` is enabled to prevent jumpy animations on frame drops.

**Image Sequence System (`ScrollFramesAnimation.tsx`)**:
- **Frame Count**: Up to 960 frames.
- **Responsive Loading**: High-end devices load 960 frames (Step 1). Low-end/slow-connection devices load 320 frames (Step 3).
- **Asset Loading**: Uses `fetch`, `blob()`, and `createImageBitmap()` aggressively. Uses a concurrency limit of 12. Reports progress to `window.onFrameProgress` for the LoadingScreen.
- **Memory Strategy**: Stores `ImageBitmap` objects. Cleans them up via `.close()` on unmount.
- **Rendering Strategy**: Dedicated RAF loop outside React state. Calculates scroll fraction `frac = -rect.top / maxScroll`. Maps fraction to frame index `fi`. Uses `ctx.drawImage()` with `alpha: false` and `imageSmoothingEnabled = false`. Renders at half resolution (`960x540`) and lets CSS scale it to fill the viewport to drastically save fill-rate.
- **Video Crossfade**: Includes a looping MP4 that crossfades with the canvas sequence once scrolling begins.

---

## 9. ReactBits Usage Report

### `ProfileCard` (`src/components/ProfileCard.tsx`)
- **Origin**: ReactBits.
- **Customization**: Highly customized. Removed tailwind dependency in favor of direct inline styles/CSS vars. Hardcoded keyframes injection. Optimized tilt math.
- **Props Used**: `name`, `title`, `handle`, `status`, `avatarUrl`, `showUserInfo`, `innerGradient`, `behindGlowColor`.
- **Purpose**: Displays the user's detailed profile inside the 3D Lanyard.
- **Integration**: Integrated. Rendered inside `<Html transform>` inside the R3F Canvas in `Lanyard.tsx`.

### `TiltedCard` (`src/components/TiltedCard.tsx`)
- **Origin**: ReactBits.
- **Customization**: Standard Framer Motion implementation.
- **Props Used**: `imageSrc`, `rotateAmplitude`, `scaleOnHover`, `displayOverlayContent`, `overlayContent`.
- **Purpose**: Displays the profile image in the "About" section.
- **Integration**: Standalone within standard React DOM flow.

*(Note: `Lanyard` in ReactBits typically wraps R3F scenes. The project's `Lanyard.tsx` appears heavily customized or implemented from scratch based on typical Drei/Rapier patterns, tailored to load a specific `card.glb` and mount the `ProfileCard`.)*

---

## 10. Three.js / R3F Analysis

### Scene 1: BackgroundWebGL (`Vanilla Three.js`)
- **Render Loop**: Custom RAF, FPS capped (30 or 60 based on hardware).
- **Meshes**: Single `THREE.Points`.
- **Materials**: Custom `THREE.ShaderMaterial` implementing additive blending and dynamic sizing based on Z-depth.
- **Camera**: `PerspectiveCamera` moving slightly based on lerped mouse coordinates.

### Scene 2: Lanyard (`React Three Fiber & Rapier`)
- **Canvas**: Rendered with `alpha` based on transparency.
- **Physics**: Rapier `<Physics timeStep={1/60}>` (1/30 on mobile). Gravity points heavily down `[0, -40, 0]`.
- **Joints**: 1 Fixed body, 3 Dynamic spherical/rope joints (`j1`, `j2`, `j3`), 1 Dynamic/Kinematic body for the card.
- **Meshes**:
  - `band`: A `MeshLineGeometry` drawn dynamically by sampling a `CatmullRomCurve3` between the joints. Uses `MeshLineMaterial` with `lanyard.png`.
  - `card`: Uses geometry from `card.glb`. Applies a `meshPhysicalMaterial` with an anisotropic profile texture (`iam.jpeg`). Also renders metallic clips/clamps.
- **Lighting**: Ambient light + Drei `<Environment>` featuring 4 strategically placed `<Lightformer>` planes to create complex Studio-like reflections on the card's physical material.
- **Interactions**: Dragging the card switches it to a Kinematic RigidBody and forces it to follow the unprojected mouse vector.

---

## 11. State Management

- **Local State**: `useState` is used extensively for UI toggles (`menuOpen`), array indexes (`roleIndex`), and simple flags (`scrolled`, `isLoading`).
- **Global State**: No Redux or Zustand. The application is entirely localized. 
- **Window Communication**: `window.onFrameProgress` is used as a lightweight pub/sub mechanism to pass image loading progress from `ScrollFramesAnimation` deeply nested inside the render tree up to `App` and `LoadingScreen`.
- **Refs**: Extensively used (`useRef`) to bypass React's render cycle for highly performant animations (Custom Cursor, Canvas drawing, Tilt Math, Three.js loops).

---

## 12. Styling Architecture

- **TailwindCSS (v4)**: Used for layout (flex, grid), spacing, typography scales, and responsive breakpoints.
- **Vanilla CSS (`index.css`)**: 
  - **Design Tokens**: Managed via modern `@theme` directive (e.g., `--color-bg`, `--font-display`).
  - **Performance**: Strict use of `contain: layout style`, `will-change: transform`, and `isolation: isolate`. Backdrop filters are disabled via media query on low-end devices.
  - **Custom Keyframes**: Defined for `scroll-down`, `role-fade-in`, `gradient-shift`, `pulse-green`.
  - **Effects**: Highly specific aesthetic classes (`.glass-panel`, `.float-island`, `.noise-overlay`, `.cinematic-bloom`).
- **Inline Styles**: Used frequently for dynamic properties (glare gradients, tilt transforms) and complex box-shadows.

---

## 13. Asset Architecture

- **Images**: `ghostlink.png`, `netmonitor.png`, `jarvis_ai.png`, `iam.jpeg`. Served via Vite asset pipeline.
- **Image Sequence**: Stored in `public/frames2/`. Fetched directly via URL strings. Up to 960 `.webp` frames.
- **Video**: `public/frames2/Create_a_perfect_seamless_loop.mp4`.
- **3D Assets**: `src/components/card.glb` (imported into Vite).
- **Fonts**: `Inter` and `Instrument Serif` (likely loaded via HTML or system, explicitly defined in CSS vars).
- **Icons**: Sprites mapped in `public/icons.svg`.

---

## 14. Performance Analysis

**Strengths**:
- Lenis + GSAP lagSmoothing provides butter-smooth scrolling.
- `ScrollFramesAnimation` drastically cuts rendering overhead by drawing at half-resolution and using `ImageBitmap` + `alpha: false`.
- Intelligent hardware detection disables expensive WebGL features (drops FPS cap, reduces particle count) and drops frame-loading requirements (skips 2/3 of frames).
- CSS `backdrop-filter` is disabled on mobile/low-power mode.

**Risks & Bottlenecks**:
- **Memory Pressure**: Storing up to 960 `ImageBitmap` objects in memory simultaneously can crash iOS Safari or low-RAM Android devices. (The `detectStep` mitigates this slightly, but a rolling buffer would be safer).
- **DOM Depth / Overdraw**: The Hero section renders the Canvas sequence, WebGL particles, a noise overlay, and complex DOM simultaneously.
- **R3F Lanyard**: Rapier physics combined with Drei `Html` (which syncs DOM to 3D space) is very CPU intensive on mobile.
- **Hover Effects**: The `ProfileCard` tilt logic running on requestAnimationFrame is heavy, though it properly shuts down when not interacting.

**Recommendations**:
- Implement a rolling window for the image sequence (e.g., only keep 100 bitmaps in memory around the current scroll position).
- Disable the Three.js `BackgroundWebGL` entirely on mobile.
- Add `<Suspense>` boundary around the `Lanyard` to prevent it from blocking main thread hydration.

---

## 15. Current User Journey

1. **Loading**: User lands on site. Sees `LoadingScreen` with percentage tied exactly to image sequence fetching. Rotating text ("Design", "Create").
2. **Hero/Landing**: Loading screen fades out. Hero components stagger in (GSAP). User sees a looping background video, 3D particles, and a swinging 3D lanyard they can drag.
3. **Scroll Experience**: As the user scrolls, Lenis hijacks the scroll. The background video crossfades to the `<canvas>` sequence, scrubbing frames forward as they scroll down.
4. **Sections**: User encounters `About`, `Skills`, `Experience`, `SelectedWorks`, `Journal`, `Stats`. Each fades up via Framer Motion. Elements react to mouse hover with `GlareHover` lighting.
5. **Contact/Exit**: User reaches the bottom. The background sequence completes. The user is presented with a CTA to email and social links.

---

## 16. Visual Layer Hierarchy

- **Layer 0 (Background)**: `BackgroundWebGL.tsx` (`z-index: -1`, `opacity: 0.6`).
- **Layer 1 (Canvas Scroll)**: `ScrollFramesAnimation` canvas and video (`z-index: 0`).
- **Layer 2 (Content Sections)**: Hero, About, Skills, etc. (`z-index: 10`). Container backgrounds are semi-transparent (`rgba(11,15,23,.58)`) with `backdrop-filter: blur`.
- **Layer 3 (3D Lanyard)**: Absolute positioned within Hero, renders visually above the background but interweaves with Hero text depending on screen size.
- **Layer 4 (Navigation)**: Fixed top nav (`z-index: 50`), blurred background.
- **Layer 5 (Global Overlays)**: `noise-overlay` (`z-index: 9998`), `LoadingScreen` (`z-index: 9999`).
- **Layer 6 (Custom Cursor)**: `trail` (`z-index: 10000`), `dot`/`ring` (`z-index: 10001`).

Overlaps: The glassmorphism on the content sections beautifully blurs the canvas sequence and 3D particles passing underneath.

---

## 17. Integration Opportunities

**Lanyard & Profile Card Architecture Analysis**:
Currently, `ProfileCard.tsx` (a highly complex DOM-based component with custom JS tilt physics) is embedded inside `Lanyard.tsx` (a WebGL Canvas) using Drei's `<Html>`. 
- **Pros**: It allows the high-fidelity CSS styling (complex gradients, mix-blend-modes) of the ProfileCard to exist within the 3D space of the Lanyard.
- **Cons**: Severe performance penalty. Drei `<Html>` has to sync DOM transforms with the 3D camera every frame. Furthermore, the `ProfileCard` has its own internal tilt physics (mouse tracking) that conflicts logically with the physics of the swinging Lanyard.

**Superior Architecture Option**:
Bake the ProfileCard design into a texture or a custom Three.js shader. 
- Render the `ProfileCard` content directly on the `card.glb` mesh using R3F Text/Image components or an HTML-to-Canvas texture approach (e.g., `html2canvas`). 
- **Why**: This completely eliminates the DOM-to-WebGL sync overhead, removes conflicting physics layers, and allows the physics engine (Rapier) to fully govern the lighting and rotation of the card.

**Component Merging**:
- `BackgroundVideo.tsx` (unused) and `ScrollFramesAnimation.tsx` should be merged. The current `ScrollFramesAnimation` manually implements a `<video>` tag for the idle state.

---

## 18. AI Handoff Section

### AI CONTEXT FOR FUTURE ASSISTANTS

**Project Summary**: 
This is a highly optimized, high-fidelity portfolio utilizing React 19, Vite, Tailwind v4, Three.js, and GSAP. The hallmark of the site is an image sequence scroll animation combined with heavy glassmorphism and a 3D physical lanyard.

**Component Relationships**:
- `App.tsx` is the source of truth for global scroll logic (`Lenis` & `GSAP Ticker`). Do NOT instantiate separate scroll listeners in child components; use `ScrollTrigger` or tap into Lenis.
- `ScrollFramesAnimation` dictates the background visuals and emits a global loading progress event (`window.onFrameProgress`) picked up by `LoadingScreen`.

**Critical Implementation Details**:
- **Performance Hacks**: The project relies on vanilla DOM manipulation in `CustomCursor` and `ProfileCard` (using `requestAnimationFrame` and `style.transform`) to bypass React's render lifecycle. Do NOT convert these to React state (`useState`) as it will destroy frame rates.
- **Canvas Sequence**: The frame sequence uses `ImageBitmap` with `alpha: false`. It runs outside React. Modifying this requires understanding Canvas Context and GPU memory management.

**Known Issues**:
- Loading 900+ ImageBitmaps is memory intensive. Mobile devices might crash if memory limits are exceeded.
- Drei `<Html>` wrapping `ProfileCard` in `Lanyard.tsx` causes heavy DOM reflows on mobile.

**Desired Future Improvements**:
- Implement a sliding window memory manager for `ImageBitmap` arrays in `ScrollFramesAnimation`.
- Rewrite the `ProfileCard` DOM elements into pure WebGL (R3F Drei `<Text>` and textures) to remove `<Html>` overhead from the Lanyard scene.
- Migrate custom inline CSS animations to Tailwind v4 theme variables where possible to clean up JSX files.
