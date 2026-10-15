export interface SampleDataset {
  id: string;
  name: string;
  category: 'Design-Report' | 'Sanger-AB1' | 'GenBank-Ref';
  description: string;
  sourceRepo: 'Assured_QC' | 'Assured_CRISPR_Design';
  localPath: string;
  downloadFilename: string;
  payloadText?: string;
}

export const SAMPLE_DATASETS: SampleDataset[] = [
  {
    id: 'sample-apoe-design',
    name: 'APOE R176C SNP Knock-In Design Report',
    category: 'Design-Report',
    description: 'Validated ASSURED CRISPR design for APOE Arg176Cys mutation with dual-guide selection and silent PAM blocking.',
    sourceRepo: 'Assured_QC',
    localPath: 'Assured_QC/fixtures/design/apoe_r176c_snp.design.json',
    downloadFilename: 'apoe_r176c_snp.design.json',
    payloadText: `{
  "targetName": "APOE_R176C_SNP",
  "gene": "APOE",
  "species": "Homo sapiens",
  "assembly": "GRCh38",
  "chromosome": "chr19",
  "editPosition": 44908822,
  "strategy": "HDR_SNP_CORRECTION",
  "guides": [
    {
      "id": "g1",
      "sequence": "GCGGACATGGAGGACGTGTG",
      "pam": "CGG",
      "strand": "+",
      "cutOffset": 3,
      "efficiencyScore": 84.5
    },
    {
      "id": "g2",
      "sequence": "CCGTCGCACACGTCCATCCA",
      "pam": "TGG",
      "strand": "-",
      "cutOffset": 5,
      "efficiencyScore": 79.2
    }
  ],
  "donors": [
    {
      "id": "ssodn_asym_1",
      "strand": "-",
      "length": 127,
      "arm5": 36,
      "arm3": 91,
      "sequence": "GCCTGTCCCTTCGTTCCCTCCGCACTCCACCCCAAGGCACCTCCTTCCCGCCCTCGCCGGACATGGAGGACGTATGCGGCCGCCTGGTGCAGTACCGCGGCGAGGTGCAGGCCATGCTCGGCCAGAGCACCGAGG",
      "intendedEdit": "C->T (p.Arg176Cys)",
      "silentBlocks": ["PAM GGG->GGT", "Seed G->A"]
    }
  ]
}`
  },
  {
    id: 'sample-nr2f2-design',
    name: 'NR2F2 2xHA Epitope Tag Knock-in Design',
    category: 'Design-Report',
    description: 'C-terminal in-frame 2xHA tag knock-in for stem cell lineage transcription factor tracking.',
    sourceRepo: 'Assured_QC',
    localPath: 'Assured_QC/fixtures/design/nr2f2_2xha_ssodn.design.json',
    downloadFilename: 'nr2f2_2xha_ssodn.design.json',
    payloadText: `{
  "targetName": "NR2F2_2xHA_Tag",
  "gene": "NR2F2",
  "species": "Homo sapiens",
  "strategy": "HDR_INSERTION",
  "insertSequence": "TATCCATACGATGTTCCAGATTACGCTTATCCATACGATGTTCCAGATTACGCT",
  "tag": "2xHA",
  "assembly": "GRCh38"
}`
  },
  {
    id: 'sample-tagme-ko',
    name: 'TAGME Functional Knockout Dual-Guide Deletion',
    category: 'Design-Report',
    description: 'High-efficiency dual-guide complete exon deletion knockout minimizing truncated dominant-negative isoforms.',
    sourceRepo: 'Assured_QC',
    localPath: 'Assured_QC/fixtures/design/tagme_ko_deletion.design.json',
    downloadFilename: 'tagme_ko_deletion.design.json',
    payloadText: `{
  "targetName": "TAGME_KO_Exon2",
  "gene": "TAGME",
  "strategy": "DUAL_GUIDE_DELETION",
  "deletionSizeBp": 248,
  "frameshiftGuaranteed": true
}`
  }
];
