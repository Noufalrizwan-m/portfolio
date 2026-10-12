# Noufal portfolio — v2

The site is a static HTML/CSS/JavaScript project using GSAP 3.13.0, ScrollTrigger and Motion 12.23.24's vanilla API. Vite provides local development and automatic reloads. No React build or backend is required.

## Run in VS Code

Open a terminal in the portfolio folder and run:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. Edit the files inside `dist/`; the page reloads automatically.

`npm run build` checks the JavaScript and copies the complete static website into `build/`, including the animation libraries, character assets, and résumé. `npm run preview` serves that build locally.

## Scroll story

- The introduction pins for two viewport heights on desktop and 1.65 on phones.
- A separate hand/forearm layer provides one smooth greeting wave while the head and torso remain still; a matching holding pose introduces the résumé. The alternative wave image is retained as an asset.
- The HTML résumé sheet leaves the hand, follows two joined cubic curves through one gentle loop, turns toward the viewer, and scales beyond all four screen edges. About text appears only after full coverage.
- The timeline pins for two viewport heights, showing education, Intronsoft, Panchathan Logistics, and Aquaconnect chronologically.
- Desktop projects pin for three viewport heights. Phone projects remain vertically stacked.
- Reverse scrolling reverses each chapter. Chapter navigation and Skip intro use exact scroll destinations.
- System reduced-motion preferences, the motion toggle, unavailable assets/libraries, and viewports under 620px high retain the readable document layout. The avatar poses are images animated through page transforms, not a video or live 3D model.

## Editing

`dist/index.html` contains résumé-based content and section order. `dist/app.js` contains project summaries, scroll timelines, navigation and motion controls. `dist/style.css` contains base styling; `dist/story.css` contains the v2 scenes and responsive chapter layouts.

Project covers are captured screenshots of the reviewed live websites (October 2026). Project chapters use corresponding brand colors: Dr.Grow Labs sage/green, Aquaconnect blue, Panchathan green/amber, Fish Choice warm cream/red, and VJoin lilac. Project buttons open contribution summaries and live links. Email and phone links open the visitor's mail/phone app; the original résumé PDF is downloadable.

## Character assets

Generated using the built-in image tool from the user's identity photo and supplied style reference. Prompts are in `IMAGE-PROMPTS-V2.md`.

- [Wave A](dist/assets/avatar-wave-a.png)
- [Wave B](dist/assets/avatar-wave-b.png)
- [Holding pose](dist/assets/avatar-hold.png)

Google Fonts is the only external rendering dependency; system fonts provide fallbacks. Animation libraries and character assets are served locally with the site.

## Verification

Checked desktop (1280×800) and phone (390×844), paper coverage, Skip intro, chronological timeline, project forward/reverse scrolling, project detail dialog and Escape close, motion-off layout, direct chapter navigation, and horizontal overflow. Checks and browser console showed no JavaScript errors.
