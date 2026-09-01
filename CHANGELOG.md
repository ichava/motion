# Changelog

All notable changes to `@ichava/motion` follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-08-31

First open-source release. A framework-agnostic SVG animation engine for the Ichava icon ecosystem:
**240 presets across 40 families**, zero runtime dependencies, usable from CSS alone.

**Not published to npm** (decision `Q4`). Install from the repository; see
[docs/installation.md](docs/installation.md).

### Added

- Three tiers, each usable without the ones above it: a CSS-only tier needing nothing but a
  stylesheet and two classes, a JS engine for staggering and stroke drawing, and an opt-in Lottie
  adapter.
- 240 generated presets across 40 families, each in up to six variants (default, Subtle, Bold, and
  a reverse of each), with 10 named easings. `dist/presets.json` is published as a subpath export so
  a picker can enumerate them without parsing CSS.
- ESM, CommonJS and IIFE builds, plus subpath exports for the compiled CSS, the SCSS source, the
  preset manifest and the Lottie adapter.
- `prefers-reduced-motion` is honoured throughout, including by the Lottie adapter.

### Notes on the version number

This release is `0.1.0`, not the `1.0.0` the package metadata previously carried. The whole
ecosystem restarts from a single `0.1.0`; earlier tags never existed on this repository.

### Fixed before release

- **Auto-init is opt-in.** The engine no longer scans the document on load. A library that starts
  animating the page the moment it is included cannot be adopted incrementally.
- **The build no longer destroys the stylesheet.** `npm run build` took
  `dist/ichava-motion.css` from 52 lines with 20 `@keyframes` to 14 lines with none, wiping the
  entire CSS-only tier, and exited 0 because of a trailing `|| true`. CI now asserts the keyframes
  and `.ichm-*` classes survive a build.
- **The SCSS is the source of the shipped CSS**, rather than the two drifting apart.
- The preset manifest is asserted reproducible from `npm run gen`, so the manifest and the
  stylesheet cannot disagree about what exists.
- `master` renamed to `main`, without which the CI workflow's branch filters never matched.

### Known

`dist/presets.json` reports `count: 242` while listing 240 presets. That is deliberate: the
generator adds the engine's two sentinels, `None` and `JSON · Custom`, which a picker should offer
but which are not animations.
