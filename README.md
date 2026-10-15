# Assured Academy + Studio

Learn genome engineering concepts, practice a project, and work with your own reference sequences and Sanger traces in one repository.

- **Academy (`/`)**: curriculum, a teaching workbench, virtual bench, resource planning and disease-model exercises.
- **Studio (`/studio/`)**: pinned Assured CRISPR Design and Assured QC engines connected by an expected-edit handoff, matched controls, trace analysis, visible uncertainty and portable project bundles.

This integration is a development release. Teaching presets and simulations are learning material, not experimental validation. Sequence calls do not confirm functional knockout, copy number or biological zygosity. Existing Designer and QC deployments remain independent.

## Run locally

Requires Node 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). Studio is built before the development server starts and is served at `/studio/`. Academy has hot reload; after editing Studio, restart `npm run dev` to rebuild it. For Studio hot reload and optional NCBI reference lookup, run `npm run dev:studio` separately at `http://127.0.0.1:5182`.

```sh
npm run build
npm run preview
```

The combined preview is at `http://127.0.0.1:5183/`. Both apps are included in `dist`. The static suite uses uploaded GenBank files or the included APOE example; it does not expose the standalone local NCBI proxy.

## Open existing results

Choose **Open Assured Studio → Open project** and select a `.assured.zip` file. Studio restores the design, original traces, notes and saved results. Projects stay in the browser's IndexedDB unless exported; there is one active Studio project at a time. Export a backup before clearing browser data. Academy's teaching state and Studio's analytical state are intentionally separate; a teaching preset does not become an experimental result.

No new experimental traces, Drive files or private project reports are included in this integration. The repository's existing public sample assets remain as inherited.

## Verify

```sh
npm run test:studio
npm run test:engines
npm run verify:vendor
npm run test:e2e
```

Browser tests use installed macOS Chrome, `ASSURED_CHROME_EXECUTABLE`, or Playwright Chromium (`npx playwright install chromium`). The integration tests run offline; the standalone Studio's older browser suite also includes an optional network-dependent NCBI exercise.

See [integration notes](docs/STUDIO_INTEGRATION.md) and [Studio documentation](apps/studio/README.md). Upstream provenance and source checksums are preserved under `apps/studio/vendor`. Assured QC's MIT license is retained; this integration does not add a new license grant for the Designer source.

Author: Dr. Narasimha Telugu. Original method: ASSURED-optimized CRISPR workflow, STAR Protocols, Max Delbrück Center for Molecular Medicine, Berlin.
