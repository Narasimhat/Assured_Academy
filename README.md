# Assured Explorer

An exploratory workspace for genome engineering: start with a question, consider a design, and examine the evidence.

The interface has three destinations:

- **Explore:** a point-change example and a knockout example, with public reference sequences and explicitly simulated evidence.
- **Projects:** your local project library, including designs, original traces, notes and saved results. Import/export portable `.assured.zip` bundles.
- **Learn:** short, searchable explanations of the concepts used in a project.

Each project follows **Question → Design → Evidence**. Full sequences and technical model details are expandable; material design/QC warnings remain visible. The pinned Assured CRISPR Design and Assured QC engines are unchanged.

## Run locally

Requires Node 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). The root opens the single explorer shell at `/studio/`. Studio is built before development starts; after editing Studio, restart the root dev server to rebuild it. For Studio hot reload and the optional local NCBI reference proxy, run `npm run dev:studio` at `http://127.0.0.1:5182`.

```sh
npm run build
npm run preview
```

The combined preview is at `http://127.0.0.1:5183/`. Static hosting supports reference upload and the included examples; online NCBI lookup requires the standalone local server.

## Your data

Choose **Projects → Import saved project** to restore an existing `.assured.zip`. Imported bundles become separate local projects, preserving the original ID as provenance. Projects autosave; creating another project does not replace previous entries. Version-one workspaces migrate to the library with attached trace bytes preserved.

Use **Export project** within a project to save a portable backup. Browser storage is local to the origin/browser profile and can be cleared or evicted. There are no accounts, cloud backups or automatic transfers between localhost ports. No new private experimental data is included in this repository.

## Boundaries

This is a development release for research and learning. Public references require independent parental-line review. Sequence calls do not confirm functional knockout, copy number or biological zygosity. Intervals are simulation-calibrated and can be too narrow on experimental data. Genome-wide specificity and functional confirmation remain external tasks.

Earlier Academy teaching modules remain in the source under `src/`, with their prior shell preserved as `src/LegacyAcademyApp.tsx`. They are not imported into the explorer entry point. Points, certificates, virtual bench, cost calculator, ordering and prewritten publication methods are excluded from the default experience pending review. Existing independently deployed apps remain untouched.

## Verify

```sh
npm run test:studio
npm run verify:vendor
npm run test:e2e
npm run test:engines
```

The browser suite checks examples, worker analysis, project persistence, export/import, mobile learning and migration from the prior IndexedDB format. It uses installed macOS Chrome, `ASSURED_CHROME_EXECUTABLE`, or Playwright Chromium (`npx playwright install chromium`). The legacy standalone Studio browser tests describe the earlier interface; the maintained explorer browser suite is at `test/academy-studio.spec.mjs`.

See [simplification notes](docs/EXPLORER_SIMPLIFICATION.md). Upstream provenance and source checksums remain under `apps/studio/vendor`; Assured QC's MIT license is retained. This integration adds no new license grant for the Designer source. Seven inherited Tailwind 3 build-tool dependency advisories remain documented in [integration notes](docs/STUDIO_INTEGRATION.md).

Author: Dr. Narasimha Telugu. Original method: ASSURED-optimized CRISPR workflow, STAR Protocols, Max Delbrück Center for Molecular Medicine, Berlin.
