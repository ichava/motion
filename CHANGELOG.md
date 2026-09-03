# Changelog

All notable changes to `@ichava/motion` follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/).

## [0.1.1] - 2026-09-02

### Security

- **The library no longer fetches script.** `lottie: "full"` appended a
  `<script src="https://cdn.jsdelivr.net/npm/lottie-web@5/...">` to the document head on
  first use. Under any strict CSP (`script-src 'self'`) that tag is blocked, so the feature
  failed precisely where the library claims to be safest -- and it introduced an unpinned
  third-party origin, with no SRI, into the consumer's page.

  The player is now supplied, never resolved over the network: pass one with
  `IchavaMotion.config({ lottiePlayer: lottie })`, or expose it as `window.lottie`. When
  neither exists the call warns once and does nothing. `M3`.

- **Config merging can no longer reach `Object.prototype`.** `assign()` guarded with
  `hasOwnProperty`, which is not a defence: `JSON.parse('{"__proto__":{...}}')` produces an
  OWN `__proto__` property, so the guard passed and the write went through to the
  prototype. Config reaches that function from JSON -- a preset manifest, a `data-*`
  attribute, an API payload -- so the untrusted path was the normal path. `M4`.
- **An unreadable motion preference is treated as "reduce".** `reduceMotion()` returned
  `false` on error, meaning "the user has not asked for less motion", so the one genuinely
  unknown case was resolved by animating anyway. For an accessibility preference the safe
  default is the accommodating one. `M8`.

### Added

- `config.lottiePlayer`, for supplying a lottie-web instance explicitly.
- `tests/csp-safety.test.mjs`, which asserts no shipped artifact creates a `<script>`
  element, references a CDN origin, or calls `eval`/`new Function` -- checked against
  `dist/` as well as `src/`, since the stale build is what a consumer would actually get.

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
