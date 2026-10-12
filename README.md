# Noufal Rizwan portfolio — v2

Serve `dist/` with an HTTP server. The site is a static HTML/CSS/JavaScript project using GSAP 3.13.0, ScrollTrigger and Motion 12.23.24's vanilla API. No React build or backend is required.

## Scroll story

- The introduction pins for four viewport heights on desktop and 2.5 on phones.
- Three matching transparent avatar poses provide the greeting wave and résumé-holding pose.
- The HTML résumé sheet leaves the hand, loops through the scene, turns toward the viewer, and scales beyond all four screen edges. About text appears only after full coverage.
- The timeline pins for two viewport heights, showing education, Intronsoft, Panchathan Logistics, and Aquaconnect chronologically.
- Desktop projects pin for three viewport heights. Phone projects remain vertically stacked.
- Reverse scrolling reverses each chapter. Chapter navigation and Skip intro use exact scroll destinations.
- System reduced-motion preferences, the motion toggle, unavailable assets/libraries, and viewports under 620px high retain the readable document layout. The avatar poses are images animated through page transforms, not a video or live 3D model.

## Editing

`dist/index.html` contains résumé-based content and section order. `dist/app.js` contains project summaries, scroll timelines, navigation and motion controls. `dist/style.css` contains base styling; `dist/story.css` contains the v2 scenes and responsive chapter layouts.

Project covers are illustrative compositions rather than screenshots. Project buttons open contribution summaries and live links. Email and phone links open the visitor's mail/phone app; the original résumé PDF is downloadable.

## Character assets

Generated using the built-in image tool from the user's identity photo and supplied style reference. Prompts are in `IMAGE-PROMPTS-V2.md`.

- [Wave A](dist/assets/avatar-wave-a.png)
- [Wave B](dist/assets/avatar-wave-b.png)
- [Holding pose](dist/assets/avatar-hold.png)

Google Fonts is the only external rendering dependency; system fonts provide fallbacks. Animation libraries and character assets are served locally with the site.

## Verification

Checked desktop (1280×800) and phone (390×844), paper coverage, Skip intro, chronological timeline, project forward/reverse scrolling, project detail dialog and Escape close, motion-off layout, direct chapter navigation, and horizontal overflow. Checks and browser console showed no JavaScript errors.
