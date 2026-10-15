# Integration verification · 15 October 2026

- Combined TypeScript and Vite production build passed for Academy `/` and Studio `/studio/`.
- 12 Studio adapter/integration tests passed.
- 541 pinned upstream engine tests passed.
- 288 upstream source hashes verified unchanged.
- 2 suite browser scenarios passed: Academy → Studio example design in a worker → ZIP export → IndexedDB restore → Academy; mobile learning → teaching workbench → Studio navigation.
- Local-only check: existing APOE project ZIP restored all 24 clone results at the integrated `/studio/` route with no page errors. The project, raw traces and screenshots are not committed.
- Root development server returned HTTP 200 for bundled Studio at `/studio/`.
- `git diff --check` passed for maintained source (pinned vendor bytes and the NCBI reference retain original whitespace via `.gitattributes`); no experimental validation run files or new private trace data are staged.

The dependency audit reports seven inherited Tailwind 3 build-tool advisories. Automated checks do not establish clinical or laboratory accuracy. Upstream simulated tests and successful historical-project restoration are software checks, not independent biological validation.

## Explorer simplification update

The maintained interface is now the single Explorer shell, with the root forwarding to `/studio/`. The prior Academy shell and modules are retained in source but excluded from the default experience.

- 13 Studio adapter/integration tests pass, including recovery of known 100%, 50% and 20% knockout exercise mixtures with uncertain functional predictions retained.
- 4 maintained browser scenarios pass: both examples and worker QC with project switching/export/restore; mobile navigation and concept search; version-one IndexedDB migration with exact trace bytes; imported-project retention after starting another project.
- Combined TypeScript/Vite build and 288 pinned source hash checks pass. No upstream engine source changed; the earlier 541-engine-test run remains the source-snapshot verification.
- Local-only historical APOE restore still opens all 24 clone results without browser errors; no private project data or screenshots are committed.

The previous two-scenario browser suite and one-active-project description are superseded by the Explorer tests and project-library implementation.

- Automated WCAG A/AA checks found no violations on Explore, Design, Projects, Learn and the mobile landing screen. Screenshots were reviewed locally; these checks do not replace user accessibility testing.

## Public reference fix

- Four endpoint tests pass: constrained search, invalid inputs/methods, empty/error responses, annotated-reference download.
- Live explorer API search returned APOE RefSeqGene `NG_007084.2`; download returned 34,687 characters. The downloaded record produced two native APOE R176C design alternatives against transcript `NM_000041.4`.
- Combined production build passed with reference lookup enabled, and the preview was restarted with the shared API plugin.
- A deterministic browser regression was added for gene search → accession selection → download → design. The attempted full browser rerun encountered Chrome startup timeouts on the local machine; the last passing four-scenario run predates this fix. Endpoint/native-design verification is recorded separately from browser verification.
