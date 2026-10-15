> Historical integration/initial Studio notes. The current Explorer interface and project library are described in the repository README and `docs/EXPLORER_SIMPLIFICATION.md`.

# Product roadmap

## Product principle

Make the journey understandable and reproducible while preserving scientific uncertainty. The interface should help a newcomer choose and interpret evidence, not conceal assumptions behind a success badge.

## Delivered local milestone

An isolated browser workspace with reference selection, native point-mutation and knockout design, explicit alternatives, validated handoff, pairing review, local QC, visible uncertainty, notebook, portable restore, and worked examples. No existing deployments are changed.

## Next milestone: novice usability and evidence

Recruit a small set of newcomers and experienced genome engineers. Observe an uncoached design-to-QC task using examples and non-sensitive known-outcome samples. Measure completion, wrong-reference selection, pairing corrections, comprehension of intended versus partial edits, and whether a participant mistakes sequence support for functional confirmation. Record observed issues; do not infer user success from a passing software test.

Build a versioned validation set spanning independent loci, mixed controls, low-quality reads, forward/reverse discordance, partial donor conversion, and complex alleles. Keep simulated and experimental truth separately identified. Freeze acceptance policy before evaluating held-out samples.

## Next milestone: deeper workflows

- Integrate joint forward/reverse evidence with explicit pairing and disagreement handling.
- Add tagging only after the entire donor-to-junction journey has matched reference, coding, and validation tests.
- Integrate large-insert junction APIs through a dedicated evidence model, without claiming zygosity/copy number from junction coverage.
- Add protein/RNA observations and calibrated functional-knockout assessment.
- Add an explicit heterozygous intended-genotype goal, validated against both native outputs and known mixtures.
- Add reference/transcript selection across supported organisms, with clear genome assembly and coordinate conversion.
- Add external specificity evidence with provenance rather than an unchecked “verified” label.

## Public beta readiness

Confirm the design engine's distribution license and all third-party data terms. Audit privacy claims, benchmark ordinary laptops, test recovery and large batches, perform manual keyboard/screen-reader evaluation, and publish the actual validation scope. Create a new preview hosting project only after deciding how its optional reference endpoint is hosted. Keep the current apps' hosting projects separate.

## Later access features

Offline installability, translations, classroom walkthroughs, a project library, optional collaboration, and interoperable assay/NGS handoffs. Preserve no-account local analysis. Add AI explanations only when they can cite underlying engine evidence; AI should not fabricate sequences or interpret absent trace data.
