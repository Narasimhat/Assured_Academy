# Explorer simplification · 15 October 2026

## Current product

One shell, served at `/studio/`, with the root forwarding there. Navigation is Explore, Projects and Learn. Each project follows Question, Design and Evidence; evidence pairing and saved results share the Evidence step. A point-change and a knockout exercise use the same design/QC adapters as user projects. Example traces remain explicitly simulated.

The previous Academy shell is preserved as `src/LegacyAcademyApp.tsx` but is not imported by the entry point. Teaching workbench, disease missions, simulator, cost calculator, points, certificates, ordering and publication modules remain in source for future review. They are excluded from default navigation and the explorer's bundle. Useful concepts are available in the small searchable field guide. No production merge or promotion is involved.

## Local project library

IndexedDB database `assured-studio-v1` upgrades from version 1 to 2. The original `workspace/current` record is copied to `projects` and its lightweight metadata to `catalog` in the upgrade transaction. A save updates the active workspace, project record and catalog atomically. Writes are snapshotted and serialized; failed prior writes do not break the queue. Catalog listing reads metadata rather than loading every project's traces.

Before replacing the active state (new example, new project, import or saved-project switch), current meaningful work is persisted. A storage failure stops replacement and shows an error. Blank initial workspaces do not fill the library. Imported bundles receive a new local ID and retain `importedProjectId`, so restoring a historical export does not overwrite an existing project with the same original ID.

Project listing, switching, renaming through the notebook, autosave and ZIP export/import are implemented. Library deletion, search, synchronization and cloud accounts are intentionally deferred. Browser storage remains subject to local quota/eviction; exports are the portable backup. Same-origin tabs share the library; simultaneous editing of one project across tabs has no conflict-resolution system and should be avoided.

## Evidence and disclosure

Guide/donor/primer sequences and allele-mixture model tables are collapsed by default. Design readiness notes, primer warnings, QC warnings, intervals, failures and sequence-evidence limitations remain visible. Native decisions and analytical algorithms are unchanged. The knockout exercise demonstrates that a high edited fraction need not establish the desired functional outcome.

The two-guide exercise uses a 46-base native predicted deletion. The generator truncates WT read coverage to the common readable length rather than inventing a deleted allele's downstream tail. Known 100%, 50% and 20% edited mixtures are recorded in its truth JSON; these are software exercises, not biological efficiency predictions. Recreate the handoffs with `node scripts/generate-example.mjs`, then run `scripts/generate-knockout-example.py` from `apps/studio` (numpy required).

## Verification

Updated adapter tests verify known knockout mixtures and uncertain functional predictions. Browser tests cover both examples, worker analysis, local project retention and switching, export/import, mobile navigation, and migration of a version-one workspace with exact trace-byte preservation. Pinned upstream files remain unchanged. Real APOE project restore is tested locally without adding the project or traces to the repository.

## Next priorities

Test comprehension with newcomers, improve project-library search and storage usage visibility, add short example-specific interpretation prompts, review inherited scientific teaching content before reintroducing it, and address inherited build-tool dependency advisories. New modules should support a specific project decision rather than add another top-level destination.

## Public reference correction

Reference lookup is now enabled in the combined Explorer build. `apps/studio/server/reference-api.mjs` provides one restricted NCBI handler shared by both Vite servers and the root `api/reference.js` hosting function. The client uses `/api/reference?gene=...` for search and `/api/reference?accession=...` for download. Invalid gene symbols, non-versioned/non-RefSeqGene accessions and arbitrary destination URLs are rejected; only the fixed NCBI origin is used. Service errors remain visible, and an unavailable/non-JSON backend produces an explanatory message rather than a JSON parse error. Project/trace data is not sent to NCBI. Delayed downloads apply only to the project and gene that initiated them.

Routing guidance: https://vercel.com/docs/frameworks/frontend/vite and https://vercel.com/docs/routing/rewrites. The API has an explicit route ahead of the SPA fallback. Hosting changes are prepared on the draft branch, not deployed or promoted.
