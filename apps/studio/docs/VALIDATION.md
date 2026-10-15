> Historical integration/initial Studio notes. The current Explorer interface and project library are described in the repository README and `docs/EXPLORER_SIMPLIFICATION.md`.

# Validation evidence

Software validation is separate from biological/experimental validation. This workspace has not been validated against new laboratory truth and has not undergone novice user studies.

## Checks

- Integration tests compare adapter designs, guide/donor sequences, and readiness with the pinned native engine.
- Handoffs are validated per alternative, including coding blocks, marker roles, donor selection, and reference coordinates.
- QC summaries and intervals are compared with native analysis on bundled simulated traces. Failures stay in result lists; pools cannot receive clone acceptance in this interface.
- State tests check invalidation of results after biological input or pairing changes.
- Portable bundle tests check reference/notes/trace-byte round trips and rejected unsupported inputs.
- Browser tests exercise reference upload → design → alternative selection → QC export → bundle export → reload → restore; separately they exercise trace pairing → QC → report/figure → restore.
- A worked-example test verifies that each alternative's bundled synthetic reads match its exact expected allele, with intended, heterozygous, and blocking-only mixture outcomes.
- Mobile checks detect horizontal overflow and exercise entry/reference lookup.
- Axe checks cover names, roles, landmarks, and contrast on core screens. They do not substitute for manual assistive-technology testing.
- Both complete upstream engine test suites are retained and executable under their original module boundaries.
- Source SHA-256 verification detects changes in pinned vendor files.

## Known limits

A passing test establishes behavior on its supplied inputs. It does not establish guide activity, parental-line genotype, genome-wide specificity, protein loss, copy number, or general clinical/laboratory accuracy. The standalone legacy QC fixture has a different donor model from the new design example and is intentionally separate. The guided design example uses newly generated matching traces with recorded synthetic truth.

The original inherited CommonJS API tests initially failed because the new package changed their module scope. A dedicated snapshot-root `package.json` restores the original semantics without changing any native source. A form-label issue, initial contrast failures, and a save-before-reload race were found in browser testing and corrected in the Studio layer.

## Local verification checkpoint — 14 October 2026

- 541/541 complete upstream engine tests passed.
- 12/12 Studio integration and bundle tests passed.
- All five browser scenarios passed; targeted reruns also passed after persistence, keyboard, and result-display changes.
- Core-screen automated accessibility checks passed.
- Production build passed with pinned dependencies.
- 288 vendor file hashes verified.
- Dependency audit reported zero known vulnerabilities at the time of this checkpoint.
- Both source checkouts had clean working trees after development.
- Local preview returned HTTP 200. No hosted deployment was created.

This checkpoint does not replace a laboratory validation study, independent manual accessibility review, or a novice usability study.
