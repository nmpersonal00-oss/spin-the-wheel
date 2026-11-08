# Sakura Spin — interactive kawaii spin-the-wheel

A free full-screen spin wheel website. Unlike the old mockup-based design, the entire scene is original vector artwork and browser animation, not a screenshot. The wheel is rendered live with Canvas for each selection, including bespoke vector decorations. Its design remains responsive on desktop and mobile.

- Add any names or items; paste multiple items separated by commas or line breaks.
- Tap **Spin** for an animated, equally weighted random result.
- Winner pop-up with animated flower petals and hearts.
- Real, gently faded audience applause (default volume 22/100 on a deliberately reduced volume scale). Mute or adjust with the top-right control. If the browser cannot stream the recording, the animation still works without sound.
- Choices and audio preferences are stored only in your own browser. No login, ads, subscriptions, trackers, or server processing.
- Installable app icon is a separate illustrated bow-and-blossom image, not a screenshot.

## Hosting

Publish from branch `main` and folder `/(root)` in **Settings → Pages**. GitHub Pages serves the homepage from `index.html`.

## Assets and attribution

- The layered sakura garden SVG is embedded inside `index.html` for reliable loading; independently animated petals, light particles, and glowing effects play over the scene.
- The app icon is AI-generated bow-and-flower artwork.
- Real applause is streamed on demand from the public-domain recording [“Applause i.ogg”](https://commons.wikimedia.org/wiki/File:Applause_i.ogg) by **thore**, sourced from PDSounds.org and distributed on Wikimedia Commons. The app plays only a short quiet excerpt with volume ramps. If you'd prefer fully offline applause, you may download the original recording and place it in `assets/` and update the `<audio>` `src` in `index.html`.

HTML, CSS, SVG, and JavaScript only. All other graphics are custom browser-drawn vector shapes; no platform emoji images are used.