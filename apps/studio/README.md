> For the combined Academy build and navigation, start with the [repository README](../../README.md). The standalone instructions below apply when running Studio separately.

# Assured Studio

An npm workspace integrated into Assured Academy, joining Assured CRISPR Design and Assured QC into one project journey. The existing applications and their deployment projects are untouched.

## Start locally

Requires Node 22.12+ (or a supported Node version listed by Vite).

```bash
npm ci
npm run dev
```

Open http://127.0.0.1:5180/. The server binds to loopback only. No hosting credentials, accounts, database, remote Git repository, or production deployment configuration are required.

## What works in 0.1

- Guided human SpCas9 point-mutation and two-guide knockout design from an annotated GenBank reference.
- Optional NCBI RefSeqGene search/download. Gene or accession requests go to NCBI through a restricted local endpoint; traces, experiment notes, and project data do not.
- Explicit guide–donor alternatives, predicted allele map, candidate sequences, primers, and unabridged engine review notes.
- A separate valid QC handoff per selected experimental alternative. Alternative donors are not silently pooled.
- Editable one-control/one-edited-read pairings requiring confirmation, explicit clone/pool type and acceptance goal.
- Native Sanger deconvolution, confidence intervals, decisions, annotated chromatograms, and report export. Failed samples remain visible. Pools cannot be accepted as verified clones in this workspace.
- IndexedDB autosave, notebook, complete `.assured.zip` export/restore including raw traces, and sequence CSV/QC JSON exports.
- A public-reference APOE design example with reproducible, exact-donor simulated reads for each alternative. A separate legacy fixture QC example remains available and is labeled simulated.
- Responsive layout, labeled inputs, keyboard navigation, and automated accessibility checks on core screens.

The design and QC computations run in a browser worker. Project data stays in the current browser profile unless the user explicitly exports it. Browser storage can be cleared or evicted; export important projects. There is one active local workspace, not a multi-project cloud library. Saved bundles can be reopened to switch projects.

## Honest boundaries

This is a development release, not a validated laboratory service. Public references have not been checked against a user's parental line. Guide/primer genome-wide specificity checks and functional confirmation are not implemented by the workspace. Genotype estimates do not establish copy number or exclude primer dropout. Simulated examples are not experimental evidence.

Tagging and large-insert junctions, joint forward/reverse analysis, protein-observation import, calibration, multi-user collaboration, other species/nucleases, and an NGS analysis workflow are future work. The embedded engines may support more modes than this first shared interface exposes. The acceptance goal currently follows native `homozygous`/`any` semantics; an exact heterozygous-goal policy needs a separately validated implementation.

NCBI lookup requires internet and the included local Vite dev/preview server. A standalone static build works for upload-based designs and local QC, but does not provide the NCBI proxy endpoint. No third-party scripts, analytics, remote fonts, or external AI services are used.

## Verification

```bash
npm test
npm run test:engines
npm run test:e2e
npm run build
node scripts/verify-vendor.mjs
```

Browser tests use installed Google Chrome on macOS when available. Else install Playwright Chromium with `npx playwright install chromium`, or set `ASSURED_CHROME_EXECUTABLE` to an installed browser. Start the local server before browser tests. Screenshots and test reports are ignored development artifacts.

The default browser tests include a live NCBI reference search; it requires network access. Integration tests and pinned engine tests run without external services.

## Source provenance and licensing

`vendor/provenance.json` records both original repositories and pinned commits. `vendor/SHA256SUMS.json` records source digests. Engine source is not rewritten by this app. A new `vendor/design/package.json` preserves the original root's CommonJS module semantics under the Studio ESM package; the designer's nested package remains ESM. No upstream workflows are copied.

Assured QC's MIT license is preserved at `vendor/qc/LICENSE`. No license file was found in the pinned Assured CRISPR Design repository. The npm package remains marked private (not publishable to npm); this repository integration adds no license grant for the Designer source. Review distribution rights and third-party attribution before a release. No new public license is asserted here.

See `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, and `docs/VALIDATION.md` for engineering decisions, next milestones, and verification evidence.
