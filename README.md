# Video editor portfolio

A complete React, TypeScript, and Vite portfolio adapted to the visual layout of [melon.studio](https://melon.studio/). It includes the red grain background, oversized Le Kick wordmark, Early Sans typography, floating navigation, liquid text reveals, perspective project rail, light About section, and the reference's contact and footer composition.

The site is ready for the owner's footage. No original portfolio videos have been supplied yet. Seven compressed reference images are clearly labeled as layout previews; they are replaced automatically when actual projects are added. The editor branding, biography, services, software, testimonials, availability, and contact details are editable placeholders. The reference owner's identity, biography, clients, and reviews are not used as portfolio content.

## Run locally

From this project folder on Windows:

~~~powershell
rtk proxy npm.cmd install
rtk proxy npm.cmd run dev
~~~

Open [http://127.0.0.1:5173](http://127.0.0.1:5173).

~~~powershell
rtk proxy npm.cmd run build
rtk proxy npm.cmd run preview
~~~

The production build is written to `dist`. Its preview is available at [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Project structure

~~~text
PAPON PORTFOLIO/
  references/                 Original downloaded archive, preserved
  reference/
    css/                      Copies of the reference styles
    js/                       Reference interaction source for inspection
    images/                   Wordmarks, textures, compressed layout previews
    fonts/                    Local Early Sans, Le Kick, and Geist Mono
  videos/
    showreel.mp4              Add the dedicated showreel here
    commercial/
    cinematic/
    reels/
    other/
  public/
    posters/                  Generated compressed video posters
    favicon.png
    social-cover.webp
  src/
    components/               Sections, liquid text, navigation, gallery, player
    lib/
      ribbon/                 Native WebGL surface, reference shaders, viewer flight
      gradient.worker.ts      Background shader rendering outside the UI thread
      GradientMount.ts        Worker coordination and compatible WebGL fallback
      compileProgram.ts       Non-blocking shader compilation
      scrollRuntime.ts        Continuous scroll values and motion coordination
    data/
      portfolio.json          Editable content, contact links, project overrides
      media.generated.json    Scanned local media; generated automatically
      content.ts              Combines configuration with the media manifest
      visuals.ts              Reference layout preview assets
    App.tsx
    main.tsx
    styles.css
    types.ts
  scripts/
    setup-assets.mjs           Prepares reference copies and local assets
    extract-reference-shaders.mjs  Recovers the reference's surface shaders
    prerender.mjs             Emits static page markup before client hydration
    sync-media.mjs             Scans videos and compresses/generates posters
    copy-videos.mjs            Copies original local media into the build
  package.json
  vite.config.ts
~~~

## Add original videos

Place the dedicated showreel at `videos/showreel.mp4`. Add projects to the category folders; nested folders are supported.

~~~powershell
rtk proxy npm.cmd run media:sync
~~~

The scan also runs when starting development and building production. Run it again after adding footage while the development server is open.

MP4, WebM, and M4V are supported. MP4 and WebM files with the same folder and basename become alternative sources for one project. Other formats are reported in the generated manifest.

The scanner reads video dimensions and duration where possible. When a thumbnail is missing, FFmpeg generates a compressed WebP poster. Existing thumbnails are also compressed into `public/posters`. Supported locations include an image with the same basename, a `-poster` or `.poster` suffix, a `-thumbnail` or `.thumbnail` suffix, and matching files in adjacent `thumbnails/` or `posters/` folders.

Original video filenames and contents stay in `videos/`. The production build copies them into `dist/videos/`. Videos are served locally and support byte-range requests for seeking. Original footage is excluded from Git; compressed posters and the media manifest are tracked.

The dedicated showreel is used by the hero action and the showreel section. If it is absent, the first suitable local project can act as a temporary showreel. Project filters only appear for categories with actual footage.

## Replace editable content

Edit `src/data/portfolio.json`:

- `identity`: name and role. Set `isPlaceholder` to `false` after confirmation. An optional `logo` path replaces the temporary navigation and footer wordmark.
- `availability`: label and status. Use `available` only once confirmed.
- `hero`: headline and introduction. An optional `wordmarkImage` path replaces the large masked wordmark.
- `about`: biography, approach, background, photograph, and placeholder status.
- `services`: offered services and descriptions. Confirm `servicesArePlaceholders` before publishing.
- `software` and `skills`: confirmed tools and technical skills.
- `experience` and `clients`: these sections appear when verified entries are supplied.
- `testimonials`: approved quotes and attribution. Replace the draft and set its `isPlaceholder` to `false`.
- `contact`: email, Instagram, YouTube, and WhatsApp. Email takes a plain address; social fields take complete URLs. Empty fields display inactive placeholders.
- `seo`: title, description, and public website URL.
- `projects`: metadata overrides keyed by the exact path relative to `videos/`.

Example project metadata:

~~~json
{
  "projects": {
    "cinematic/your-video.mp4": {
      "title": "Your approved project title",
      "description": "Your approved project description.",
      "year": "2026"
    }
  }
}
~~~

Actual filenames identify projects until custom metadata is supplied. For a portrait, place the image at `public/portrait.webp` and set `about.photograph` to `/portrait.webp`. Custom logos, wordmarks, and poster overrides can also use paths from `public/`.

## Design and reference assets

The original downloaded archive in `references/` is preserved. Selected styles are copied to `reference/css/`, with local asset paths adapted for the portfolio. The original font kit's URLs were used to recover the actual Early Sans and Le Kick font files; the frontend serves them locally.

The grain gradient uses the reference's Paper shaders, with a local texture fallback. Its shader compiles asynchronously and renders in an OffscreenCanvas worker where supported, keeping its frame loop off the UI thread. Its liquid text effect uses the reference's blur, alpha threshold, and scroll curves. The project rail renders the recovered surface shader in native WebGL 2, including its camera, lighting, cursor dents, and movement that responds to scroll speed. The image carries into the expanded viewer and returns to the gallery on close.

Lenis uses the reference's scroll smoothing settings. Section backgrounds transition through a perceptual colour space, with text contrast maintained throughout. Navigation hides on downward scrolling and returns when scrolling up or receiving keyboard focus. Links use the reference's rolling text and arrow feedback, and service descriptions expand smoothly.

The design follows the supplied reference: `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 7`, `VISUAL_DENSITY: 3`. Native CSS preserves its typography, spacing, colours, and section layouts; Motion handles interaction and scroll values. Preview-image provenance is recorded in `reference/images/sources.json`.

## Playback, responsiveness, and accessibility

Project cards initially load compressed posters. Mouse hover requests a muted preview after a short delay. Only one preview can play at a time. Leaving the card, moving it out of view, changing browser tabs, or opening the expanded player stops the preview and releases its source. Reduced motion and data-saving preferences suppress hover previews.

The lazy-loaded video dialog uses native playback controls, starts muted, supports seeking and keyboard dismissal, and restores focus when closed. Its surface transition carries the project image into the player and back; background motion pauses while the viewer is open. Mobile playback is inline. Empty-media and playback-error states are included.

The reference's inline mobile navigation is retained when it fits; phones below 360px use a full-screen menu. The project rail becomes a single column on smaller screens. Layouts have been checked at 1440px, 1280px, 768px, 390px, and 320px. Reduced motion disables liquid effects, parallax, and automatic previews and freezes the background animation.

SEO and social-sharing metadata come from the central configuration. Production emits prerendered page markup and hydrates it in React. Local fonts and responsive 640px, 960px, and full-size compressed posters are bundled into the site; actual videos are requested only when a preview or player is activated. Motion features and the gallery renderer load separately.

## Regenerate reference copies and assets

~~~powershell
rtk proxy npm.cmd run assets:setup
rtk proxy npm.cmd run typecheck
rtk proxy npm.cmd run build
~~~

Asset setup copies the reference CSS and textures, recovers the surface shaders, compresses the seven preview images, recovers any missing reference fonts, and regenerates the favicon and sharing image. It retains the supplied editor wordmark SVGs and leaves the original downloaded archive untouched.

## Git checkpoints

The project is published on the `codex/melon-reference` branch of [portfolio-project--1](https://github.com/srijeetcoder/portfolio-project--1/tree/codex/melon-reference).

During active refinement, `scripts/checkpoint-push.ps1` checks TypeScript, commits changes, and pushes the branch every 120 seconds. It verifies the workspace, branch, and remote, and does not force-push. Its control files and logs live in the ignored `.qa/` directory. Local fixture checks suspend new commits so test media and temporary configuration are not published.
