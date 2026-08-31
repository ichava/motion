[← Package README](../README.md#documentation)

# Release

*Reference.*

## Where this package is

`v0.1.0`, the first open-source release, alongside every other package in the ecosystem. Earlier
tags never existed here: this repository was untagged until the reset.

**Not published to npm.** Consumers install from the repository; see
[installation](installation.md).

## Cutting a release

1. Rebuild the generated output and confirm it is reproducible:

   ```bash
   npm run gen
   git diff --exit-code dist/presets.json
   ```

   A diff here means the manifest was hand-edited. Fix the generator, not the file.

2. Build, and check the CSS survived:

   ```bash
   npm run build
   ```

   CI asserts `dist/ichava-motion.css` still carries its keyframes and `.ichm-*` classes. This
   assertion exists because the build script once emptied it and exited 0.

3. `npm test`.

4. Update `CHANGELOG.md`, the release body is the version's section, not auto-generated notes.

5. Tag `vX.Y.Z` and push the tag.

## Versioning

Semver, against the **preset contract** rather than the internals. Removing a preset id or changing
what one does is breaking; adding a family is a minor; retiming an existing preset within its
variant band is a patch.

---

[← Docs index](../README.md#documentation)
