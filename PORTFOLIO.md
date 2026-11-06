# Lemar Paras portfolio foundation

The existing React, Vite, and Tailwind setup is preserved. Section reveals use CSS and IntersectionObserver. Phase 3 adds Three.js and React Three Fiber for a lazy-loaded decorative hero sculpture; animation and pointer movement use refs rather than per-frame React state updates.

## Source map

- `src/App.jsx`: page composition, skip link, and footer.
- `src/data/portfolio.js`: contact details, navigation, skills, projects, and experience. Null contact values represent missing information and never create fake links.
- `src/components/layout/Navigation.jsx`: sticky navigation, current section tracking, and mobile disclosure with Escape support.
- `src/components/ui/`: shared arrow, section heading, and isolated future scene container.
- `src/hooks/useSectionMotion.js`: section reveal enhancement and reduced-motion handling.
- `src/sections/`: Hero, About, Skills, Projects, Experience, and Contact.
- `src/index.css`: design tokens, layouts, responsive rules, interaction styles, and animation system.
- `index.html` and `public/favicon.svg`: page metadata and personal favicon.

## Editing content

Edit `profile` in `src/data/portfolio.js` for name, title, introduction, location, education, biography, availability, portrait, email, GitHub, LinkedIn, and résumé. Hero, About, navigation, the education timeline entry, contact, footer branding, and build-time metadata read from this configuration. See the Phase 5 setup guide below for exact examples. Leave unknown values `null`.

Replace the labeled portrait placeholder in About with a real portrait when supplied. Keep explicit image width/height or aspect ratio to prevent layout shifts, provide meaningful alt text, and use lazy loading below the fold.

All five projects use supplied screenshots: ARMS, CSAP, SEAMS, e-commerce, and Lost and Found. Confirm missing descriptions, technologies, personal contributions, dates, and URLs before publishing them. ARMS AI support relates to defense scheduling/conflict avoidance, not manuscript review. See the current Projects redesign and screenshot integration notes below for presentation and metadata handling.

Experience now includes the education dates, leadership terms, and recognitions explicitly supplied in the Experience redesign brief. Unknown teaching/OJT and capstone dates are omitted. No employment, proficiency scores, grades, rankings, or achievement statistics were invented.

## Contact delivery

The contact form currently prepares an encoded email draft and requests the visitor's email application. Accessible inline validation checks required fields, email format, and length limits before the handoff. The website does not deliver the message. A copy fallback exposes the address and prepared draft if no email app opens; entered form values remain intact. The integration-ready delivery adapter remains disabled until a real same-origin server endpoint is configured and verified.

## Interactive 3D hero (Phase 3)

`src/components/ui/FutureScene.jsx` owns viewport visibility, motion/input preferences, a static SVG fallback, and a local error boundary. It lazy-loads `src/components/three/OrbitalCanvas.jsx` only when eligible and visible. The current scene contains a strong elongated faceted core, three elliptical rings, and one small orbital accent; see the sculpture redesign notes below. There are no external assets, postprocessing, shadows, controls, or Drei dependency.

Frame-rate-independent damping and delta-based rotation update refs. Pointer tilt and a small scale response apply only to a fine mouse pointer. The canvas ignores pointer events, preserving normal touch scrolling. DPR is limited to 1–1.5. The render loop stops outside the viewport and when the page is hidden. Fiber owns declarative geometry/material disposal; custom observer, context-loss, preference, and visibility listeners are cleaned up.

The static SVG is shown during loading, for reduced motion, unsupported APIs/WebGL, lazy-import or rendering errors, and WebGL context loss. Context loss switches to the fallback for the rest of that mount; reloading allows a fresh attempt. No essential content depends on the scene. A reserved square avoids layout shifts; a dedicated mobile row prevents text overlap. Camera clearance includes the outer ring and hover scale. Actual GPU/device appearance still requires manual browser review.

## Active navigation (Phase 3)

`src/hooks/useActiveSection.js` compares all section positions at most once per animation frame during scroll. The reading line is based on the sticky header and current CSS scroll-padding. This avoids choosing whichever IntersectionObserver entry happened to arrive last. Hash changes trigger measurement rather than forcing the selected link. ResizeObserver accounts for layout changes; reaching the document bottom selects Contact even on a tall screen. The mobile disclosure and Escape behavior remain intact.

`src/utils/activeSection.test.js` covers desktop/mobile anchor offsets, scrolling back with a retained hash, tall sections, page top, and the final section at document bottom.

## Commands (PowerShell)

```powershell
Set-Location 'C:\Users\Admin\Documents\MyPortfolio\lemar-portfolio'
npm run lint
npm run build
node src/utils/activeSection.test.js
npm test
npm run dev
```

Run `npm run dev` manually; no development server was started during implementation. To inspect the production output instead, use `npm run preview` after a successful build.

## Verification

Phase 3 production build and configured Oxlint check passed, with no lint warnings. All six navigation regression tests passed using `node src/utils/activeSection.test.js`; direct execution avoids this environment's restriction on the test runner spawning child processes. No browser visual, interaction, or GPU checks have been performed. Responsive rules were reviewed in source at 600px, 900px, and 1100px breakpoints. No development server or browser watcher was started.

Direct dependencies added: `three@0.187.0` and `@react-three/fiber@9.8.2`, with their transitive dependencies recorded in the lockfile. `npm ls --depth=0` reports a valid installed dependency tree. The install reported zero vulnerabilities. The separately loaded 3D bundle is approximately 921 kB minified / 243 kB gzip, triggering Vite's 500 kB chunk advisory. It is already isolated behind a dynamic import; reduced-motion and unsupported-API visitors do not request it. The advisory was not suppressed. Real device GPU cost still requires manual measurement.

Implementation references: [Fiber Canvas configuration and fallback](https://r3f.docs.pmnd.rs/api/canvas), [Fiber performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance), and [React 19 compatibility in Fiber v9](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide).

For manual browser QA: inspect desktop, tablet, and 320px mobile widths for overflow; Tab through navigation and controls; open/close the mobile menu with Escape; navigate section anchors; open every project dialog and close with Escape; enable reduced motion; check invalid and valid form submissions. Confirm the preview notice is shown and no delivery is claimed.

For Phase 3, move the mouse over the sculpture and away again; verify it does not capture touch scrolling. Click Projects and then scroll upward/downward to check the highlighted section independently of the URL hash. Open `/#projects` directly and use browser Back/Forward. Toggle reduced motion while the page is open and confirm the static fallback. Disable WebGL and reload to verify the fallback. Scroll the sculpture offscreen or switch tabs and inspect rendering activity in browser performance tools. Check project-dialog focus containment, Escape close, and return to its trigger. Review camera framing at desktop and mobile widths. These are manual checks, not claims of completed browser testing.

## Phase 4 — interaction refinement

No dependencies added. The existing 3D scene, active-section hook, content, and project placeholders are preserved.

Created:
- `src/components/ui/CursorCompanion.jsx`: a small eased pointer companion with button/project states. The native cursor remains available throughout. It hides over form controls, editable text, disabled buttons, dialogs, keyboard activity, and when the pointer leaves the window.
- `src/components/ui/Magnetic.jsx` and `src/hooks/usePointerSurface.js`: reusable, bounded pointer movement for hero actions and project-title buttons, plus subtle conceptual-preview depth. Focus resets movement; all essential actions work without hover.
- `src/utils/fineMotion.js`: shared preference subscription and cleanup for fine-pointer, non-reduced-motion enhancements.
- `src/components/ui/RevealText.jsx`: accessible real-text word masks preserving whitespace, accents, and line breaks.
- `src/components/ui/AnimatedDialog.jsx`: native dialog opening/closing, Escape and backdrop handling, scroll locking, labeled description, and cancellable Web Animations. Closing completes before native focus restoration. Dragging from dialog content onto the backdrop does not dismiss it.
- `src/styles/interactions.css`: scoped interaction styles, staggered mobile navigation, project/arrow feedback, bounded directional reveals, and motion fallbacks.

Modified: `src/App.jsx`, `src/main.jsx`, `src/components/ui/SectionHeading.jsx`, `src/hooks/useSectionMotion.js`, `src/sections/Hero.jsx`, `src/sections/Projects.jsx`, `src/sections/Contact.jsx`, and this document.

Pointer updates are event-driven and coalesced with requestAnimationFrame. There are no new perpetual JavaScript loops or per-pointer React state updates. Component listeners, queued frames, animation handles, and preference subscriptions are cleaned up. Section stagger is capped at 130ms and heading word stagger at 315ms. The scroll indicator now settles after three cycles. Touch and reduced-motion users retain the full native interface. A live reduced-motion change stops pointer enhancements and finishes any dialog transition immediately.

Validation: configured lint and production build passed; all six existing navigation regression tests passed. The pre-existing Vite advisory for the separately lazy-loaded Three.js bundle remains. No browser, screen-reader, device, or GPU tests were performed; the checks below are still manual.

### Manual Phase 4 checks

1. Run the commands above. On desktop with normal motion, move the pointer across empty space, hero actions, project previews, and project titles. Confirm the small cursor companion, bounded button movement, and preview depth; confirm the native cursor still works. Select paragraph text and use the form inputs normally.
2. Press Tab through the page. Confirm visible focus, stationary focused buttons, correct navigation highlighting, and Enter activation. Open each project's preview and title trigger; confirm the correct project content appears, Tab stays within the native dialog, Escape/Close/backdrop dismiss smoothly, and focus returns to the trigger. Try rapid open/close and dragging a text selection toward the backdrop.
3. Enable reduced motion before loading, then toggle it while the page is open and during a dialog transition. Confirm no cursor/magnet effect, no hidden headings, immediate dialog transitions, and the established static 3D fallback.
4. Check 320px phone, tablet, and desktop widths. Confirm no overflow, mobile button widths remain balanced, touch scrolling works, and the mobile menu opens/closes with staggered links. Verify Escape, focus, and active-section behavior still work.
5. Scroll through all sections in both directions. Reveals should run once, headings should remain readable, and paragraph copy should not stagger. Navigate directly to `/#projects`, manually scroll back to Skills, and confirm the active link follows the viewport.
6. In browser performance tools, confirm pointer work stops when idle and the existing 3D loop pauses offscreen/in a hidden tab. This has not been profiled automatically.

## Phase 5 — personal content and case studies

No dependencies added. All preceding animations, the 3D scene, conceptual project previews, and active-section tracking are retained. Unknown personal information, project contributions, development status, dates, screenshots, and real project links remain pending. ARMS AI support is limited to defense scheduling and conflict avoidance; no AI manuscript-review capability is claimed.

### Edit personal information

1. Open `src/data/portfolio.js` in VS Code.
2. Change the values in `profile`. Name, professional title, introduction, location, education, biography paragraphs, internship note, and contact invitation are centralized here.
3. Edit `availability.open`, `availability.shortLabel`, and `availability.label` together to reflect your actual availability. A false `open` value removes the green availability dot.
4. Supply your actual email address (without `mailto:`) and complete `https://` GitHub/LinkedIn profile URLs. Leave unknown fields as `null`, not `'#'` or a fictional address. Missing or invalid links show pending text.
5. Education dates remain `null` until confirmed. The education timeline reads this configuration; teaching and leadership dates are edited in the `experience` array.
6. After editing, save and run the checks below. Rebuild before publishing so static SEO metadata updates too.

### Add a portrait and résumé

Place your real portrait at `public/images/profile.webp` (the filename is an example; no image is supplied). Set `profile.portrait` to an object containing `src`, descriptive `alt`, and the image's actual numeric pixel `width` and `height`. Example shape:

```js
portrait: {
  src: '/images/profile.webp',
  alt: 'Professional portrait of Lemar Paras',
  width: 800, // Replace with the actual image width.
  height: 1000, // Replace with the actual image height.
},
```

Use a compressed WebP, AVIF, or JPEG file. Do not upscale unnecessarily. Portrait and screenshot images load lazily, decode asynchronously, and reserve dimensions. A failed image shows an explicit unavailable state. No real portrait is bundled yet.

Put your real PDF in `public/documents/lemar-paras-resume.pdf`, then set `profile.resume` to `'/documents/lemar-paras-resume.pdf'`. The filename is only a setup example; the PDF must actually exist. Hero and contact links then expose a download. Use a same-origin file for reliable browser download behavior; cross-origin hosts may open the file instead. Test that it is the correct, current document before deployment.

### Edit project case studies

Every entry in `projects` supports:

- `name`, `subtitle`, `description` (overview), and `details`.
- `problem`, `purpose`, `features` (array), and `technologies` (array).
- `contributions` (your actual role), `developmentStatus` (actual current state).
- `screenshots` (array), `repository`, and `demo` (real complete web URLs).

The `status` field is a content-confirmation label; it is separate from actual development status. Keep unconfirmed text fields `null` and unconfirmed lists empty. The dialog displays descriptive pending states. ARMS has only the features and stack confirmed in the brief. AERIS and Lost & Found intentionally omit unconfirmed features/technologies. Do not add metrics or achievements without evidence.

### Add real screenshots

Use `public/images/projects/arms/`, `public/images/projects/aeris/`, or another clearly named project folder; create the subfolder as needed. Files under `public/` are referenced without the `public` prefix.

After the screenshot file really exists, add an object to that project's `screenshots` array:

```js
{
  src: '/images/projects/arms/submissions.webp',
  alt: 'Describe what this actual screen shows and what matters about it',
  caption: 'A concise description of the supplied screenshot',
  width: 1440, // Replace with this screenshot's actual width.
  height: 900, // Replace with this screenshot's actual height.
}
```

This is a configuration example, not a supplied screenshot. The responsive gallery is empty until real materials are added. Use informative alt text, actual dimensions, and compressed files. The gallery supports a keyboard-accessible full-size link that opens the original in a new tab. Check the link, caption, mobile layout, and failed-image fallback. Existing conceptual card previews stay in place.

### Connect real contact delivery later

There is no backend or selected delivery provider in this project. `contactDelivery` defaults to `{ endpoint: null, verified: false }`. Preview submissions validate locally and never call a network endpoint. Contact messages are not put in localStorage.

1. Choose a delivery provider and a hosting environment that can run a same-origin server function. A static-only host cannot execute the endpoint by itself.
2. Implement a server route such as `/api/contact`. The frontend adapter is in `src/services/contact.js`; UI feedback is in `src/components/ui/ContactForm.jsx`.
3. Accept a POST JSON body with `name`, `email`, `message`, and a blank `website` honeypot. Independently validate required fields, email syntax, lengths (120/254/5000 characters), content type, request size, and honeypot on the server. Client validation is usability, not a security boundary.
4. Add server-side rate limiting, appropriate origin/CSRF controls, and provider-specific abuse protection. The honeypot is only one small deterrent. Do not treat the front-end `verified` flag as authorization.
5. Keep provider credentials in server-only environment variables. Never put secrets in `src/`, public files, or Vite `VITE_*` variables, which are included in browser code. Avoid logging message bodies or email addresses unnecessarily.
6. Use a verified sender controlled by you, with the validated visitor email as reply-to. Treat user input as plain content; do not interpolate it into mail headers or unsanitized HTML. Select a sensible privacy/retention policy before receiving real messages.
7. Return an error HTTP status on failure (429 for rate limits). Return a 2xx JSON response with `{ "delivered": true }` only after the provider confirms the operation required by your delivery contract. Do not merely echo the flag before calling the provider. The UI does not claim success for an empty, malformed, or generic successful response.
8. Verify receipt in the actual destination inbox and test failures/timeouts/rate limits. Provider acceptance alone cannot prove inbox arrival. Only then set the real route in `contactDelivery.endpoint` and set `verified: true`.

The interface automatically changes from preview to send mode when the configuration is enabled. It supports a loading state, disables duplicate submissions, times out after 12 seconds, aborts on unmount, displays explicit errors, and preserves entered text. A timeout may occur after the server accepted a request, so the error deliberately says delivery could not be confirmed. No real delivery was tested or enabled during Phase 5.

### Configure SEO and sharing

Edit `seo` in `src/data/portfolio.js`. Its default title and description derive from `profile`. Vite's small `portfolio-metadata` transform writes title, description, Open Graph, and Twitter card metadata into built HTML, so sharing crawlers do not depend on running React.

Leave `seo.siteUrl`, `seo.socialImage`, and `seo.socialImageAlt` null until you have the actual production URL and a real approved sharing image. After deployment details are known:

- Set `siteUrl` to the final canonical HTTPS page URL.
- Put your real sharing image in `public/images/` and set `socialImage` to its root-relative path or actual absolute URL. Provide meaningful `socialImageAlt` too.
- Rebuild and inspect `dist/index.html`. Relative sharing images need `siteUrl` to produce absolute sharing URLs.

No placeholder social image, canonical domain, sitemap, or social account handle is published. Existing English language, viewport, theme-color, and personal favicon configuration remain. A noscript notice explains the React app's JavaScript requirement. JavaScript is still required to render the portfolio content; this phase does not add server rendering.

### Deployment prerequisites

- Supply and verify actual contact/profile links, résumé, portrait, screenshots, case-study details, dates, production URL, and sharing image as available. The site can render honest pending states until then.
- Run lint, both test files, and the production build. Deploy the contents of `dist/` using an HTTPS-capable static host; do not deploy `node_modules/` or server credentials.
- Root-relative assets currently assume hosting at the domain root. Hosting under a subdirectory requires reviewing Vite `base` plus every root-relative public URL and server route.
- The optional contact route requires an actual server/serverless integration at the same origin; static hosting alone leaves the preview in place.
- Verify deployed metadata, downloadable files, gallery links, keyboard navigation, mobile layouts, and WebGL fallback. Keep the existing lazy-loaded 3D bundle size advisory visible; it remains approximately 243 kB gzip. No 3D complexity or dependency was added in this phase.

### Phase 5 validation and manual testing

Executed: `npm run lint` (clean), `node src/utils/activeSection.test.js` (6 passing), `node src/utils/portfolio.test.js` (10 passing), and `npm run build` (successful, existing lazy-3D chunk size advisory). Adapter tests use mocked fetch responses and do not send email. No development server was started. No browser/device, screen-reader, live delivery, real screenshot, or deployed-sharing test was performed.

```powershell
Set-Location 'C:\Users\Admin\Documents\MyPortfolio\lemar-portfolio'
npm run lint
node src/utils/activeSection.test.js
node src/utils/portfolio.test.js
npm run build
npm run dev
```

Manually open all three case studies via keyboard and mouse. Check pending states, modal scrolling, Escape, focus containment, and focus return. Submit an empty form, malformed email, whitespace-only fields, and valid preview fields; verify inline errors, first-error focus, and an explicit not-sent message with no network request. Confirm previous 3D, cursor/magnetic interactions, active navigation, reduced-motion behavior, and mobile layouts still work. Once real images and links are configured, check actual loading, alt text, dimensions, full-size links, résumé downloads, and social destinations. Inspect `dist/index.html` for sharing tags before publishing.

Phase 5 files created: `src/utils/content.js`, `src/utils/metadata.js`, `src/utils/portfolio.test.js`, `src/services/contact.js`, `src/components/ui/ContactForm.jsx`, `src/components/ui/PortfolioImage.jsx`, `src/components/ui/ScreenshotGallery.jsx`, `src/components/ui/ProjectCaseStudy.jsx`, and `src/styles/content.css`.

Phase 5 files modified: `src/data/portfolio.js`, `src/sections/Hero.jsx`, `src/sections/About.jsx`, `src/sections/Projects.jsx`, `src/sections/Contact.jsx`, `src/components/layout/Navigation.jsx`, `src/components/ui/AnimatedDialog.jsx`, `src/App.jsx`, `src/main.jsx`, `vite.config.js`, `index.html`, and this document. Project titles now form proper level-three headings; case-study dialogs reset their scroll position on opening. Built HTML metadata was also checked for exactly one title/description and the omission of unknown production-domain/image tags.

## Confirmed personal information update — current configuration

This update supersedes earlier placeholder instructions and historical references to AERIS above.

- Contact email: `paraslemar@gmail.com`.
- GitHub: `https://github.com/Lemar-Paras`.
- LinkedIn: `https://www.linkedin.com/in/lemar-paras-0b924a334/`.
- Facebook: `https://www.facebook.com/lemarspakatie`.
- Instagram: `https://www.instagram.com/lmr_paras/`.
- No Twitter/X profile is configured or rendered. Existing Twitter card metadata describes social sharing only; it is not an account link.

`src/components/ui/SocialIcons.jsx` is the shared icon row used by Hero and Contact. It uses inline, recognizable SVGs with circular 44px targets, visible focus, hover/focus tooltips, and reduced-motion support. The native email link is exactly `mailto:paraslemar@gmail.com`; the four external profiles use a new tab with `noopener noreferrer`. Social destinations are centralized in `profile` and `profileLinks` rather than hardcoded in the components. No icon dependency was installed.

The original résumé was found at `public/LEMARPARASBSIS4A(RESUME) (1).pdf`. The configured URL is `/LEMARPARASBSIS4A(RESUME)%20(1).pdf`; spaces are URL-encoded. The hero's prominent lime `Download Resume` link sits beneath its social icons and uses the download attribute. Contact includes the same download. The original PDF and the accompanying DOCX were not modified.

The portrait was found at `public/images/lemar.jpg`, with actual dimensions 1254 × 1254. It was visually inspected, wired into the existing About area, and left unedited. The square responsive frame matches its natural ratio; descriptive alt text, lazy loading, and explicit dimensions remain in place.

AERIS is not Lemar's project and has been removed from the portfolio data, project preview branch, and related styling. The two entries now appear as ARMS (01) and provisional Lost & Found (02). The latter uses an editorial preview-and-copy row on desktop and stacks on mobile. No replacement project was invented. The supplied `public/images/projects/arms.jpg` file was left unchanged; integrating additional project media was outside this personal-information update.

Created: `src/components/ui/SocialIcons.jsx`.

Modified: `src/data/portfolio.js`, `src/utils/content.js`, `src/sections/Hero.jsx`, `src/sections/Contact.jsx`, `src/sections/Projects.jsx`, `src/index.css`, `src/styles/content.css`, and this document. No dependencies added; the 3D scene and animation utilities were preserved.

Validation completed: clean lint, all 16 existing tests passing, successful production build. Exact configured social destinations were checked against the supplied URLs. The configured PDF/portrait URLs resolve to real source files and matching production output files; SHA-256 comparisons confirm unchanged copies, and the résumé has a PDF header. No AERIS or Twitter/X profile links remain in application source. Live social-account availability and browser interactions were not tested. The pre-existing lazy 3D chunk size advisory remains.

Manual checks: run the existing PowerShell commands above, then inspect desktop and 320px mobile layouts. Tab through both icon rows and verify tooltip visibility; activate email to open your mail application; verify all four social profiles open in new tabs; download the résumé and inspect the PDF; check the complete portrait and natural proportions; inspect both project entries, reduced motion, and unchanged 3D behavior. No development server or duplicate browser session was started.

## Five-project showcase update — current project list

This section supersedes earlier project counts and placeholder-media notes above. The featured projects are now:

1. ARMS — Automated Research Management System with AI Support.
2. CSAP Landing Page — Colegio de San Antonio de Padua Landing Page.
3. School Event Attendance Management System.
4. Simple E-Commerce Shop System.
5. Lost and Found Application.

Only these five entries are in `projects`; the previously excluded project remains absent from user-facing data. Personal information, social icons, portrait, Download Resume, native dialogs, animation utilities, and the 3D hero are preserved. No dependencies were added.

### Actual project screenshots

The entire `public/images/projects/` tree was inspected. Exactly two screenshots were found and visually examined:

- ARMS: `public/images/projects/arms.jpg` — 1882 × 949. Public path: `/images/projects/arms.jpg`. It shows the ARMS landing page and research journey overview.
- CSAP: `public/images/projects/landingpage.png` — 1899 × 808. Public path: `/images/projects/landingpage.png`. It shows the school landing-page mockup with navigation, campus imagery, and program-selection area.

These original files were not renamed, recompressed, edited, or deleted. Both lead previews reserve the screenshot's actual aspect ratio, use `object-fit: contain`, lazy loading, asynchronous decoding, and descriptive alt text. Both are also included in their respective screenshot galleries with existing full-size links. There were no additional screenshots to integrate.

`src/components/ui/ProjectPreview.jsx` renders real screenshots when configured and retains conceptual fallback artwork if an image fails. The attendance and shop artwork is abstract geometry, not a fabricated application interface. All conceptual previews are explicitly labeled as not application screenshots. Future real screenshots can be added through the existing `screenshots` array, and an optional `previewImage` object selects the featured image.

### Layout and live links

ARMS and CSAP occupy the first two full-width editorial positions. Attendance and the shop follow as large paired entries; Lost and Found closes with an editorial image-and-copy row on desktop. Mobile stacks all entries. Long titles wrap, and screenshot proportions are maintained. The existing pointer/hover, magnetic-title, section reveal, reduced-motion, and native dialog behavior remain.

The following exact supplied URLs appear on both their project cards and case-study dialogs:

- ARMS: `https://arms.free.nf/?i=1`.
- CSAP: `https://csap-one.vercel.app/`.

Buttons say `View Live Project`, use `target="_blank"` and `rel="noopener noreferrer"`, and have descriptive accessible labels indicating a new tab. URL equality was verified against the brief. Live public availability, redirects, sign-in requirements, and external website functionality were not verified; no public-accessibility claim is made. Other projects do not display live buttons without real URLs.

### Confirmed content and pending fields

ARMS retains its confirmed Laravel/PHP/MySQL/Blade/Tailwind/Alpine/Vite stack. AI support concerns defense scheduling/conflict avoidance, not AI manuscript review. Personal contributions, the problem statement, development status, and repository remain pending.

CSAP is explicitly presented as a static front-end mockup. It presents school, academic-program, institutional, and organization information. A functioning admissions backend, enrollment system, live school database, and official production-site status are not claimed. Its technology stack, personal contributions, problem statement, and repository remain pending.

The attendance entry contains only the supplied general description. Verification methods, features, technologies, roles, contributions, screenshots, and status are pending. The shop entry contains only the supplied general description; payments, cart/order/inventory/authentication/admin functionality and technologies are not claimed. Lost and Found retains its provisional description and pending technical details. No achievements, metrics, or replacement projects were invented.

### Files and verification

Created: `src/components/ui/ProjectPreview.jsx`.

Modified: `src/data/portfolio.js`, `src/sections/Projects.jsx`, `src/components/ui/ProjectCaseStudy.jsx`, `src/styles/content.css`, and this document.

Executed: clean `npm run lint`, both existing test files (16 total passing), and successful `npm run build`. One-shot assertions verified all five names, IDs 01–05, the exact two demo URLs, pending stacks/screenshots/demo fields for the remaining projects, exclusion from user-facing data, valid screenshot descriptions/dimensions, existing image paths, and identical SHA-256 hashes between the original public screenshots and built copies. The pre-existing lazy 3D chunk advisory remains. No browser/device or live website testing was performed.

Manual test commands:

```powershell
Set-Location 'C:\Users\Admin\Documents\MyPortfolio\lemar-portfolio'
npm run lint
node src/utils/activeSection.test.js
node src/utils/portfolio.test.js
npm run build
npm run dev
```

Check all five entries at desktop, laptop, tablet, and 320px phone widths. Verify full-ratio ARMS/CSAP images, title wrapping, conceptual labels, correct numbering, and no overflow. Open each dialog through its preview/title using mouse and keyboard; verify content, real screenshot galleries, full-size links, Escape, scrolling, and focus return. Open both live projects and inspect their actual availability manually. Temporarily block each image request in browser tools to check the conceptual fallback, then restore requests. Verify reduced-motion behavior and unchanged social/resume/3D interactions. No server or duplicate browser session was started automatically.

## Phase 6 — current layout and visual system

This phase supersedes the earlier spacious full-width showcase layout, multi-block hero, decorative headlines, and preview-only form presentation. No dependencies or font downloads were added. All five projects, original media, exact live/social URLs, portrait, résumé download, 3D scene, cursor, magnetic interactions, native dialogs, and reduced-motion behavior remain.

### Design and typography

`src/index.css` now owns section layouts and responsive rules. `src/styles/content.css` contains shared media/form/social/case-study controls, and `src/styles/interactions.css` contains motion. The conflicting earlier full-width featured-project rules, one-off last-project layouts, separate hero-footer social layout, and tablet contact-grid rules were removed rather than covered by another override stylesheet.

Tokens at the top of `index.css` define a 1160px maximum container, fluid gutters, section spacing (72–100px desktop, 76px tablet, 60px phone), heading gaps (28–48px), paragraph spacing, body/label sizes, line heights, borders, buttons, and header/anchor offsets. Shared responsive breakpoints remain 900px for navigation/tablet and 600px for phones, with 1100px hiding the small availability label. CSS variables cannot be used directly as ordinary media-query breakpoints, so these breakpoint values are documented beside the tokens and kept in the relevant media blocks.

Typography uses the local Segoe UI/Arial sans-serif stack throughout, with mono reserved for small section labels and project numbering. No remote fonts are required. Body text is generally 14–15px, technical tags 11–12px, and section headings 30–44px. Oversized hero branding remains; decorative outlined surname text, oversized section slogans, and italic heading accents were removed. Lime is reserved for primary actions and restrained accents.

### Section changes

- Hero: branding, title, introduction, action buttons, icon row, and résumé now form one left-hand composition beside the unchanged orbital sculpture. Social icons no longer occupy a separate remote hero-footer block. The résumé remains directly beneath the hero social row. Mobile stacks the composition with a smaller scene footprint; renderer quality and scene geometry are unchanged.
- About: a bounded 330px portrait sits beside concise education, development, teaching, and leadership copy. The portrait file is unchanged and stays square. Repetitive motivational headings were replaced with a direct title and role.
- Skills: compact categories without decorative numbering or fixed oversized row heights; consistent readable tags and no added technical claims.
- Projects: all five entries use a preview/details row on desktop and stack on phones. Preview frames share bounded proportions and a 310px maximum height. `object-fit: contain` preserves the complete ARMS/CSAP screenshot content, with letterboxing where needed. Original full-resolution images remain in the gallery. Compact tags and adjacent Project details / Live project actions keep information connected to previews. Long titles wrap; original demo URLs and secure new-tab behavior remain.
- Experience: smaller row spacing with readable role, organization, pending dates, and short descriptions. Existing timeline animation is retained.
- Contact: a two-column layout with `Let's connect.`, one short invitation, `paraslemar@gmail.com`, and one five-icon row on the left. No duplicate résumé or social-text list. The right column is a restrained charcoal form panel with visible labels, consistent fields, and clear focus/error states. On phones, the columns stack. The résumé remains accessible in Hero.

### Contact email-draft behavior

No provider is configured and no message is sent by this site. The direct email link is the primary contact action. The form explains that direct sending is unavailable and offers `Continue in email app`, which validates fields and constructs an encoded `mailto:` draft. The visitor reviews and sends it in their own email app. Sender name and supplied reply email are included as plain body text. An email app/handler must be configured on the device; requesting it cannot prove that it opened or that a message was sent. The UI uses explicit feedback, retains entered text, and falls back to the visible email address if navigation throws. Very long drafts may be limited by the visitor's browser or mail application.

The existing server-delivery adapter, honeypot, future verified-endpoint configuration, and loading/error handling remain intact. They are used only if a real delivery endpoint is configured and verified later. A new automated test checks draft encoding, recipient integrity, invalid fields, and honeypot rejection. No real email was sent during implementation.

### Navigation and motion review

The existing viewport-position tracker was reviewed. It compares all section boundaries and reads the actual sticky-header bottom and CSS scroll-padding; it does not force selection from the hash. The updated CSS provides 80px header / 96px anchor offset on desktop and 72px / 88px on tablet/phone. All six existing navigation tests passed. No new tracking bug was confirmed through source review; the screenshot-reported mismatch still needs manual browser reproduction, especially on initial hash loads and browser history navigation. No speculative hash-forcing behavior was added.

Word stagger is capped at 150ms and peer stagger at 80ms. Reveals have shorter, smaller movements, and project hover zoom is reduced. Cursor/magnetic effects, the 3D visibility pause, and all cleanup/reduced-motion paths remain. No animation library was added.

### Phase 6 verification

Executed: clean lint, all 17 tests passing (six navigation plus eleven content/contact/metadata), and successful production build. Asset checks confirmed the original portrait, résumé, and both screenshots exist and match their production copies byte-for-byte. Exact project/social/email URLs, five sequential project IDs, and disabled direct delivery were checked. The pre-existing lazy 3D chunk size advisory remains; its code was not increased. CSS build parsing succeeds. Layout ownership was consolidated and stale conflicting selectors were removed.

Browser visual testing, actual viewport rendering, screen-reader testing, GPU profiling, external-site availability, and email-app launch were not performed. No development server or browser session was started. Responsive behavior was reviewed in source for the requested 1440, 1024, 768, 390, and 320px sizes; this is not a claim of rendered visual testing.

Manual checks:

```powershell
Set-Location 'C:\Users\Admin\Documents\MyPortfolio\lemar-portfolio'
npm run lint
node src/utils/activeSection.test.js
node src/utils/portfolio.test.js
npm run build
npm run dev
```

Inspect 1440/1024/768/390/320px widths for header alignment, hero proportions, complete screenshots, title wrapping, icon wrapping, and horizontal overflow. Test every anchor, initial `/#projects`, browser Back/Forward, manual scrolling, and the mobile menu. Open all project dialogs by keyboard/mouse, close with Escape, and check focus return. Confirm both live links, social icons, portrait, and résumé download. Test empty/invalid form fields, then prepare a short email draft and confirm the email app receives the correct destination, subject, and body without automatic sending. Toggle reduced motion and check all content remains readable. Validate 3D/cursor/magnetic behavior and image-failure fallbacks remain intact.

Files modified: `src/index.css`, `src/styles/content.css`, `src/styles/interactions.css`, `src/data/portfolio.js`, `src/sections/Hero.jsx`, `src/sections/About.jsx`, `src/sections/Skills.jsx`, `src/sections/Projects.jsx`, `src/sections/Experience.jsx`, `src/sections/Contact.jsx`, `src/components/ui/ContactForm.jsx`, `src/components/ui/ProjectCaseStudy.jsx`, `src/components/ui/RevealText.jsx`, `src/hooks/useSectionMotion.js`, `src/services/contact.js`, `src/utils/portfolio.test.js`, and this document. No new source files or dependencies were needed.

## Premium navbar redesign — current header

Only navigation and navbar styles changed in this update. Hero, sculpture, social icons, résumé, project showcase, contact flow, other sections, media, and content were not modified. No dependency was added. The accessible attachment contained the written reference description, but no current/reference screenshot files; design implementation followed the supplied visual proportions and requirements, without claiming screenshot comparison.

The header retains LEMAR® and exactly Home, About, Skills, Projects, Experience, and Contact. The availability indicator was removed from the navbar; the hero's availability remains. A lime `Let's Talk` anchor targets `#contact`. The far-right ivory rounded-square hamburger is available on desktop, tablet, and phone, and morphs between three lines and a close mark.

`src/styles/navigation.css` owns the header presentation: a subtly bordered obsidian container, 12px rounding, controlled gaps, restrained active/hover underlines, lime CTA, and visible focus states. Desktop height remains 80px (within the requested 76–84px range). Existing tablet/phone height is 72px. Existing CSS anchor offsets remain 96px desktop / 88px compact, so the section-position tracker continues to account for the actual sticky header. No section spacing or hero styles were changed. Old navbar-only selectors were removed from the shared layout/motion styles to avoid competing rules; the shared brand style used by the footer was preserved.

Inline links collapse at viewport widths of 1100px and below, before the CTA/menu group crowds them. The same six-link DOM list becomes the navigation panel at every size; it is not duplicated as another menu. On desktop the panel is a bounded two-column list. At 600px it becomes one column. At 480px and below the header CTA is hidden and the same Contact CTA is available inside the menu. Hidden compact navigation/CTA controls use `display: none` so they cannot receive focus. Panel height is limited to the available viewport and scrolls internally if needed. This is a non-modal disclosure, with no keyboard trap or scroll lock.

Opening the panel focuses its first link. Escape closes it and restores focus to the toggle. Pointer presses outside the navbar and keyboard focus leaving the navbar close it without stealing focus. Selecting any navigation destination or CTA closes the panel, with native hash navigation retained. Changing across the 1100px collapse breakpoint closes the panel and moves focus to the toggle if a focused inline link would become hidden. The existing `useActiveSection` implementation and its viewport-based selection logic are unchanged.

Created: `src/styles/navigation.css`.

Modified: `src/components/layout/Navigation.jsx`, `src/main.jsx` (stylesheet import), `src/index.css` (navbar-only style cleanup), `src/styles/interactions.css` (navbar-only style cleanup), and this document.

Executed: clean lint, all 17 existing tests passing, successful production build. One-shot assertions checked all six exact labels and section IDs, the single shared navigation mapping, both responsive CTA targets, ARIA control linkage, removed availability UI, and retained active-section hook. CSS compilation passed; collapse rules and width constraints were reviewed in source. The existing lazy 3D chunk size advisory remains. No browser visual, keyboard-interaction, or overflow tests were performed, and no development server or browser session was started.

Manual checks: run the commands from Phase 6 above, then inspect 1440px, 1101px, 1100px, 1024px, 768px, 481px, 480px, 390px, and 320px widths. Confirm the six inline destinations fit, then collapse without overlap. Activate the hamburger at every size; Tab/Shift+Tab through links, close with Escape, click outside, and activate the toggle again. Verify focus, active-section styling, Contact CTA behavior, scroll offsets, browser history, menu internal scrolling on short screens, reduced motion, and no hero overlap or horizontal overflow. Compare the visual proportions with the reference screenshot manually once available.

## Navbar typography and hero alignment refinement — current settings

Navbar-only branding is now `PORTFOLIO.` (including its menu-panel label), linking to Home. Hero name, professional title, personal data, résumé, project information, and footer LEMAR® branding are unchanged.

Desktop navigation labels use fluid 17–18px typography with medium weight, restrained letter spacing, and smaller proportional gaps. The navbar remains 80px on desktop; its existing compact height and anchor offsets are unchanged. CSS and JavaScript now both collapse the inline list at 1200px (superseding the previous 1100px threshold) to accommodate the wider wordmark and labels. All six labels, active tracking, sticky behavior, lime Contact CTA, white menu button, single-list panel, Escape/outside closing, focus handling, and reduced-motion behavior are preserved. The CTA still moves into the menu below 480px.

The hero now uses equal-width text/sculpture columns with a 12px desktop gap instead of 32px and top alignment instead of centering against the entire text/actions block. The scene container cap increases from 440px to 520px, bringing the visible sculpture closer to the oversized name without adding text. Its camera, geometry, materials, pointer/idle animation, lazy loading, WebGL/error fallback, DPR cap, visibility pause, and cleanup are unchanged. Decorative upper and lower scene captions were removed.

At tablet widths the grid uses a 16px gap. At 600px and below the elements remain stacked, with a centered scene up to 260px wide and tighter surrounding space. Existing title sizing, CTAs, social links, and résumé download remain accessible. No new fonts, images, packages, or animation libraries were added; unrelated sections were not modified.

Files modified: `src/components/layout/Navigation.jsx`, `src/styles/navigation.css`, `src/index.css` (hero rules only), `src/components/ui/FutureScene.jsx` (decorative caption removal), and this document.

Validation executed: clean lint, all 17 existing tests passing, and successful production build. Source assertions checked navbar-only branding, matching JS/CSS collapse thresholds, larger type, preserved footer/hero identity, and retained scene safeguards. Responsive source rules were reviewed for 1440/1024/768/390/320px widths. The existing lazy 3D chunk size advisory remains. No browser visual/overflow or actual device testing was performed, and no development server or browser session was started.

Manual checks: use the existing PowerShell commands above. Inspect 1440px and the 1201/1200px collapse boundary, then 1024/768/390/320px. Check link spacing, wordmark width, menu keyboard behavior, CTA anchors, name/registration-mark wrapping, sculpture framing and pointer response, and no overlap or horizontal overflow. Toggle reduced motion to inspect the larger static fallback, then verify social links, résumé download, and unchanged footer branding.

## Hero composition and desktop-menu cleanup — current settings

This update supersedes the previous all-size hamburger behavior and camera framing. The desktop navbar now shows only PORTFOLIO., the six 17–18px navigation links, and the lime Contact CTA. The white hamburger is hidden with `display: none` above 1200px, including from keyboard navigation. At 1200px and below the inline links are hidden and the hamburger appears; the same accessible navigation panel, Escape/outside closing, and CTA placement below 480px remain. At breakpoint changes, focus moves from hidden controls to the available navigation: a menu link collapsing away returns focus to the toggle, and a compact toggle/CTA disappearing on expansion moves focus to the first desktop link. Desktop height, rounded container, sticky positioning, anchor offsets, section tracking, and native hash/history behavior are unchanged.

The hero uses a near-equal 49% text / 51% sculpture grid (after an 8px gap), with vertical centering across the primary content group. This moves the sculpture column slightly toward the center and gives it more visual weight without increasing the existing 520px container cap. Tablet gap is 12px; mobile still stacks at 600px with the established 260px scene cap. Name, title, introduction, social links, and résumé are unchanged. Role/introduction/action/social spacing has been tightened modestly; no fixed hero height or added filler text is used.

The actual rendered sculpture is enlarged through its perspective camera: FOV changes from 43° to 37.5°, keeping the camera at [0, 0, 7.5]. The projection ratio `tan(43° / 2) / tan(37.5° / 2)` is approximately 1.16, so visible size increases about 16% independently of CSS container width. The outer satellite plus maximum hover scale fits in a conservative radius of 2.2602 units. At the existing camera distance its angular radius is about 17.54°, below the 18.75° half-FOV, and inside the near/far planes. This mathematical check covers arbitrary group rotation in the square canvas; it does not replace visual browser/GPU verification. Geometry, materials, object design, rotation, pointer damping, reduced-motion/static fallback, lazy loading, visibility pausing, DPR cap, and cleanup are preserved. No new Three.js library or dependency was added.

Modified files: `src/components/layout/Navigation.jsx`, `src/styles/navigation.css`, `src/components/three/OrbitalCanvas.jsx`, `src/index.css` (hero rules only), `src/styles/content.css` (hero social spacing only), and this document. No project data, assets, résumé links, or unrelated sections changed.

Executed: clean lint, all 17 existing tests passing, and successful production build. Additional one-shot checks verified the 15–25% requested projection gain, conservative frame/depth clearance, matching 1200px hamburger/inline-link rules, and source-level resize focus handling. The existing lazy 3D bundle advisory remains. Responsive CSS was reviewed for 1440, 1280, 1024, 768, 390, and 320px. No rendered browser, keyboard-interaction, live GPU, or overflow tests were performed. No development server or browser session was started.

Manual checks: run the existing PowerShell commands above. At 1440/1280px confirm no hamburger, aligned links, and the 80px header. Check the 1201/1200px boundary in both directions while focus is on the toggle or a menu link. At 1024/768/390/320px verify the menu, Escape, outside closing, and CTA access. Inspect idle and maximum-pointer sculpture positions for full ring visibility and no text overlap; compare normal motion with the SVG fallback. Check hero button spacing, social links, résumé download, title wrapping, active section, initial hashes, and Back/Forward navigation.

## About polish and portrait presentation — current section

This update is confined to About and its supporting presentation code. It supersedes the former plain square frame and About typography. Hero, navbar, 3D scene, projects, social links, résumé, contact, and unrelated section layouts are unchanged. No dependencies, icon packages, fonts, or generated images were added.

The original `public/images/lemar.jpg` is retained at 1254 × 1254. It is visually inspected and displayed with `object-fit: contain` in a square inner window, so it is neither stretched nor aggressively cropped. A charcoal card, small corner radii, refined inner border, soft inset edge shading, restrained shadow, and faint static lime radial halo soften the contrast between its white background and the page. No face recoloring, filter, image processing, or background replacement is applied. The image's before/after SHA-256 and production-copy SHA-256 match exactly.

`src/components/ui/PortraitCard.jsx` separates the existing scroll reveal on the outer wrapper from a slow CSS float on the inner card. The card moves up only 4px over a ten-second cycle. IntersectionObserver and page visibility pause it offscreen or in a hidden tab; no per-frame React updates, pointer tracking, or JavaScript animation loop is introduced. Custom observers/listeners are cleaned up on unmount. Browsers without IntersectionObserver retain a static card. Reduced motion disables the float entirely, including when the preference changes while viewing the page.

`src/styles/about.css` scopes presentation to `#about`. About uses a 40/60 image/text grid with a bounded portrait width, centered alignment, a 28–48px gap, more focused headings, a readable text measure, 14–15px paragraph text, and a compact internship note. At 600px and below it stacks with a centered portrait up to 320px and a 24px gap. The outer reveal and inner float operate on different elements so their transforms do not conflict. Former About-only rules were removed from the shared layout, content, and animation files rather than adding competing overrides. The shared PortfolioImage component and screenshot galleries are unchanged.

The heading is now `About me.` and subheading `Building useful software.` Copy uses the existing centralized education fields and shorter biography paragraphs. It retains Lemar's fourth-year BS Information Systems education at Colegio de San Antonio de Padua in the Philippines, academic development experience, Java/web/database/system-design learning, introductory Java/web teaching during student teaching/OJT, Innovators Club Presidency, and internship interest. No unconfirmed expertise, dates, achievements, or credentials were added. Optional skill chips were omitted to keep the section minimal.

Created: `src/components/ui/PortraitCard.jsx` and `src/styles/about.css`.

Modified: `src/sections/About.jsx`, `src/data/portfolio.js` (About biography only), `src/main.jsx` (stylesheet import), `src/index.css`, `src/styles/content.css`, and `src/styles/interactions.css` (About-only rule cleanup), plus this document.

Validation executed: clean lint, all 17 existing tests passing, and successful production build. Portrait identity was checked against its pre-edit SHA-256 and the production copy. All About rules are now locally scoped and old portrait selectors were removed. Responsive CSS was reviewed for 1440, 1280, 1024, 768, 390, and 320px widths. The pre-existing lazy 3D chunk advisory remains. Browser visual, screen-reader, actual viewport/overflow, and animation profiling checks were not performed. No development server or browser session was started.

Manual checks: use the existing PowerShell commands above and inspect `#about` at the listed widths. Verify the full portrait, dark frame, faint glow, line lengths, column alignment, mobile stacking, and no overflow. Watch one slow float cycle, scroll away/back, and switch tabs to check pausing. Toggle reduced motion while viewing the section and confirm the card becomes static. Block the image request temporarily to inspect the existing unavailable-image state, then restore it. Check keyboard navigation and confirm Hero, navbar, projects, screenshot galleries, résumé, and contact remain unchanged.

## Compact About spacing refinement — current dimensions

Adjusted only `src/styles/about.css` and this document. The existing portrait frame, original image, float animation, reduced-motion support, text, and other sections remain unchanged.

The desktop grid now sizes the first track directly to the 380px portrait card instead of assigning a wider percentage track that left unused space beside the capped image. The overall row is bounded at 1040px; the copy is capped at 600px, with a 40–56px desktop column gap. Tablets retain proportional columns with a 28px gap. Phones stack with a 20px gap and a portrait cap reduced from 320px to 300px.

About-specific section padding is now 48–64px (44px on phones), rather than inheriting the larger site-wide section spacing. No fixed or viewport-based height is used; `min-height: 0` explicitly keeps the section content-driven. Label-to-title spacing is 8px, space below the heading is 24px (20px phone), paragraph margins are 10px with 1.7 line height, and the closing internship note uses 12px top spacing/padding. The frame padding, halo reach/opacity, and shadow were reduced slightly while retaining the existing layered treatment. No new effects were added.

Validation: clean lint, all 17 existing tests passing, and successful production build. The existing lazy 3D chunk advisory remains. Browser visual/responsive testing was not performed; no server or browser session was started. Manually inspect desktop, tablet, 390px and 320px layouts for the closer image/text grouping, reduced section height, readable paragraph rhythm, and preserved motion/reduced-motion behavior.

## About final typography and top-alignment polish — current values

Only `src/styles/about.css` and this document changed. The concise copy, portrait file, frame, glow, float/pause behavior, column widths, navbar, hero, projects, and all unrelated sections remain unchanged.

About now uses 48px section padding on desktop and 40px on phones, with no fixed height and `min-height: 0`. The label-to-title gap is 6px; the space below the heading is 20px. Source review confirmed there is no additional About scroll-margin or wrapper min-height. Existing global scroll-padding is preserved (96px desktop / 88px compact) so the sticky navbar retains its clearance; navbar position and tracking were not changed.

Typography overrides are all scoped to `#about`: the main heading scales from 52px to 56px on desktop (approximately 56px at 1440/1280px and 52px at 1024px), the text heading is 36–40px, body paragraphs are 19–20px with 1.65 line height, and the internship line is 17–18px. Paragraph margins are 14px with no trailing margin before the compact status divider. The text measure remains capped at 600px. The repeated final-polish brief required only raising this desktop heading minimum from 48px to 52px; existing spacing, alignment, copy, portrait, and tablet/mobile overrides were retained.

Columns are top-aligned rather than vertically centered. A small 12px desktop text inset aligns the text more closely with the framed image; it becomes 8px on tablets and zero on phones. A larger 40–60px offset was unnecessary because it would reintroduce the reported low text start. At tablet widths, heading/subheading/body sizes are 46/32/17px. Phones use fluid 34–42px main headings, 28–32px subheadings, and 16px body/status text. The existing mobile stack and portrait cap remain.

Validation executed: clean lint, all 17 existing tests passing, and successful production build. Scoped rules and 1440/1280/1024/768/390/320px responsive branches were reviewed in source; no global typography rule was modified. The existing lazy 3D bundle-size advisory remains. Browser visual/responsive testing was not performed, and no development server or browser session was started.

Manual checks: run the existing PowerShell commands and navigate to `#about`. Check heading clearance below the sticky navbar, top alignment beside the portrait, larger paragraph readability, internship-line wrapping, and no horizontal overflow at the listed widths. Confirm the portrait float and reduced-motion behavior are unchanged, then verify other sections retain their typography.

## Skills technology showcase - initial card implementation (superseded below)

The Skills section now displays only eight confirmed technologies in five categories: Programming Languages (Java, PHP), Frontend Development (Blade, Tailwind CSS, Alpine.js), Backend Development (Laravel), Databases (MySQL), and Development Tools (Vite). Displayed project suffixes, Laravel's version suffix, vague experience tags, pending filler text, and the former sixth category were removed. Project data still retains the full ARMS stack, including Laravel 12. No new skills or personal claims were added.

The heading remains `Technical toolkit.` with a 48-56px desktop size and the requested single supporting sentence. Scoped styling in `src/styles/skills.css` provides compact charcoal cards, ivory names, 34px technology icons (30px on the narrowest phones), 12px corners, and restrained lime hover borders. Frontend receives more desktop width to accommodate three cards; the other categories use smaller groups without fixed category heights. Below 1000px the first two groups each occupy a full row; at 600px and below all categories stack. Wrapping flex rows accommodate the unequal counts, with the last card expanding naturally. Heading copy stacks at 768px. Shrinkable tracks, wrapping labels, and reduced padding at 360px protect narrow layouts without clipping text or hiding overflow.

Seven SVG assets are imported locally through `TechnologyIcon.jsx`: Java, PHP, Tailwind CSS, Alpine.js, Laravel, MySQL, and Vite. Blade uses a deliberate `BL` text monogram; unavailable or failed icons also fall back to text. Icons are decorative beside visible technology names. Cards are semantic list items, with no links, buttons, tabindex, pointer cursor, or implied action. Existing keyboard controls elsewhere are unchanged.

Icons come from [Devicon](https://github.com/devicons/devicon), pinned to commit `32fe1d3b3f36ad11f90ab94f7db59738139c2bf6`. Local provenance is recorded in `src/assets/technology-icons/sources.json`; the upstream MIT license is retained in `LICENSE.txt` alongside the SVGs. Vite bundles the imports as local assets or inline data URLs. No runtime CDN requests, icon package, animation library, font, or other dependency was added.

The existing IntersectionObserver reveal system is reused without modification. Each category reveals once, with an additional 0-80ms card stagger. Separate wrapper and surface transforms prevent entrance/hover conflicts. Fine-pointer hover lifts a card 3px and its icon 1px; touch receives no hover movement. Reduced motion disables card transitions and transforms and ensures content remains visible, including when the preference changes. There are no continuous loops or per-frame React updates.

Created: `src/components/ui/TechnologyIcon.jsx`, `src/styles/skills.css`, and `src/assets/technology-icons/` (seven SVGs, source manifest, and license).

Modified: `src/sections/Skills.jsx`, the skills export in `src/data/portfolio.js`, `src/main.jsx` (stylesheet import), `src/index.css` and `src/styles/interactions.css` (obsolete Skills-only selector cleanup), and this document. Navbar, Hero, About, sculpture, Projects, Experience, Contact, social links, and resume code were not edited.

To add a confirmed technology later, append `{ name, icon }` to the appropriate category in the skills export. Import its local SVG and register its key in `TechnologyIcon.jsx`; alternatively provide `{ name, monogram }`. Empty categories are filtered out. Never add unconfirmed entries or restore pending public filler text.

Validation: `npm run lint` passed; both existing test files passed all 17 tests; `npm run build` passed and resolved all icon imports. The pre-existing large lazy 3D chunk advisory remains. CSS was reviewed for 1440, 1280, 1024, 768, 390, and 320px widths. Browser rendering, actual horizontal overflow, assistive technology behavior, and animation timing have not been tested. No development server or browser session was started.

Manual checks: inspect `#skills` at each listed width for category balance, legible labels/icons, mobile wrapping, and no horizontal scrolling. Scroll the section into view, hover with a mouse, and toggle reduced motion to confirm static content. Check keyboard navigation skips the decorative cards and continues normally to Projects. Confirm all other sections retain their appearance and behavior.

## Premium Skills bento redesign - initial eight-technology composition

This replaces the five separate visual categories with three coordinated panels. Web Development is the featured panel on the left, with Blade, Tailwind CSS, Alpine.js, and Laravel arranged as a two-by-two set of tiles. Programming (Java, PHP) and Database & Tooling (MySQL, Vite) occupy two smaller panels on the right. The presentation groups in `src/sections/Skills.jsx` reference the original categories in the centralized skills export; that canonical data and all eight technology objects remain unchanged. DOM order follows the featured panel, Programming, then Database & Tooling. Each panel has a semantic heading associated through `aria-labelledby`, and its technologies remain noninteractive list items.

The intro now keeps `02 / SKILLS`, `Technical toolkit.`, and `Tools and technologies I've used to build software.` together in one left-aligned group. The desktop title scales from 52 to 60px; the description from 18 to 20px, placed 14px below it. The showcase begins 36-44px below the introduction. Skills-only overrides leave the shared SectionHeading component and all other sections untouched.

The bento uses a consistent 16px outer gap, 12px tile gaps, coordinated panel borders/radii, and a subtle lime edge and small dot on the featured group. Featured tiles place icons above names; companion tiles align them horizontally on desktop. Icons are 40px on wide screens and 36px below 1100px, with 18-20px desktop names. Balanced padding defines the card proportions; there are no fixed panel heights or minimum heights. Tile height follows content and shared grid alignment. No gradients, added shadows, filler, statistics, or proficiency claims were introduced.

At 900px and below, Web Development spans the top row with four tiles, while the smaller panels sit side by side underneath with vertical icon/name layouts. At 600px and below the panels stack in DOM order, all using two-column tile grids. Narrow phones reduce panel and tile padding; names wrap without truncation. The title scales to 34-46px on phones and supporting copy becomes 16px. Zero-minimum grid tracks, shrinkable names, and wrapping protect narrow widths without masking overflow.

The same seven local Devicon SVGs and Blade `BL` fallback are reused, with their existing source manifest and MIT license. No icon imports, assets, fonts, dependencies, or shared animation hooks changed. The existing observer reveals the panels once. Skills-local entrance transitions use 250-300ms timing, with 0-105ms tile stagger. Hover raises the surface 3px and its icon 2px with 250ms easing, and lightly highlights the border. Transform effects are limited to fine-pointer devices with normal motion preferences. Reduced motion disables all Skills panel/tile transforms and transitions. Decorative icons remain hidden from assistive technology beside visible names, and tiles receive no tabindex, links, buttons, or pointer cursor.

Files created: none. Files modified: `src/sections/Skills.jsx`, `src/styles/skills.css`, and `PORTFOLIO.md`. SHA-256 comparison confirmed every source file outside the Skills component and stylesheet stayed unchanged, including the centralized data, navbar, hero, About, 3D scene, projects, experience, contact, social, and resume code.

Validation completed: clean `npm run lint`; all 17 existing tests passed across `activeSection.test.js` and `portfolio.test.js`; successful `npm run build`, including all technology icon imports. A source audit confirmed the exact introduction, three groups with 4/2/2 entries, eight unique confirmed names, local icon files/fallback, and no false card controls. Responsive CSS was reviewed against 1440, 1280, 1024, 768, 390, and 320px widths. The pre-existing large lazy 3D chunk advisory remains. Browser rendering and actual horizontal overflow were not tested. No development server or browser session was started.

Remaining manual checks: inspect the listed widths for bento alignment, tablet four-tile wrapping, phone two-column labels, and no horizontal scrolling. Scroll into Skills and test hover, reduced motion (including a live preference change), and keyboard navigation past the decorative tiles. Confirm all eight names and icons render, the intro stays grouped, and other sections retain their existing appearance.

## Premium Projects showcase - current implementation

The five projects remain in their exact order: ARMS, CSAP Landing Page, School Event Attendance Management System, Simple E-Commerce Shop System, and Lost and Found Application. The introduction is a single left-aligned group: `Selected projects.` followed by `Academic systems and websites I've worked on.` Desktop heading size is 52-60px, description 18-20px, with a 14px gap and 36-46px before the list. Projects section padding is 48-72px, reduced to 44px on phones.

`src/styles/projects.css` scopes the new presentation to Projects and its dialog. Each editorial row uses equal screenshot/text tracks with a 32-46px desktop gap. Adjacent rows have 56px total separation through balanced padding and a quiet divider. Project category and number share a compact metadata row; titles are 32-38px, descriptions 17-18px, and technology tags 14px. Cards use the existing maximum content width. Missing descriptions and stacks do not create empty blocks. Below 900px, typography and column gaps reduce; at 760px and below, the image stacks above the details. Phone titles scale from 26 to 30px, buttons wrap, and text remains shrinkable and untruncated.

The supplied `public/images/projects/seams.png` was visually inspected and identified as the maroon-and-gold SEAMS website showing event, attendance, and activity information. Its actual PNG dimensions are 1449 by 684. The same screenshot object now powers both the project preview and its case-study gallery. The description is the supplied sentence: `A web-based system designed to organize and monitor student attendance during school events and activities.` No technology stack, verification method, live URL, or outcome was inferred from the picture. The gallery caption explicitly distinguishes displayed sample figures from verified outcomes.

The exact existing files `arms.jpg` and `landingpage.png` are retained, alongside `seams.png`. Before/after SHA-256 hashes match for all three source images. Screenshots use object-fit containment within refined 16:10 frames, with a reserved caption strip that keeps labels off the interface. A restrained 1.012 hover scale stays within the frame's inset. The galleries retain original-aspect images and full-resolution links opening the source file in a new tab. Shop and Lost and Found continue to show honest conceptual art, including in their case studies; no screenshots were generated or edited.

Each card now has one clearly labeled `Project Details` button instead of repeated preview/title/detail tab stops. The preview is a noninteractive visual and the title is a semantic h3. The cursor companion's project affordance is restricted to genuinely actionable preview links/buttons so it no longer displays `View` on static frames. Where available, a consistent `Live Website` action preserves these exact URLs: `https://arms.free.nf/?i=1` and `https://csap-one.vercel.app/`. External links retain noopener/noreferrer and accessible new-tab labels. No other live or repository URLs were added.

Case studies conditionally render only confirmed overview text, problem, purpose, features, technologies, contributions, status, and links. Missing fields remain null/empty in data; editable `pendingInformation` notes retain outstanding questions internally and are never rendered. Lost and Found has a neutral `Application project` category and no invented description. Public pending messages and empty metadata/link rows are removed. Real screenshot galleries use the full available dialog width, readable text, and a clear full-size action. Empty galleries return null.

The existing AnimatedDialog implementation is unchanged: native modal focus handling, Escape/backdrop closing, body scroll locking, close animations, and reduced-motion handling remain. The existing observer entrance system is also retained. Projects-only hover scaling and border changes are restrained, and reduced motion disables preview transforms/transitions. No dependencies, fonts, animation packages, servers, or browser sessions were added or started.

Created: `src/styles/projects.css`.

Modified: `src/sections/Projects.jsx`, `src/components/ui/ProjectCaseStudy.jsx`, `src/components/ui/ProjectPreview.jsx`, `src/components/ui/ScreenshotGallery.jsx`, `src/components/ui/CursorCompanion.jsx` (actionable preview selector only), `src/data/portfolio.js` (project data only), `src/main.jsx` (stylesheet import), and this document. Navbar, Hero, 3D, About, Skills, Experience, Contact, social links, resume integration, and the shared dialog implementation were not edited.

Validation: clean `npm run lint`; all 17 existing tests passed; successful `npm run build`. A data/source audit verified all five project IDs/names in order, the exact two live URLs, three real screenshot paths shared with galleries, unchanged confirmed stack counts, and no pending public metadata. Source image hashes match the pre-edit values. Responsive CSS was reviewed for 1440, 1280, 1024, 768, 390, and 320px. The pre-existing large lazy 3D chunk advisory remains. No browser rendering or actual horizontal-overflow testing was performed.

Remaining manual checks: inspect all listed widths for screenshot containment, title wrapping, row balance, and horizontal overflow. Open every Project Details dialog by keyboard; verify initial focus, focus containment, Escape/backdrop/Close behavior, scroll restoration, and focus return. Open all three full-size screenshots and both Live Website links. Check hover and reduced-motion behavior, hidden missing metadata, conceptual labels, and unchanged appearance of other sections.

## Project 04 e-commerce screenshot integration

Identified and visually inspected `public/images/projects/e-commerce.png` (1909 by 882 pixels). It shows storefront navigation and featured laptop, smartphone, and headphone listings with product imagery, descriptions, and prices. The visible navigation is interface evidence only; it does not establish working cart operations, authentication, payments, or order history.

Only `src/data/portfolio.js` and this document changed. Project 04 now references a shared `ecommerceScreenshot` object as both `previewImage` and its single gallery entry. The object supplies the exact source path, dimensions, meaningful alt text, and a factual caption. Its description is `A simple e-commerce website project featuring an online storefront and product listings.` Outstanding questions remain in internal `pendingInformation`; unknown technology, links, functionality, and development status remain empty/null and hidden in the UI.

The existing ProjectPreview, ProjectCaseStudy, and ScreenshotGallery components need no edits. The preview automatically uses the supplied image with object-fit containment, existing responsive frame, and restrained hover treatment. The case study automatically switches from conceptual artwork to the real screenshot gallery, retaining original image proportions and the full-resolution source link. No layout, animation, dialog, navigation, or unrelated section was changed, and no dependency was added. The original image was not renamed, edited, or overwritten.

Validation: lint passed, all 17 existing tests passed, and production build passed. A data audit confirmed the five project names/numbers in their exact existing order, Project 04's preview/gallery path and actual dimensions, the requested description, and empty unconfirmed metadata. Before/after comparison confirmed all four other project objects and every source image remained unchanged. The production copy of e-commerce.png matches its source SHA-256. The existing lazy 3D chunk-size advisory remains.

Remaining manual checks: inspect Project 04 at desktop, tablet, 390px, and 320px widths; open Project Details and its full-size screenshot link; confirm image containment, readable labels, no overflow, and normal dialog keyboard behavior. Browser testing was not performed and no development server was started.

## Project 05 Lost and Found screenshot integration

Current short description: `A school lost and found system project featuring a student dashboard and item listings.` This appears in both the project card and case-study overview using the existing shared data. It describes the supplied interface without asserting unverified functionality.

Current update: Project 05 is named `Lost and Found System` in its name, full title, and subtitle, with category `System project`. Its preview and gallery now use `public/images/projects/lost_and_found1.png` (1456 by 730), visually confirmed as the student dashboard. Alt text and the visible screenshot caption were updated accordingly. This replaces the previous login-screen reference described below; both original image files remain untouched. Only project data and documentation changed. Lint, all 17 existing tests, and the production build passed; the existing lazy 3D chunk advisory remains. Browser appearance and the full-size gallery link still need a manual check; no server or browser was started.

Visually identified `public/images/projects/lost_and_found.jpg` as the School Lost and Found login-screen screenshot, with original dimensions 1062 by 2128 pixels. Project 05 now uses this same image object for its card preview and case-study gallery, with meaningful alt text and an accurate caption. The existing object-fit containment preserves the complete portrait screenshot inside the shared landscape preview frame; the gallery preserves its original aspect ratio and full-size link. No image was renamed, overwritten, cropped, or generated. Existing layout, components, and animations remain unchanged.

Only `src/data/portfolio.js` and this document changed. Missing project details, technologies, links, and functionality remain unconfirmed and hidden; the screenshot alone does not establish working authentication. All five projects retain their order. No other project entry was edited.

Validation: lint passed, all 17 existing tests passed, and production build passed. An audit verified Project 05's preview/gallery reference, dimensions, numbering, unchanged source image SHA-256, and matching production copy. The existing lazy 3D chunk-size advisory remains. Browser testing was not performed and no development server was started. Manually check the portrait screenshot's presentation on desktop/mobile, Project Details, and the full-resolution image link.

## Experience redesign - current implementation

The introduction now reads `04 / EXPERIENCE`, `My journey so far.`, and `Learning. Building. Leading.` as one left-aligned content group. Experience-specific heading sizes scale from 52 to 60px on desktop; supporting copy is 18-20px, with 14px between them and 36-48px before the content. Section padding scales from 64 to 88px, with 48px on phones. The shared SectionHeading implementation is unchanged.

Three visually connected areas replace the former three-row timeline. Education & Development is a quiet vertical timeline beside a two-column Leadership grid on desktop. Achievements & Certifications sits below, separated by a subtle divider, with four compact recognition cards. Timeline titles are 22-26px; leadership titles 22-24px; organizations and descriptions 15-16px; dates 13px. Recognition titles are 17px to keep the badges compact. Timeline spacing is 26px, card padding 20-22px, and the lower group gap scales from 40 to 56px. There are no viewport heights, fixed card heights, oversized minimum heights, or filler paragraphs. Equal-height cards within a grid row follow their content.

The experience export is now an object with `development`, `leadership`, and `achievements` arrays. Content comes from the user's explicit redesign brief, identified there as resume-supported; no additional resume claims were inferred. Development includes BS Information Systems at Colegio de San Antonio de Padua (2023-Present), Project Leader & Programmer for ARMS, and Student Teaching/OJT. Each uses one short descriptive sentence. Teaching and capstone dates remain omitted. The small `Explore ARMS` link points to the existing Projects section, where ARMS is first; it does not claim to open a dialog directly and requires no Projects changes.

Leadership includes President, Innovators Club (2025-2026); Public Information Officer, SBO (2025-2026); Class Mayor (2023-Present); and Creative Publisher, Supreme Student Council/SSC (2026-2027 term). The SSC description uses present tense, and the date explicitly says `term`, without implying completion. Only the organizations supplied in the brief are shown; absent optional fields are hidden. Recognition includes TESDA NC II - Web Development (2025), Dean's Lister (First Year), President's Lister (Second Year-Present), and Academic Excellence Awardee with no invented date.

All styling lives in `src/styles/experience.css` and is scoped to `#experience`. Leadership uses charcoal surfaces and thin borders; the timeline and small certificate/award SVGs use restrained lime accents. Decorative cards have no links, buttons, pointer cursor, tabindex, or implied action. Recognition icons are inline SVGs hidden from assistive technology, next to readable names. Section/group/item headings follow h2/h3/h4 hierarchy, lists are semantic, and the ARMS link retains the existing visible focus treatment with a 44px minimum height.

The existing observer hook supplies one-time reveals without modification. Timeline peers reuse its stagger; leadership and recognition receive CSS delays capped at 120ms. Separate reveal wrappers and hover surfaces keep transforms independent. Fine-pointer hover lifts cards only 2px over 250ms and subtly highlights borders. Reduced motion disables Experience transforms and transitions. No loops, fonts, external icon assets, or dependencies were added.

At 1100px and below, education and leadership become stacked groups and recognition becomes a two-column grid. At 600px and below, leadership and recognition become single-column lists; the section heading scales to 34-46px, panel padding becomes 20px, and group gaps reduce. Shrinkable grid tracks, wrapping metadata, and overflow-wrapping titles protect the 320px layout without hiding overflow. CSS branches were reviewed for 1440, 1280, 1024, 768, 390, and 320px.

Created: `src/styles/experience.css`. Modified: `src/sections/Experience.jsx`, only the experience export in `src/data/portfolio.js`, `src/main.jsx` (stylesheet import), and this document. SHA-256 comparison verified unrelated source and all public assets stayed unchanged. A separate comparison confirmed every other portfolio data export stayed identical, including profile, skills, projects, screenshots, and URLs. Navbar, Hero, 3D, About, Skills, Projects, Contact, social links, and resume functionality were not edited.

Validation: lint passed; all 17 existing tests passed; production build passed. A content audit verified all three development entries, four leadership roles/terms, and four recognitions, with no placeholder text or invented teaching dates. The existing large lazy 3D chunk advisory remains. Browser rendering, actual overflow, keyboard interaction, and animation appearance were not tested. No development server or browser was started.

Remaining manual checks: inspect the listed widths for timeline/card balance, title/date wrapping, readable recognition badges, and no horizontal scrolling. Confirm all entries and terms, tab to Explore ARMS and verify its target and focus indicator, check reveals/hover with reduced motion on and off, and confirm the other sections retain their appearance.

## Contact and Footer redesign - current implementation

Contact now uses a top-aligned 45/55 composition with a 48-64px desktop column gap. The left side groups `05 / CONTACT`, `Let's connect.`, and the requested short invitation, followed by the prominent confirmed email address and the existing five social icons. The heading scales from 56 to 64px, supporting text from 18 to 20px, and email from 24 to 30px. Heading/description spacing is 14px, description/email spacing 26px, and email/social spacing 24px. Section padding scales from 64 to 88px. The email remains `mailto:paraslemar@gmail.com`, with a restrained lime arrow and visible keyboard focus.

The existing SocialIcons component, SVGs, and centralized links are unchanged: Email, GitHub, LinkedIn, Facebook, Instagram. Contact-only styling refines their spacing, rounded-square borders, tooltip surfaces, and focus presentation without affecting Hero icons or adding footer duplicates. No platform or URL was added.

The charcoal form panel has a refined border, 18px corners, 28-36px padding, readable labels, 48px inputs, and a compact three-row message field. It is named by its heading `Write a message.` and described by `Your message will open in your email app.` The lime action reads `Continue to Email` with the existing arrow icon. Validation retains required fields, length limits, email checks, inline error descriptions, an alert summary, and focus on the first invalid field. Existing honeypot and future verified-delivery adapter remain unchanged; no backend or service was introduced.

On valid submission, the existing draft builder encodes the subject and body, and the form requests the configured email application via mailto. Feedback states only that the app was requested and the website has not sent a message. Browser mail handlers cannot reliably reveal whether an app is configured, so a `No email app? Copy your draft` disclosure remains available after every valid handoff. It opens automatically if requesting the app throws. It contains labeled read-only recipient and draft fields and two copy buttons. Clipboard failure selects the corresponding field for manual copying and announces instructions through a polite status message. Original inputs are never reset, including failed handoffs. There is no false delivery confirmation, automatic app-detection claim, storage, or new network submission.

The new Footer component has a main row with `PORTFOLIO.`, Lemar Paras, and the centralized professional title, plus Home/About/Projects/Contact anchors. Its lower row adds a subtle divider, copyright, Philippines, and Back to top pointing to Home. The year is initialized dynamically from the visitor's current date using a lazy state initializer; it is not hardcoded. Footer padding is 40-56px, copyright spacing 20-26px, with readable compact text and 44px link targets. Existing anchor scrolling and global reduced-motion behavior remain in effect.

Animations reuse the shared observer for Contact and a gentle Footer entrance. Hover uses quiet border/color changes and 2px arrow motion, with no loops. Contact-only and footer styles honor reduced motion, including button arrows and social interactions. No animation package, dependency, font, or new raster asset was added.

At 1100px, Contact spacing and panel padding tighten. At 900px, contact information stacks above the form. At 600px, the field row and footer stack, heading/email sizes reduce, and social icons wrap within the available width. Shrinkable tracks, wrapping email text, flexible buttons, and 16px inputs protect narrow screens. CSS was reviewed for 1440, 1280, 1024, 768, 390, and 320px; actual viewport overflow still requires a browser check.

Created: `src/components/layout/Footer.jsx`, `src/styles/contact.css`.

Modified: `src/sections/Contact.jsx`, `src/components/ui/ContactForm.jsx`, `src/App.jsx` (Footer extraction), `src/main.jsx` (stylesheet import), `src/data/portfolio.js` (contact invitation only), and this document. SHA-256 comparison verified unrelated source files and all public assets remained unchanged, including SocialIcons, the contact service/validation utilities, navigation, Hero/3D, About, Skills, Projects, Experience, screenshots, social configuration, and resume assets.

Validation: lint passed without warnings, all 17 existing tests passed, and production build passed. Existing tests cover malformed/empty fields, encoded drafts, header-injection resistance, and disabled delivery. An additional audit checked the exact five social URLs and primary mailto, encoded draft contents, disabled backend, all four footer anchor targets, dynamic year source, and the presence of copy/manual-selection fallbacks. The existing lazy 3D chunk advisory remains. Native mail-app launch, Clipboard API permissions, keyboard/screen-reader interaction, and rendered responsiveness were not browser-tested. No development server or browser session was started.

Remaining manual checks: inspect all listed widths for email wrapping, social tooltips, form/footer balance, and no horizontal scrolling. Tab through contact and footer; submit empty/invalid values; prepare a valid draft and inspect subject/body in the email app. Test no mail handler, Clipboard API denial/unavailability, manual text copying, and retained input values. Verify footer anchors and Back to top, copyright year, live reduced-motion changes, and unchanged appearance of the other sections.

## Contact and Footer compact spacing refinement - current dimensions

Only `src/styles/contact.css` and this document changed. Inspection found the main excess came from Contact's former 64-88px padding on both edges, Footer's former 40-56px padding on both edges, and accumulated copyright/branding margins. Neither section had a viewport-based height or minimum height. Shared section spacing was not changed; scoped rules control these two areas.

Contact now uses 48-64px top padding and 40-48px bottom padding, with a 40-56px desktop column gap. The existing top-aligned 45/55 composition, typography, invitation, email, and five social icons remain. At 1100px the gap is 40px; below 900px the existing stacked layout uses a 28px gap. Phones use 44px top and 36px bottom padding. All dimensions remain driven by content, including expanded validation and copy-fallback states.

Form padding is now 28-32px on desktop, 28px at tablet sizes, 20px on phones, and 18px at the narrowest breakpoint. Heading-to-note spacing is 6px, space after the note 18px, field spacing 16px, and label-to-control spacing 6px. Input columns have a 16px gap. Inputs retain their comfortable dimensions and 16px text. The message field has a 112px minimum height and remains vertically resizable, while the lime submit action is 56px tall. The message-specific minimum does not constrain the read-only fallback draft field. Corners, palette, borders, focus states, animations, and reduced-motion rules are preserved.

Footer now has 32-40px top padding and 24-32px bottom padding. Brand-to-name spacing is 8px; the copyright row uses an 18px top margin and 16px top padding around its divider. Phones use 28px top / 24px bottom padding, a 16px main-row gap, and 16px before the copyright row. The two-row structure, all text, four navigation links, Philippines, Home target, dynamic year, and 44px link targets remain unchanged.

Validation: lint passed, all 17 existing tests passed, and production build passed. SHA-256 comparison confirmed every source file except the Contact/Footer stylesheet remained identical, including form validation/handoff/copy logic, social icons and URLs, Footer markup, all other sections, and centralized data. A link/year audit checked the five confirmed social URLs, primary mailto, footer navigation labels, Home target, and dynamic year expression. Scoped responsive branches were reviewed for 1440, 1280, 1024, 768, 390, and 320px. The existing lazy 3D chunk-size advisory remains. No dependencies or tests were added.

Remaining manual checks: inspect the listed widths for the reduced gap between Contact and Footer, comfortable form proportions, footer alignment, and actual horizontal overflow. Confirm validation states, mail-app handoff, copy fallback, social links/tooltips, and footer anchors remain usable by keyboard. Browser testing was not performed and no development server or browser session was started.

## Premium geometric sculpture redesign - current scene

The loose five-ring arrangement has been replaced with a compact crystal and three coordinated elliptical orbits. An elongated octahedral core uses a 1.04-unit radius with a 0.9/1.25/0.9 scale, giving the center substantially more visual weight than the former 0.57-unit core. Its opaque charcoal material has flat-shaded facets, moderate roughness and restrained metalness; a closely fitted lime wireframe defines the actual triangular edges. Ivory key light, low ambient light, and a soft muted rim light reveal the facets without textures, emissive bloom, or excessive reflections.

Three rings use radii 1.54, 1.70, and 1.86 with a consistent 0.82 elliptical compression and deliberate fixed relative orientations. Only the outer ring uses the strongest lime color; inner rings are muted. Tubes are slightly more legible than the former hairlines. Ring geometry totals 3,456 triangles, compared with 5,120 previously. One 0.032-unit orbital marker replaces the two former markers. The faceted core remains very low-poly. Geometry/materials remain declarative and Fiber-managed; no new dependencies or assets were added.

Core rotation is independent of the ring group (0.11 radians/second). Rings turn slowly at 0.025 radians/second; the accent orbits at 0.12 radians/second. A 0.035-unit float and bounded gentle core roll add depth without bouncing. Existing exponential pointer damping remains refresh-independent; tilt amplitudes reduce to 0.08/0.14 radians and hover scale to 1.018. Pointer coordinates are clamped to the normalized range without importing Three.js into the main bundle. Updates use refs, clamped frame deltas, and no per-frame React state or allocations.

The camera now uses a 36-degree vertical FOV at z=7.2, and the sculpture receives a small 0.08-unit upward offset. The canvas and all Hero layout styles remain unchanged: the existing square container stays within the right column, with its 520px desktop cap and centered mobile sizing up to 260px. A conservative complete movement envelope is approximately radius 2.042, including marker, float, upward offset, and maximum hover scale. CPU checks confirmed the enclosing sphere fits inside this square camera frustum regardless of orientation; actual rendered appearance remains a browser check.

The static SVG fallback now depicts three restrained ellipses, dark crystal facets, lime edges, and one small accent, matching the new design direction. The prior radial glow and dense globe-style rings were removed. Existing reduced-motion, loading, unsupported-WebGL, lazy-import/error-boundary, and context-loss fallback paths remain. Lazy loading, DPR 1-1.5, offscreen/background rendering pauses, preference listeners, observer cleanup, and context-loss listener cleanup are retained. The sculpture stays decorative and hidden from assistive technology, adds no focusable controls, and preserves touch scrolling.

Files created: none. Files modified: `src/components/three/OrbitalCanvas.jsx`, `src/components/ui/FutureScene.jsx`, and this document. Hash comparison confirmed every other source file stayed unchanged, including Hero typography/content/layout, navigation, all remaining sections, footer, social links, and resume integration.

Validation: lint passed, all 17 existing tests passed, and production build passed with valid Three.js/Fiber imports. An additional CPU geometry audit verified three rings and their bounds, the core extent, 3,456 ring triangles, full movement-envelope clearance, equivalent exponential damping at 30/60/144Hz, the three-ellipse fallback, and retained lazy-loading/pause source paths. Responsive source rules were reviewed for 1440, 1280, 1024, 768, 390, and 320px. The existing large lazy 3D chunk advisory remains. Browser, WebGL/GPU rendering, device performance, and actual fallback switching were not tested. No development server or browser session was started.

Remaining manual checks: inspect the listed widths for crystal lighting, ring clarity, visual balance, full rotation/hover visibility, no text overlap or overflow, and mobile touch scrolling. Scroll offscreen and switch tabs to verify rendering pauses. Toggle reduced motion during viewing and reload with WebGL unavailable; simulate context loss and confirm the new static fallback. Review GPU/frame behavior on actual devices and confirm all Hero links and other sections remain unchanged.

## Technical Toolkit expansion - initial sixteen-technology composition

The toolkit now contains exactly the sixteen technologies confirmed in the user's expansion brief. Programming Languages: Java, PHP, JavaScript, Python, Dart. Frontend Development: HTML5, CSS3, Blade, Tailwind CSS, Alpine.js. Backend Development: Laravel. Database & Development Tools: MySQL, Supabase, XAMPP, Vite. Mobile Development: Flutter. Dart remains a programming language. Cards display only an icon and name, with no proficiency labels, percentages, descriptions, project attribution, or extra technologies.

The canonical skills data now carries stable category IDs and the requested five groups directly. Skills renders these groups without maintaining a second category-merging map. The introduction, its text, typography, alignment, and spacing remain unchanged. Existing charcoal surfaces, subtle borders, rounded corners, restrained lime accent, card hover/reveal behavior, reduced-motion support, and noninteractive semantics are retained.

The bento is expanded to twelve outer tracks: Programming and Frontend each occupy half the first row with three-column tile grids. The lower row gives eight tracks to the four Database & Development Tools tiles, flanked by compact two-track Backend and Mobile panels. The five-item groups use two natural rows without invented filler tiles. Card proportions are coordinated through vertical icon/name alignment and consistent compact padding. Panels follow content, with no fixed or minimum panel heights and no stretching to create oversized empty areas.

At 1100px, category padding becomes 18px, tile padding 14px by 10px, and icons 36px. At 900px, the two large groups each use the full width, Backend/Mobile sit together as compact horizontal single-technology panels, and Tooling has its own four-tile row. At 600px, categories stack in canonical data order; multi-item groups use two columns while Laravel and Flutter remain compact single rows. At 360px, padding and label sizing reduce slightly. Shrinkable tracks and wrapping labels preserve full names without truncation. Responsive CSS was reviewed for 1440, 1280, 1024, 768, 390, and 320px; actual rendered overflow still requires manual inspection.

Eight new SVGs are locally imported through TechnologyIcon: JavaScript, Python, Dart, HTML5, CSS3, Supabase, XAMPP, Flutter. All seven existing SVG files and Blade's BL monogram are preserved. Seven new logos use the existing [Devicon](https://github.com/devicons/devicon) commit recorded in `sources.json`, with its existing MIT license. XAMPP uses [Simple Icons](https://github.com/simple-icons/simple-icons) commit `e451c581fccb01b56f47e1a77292bdd1fd95b1a4`, with orange fill applied, separate per-icon provenance, and the retained `SIMPLE-ICONS-LICENSE.md`. Runtime icons are bundled locally; there are no CDN calls or new packages. Existing monogram fallbacks and decorative icon accessibility remain unchanged.

Created: eight SVGs in `src/assets/technology-icons/` and `SIMPLE-ICONS-LICENSE.md`. Modified: `src/data/portfolio.js` (skills only), `src/sections/Skills.jsx`, `src/components/ui/TechnologyIcon.jsx`, `src/styles/skills.css`, `src/assets/technology-icons/sources.json`, and this document.

Validation: lint passed; all 17 existing tests passed; production build passed and resolved all fifteen SVG imports. A data/icon audit verified the exact sixteen unique technology names and five groups, fifteen distinct local SVG contents, correct icon imports, XAMPP identity, and the preserved Blade fallback. Hash comparison confirmed all pre-existing unrelated source files and existing icons stayed unchanged; a separate data comparison confirmed every portfolio export other than skills remained identical. The existing large lazy 3D chunk advisory remains. No dependencies or tests were added, and no development server or browser session was started.

Remaining manual checks: inspect all listed widths for category balance, natural five-tile wrapping, full technology names, logo visibility/alignment, and no horizontal overflow. Verify all sixteen cards, hover/reveal timing, and reduced-motion behavior; confirm decorative cards do not add tab stops and unrelated sections retain their appearance. Browser rendering and actual overflow were not tested.

## Technical Toolkit layout refinement - current seventeen technologies

React was absent from the sixteen-entry data. The latest user brief explicitly confirms it, so React is now the third Frontend item: HTML5, CSS3, React, Blade, Tailwind CSS, Alpine.js. There are exactly seventeen unique technologies across the existing five categories: 5 Programming, 6 Frontend, 1 Backend, 4 Database & Development Tools, and 1 Mobile. No Three.js, React Three Fiber, proficiency labels, ratings, or descriptions were added.

Programming and Frontend remain equally wide panels in the first desktop row, with matching padding and content-driven row heights. Programming uses a six-track internal grid with each tile spanning two tracks: Java/PHP/JavaScript fill the first row, while Python/Dart are centered in the second row at exactly the same tile width. No filler tile is rendered. Frontend uses a full three-by-two arrangement. Card backgrounds and panel borders now follow the same treatment throughout, retaining the existing Frontend lime indicator, icons, typography, corners, and hover/reveal timing.

Database & Development Tools has its own full-width panel in the second row. Its four-tile group is centered and bounded using available-width calculations so the tiles match the top panels' desktop tile widths. Backend and Mobile occupy equal half-width panels in the third row. These two panels place a comfortably wide heading beside one standard-size vertical technology tile, removing the former narrow/tall columns and avoiding full-width oversized Laravel/Flutter cards. There are no fixed or minimum panel heights.

Below 900px, the two large panels stack, followed by Tooling and then the two compact panels side by side. Below 700px, Backend and Mobile can stack rather than squeeze their headings. At 600px, multi-item groups use two-card rows, Programming's final Dart tile is centered, and singleton panels put their heading above one half-row-width tile. Existing narrow-phone padding, wrapping names, icon sizes, hover effects, and reduced-motion behavior remain. Skills bottom padding now scales from 40 to 56px (36px on phones), reducing the gap before Projects without editing Projects.

React uses a locally imported `react.svg` from the same pinned Devicon commit and existing MIT license, with provenance added to `sources.json`. All earlier SVGs and the Blade monogram remain untouched. The Skills JSX, introduction, shared observer, and semantic/noninteractive card structure did not need changes.

Created: `src/assets/technology-icons/react.svg`. Modified: `src/styles/skills.css`, `src/data/portfolio.js` (React skill only), `src/components/ui/TechnologyIcon.jsx`, `src/assets/technology-icons/sources.json`, and this document. No packages were added. Hash comparison confirmed every other pre-existing source file and icon remained unchanged, including the sculpture and all other sections.

Validation: clean lint, all 17 existing tests passing, and successful production build including the React SVG import. A data audit verified seventeen unique technologies, the 5/6/1/4/1 category counts, Frontend order, and all local icon paths. Desktop layout arithmetic checked equal tile widths and symmetric Programming second-row margins at 1440/1280/1024px. Responsive source branches were reviewed for 768/390/320px as well. The existing lazy 3D chunk advisory remains. Browser rendering and actual horizontal overflow were not tested, and no development server or browser session was started.

Remaining manual checks: inspect all requested widths for matching first-row panels, centered Programming tiles, the complete six-card Frontend grid, compact Tooling tiles, and readable Backend/Mobile headings. Verify no clipping/overflow, all seventeen icons/names, preserved hover/reveal/reduced-motion behavior, and unchanged appearance of other sections.

## Full portfolio UI/UX audit - 2026-11-06

Reviewed all major sections, shared/component CSS, navigation and active-section logic, project dialogs/galleries, contact validation/handoff, social/resume configuration, reveal/pointer utilities, static fallback, 3D pause/lazy-loading paths, build configuration, and automated tests. The existing design and content were retained; no general typography or spacing redesign was justified by source inspection.

Implemented five targeted fixes:

- Contact: editing inputs now invalidates the previously prepared copy draft and its status, preventing visitors from copying stale message content. Validation and entered values remain intact.
- Navigation: focus now moves to a visible control when the header or panel CTA disappears across the 480px breakpoint. Existing 1200px menu-collapse behavior, active links, and Escape handling remain.
- Narrow screens: removed the body's forced 320px minimum, which could exceed the available width when a classic scrollbar reserves space. Hero CTAs stack only at 360px and below, avoiding compressed nowrap labels. No typography or sculpture changes were made.
- Reduced motion: generic button arrows no longer jump on hover or keyboard focus when motion reduction is requested.
- Build reproducibility: the existing Tailwind CSS import and Vite plugin previously resolved from the parent workspace but were absent from this project's manifest/lockfile. Declared and installed the same already-used versions, `tailwindcss@4.3.4` and `@tailwindcss/vite@4.3.4`, as development dependencies. Resolution now points into this project. No runtime dependencies or animation libraries were added.

Verified by automated checks: clean lint, successful production build, and `npm test` passing all 21 tests. The new script runs the 17 existing tests plus four interaction regressions for invalid form submission, stale drafts after editing, blocked-clipboard manual selection, and focus recovery/listener cleanup across the phone CTA breakpoint. These new tests exercise component handlers with a small React-element/hook harness and mocks; they are not browser/DOM interaction tests.

Additional audits verified seventeen unique skills, five ordered projects, exact live/social/mailto destinations, all navigation section IDs, four leadership roles, portrait/resume existence, and matching actual metadata dimensions for all five project screenshots. Hash/data comparisons confirmed all personal/project/experience information, public assets, Hero markup, About styling, finalized Toolkit styling, and both sculpture components are unchanged. The existing Lost and Found System name was preserved.

Code-reviewed behavior: approximately 80px desktop navigation and anchor clearance, responsive source branches at 1920/1440/1280/1024/768/430/390/320px, semantic headings/labels, visible focus rules, image containment and lazy loading, full-size galleries, native dialog Escape/focus/scroll-lock code, truthful email handoff, compact footer/dynamic year, reduced-motion overrides, and offscreen/background 3D pauses. No new section minimum heights, decorative elements, or asset transforms were introduced.

Created `src/utils/uiInteractions.test.js`. Modified `src/components/layout/Navigation.jsx`, `src/components/ui/ContactForm.jsx`, `src/index.css`, `src/styles/interactions.css`, `package.json`, `package-lock.json`, and this document.

Remaining verification: no browser automation tool or installed browser-test package was available, and no development server or browser was started. Actual viewport overflow, typography/contrast appearance, keyboard/screen-reader flow, dialog focus return, native mail handlers, clipboard permissions, external-site availability, animation smoothness, and GPU/device performance require manual browser review. Test the listed widths, both navigation breakpoints, project dialogs/galleries, contact error/copy states, and reduced motion. The lazy 3D chunk remains about 921 kB minified / 243 kB gzip; its existing advisory is retained. No runtime performance or Lighthouse improvement is claimed.

## GitHub repository preparation - 2026-11-06

Verified the existing repository as `https://github.com/Lemar-Paras/myfinal-portfolio`, with HTTPS origin `https://github.com/Lemar-Paras/myfinal-portfolio.git` and default branch `main`. Initial inspection found no local Git history and no remote refs; the local repository was initialized on main without replacing any existing history. No GitHub repository was created.

Expanded .gitignore to exclude environment files, credentials, generated output/caches, and local tool configuration. All existing source, tests, documentation, public project/portrait/resume assets, and icon provenance/licenses remain included. README now describes the actual project and commands. A candidate-file scan found no matches for known private-key/token/credential patterns in text files; this is not a guarantee against all possible secrets. Lint, all 21 tests, and production build passed before the initial commit. The existing 3D chunk-size advisory remains.
