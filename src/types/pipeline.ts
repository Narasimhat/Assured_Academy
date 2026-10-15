export type PipelineStage = 1 | 2 | 3 | 4 | 5;

export interface GuideRNA {
  id: string;
  name: string;
  sequence: string; // 20 nt
  pam: string;      // e.g. 'CGG', 'TGG', 'AGG'
  strand: '+' | '-';
  cutDistanceToEdit: number; // in bp
  efficiencyScore: number;   // 0 - 100
  offTargetScore: number;    // 0 - 100
  isSelected: boolean;
}

export interface DonorTemplate {
  name: string;
  strand: '+' | '-';
  totalLength: number;
  arm5Length: number; // e.g. 36 nt
  arm3Length: number; // e.g. 91 nt
  sequence: string;   // with phosphorothioate end marks
  intendedEditDescription: string;
  silentPamBlock: string;
  silentSeedBlock?: string;
  hasPhosphorothioate: boolean;
}

export interface PrimerPair {
  forwardPrimer: { name: string; sequence: string; tm: number; length: number };
  reversePrimer: { name: string; sequence: string; tm: number; length: number };
  ampliconSizeBp: number;
  sequencingPrimer: { name: string; sequence: string; direction: 'Forward' | 'Reverse' };
}

export interface TargetLocus {
  id: string;
  gene: string;
  diseaseName: string;
  species: string;
  assembly: string;
  chromosome: string;
  genomicCoordinate: string;
  refAllele: string;
  altAllele: string;
  aminoAcidChange: string;
  targetSequence5to3: string;
  complementSequence3to5: string;
  guides: GuideRNA[];
  donor: DonorTemplate;
  primers: PrimerPair;
}

export interface BenchProtocolState {
  cuvettesCount: number;
  cellsPerCuvette: number;
  cellConfluencyRecorded: number;
  cas9AmountUler: number;
  gRNAAmountUler: number;
  ssodnAmountUler: number;
  pulseProgram: 'CB-150' | 'CA-137';
  rockInhibitorUsed: boolean;
  cloningStrategy: 'frugal-limiting-dilution' | 'automated-dispenser';
  pickedWellsCount: number;
  isBenchCompleted: boolean;
}

export interface QCCloneResult {
  cloneId: string;
  wellId: string;
  status: 'HOMOZYGOUS_KI' | 'HETEROZYGOUS_KI' | 'INDEL_KO' | 'WT_ESCAPEE';
  statusLabel: string;
  hdrPercentage: number;
  indelPercentage: number;
  wtPercentage: number;
  silentBlockVerified: boolean;
  chromatogramSequence: string;
  isRecommendedForExpansion: boolean;
}

export interface PublicationFigureConfig {
  showPanelA: boolean; // Genomic & guide schematic
  showPanelB: boolean; // Sanger chromatogram alignment
  showPanelC: boolean; // Editing efficiency & zygosity chart
  showPanelD: boolean; // Summary clone table
  figureTitle: string;
  figureWidth: 'single-column' | 'double-column'; // 85 mm vs 178 mm
}

export interface AssuredProject {
  id: string;
  title: string;
  createdAt: string;
  currentStage: PipelineStage;
  target: TargetLocus;
  bench: BenchProtocolState;
  clones: QCCloneResult[];
  figureConfig: PublicationFigureConfig;
}
