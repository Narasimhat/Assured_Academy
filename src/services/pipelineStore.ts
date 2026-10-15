import { AssuredProject } from '../types/pipeline';

export const PRESET_PROJECTS: AssuredProject[] = [
  {
    id: 'proj-apoe-real',
    title: 'APOE4 to APOE3 (p.Arg176Cys) Precision SNP Knock-In [Real Lab Data]',
    createdAt: '2023-08-09',
    currentStage: 1,
    target: {
      id: 'target-apoe',
      gene: 'APOE',
      diseaseName: 'Alzheimer Disease / Neuroprotection (rs429358)',
      species: 'Homo sapiens',
      assembly: 'GRCh38',
      chromosome: 'chr19',
      genomicCoordinate: 'chr19:44,908,822',
      refAllele: 'C',
      altAllele: 'T',
      aminoAcidChange: 'p.Arg176Cys (rs429358 / rs7412)',
      targetSequence5to3: 'TGCCGATGACCTGCAGAAGCGCCTGGCAGTGTACCAGGCCGGGGCCCGCGAGGGCGCCGAGCGCGGCCTCAGCGCCATCCGCGAGCGCCTGGGGCCCCT',
      complementSequence3to5: 'ACGGCTACTGGACGTCTTCGCGGACCGTCACATGGTCCGGCCCCGGGCGCTCCCGCGGCTCGCGCCGGAGTCGCGGTAGGCGCTCGCGGACCCCGGGGA',
      targetType: 'SNP_KNOCKIN',
      controlAb1Url: '/sample_data/apoe/Ctrl.ab1',
      batchCsvUrl: '/sample_data/apoe/Synthego_ICE_Analysis_batch.csv',
      guides: [
        {
          id: 'apoe-g1',
          name: 'sgAPOE-1 (Primary Alt-R)',
          sequence: 'GCGGACATGGAGGACGTGTG',
          pam: 'CGG',
          strand: '+',
          cutDistanceToEdit: 3,
          efficiencyScore: 94,
          offTargetScore: 96,
          isSelected: true
        },
        {
          id: 'apoe-g2',
          name: 'sgAPOE-2 (Backup Redundancy)',
          sequence: 'CCGTCGCACACGTCCATCCA',
          pam: 'TGG',
          strand: '-',
          cutDistanceToEdit: 5,
          efficiencyScore: 82,
          offTargetScore: 91,
          isSelected: true
        }
      ],
      donor: {
        name: 'ssODN-APOE-Asym-36-91',
        strand: '-',
        totalLength: 135,
        arm5Length: 36,
        arm3Length: 91,
        sequence: '5\'-G*C*CTGTCCCTTCGTTCCCTCCGCACTCCACCCCAAGGCACCTCCTTCCCGCCCTCGCCGGACATGGAGGACGTATGCGGCCGCCTGGTGCAGTACCGCGGCGAGGTGCAGGCCATGCTCGGCCAGAGCACCGA*G*G-3\'',
        intendedEditDescription: 'C->T (p.Arg176Cys Neuroprotective Conversion)',
        silentPamBlock: 'PAM CGG -> CGA (Synonymous Arg)',
        silentSeedBlock: 'Seed G->A block installed',
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
      pickedWellsCount: 96,
      isBenchCompleted: true
    },
    clones: [
      {
        cloneId: 'APOE_G1_A1',
        wellId: 'A1',
        status: 'HOMOZYGOUS_KI',
        statusLabel: 'True Homozygous Knock-In (94% HDR)',
        hdrPercentage: 94,
        indelPercentage: 0,
        wtPercentage: 6,
        silentBlockVerified: true,
        chromatogramSequence: 'G-G-A-G-G-A-C-G-T-A-T-G-C-G-G-C-C-G-C-C-T-G-G',
        isRecommendedForExpansion: true,
        ab1TraceUrl: '/sample_data/apoe/APOE_G1_A1.ab1',
        r2ModelFit: 0.96
      },
      {
        cloneId: 'APOE_G1_A2',
        wellId: 'A2',
        status: 'HETEROZYGOUS_KI',
        statusLabel: 'Heterozygous Carrier (48% HDR / 52% WT)',
        hdrPercentage: 48,
        indelPercentage: 0,
        wtPercentage: 52,
        silentBlockVerified: true,
        chromatogramSequence: 'G-G-A-G-G-A-C-G-T-[A/G]-T-G-C-G-G-C-C-G-C-C-T-G-G',
        isRecommendedForExpansion: false,
        ab1TraceUrl: '/sample_data/apoe/APOE_G1_A2.ab1',
        r2ModelFit: 0.94
      },
      {
        cloneId: 'APOE_G1_A5',
        wellId: 'A5',
        status: 'HOMOZYGOUS_KI',
        statusLabel: 'True Homozygous Knock-In (95% HDR)',
        hdrPercentage: 95,
        indelPercentage: 0,
        wtPercentage: 5,
        silentBlockVerified: true,
        chromatogramSequence: 'G-G-A-G-G-A-C-G-T-A-T-G-C-G-G-C-C-G-C-C-T-G-G',
        isRecommendedForExpansion: true,
        ab1TraceUrl: '/sample_data/apoe/APOE_G1_A5.ab1',
        r2ModelFit: 0.97
      },
      {
        cloneId: 'APOE_G1_B2',
        wellId: 'B2',
        status: 'HOMOZYGOUS_KI',
        statusLabel: 'True Homozygous Knock-In (96% HDR)',
        hdrPercentage: 96,
        indelPercentage: 0,
        wtPercentage: 4,
        silentBlockVerified: true,
        chromatogramSequence: 'G-G-A-G-G-A-C-G-T-A-T-G-C-G-G-C-C-G-C-C-T-G-G',
        isRecommendedForExpansion: true,
        ab1TraceUrl: '/sample_data/apoe/APOE_G1_B2.ab1',
        r2ModelFit: 0.97
      },
      {
        cloneId: 'APOE_G1_A3',
        wellId: 'A3',
        status: 'WT_ESCAPEE',
        statusLabel: 'Unedited Wild-Type Control (0% HDR)',
        hdrPercentage: 0,
        indelPercentage: 0,
        wtPercentage: 100,
        silentBlockVerified: false,
        chromatogramSequence: 'G-G-A-G-G-A-C-G-T-G-T-G-C-G-G-C-C-G-C-C-T-G-G',
        isRecommendedForExpansion: false,
        ab1TraceUrl: '/sample_data/apoe/APOE_G1_A3.ab1',
        r2ModelFit: 0.99
      }
    ],
    figureConfig: {
      showPanelA: true,
      showPanelB: true,
      showPanelC: true,
      showPanelD: true,
      figureTitle: 'Targeted Isogenic APOE4 to APOE3 Conversion in hiPSCs via ASSURED CRISPR-Cas9 Protocol',
      figureWidth: 'double-column'
    }
  },
  {
    id: 'proj-myd88-real',
    title: 'MYD88 Innate Immune Receptor Knockout (InDel Frameshift) [Real Lab Data]',
    createdAt: '2023-08-09',
    currentStage: 1,
    target: {
      id: 'target-myd88',
      gene: 'MYD88',
      diseaseName: 'Innate Immune Receptor / TLR Signaling Knockout',
      species: 'Homo sapiens',
      assembly: 'GRCh38',
      chromosome: 'chr3',
      genomicCoordinate: 'chr3:38,138,500 (NM_002468.5 Exon 1)',
      refAllele: 'WT',
      altAllele: 'Frameshift KO',
      aminoAcidChange: 'p.Leu73fs* premature stop',
      targetSequence5to3: 'GGTATAGGAACTCGCGACGACCCCCACCGTGGACAGCGCCGACCCCACCGGCAAACTGCTGGACGCCTGGCAGGGCCGCCCCGGCGCCTCCGTGGGCCGCCT',
      complementSequence3to5: 'CCATATCCTTGAGCGCTGCTGGGGGTGGCACCTGTCGCGGCTGGGGTGGCCGTTTGACGACCTGCGGACCGTCCCGGCGGGGCCGCGGAGGCACCCGGCGGA',
      targetType: 'KNOCKOUT',
      controlAb1Url: '/sample_data/myd88/Ctrl.ab1',
      batchCsvUrl: '/sample_data/myd88/Synthego_ICE_Analysis_2023_08_09_1691566838.csv',
      guides: [
        {
          id: 'myd88-g1',
          name: 'sgMYD88-G1 (Primary Exon 1)',
          sequence: 'ACTCGCGACGACCCCCACCG',
          pam: 'TGG',
          strand: '+',
          cutDistanceToEdit: 0,
          efficiencyScore: 99,
          offTargetScore: 95,
          isSelected: true
        },
        {
          id: 'myd88-g2',
          name: 'sgMYD88-G2 (Backup)',
          sequence: 'CCCCACCGTGGACAGCGCCG',
          pam: 'ACC',
          strand: '-',
          cutDistanceToEdit: 6,
          efficiencyScore: 87,
          offTargetScore: 92,
          isSelected: true
        }
      ],
      donor: {
        name: 'N/A (NHEJ Frameshift KO Mode)',
        strand: '+',
        totalLength: 0,
        arm5Length: 0,
        arm3Length: 0,
        sequence: 'Non-Homologous End Joining (NHEJ) Frameshift KO — No donor template required.',
        intendedEditDescription: 'Frameshift Indel KO causing premature termination codon (PTC)',
        silentPamBlock: 'N/A (NHEJ Frameshift)',
        silentSeedBlock: 'N/A',
        hasPhosphorothioate: false
      },
      primers: {
        forwardPrimer: { name: 'MYD88-Fwd-Seq', sequence: 'TGGAACAGACAAACTATCAGACTC', tm: 60.8, length: 24 },
        reversePrimer: { name: 'MYD88-Rev-Seq', sequence: 'CATGTAAAGGCTTCTCGGACTC', tm: 60.1, length: 22 },
        ampliconSizeBp: 388,
        sequencingPrimer: { name: 'MYD88-Sanger-Fwd', sequence: 'GACAAACTATCAGACTCGAGGTAC', direction: 'Forward' }
      }
    },
    bench: {
      cuvettesCount: 2,
      cellsPerCuvette: 500000,
      cellConfluencyRecorded: 76,
      cas9AmountUler: 1.0,
      gRNAAmountUler: 1.5,
      ssodnAmountUler: 0.0,
      pulseProgram: 'CB-150',
      rockInhibitorUsed: true,
      cloningStrategy: 'frugal-limiting-dilution',
      pickedWellsCount: 96,
      isBenchCompleted: true
    },
    clones: [
      {
        cloneId: 'MYD88_G1_A1',
        wellId: 'A1',
        status: 'INDEL_KO',
        statusLabel: 'Complete Functional Knockout (99% Indel)',
        hdrPercentage: 0,
        indelPercentage: 99,
        wtPercentage: 1,
        silentBlockVerified: false,
        chromatogramSequence: 'A-C-T-C-G-C-G-A-C-G-A-C-C-C-C-C--X--G-T-G-G-A-C',
        isRecommendedForExpansion: true,
        ab1TraceUrl: '/sample_data/myd88/G1_A1.ab1',
        r2ModelFit: 0.95
      },
      {
        cloneId: 'MYD88_G1_B3',
        wellId: 'B3',
        status: 'INDEL_KO',
        statusLabel: 'Complete Biallelic Knockout (100% Indel)',
        hdrPercentage: 0,
        indelPercentage: 100,
        wtPercentage: 0,
        silentBlockVerified: false,
        chromatogramSequence: 'A-C-T-C-G-C-G-A-C-G-A-C-C-C-C-C--X--G-T-G-G-A-C',
        isRecommendedForExpansion: true,
        ab1TraceUrl: '/sample_data/myd88/G1_B3.ab1',
        r2ModelFit: 0.97
      },
      {
        cloneId: 'MYD88_G1_A2',
        wellId: 'A2',
        status: 'INDEL_KO',
        statusLabel: 'High-Efficiency Knockout (98% Indel)',
        hdrPercentage: 0,
        indelPercentage: 98,
        wtPercentage: 2,
        silentBlockVerified: false,
        chromatogramSequence: 'A-C-T-C-G-C-G-A-C-G-A-C-C-C-C-C--X--G-T-G-G-A-C',
        isRecommendedForExpansion: true,
        ab1TraceUrl: '/sample_data/myd88/G1_A2.ab1',
        r2ModelFit: 0.93
      },
      {
        cloneId: 'MYD88_G1_B1',
        wellId: 'B1',
        status: 'INDEL_KO',
        statusLabel: 'Functional Knockout (97% Indel)',
        hdrPercentage: 0,
        indelPercentage: 97,
        wtPercentage: 3,
        silentBlockVerified: false,
        chromatogramSequence: 'A-C-T-C-G-C-G-A-C-G-A-C-C-C-C-C--X--G-T-G-G-A-C',
        isRecommendedForExpansion: true,
        ab1TraceUrl: '/sample_data/myd88/G1_B1.ab1',
        r2ModelFit: 0.96
      },
      {
        cloneId: 'MYD88_G1_A3',
        wellId: 'A3',
        status: 'WT_ESCAPEE',
        statusLabel: 'Unedited Wild-Type Control (0% Indel)',
        hdrPercentage: 0,
        indelPercentage: 0,
        wtPercentage: 100,
        silentBlockVerified: false,
        chromatogramSequence: 'A-C-T-C-G-C-G-A-C-G-A-C-C-C-C-C-A-C-C-G-T-G-G-A-C',
        isRecommendedForExpansion: false,
        ab1TraceUrl: '/sample_data/myd88/G1_A3.ab1',
        r2ModelFit: 0.98
      }
    ],
    figureConfig: {
      showPanelA: true,
      showPanelB: true,
      showPanelC: true,
      showPanelD: true,
      figureTitle: 'Targeted High-Efficiency MYD88 Gene Knockout in hiPSCs via ASSURED CRISPR-Cas9',
      figureWidth: 'double-column'
    }
  },
  {
    id: 'proj-hbb',
    title: 'Sickle Cell HBB p.Glu6Val Precision Isogenic Rescue [STAR Protocols]',
    createdAt: '2023-08-01',
    currentStage: 1,
    target: {
      id: 'target-hbb',
      gene: 'HBB',
      diseaseName: 'Sickle Cell Disease (rs334)',
      species: 'Homo sapiens',
      assembly: 'GRCh38',
      chromosome: 'chr11',
      genomicCoordinate: 'chr11:5,227,002',
      refAllele: 'A',
      altAllele: 'T',
      aminoAcidChange: 'p.Glu6Val (c.20A>T, rs334)',
      targetSequence5to3: 'ACACTGAGTGAGCTGCACTGTGACAAGCTGCACGTGGATCCTGAGAACTTCAGGCTCCTGGGCAACGTGCTGGTCTGTGTGCTGGCCCATCACTTTGG',
      complementSequence3to5: 'TGTGACTCACTCGACGTGACACTGTTCGACGTGCACCTAGGACTCTTGAAGTCCGAGGACCCGTTGCACGACCAGACACACGACCGGGTAGTGAAACC',
      targetType: 'SNP_KNOCKIN',
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
      cas9AmountUler: 1.0,
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
  }
];

export const getStoredProjects = (): AssuredProject[] => {
  try {
    const raw = localStorage.getItem('assured_workbench_projects_v2');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading projects from storage', e);
  }
  return PRESET_PROJECTS;
};

export const saveProjectsToStorage = (projects: AssuredProject[]): void => {
  try {
    localStorage.setItem('assured_workbench_projects_v2', JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects to storage', e);
  }
};
