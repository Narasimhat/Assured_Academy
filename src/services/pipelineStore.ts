import { AssuredProject, TargetLocus, QCCloneResult } from '../types/pipeline';

export const PRESET_PROJECTS: AssuredProject[] = [
  {
    id: 'proj-hbb',
    title: 'Sickle Cell HBB p.Glu6Val Precision Isogenic Rescue',
    createdAt: '2026-10-15',
    currentStage: 1,
    target: {
      id: 'target-hbb',
      gene: 'HBB',
      diseaseName: 'Sickle Cell Disease',
      species: 'Homo sapiens',
      assembly: 'GRCh38',
      chromosome: 'chr11',
      genomicCoordinate: 'chr11:5,227,002',
      refAllele: 'A',
      altAllele: 'T',
      aminoAcidChange: 'p.Glu6Val (c.20A>T, rs334)',
      targetSequence5to3: 'ACACTGAGTGAGCTGCACTGTGACAAGCTGCACGTGGATCCTGAGAACTTCAGGCTCCTGGGCAACGTGCTGGTCTGTGTGCTGGCCCATCACTTTGG',
      complementSequence3to5: 'TGTGACTCACTCGACGTGACACTGTTCGACGTGCACCTAGGACTCTTGAAGTCCGAGGACCCGTTGCACGACCAGACACACGACCGGGTAGTGAAACC',
      guides: [
        {
          id: 'g1',
          name: 'sgHBB-G1 (Primary)',
          sequence: 'CTTGCCCCACAGGGCAGTAA',
          pam: 'CGG',
          strand: '-',
          cutDistanceToEdit: 2,
          efficiencyScore: 88,
          offTargetScore: 92,
          isSelected: true
        },
        {
          id: 'g2',
          name: 'sgHBB-G2 (Backup)',
          sequence: 'ACTTCTCCTCAGGAGTCAG',
          pam: 'TGG',
          strand: '+',
          cutDistanceToEdit: 4,
          efficiencyScore: 82,
          offTargetScore: 89,
          isSelected: true
        }
      ],
      donor: {
        name: 'ssODN-HBB-Asym-36-91',
        strand: '-',
        totalLength: 127,
        arm5Length: 36,
        arm3Length: 91,
        sequence: '5\'-A*G*GAAACAGACCACCATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGGTTGGTATCAAGGTTACAA*G*A-3\'',
        intendedEditDescription: 'T->A Reversion (Restores wild-type Glu6)',
        silentPamBlock: 'PAM TGG -> TGA (Synonymous Leu)',
        silentSeedBlock: 'HBB/HBD specificity wobble C->T',
        hasPhosphorothioate: true
      },
      primers: {
        forwardPrimer: { name: 'HBB-Fwd-Seq', sequence: 'TCCTCACCCTGTGGAGCCACAC', tm: 62.4, length: 22 },
        reversePrimer: { name: 'HBB-Rev-Seq', sequence: 'GTTTCCCATTCTAAACTGTACCA', tm: 59.8, length: 23 },
        ampliconSizeBp: 485,
        sequencingPrimer: { name: 'HBB-Sanger-Fwd', sequence: 'GCAACCTCAAACAGACACCATGG', direction: 'Forward' }
      }
    },
    bench: {
      cuvettesCount: 2,
      cellsPerCuvette: 500000,
      cellConfluencyRecorded: 75,
      cas9AmountUler: 1.0, // µL per cuvette
      gRNAAmountUler: 1.5,
      ssodnAmountUler: 1.0,
      pulseProgram: 'CB-150',
      rockInhibitorUsed: true,
      cloningStrategy: 'frugal-limiting-dilution',
      pickedWellsCount: 24,
      isBenchCompleted: true
    },
    clones: [
      {
        cloneId: 'HBB-B3',
        wellId: 'B3',
        status: 'HOMOZYGOUS_KI',
        statusLabel: 'True Homozygous Knock-In',
        hdrPercentage: 98,
        indelPercentage: 0,
        wtPercentage: 2,
        silentBlockVerified: true,
        chromatogramSequence: 'A-C-C-T-G-A-C-T-C-C-T-G-A-G-G-A-G-A-A-G-T-C-T',
        isRecommendedForExpansion: true
      },
      {
        cloneId: 'HBB-C7',
        wellId: 'C7',
        status: 'HETEROZYGOUS_KI',
        statusLabel: 'Heterozygous KI / WT',
        hdrPercentage: 49,
        indelPercentage: 0,
        wtPercentage: 51,
        silentBlockVerified: true,
        chromatogramSequence: 'A-C-C-T-G-A-C-T-C-C-T-G-A-[G/T]-G-A-G-A-A-G-T-C-T',
        isRecommendedForExpansion: false
      },
      {
        cloneId: 'HBB-D2',
        wellId: 'D2',
        status: 'INDEL_KO',
        statusLabel: 'Frameshift KO (-1 bp deletion)',
        hdrPercentage: 0,
        indelPercentage: 96,
        wtPercentage: 4,
        silentBlockVerified: false,
        chromatogramSequence: 'A-C-C-T-G-A-C-T-C-C-T--X--G-A-G-A-A-G-T-C-T',
        isRecommendedForExpansion: false
      },
      {
        cloneId: 'HBB-F9',
        wellId: 'F9',
        status: 'WT_ESCAPEE',
        statusLabel: 'Unedited Wild-Type (Escapee)',
        hdrPercentage: 0,
        indelPercentage: 2,
        wtPercentage: 98,
        silentBlockVerified: false,
        chromatogramSequence: 'A-C-C-T-G-A-C-T-C-C-T-G-T-G-G-A-G-A-A-G-T-C-T',
        isRecommendedForExpansion: false
      }
    ],
    figureConfig: {
      showPanelA: true,
      showPanelB: true,
      showPanelC: true,
      showPanelD: true,
      figureTitle: 'Generation and Molecular Validation of Isogenic HBB-Rescued hiPSC Clone via ASSURED CRISPR',
      figureWidth: 'double-column'
    }
  },
  {
    id: 'proj-apoe',
    title: 'APOE4 to APOE3/2 Neuroprotective Isoform Conversion',
    createdAt: '2026-10-15',
    currentStage: 1,
    target: {
      id: 'target-apoe',
      gene: 'APOE',
      diseaseName: 'Alzheimer / Neurodegeneration',
      species: 'Homo sapiens',
      assembly: 'GRCh38',
      chromosome: 'chr19',
      genomicCoordinate: 'chr19:44,908,822',
      refAllele: 'C',
      altAllele: 'T',
      aminoAcidChange: 'p.Arg176Cys (rs429358 / rs7412)',
      targetSequence5to3: 'TGCCGATGACCTGCAGAAGCGCCTGGCAGTGTACCAGGCCGGGGCCCGCGAGGGCGCCGAGCGCGGCCTCAGCGCCATCCGCGAGCGCCTGGGGCCCCT',
      complementSequence3to5: 'ACGGCTACTGGACGTCTTCGCGGACCGTCACATGGTCCGGCCCCGGGCGCTCCCGCGGCTCGCGCCGGAGTCGCGGTAGGCGCTCGCGGACCCCGGGGA',
      guides: [
        {
          id: 'apoe-g1',
          name: 'sgAPOE-1',
          sequence: 'GCGGACATGGAGGACGTGTG',
          pam: 'CGG',
          strand: '+',
          cutDistanceToEdit: 3,
          efficiencyScore: 85,
          offTargetScore: 94,
          isSelected: true
        },
        {
          id: 'apoe-g2',
          name: 'sgAPOE-2',
          sequence: 'CCGTCGCACACGTCCATCCA',
          pam: 'TGG',
          strand: '-',
          cutDistanceToEdit: 5,
          efficiencyScore: 79,
          offTargetScore: 91,
          isSelected: true
        }
      ],
      donor: {
        name: 'ssODN-APOE-Asym-36-91',
        strand: '-',
        totalLength: 127,
        arm5Length: 36,
        arm3Length: 91,
        sequence: '5\'-G*C*CTGTCCCTTCGTTCCCTCCGCACTCCACCCCAAGGCACCTCCTTCCCGCCCTCGCCGGACATGGAGGACGTATGCGGCCGCCTGGTGCAGTACCGCGGCGAGGTGCAGGCCATGCTCGGCCAGAGCACCGA*G*G-3\'',
        intendedEditDescription: 'C->T (p.Arg176Cys Neuroprotective Conversion)',
        silentPamBlock: 'PAM GGG -> GGT (Val synonymous)',
        silentSeedBlock: 'Seed G->A block',
        hasPhosphorothioate: true
      },
      primers: {
        forwardPrimer: { name: 'APOE-Fwd-Seq', sequence: 'ACAGAATTCGCCCCGGCCTGGTACAC', tm: 64.1, length: 26 },
        reversePrimer: { name: 'APOE-Rev-Seq', sequence: 'TAAGCTTGGCACGGCTGTCCAAGGA', tm: 63.5, length: 25 },
        ampliconSizeBp: 412,
        sequencingPrimer: { name: 'APOE-Seq-Fwd', sequence: 'GCCCCGGCCTGGTACACTG', direction: 'Forward' }
      }
    },
    bench: {
      cuvettesCount: 2,
      cellsPerCuvette: 500000,
      cellConfluencyRecorded: 78,
      cas9AmountUler: 1.0,
      gRNAAmountUler: 1.5,
      ssodnAmountUler: 1.0,
      pulseProgram: 'CB-150',
      rockInhibitorUsed: true,
      cloningStrategy: 'frugal-limiting-dilution',
      pickedWellsCount: 28,
      isBenchCompleted: true
    },
    clones: [
      {
        cloneId: 'APOE-C4',
        wellId: 'C4',
        status: 'HOMOZYGOUS_KI',
        statusLabel: 'True Homozygous Knock-In',
        hdrPercentage: 96,
        indelPercentage: 0,
        wtPercentage: 4,
        silentBlockVerified: true,
        chromatogramSequence: 'G-G-A-G-G-A-C-G-T-A-T-G-C-G-G-C-C-G-C-C-T-G-G',
        isRecommendedForExpansion: true
      }
    ],
    figureConfig: {
      showPanelA: true,
      showPanelB: true,
      showPanelC: true,
      showPanelD: true,
      figureTitle: 'Generation of Isogenic Protective APOE iPSC Lines by ASSURED CRISPR-Cas9 Editing',
      figureWidth: 'double-column'
    }
  }
];

export const getStoredProjects = (): AssuredProject[] => {
  try {
    const raw = localStorage.getItem('assured_workbench_projects');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading projects from storage', e);
  }
  return PRESET_PROJECTS;
};

export const saveProjectsToStorage = (projects: AssuredProject[]): void => {
  try {
    localStorage.setItem('assured_workbench_projects', JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects to storage', e);
  }
};
