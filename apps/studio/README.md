# Assured Explorer workspace

This workspace provides the Explorer UI and the pinned design/QC adapters. See the [root README](../../README.md) for the current product, start commands, project library and verification flow, and [simplification notes](../../docs/EXPLORER_SIMPLIFICATION.md) for data migration and interface decisions.

Run standalone with `npm run dev:studio` from the repository root. The combined suite builds this workspace at `/studio/`. Optional NCBI lookup works through the standalone local server; static hosting uses uploaded GenBank references or the bundled public example.

The current maintained browser tests live at the repository root. The older `test/browser` scenarios remain historical references for the previous Studio UI and are not the explorer regression suite.

Pinned source identities and SHA256 manifests remain in `vendor/`; run `npm run verify:vendor` at the root to check their integrity. Assured QC's MIT license is preserved; no additional license grant is asserted for the Designer source. Source snapshots and simulated fixtures are distinct from the user's experimental project data.
