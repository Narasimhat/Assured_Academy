# Studio integration

## Structure and boundaries

The Academy shell remains TypeScript/React/Tailwind. `apps/studio` is a separate npm workspace with its own React/Vite application and pinned upstream engines. Its CSS and worker bundle load only when `/studio/` opens. A single root build assembles both applications in `dist`; no iframe, cross-window messaging, cloud project store or automatic transfer of simulated teaching results is involved.

The root build disables NCBI lookup because a static host has no local reference proxy. GenBank upload, included reference examples, local computation and ZIP restore/export remain available. Studio's own dev server retains the restricted NCBI endpoint. Reference lookup never uploads traces.

The integration retains the original Studio's simulated engine and adapter tests and verifies all 288 pinned source hashes. Academy now distinguishes learning/practice from actual analysis. Failed teaching trace downloads show an error rather than a synthetic replacement. CSV summary labels do not claim that percentages establish functional knockout or homozygosity.

## Data handling

Private APOE/MYD88 Drive files and local result ZIPs are outside this repository. A user may import those ZIPs locally, without publishing them. Studio retains one IndexedDB workspace per browser origin. Moving between the earlier standalone preview and Academy's preview does not copy browser storage; export/import is the supported transfer path. Public sample data that already existed in Academy is unchanged.

## Review and release

Work is prepared on `feature/assured-studio-integration`, separate from `main`. There is no merge, production promotion, new hosting project or modification to the independent Designer/QC deployments. Repository-connected providers may generate a branch preview when a branch is pushed.

Before a production release, review inherited teaching content and source licensing, check the preview in a clean browser, and review dependency advisories. The root dependency audit currently reports 7 inherited Tailwind 3 build-tool advisories (5 high, 2 moderate). This integration does not force a Tailwind 4 migration; its build and tests are checked with the locked dependency set.

Next priorities: a user-facing project library, local evidence comparisons and acceptance-goal explanations, complete teaching-content review, translation/accessibility audits, and stronger experimental calibration. Sequence predictions should remain distinct from protein and functional confirmation.
