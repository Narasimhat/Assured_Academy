> Historical integration/initial Studio notes. The current Explorer interface and project library are described in the repository README and `docs/EXPLORER_SIMPLIFICATION.md`.

# Architecture

## Isolation

Assured Studio is included under apps/studio in the Assured Academy repository. The integration is developed on a review branch; it does not merge or promote production deployments. Existing checkouts are read only for snapshot creation. Both original apps remain independently deployable from their own repositories.

## Layer boundaries

- `src/components/`: guided React interface and explanations.
- `src/lib/project.js`: versioned `assured-studio/1` project state, validation, derived-result invalidation, and pairing requirements.
- `src/lib/engine.js`: adapter to the native design engine, native readiness evaluation, and per-alternative QC export.
- `src/lib/analyze.js`: adapter to native trace parsing, planning, mixture analysis, decision logic, and clone recommendation. Adds a conservative hold for pools that would otherwise receive a clone acceptance label.
- `src/workers/engine.worker.js`: browser worker boundary for compute and progress; worker termination provides cancellation.
- `src/lib/storage.js`: local IndexedDB persistence and portable ZIP files.
- `src/lib/report.js`: escaped project report and sequence CSV. Imported strings are not interpolated as executable HTML/SVG; chromatograms render as image resources.
- `vite.config.js`: optional local, allowlisted NCBI reference lookup. No raw sequence upload endpoint exists.
- `vendor/`: immutable upstream source snapshots and original test suites.

Heavy screens, ZIP handling, and chromatogram rendering load on demand. The design and QC engines share a compute worker chunk. This favors a small initial interface without recreating scientific algorithms in UI code.

## Project format

A portable bundle contains `project.json`, `traces/<basename>.ab1` entries, and a short ABOUT file. The record includes input reference, experimental intent, selected pair, QC spec, experiment notes, native readiness, result evidence, timestamps, and engine versions. QC records include SHA-256 input/spec hashes. Worker-generated designs include a reference SHA-256 digest.

Project schema versions are explicit. Unknown versions are rejected, not silently migrated. ZIP metadata and expanded file sizes are bounded; encrypted and ZIP64 imports are unsupported. Projects with unsupported engine identities are surfaced as historical evidence. Saved calls must not be relabeled as results from a newer engine without rerunning analysis.

## State invariants

Changing biological inputs clears the previous design and QC. Changing selected alternatives changes the QC spec, clears results, and unconfirms prior pairings. Editing pairings, removing traces, changing sample type, or changing the acceptance goal clears old QC. Readiness checkboxes record user statements; they do not override native readiness status.

Each point-mutation alternative exports one matched guide and donor using the native full design result. The stripped CLI result is not used to reconstruct a transcript model. Pair-specific blocking changes and donor indices are normalized before native export and validated by the QC spec validator.

## Privacy and operational limits

The current browser profile holds the active project and trace buffers. There is no cloud synchronization or automatic external submission. Only explicitly requested gene/accession lookups reach NCBI. Browser storage is not a substitute for a saved project file; important projects should be exported. A user who clears browser data can reopen a saved bundle.

First-release QC rows each have one control and one edited read. Distinct forward/reverse reads are separate evidence rows, not silently combined. Native joint-read support can be integrated later with a model and interface that make pairing and disagreement explicit.
