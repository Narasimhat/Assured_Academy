export type TabType = 'home' | 'workbench' | 'academy' | 'simulator' | 'frugal' | 'missions' | 'suite';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  content: string[];
  keyTakeaway: string;
  benchTip: string;
  interactiveType?: 'diagram' | 'p53-pathway' | 'pam-picker' | 'asymmetry-demo' | 'trace-demo';
  quiz?: QuizQuestion[];
}

export interface CurriculumTrack {
  id: string;
  trackNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  badgeName: string;
  lessons: Lesson[];
}

export interface VirtualLabState {
  stage: 1 | 2 | 3 | 4;
  confluency: number; // 40 - 95%
  morphologyGood: boolean;
  rnpRatio: '1:1' | '1:2' | '1:3' | '1:5';
  ssodnAmount: number; // pmol
  usedRockInhibitor: boolean;
  electroporationProgram: 'CB-150' | 'CA-137' | 'None';
  cloningMethod: 'limiting-dilution' | 'single-cell-dispenser';
  selectedWells: string[];
  homozygousCloneFound: boolean;
  feedback: string[];
  hasRunElectroporation: boolean;
}

export interface FrugalConfig {
  institutionType: 'academic' | 'core-facility' | 'low-resource';
  electroporator: 'lonza-4d' | 'biorad-gene-pulser' | 'in-house-buffer';
  cloningTech: 'automated-dispenser' | 'facs-sorting' | 'manual-limiting-dilution';
  gRNASource: 'synthetic-commercial' | 'in-vitro-transcribed';
  screeningStrategy: 'full-sanger-96' | 'rflp-pre-screen-then-sanger' | 't7e1-bulk';
  targetCellCount: number;
}

export interface RareDiseaseMission {
  id: string;
  diseaseName: string;
  inheritance: string;
  gene: string;
  proteinChange: string;
  genomicCoord: string;
  refAllele: string;
  altAllele: string;
  phenotypeDescription: string;
  curationNotes: string;
  strategy: 'HDR-SNP-Correction' | 'Gene-Knockout' | 'Base-Editing';
  recommendedGuides: {
    name: string;
    sequence: string;
    pam: string;
    strand: '+' | '-';
    cutDist: number;
  }[];
  ssodnTemplate: string;
  silentChanges: string[];
  sampleFixtureDesign?: string;
  sampleFixtureAb1?: string;
}
