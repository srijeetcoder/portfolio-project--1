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
        warmup.worker.ts      Prepares the GPU shader cache outside the UI thread
      mountReferenceBackdrop.ts  Loads and prepares the reference background shaders
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

The grain gradient uses the reference's Paper shaders, with a local texture fallback. The hero poster is an eagerly loaded image in the prerendered HTML. GPU preparation begins after the first contentful paint so the artwork reaches the screen before the shader driver initializes. Background setup loads separately from page hydration, and its shader compiles asynchronously and renders in an OffscreenCanvas worker where supported. The reference colours are stored as their exact sRGB bytes, avoiding runtime canvas readbacks. Its liquid text effect uses the reference's blur, alpha threshold, and scroll curves. The project rail renders the recovered surface shader in native WebGL 2, including its camera, lighting, cursor dents, and movement that responds to scroll speed. A worker prepares the driver's shader cache before the gallery initializes, and poster pixels are prepared asynchronously. The image carries into the expanded viewer and returns to the gallery on close.

Lenis uses the reference's scroll smoothing settings. Native hash, keyboard, and scrollbar movements are adopted before the next wheel gesture. Section backgrounds transition through a perceptual colour space, with text contrast maintained throughout. Navigation hides on downward scrolling and returns when scrolling up or receiving keyboard focus. Links use the reference's rolling text and arrow feedback. Body copy reveals through individually measured line masks with the reference's quartic easing and desktop/phone timing. Service headings and separator rules reveal independently; descriptions expand smoothly. Liquid headings have no extra block fade, and their reveal ranges update when crossing the phone breakpoint.

The scroll experience has three staged sequences, built with native sticky positioning and Motion values. The opening holds briefly while the wordmark and background move into a closer camera view and the introduction hands off to the project rail. On desktops where its content fits, About holds while its liquid lettering resolves. The showreel uncovers, moves out of the offset grid, and scales into a centered theater frame that fits the viewport. Reversing the scroll restores each composition. Phone sequences use shorter travel, and long About content stays in normal flow. Reduced motion and the static HTML fallback disable pinning and camera movement. Hidden hero actions become inactive until scrolling back brings them into view.

The design follows the supplied reference: `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 8`, `VISUAL_DENSITY: 3`. Native CSS preserves its typography, spacing, colours, and section layouts; Motion handles interaction and scroll values. The motion intensity reflects the curved project surface, liquid lettering, masked line reveals, and coordinated image reveals. The reference easing functions and reveal timings are centralized in `src/lib/motionSettings.ts`. Preview-image provenance is recorded in `reference/images/sources.json`.

## Playback, responsiveness, and accessibility

Project cards initially load compressed posters. Mouse hover requests a muted preview after a short delay. Only one preview can play at a time. Leaving the card, moving it out of view, changing browser tabs, or opening the expanded player stops the preview and releases its source. Reduced motion and data-saving preferences suppress hover previews.

The lazy-loaded video dialog uses native playback controls, starts muted, supports seeking and keyboard dismissal, and restores focus when closed. Its surface transition carries the project image into the player and back; background motion pauses while the viewer is open. Mobile playback is inline. Empty-media and playback-error states are included.

The reference's inline mobile navigation is retained when it fits; phones below 360px use a full-screen menu. Keyboard focus keeps the navigation visible while scrolling. The project rail becomes a single column on smaller screens, with measured caption space and a clear gap before the following project. The keyboard outline follows the gallery's curved surface. Offscreen cards release their horizontal transforms so later sections do not create horizontal scrolling, and live card replacements rebuild their renderer targets.

Layouts have been checked at 1440x900, 1280x720, 1280x600, 768x1024, 768x600, 390x844, 320x720, and 320x600. Short screens retain visible hero actions; the background mask is separate from the readable introduction and links. All sections were inspected at desktop and phone sizes. Reduced motion disables liquid effects, parallax, and automatic previews and freezes the background animation; the native gallery retains correct caption spacing when WebGL is unavailable.

Isolated browser fixtures verified muted playback, lazy video sources, category filters, portrait presentation, seeking, error retry, showreel playback, reverse viewer transitions, and focus restoration on desktop and phone. The fixtures live in the ignored `.qa/` folder and are injected only into test browser sessions. They do not change the site's media manifest, personal configuration, or original videos.

SEO and social-sharing metadata come from the central configuration. Production emits prerendered page markup and hydrates it in React. Local fonts and responsive 640px, 960px, and full-size compressed posters are bundled into the site; actual videos are requested only when a preview or player is activated. Motion features and the gallery renderer load separately.

The final production Lighthouse audits scored **99 desktop / 88 simulated mobile** for performance and **100** for accessibility, best practices, and SEO on both devices. Desktop LCP was 0.9 seconds with 20 ms of blocking time; simulated mobile LCP was 3.9 seconds with 30 ms of blocking time. Both recorded zero layout shift. The slower mobile simulation remains limited by the large hero asset's paint timing; results should be measured again with the owner's final footage and content.

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
