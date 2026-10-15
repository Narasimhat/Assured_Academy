import { RareDiseaseMission } from '../types';

export const RARE_DISEASE_MISSIONS: RareDiseaseMission[] = [
  {
    id: 'mission-apoe',
    diseaseName: 'APOE Isoform Switch / Late-Onset Neurodegeneration',
    inheritance: 'Autosomal Co-dominant (Risk allele)',
    gene: 'APOE (Apolipoprotein E)',
    proteinChange: 'p.Arg176Cys (APOE4 -> APOE3 / APOE2)',
    genomicCoord: 'chr19:44908822 (GRCh38)',
    refAllele: 'C',
    altAllele: 'T',
    phenotypeDescription: 'APOE4 is the strongest genetic risk factor for Alzheimer disease, altering lipid homeostasis and amyloid clearance in human iPSC-derived microglia and astrocytes. Converting Arg176Cys models the protective transition towards the APOE3/2 phenotype.',
    curationNotes: 'Pre-matched with existing Assured QC fixtures: includes full validated design JSON and actual simulated .ab1 chromatogram traces.',
    strategy: 'HDR-SNP-Correction',
    recommendedGuides: [
      {
        name: 'sgAPOE-1',
        sequence: 'GCGGACATGGAGGACGTGTG',
        pam: 'CGG',
        strand: '+',
        cutDist: 3
      },
      {
        name: 'sgAPOE-2',
        sequence: 'CCGTCGCACACGTCCATCCA',
        pam: 'TGG',
        strand: '-',
        cutDist: 5
      }
    ],
    ssodnTemplate: '5\'-G*C*CTGTCCCTTCGTTCCCTCCGCACTCCACCCCAAGGCACCTCCTTCCCGCCCTCGCCGGACATGGAGGACGTATGCGGCCGCCTGGTGCAGTACCGCGGCGAGGTGCAGGCCATGCTCGGCCAGAGCACCGA*G*G-3\'',
    silentChanges: ['PAM GGG -> GGT (Silent Val mutation)', 'Seed region C->T synonymous wobble'],
    sampleFixtureDesign: 'apoe_r176c_snp.design.json',
    sampleFixtureAb1: 'apoe_snp_clone_hom_edited.ab1'
  },
  {
    id: 'mission-hbb',
    diseaseName: 'Sickle Cell Anemia',
    inheritance: 'Autosomal Recessive',
    gene: 'HBB (Hemoglobin Subunit Beta)',
    proteinChange: 'p.Glu6Val (c.20A>T, rs334)',
    genomicCoord: 'chr11:5227002 (GRCh38)',
    refAllele: 'A',
    altAllele: 'T',
    phenotypeDescription: 'Point mutation in the beta-globin gene causes hemoglobin S polymerization under hypoxia, leading to sickling of erythrocytes, severe hemolytic anemia, painful vaso-occlusive crises, and organ damage. Reverting Val6 back to Glu6 in patient hiPSCs restores normal adult hemoglobin (HbA).',
    curationNotes: 'Classic target for testing single-nucleotide precision correction vs. non-homologous end joining knockout.',
    strategy: 'HDR-SNP-Correction',
    recommendedGuides: [
      {
        name: 'sgHBB-G1',
        sequence: 'CTTGCCCCACAGGGCAGTAA',
        pam: 'CGG',
        strand: '-',
        cutDist: 2
      },
      {
        name: 'sgHBB-G2',
        sequence: 'ACTTCTCCTCAGGAGTCAG',
        pam: 'TGG',
        strand: '+',
        cutDist: 4
      }
    ],
    ssodnTemplate: '5\'-A*G*GAAACAGACCACCATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGGTTGGTATCAAGGTTACAA*G*A-3\'',
    silentChanges: ['PAM TGG -> TGA (Synonymous Leu)', 'HBB/HBD specificity silent nucleotide block'],
    sampleFixtureDesign: 'hbb_e6v_correction.json',
    sampleFixtureAb1: 'hbb_clone_hom_edited.ab1'
  },
  {
    id: 'mission-cacnb2',
    diseaseName: 'Brugada Syndrome / Cardiac Channelopathy',
    inheritance: 'Autosomal Dominant',
    gene: 'CACNB2 (Voltage-dependent L-type Ca2+ channel subunit beta-2)',
    proteinChange: 'p.Ser426Leu (c.1277C>T)',
    genomicCoord: 'chr10:18194473 (GRCh38)',
    refAllele: 'C',
    altAllele: 'T',
    phenotypeDescription: 'Mutations in CACNB2 cause accelerated inactivation of L-type calcium currents (ICa,L), leading to ST-segment elevation on ECG, ventricular fibrillation, and sudden cardiac death. In iPSC-derived cardiomyocytes, isogenic gene editing rescues calcium transient duration and action potential kinetics.',
    curationNotes: 'Modeled after MDC cardiac electrophysiology disease modeling pipeline.',
    strategy: 'HDR-SNP-Correction',
    recommendedGuides: [
      {
        name: 'sgCACNB2-1',
        sequence: 'CCTGCCTTCACATCTTCGGC',
        pam: 'AGG',
        strand: '+',
        cutDist: 3
      }
    ],
    ssodnTemplate: '5\'-G*A*CCAGGGGCCTCAGCACCCCTGCCTTCACATCCTCGGCTGGCTGCAGCTGCAGCAGTGGGGGTGCCTGGCCCCAAGCACCTCTGAGCAGAGCCG*C*C-3\'',
    silentChanges: ['Silent AGG -> AGA mutation preserving Ala425', 'Novel SmaI restriction site for RFLP screening'],
    sampleFixtureDesign: 'cacnb2_s426l.json',
    sampleFixtureAb1: 'cacnb2_clone_het.ab1'
  },
  {
    id: 'mission-cep83',
    diseaseName: 'Nephronophthisis & Renal Ciliopathy',
    inheritance: 'Autosomal Recessive',
    gene: 'CEP83 (Centrosomal Protein 83)',
    proteinChange: 'p.Gln261* (Nonsense Premature Stop)',
    genomicCoord: 'chr12:54832910 (GRCh38)',
    refAllele: 'C',
    altAllele: 'T',
    phenotypeDescription: 'Deficiency in CEP83 impairs distal appendage assembly in the primary cilium, resulting in juvenile nephronophthisis, corticomedullary cysts, and end-stage kidney failure. Editing the mutation in iPSC-derived kidney organoids restores ciliogenesis and tubular branching.',
    curationNotes: 'Exemplifies organoid-based therapeutic phenotypic rescue.',
    strategy: 'HDR-SNP-Correction',
    recommendedGuides: [
      {
        name: 'sgCEP83-Ex8',
        sequence: 'TGAGATCCGGCAGCTGCGGG',
        pam: 'AGG',
        strand: '+',
        cutDist: 1
      }
    ],
    ssodnTemplate: '5\'-C*C*TGAACACCTGAGATCCGGCAGCTGCAGGAGGAGTTGGAGCGCATCAGGGAGGAGCGCAAGAAGGCCCAGGAGCAGTACGA*G*A-3\'',
    silentChanges: ['TGA Stop codon reverted to CAG Gln', 'Silent Arg CGG -> CGC block'],
    sampleFixtureDesign: 'cep83_q261_rescue.json',
    sampleFixtureAb1: 'cep83_organoid_hom.ab1'
  }
];
