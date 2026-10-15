# Integration verification · 15 October 2026

- Combined TypeScript and Vite production build passed for Academy `/` and Studio `/studio/`.
- 12 Studio adapter/integration tests passed.
- 541 pinned upstream engine tests passed.
- 288 upstream source hashes verified unchanged.
- 2 suite browser scenarios passed: Academy → Studio example design in a worker → ZIP export → IndexedDB restore → Academy; mobile learning → teaching workbench → Studio navigation.
- Local-only check: existing APOE project ZIP restored all 24 clone results at the integrated `/studio/` route with no page errors. The project, raw traces and screenshots are not committed.
- Root development server returned HTTP 200 for bundled Studio at `/studio/`.
- `git diff --check` passed; no experimental validation run files or new private trace data are staged.

The dependency audit reports seven inherited Tailwind 3 build-tool advisories. Automated checks do not establish clinical or laboratory accuracy. Upstream simulated tests and successful historical-project restoration are software checks, not independent biological validation.
