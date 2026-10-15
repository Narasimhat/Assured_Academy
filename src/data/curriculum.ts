import { CurriculumTrack } from '../types';

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    id: 'track-1',
    trackNumber: 1,
    title: 'From Patient to Pluripotency',
    subtitle: 'Derivation, Culturing & Quality Control of Human Pluripotent Stem Cells',
    icon: 'Microscope',
    color: 'from-emerald-500 to-teal-600',
    badgeName: 'Pluripotency Specialist',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Somatic Cell Sourcing & Non-Integrating Reprogramming',
        duration: '7 min',
        summary: 'How to transition patient peripheral blood mononuclear cells (PBMCs) or dermal fibroblasts into clinical-grade hiPSCs without viral genome integration.',
        content: [
          'Human induced pluripotent stem cells (hiPSCs) represent a revolutionary paradigm for disease modeling and regenerative medicine because they maintain patient-specific genetics while retaining embryonic-like self-renewal and pluripotency.',
          'Early reprogramming relied on retroviral or lentiviral vectors, which integrate randomly into the host genome, carrying catastrophic risks of insertional mutagenesis and oncogene activation.',
          'Modern clinical workflows use non-integrating delivery systems: Sendai virus (an RNA virus replicating exclusively in the cytoplasm, gradually cleared over serial passages) or episomal plasmids (OriP/EBNA1 vectors that dilute out during cell divisions).',
          'For rare disease cohorts in low-resource settings, peripheral blood (PBMC) derivation via Sendai virus is preferred over skin biopsies: it requires only a routine 5-10 mL blood draw, avoids surgical dermabrasion, and achieves high colony formation efficiency within 18–25 days.'
        ],
        keyTakeaway: 'Always choose non-integrating reprogramming (Sendai or episomal) to ensure your rare disease model is free of viral insertion artifacts.',
        benchTip: 'Cryopreserve early passages (P3-P5) in serum-free 10% DMSO/culture medium as master stocks before undertaking any gene editing.',
        quiz: [
          {
            id: 'q1-1-1',
            question: 'Why are non-integrating Sendai viral vectors preferred over lentiviruses for deriving patient hiPSCs?',
            options: [
              'Sendai virus integrates only into safe-harbor loci like AAVS1',
              'Sendai virus is an RNA virus that replicates in the cytoplasm and is lost during cell division without genomic insertion',
              'Sendai virus increases Cas9 expression in pluripotent cells',
              'Sendai virus completely prevents p53-mediated apoptosis'
            ],
            correctIndex: 1,
            explanation: 'Sendai virus replicates in the cytoplasm without DNA intermediates and does not integrate into host chromosomes, completely diluting out over 8-10 passages.'
          }
        ]
      },
      {
        id: 'lesson-1-2',
        title: 'hiPSC Colony Morphology, Passaging & Media Dynamics',
        duration: '8 min',
        summary: 'Identifying healthy pluripotent stem cell morphology, feeder-free substrates (Geltrex/Matrigel/Laminin-521), and avoiding spontaneous differentiation.',
        content: [
          'Unlike cancer cell lines (e.g. HEK293, HeLa) that grow as resilient single cells, human PSCs are obligate colony-forming cells governed by intense E-cadherin cell-cell contacts.',
          'Under phase-contrast microscopy, undifferentiated hiPSCs display distinct hallmarks: tightly packed colonies with well-defined, smooth boundaries, high nuclear-to-cytoplasmic ratio, and prominent, prominent nucleoli.',
          'Spontaneous differentiation reveals itself through frayed colony borders, flattened cell spreading, loose cell-cell adhesion, and dark heterogeneous centers.',
          'Passaging should be performed at 70–80% confluency using gentle enzymatic clump dissociation (e.g., EDTA / ReLeSR) rather than harsh single-cell trypsinization, except when preparing single-cell suspensions for nucleofection.'
        ],
        keyTakeaway: 'Maintain colonies between 30% and 80% confluency. Overgrown colonies (>85%) trigger spontaneous differentiation and severe genomic instability.',
        benchTip: 'Regularly aspirate differentiated "halos" with a fine Pasteur pipette under a stereo hood before enzymatic passaging.',
        quiz: [
          {
            id: 'q1-2-1',
            question: 'Which visual hallmark indicates healthy, undifferentiated human iPSC colonies?',
            options: [
              'Elongated, spindle-shaped fibroblast-like morphology with loose cell contacts',
              'Tightly packed cells with distinct sharp borders, high nucleus-to-cytoplasm ratio, and prominent nucleoli',
              'Large multinucleated flat syncytia spreading across the dish',
              'Single floating spherical aggregates in suspension'
            ],
            correctIndex: 1,
            explanation: 'Pluripotent colonies have smooth, phase-bright, tightly packed borders with high nuclear-to-cytoplasm ratio.'
          }
        ]
      },
      {
        id: 'lesson-1-3',
        title: 'Essential Quality Control: Pluripotency Markers & Karyotyping',
        duration: '6 min',
        summary: 'Rigorous validation using OCT4, SOX2, NANOG, trilineage embryoid body differentiation, and G-banding / digital karyotyping.',
        content: [
          'Before spending months on CRISPR editing, rigorous baseline quality control is mandatory.',
          '1. Core Pluripotency Network: Flow cytometry or immunofluorescence must show >90% of cells expressing nuclear transcription factors OCT3/4, SOX2, and NANOG, alongside surface antigens SSEA-4 and TRA-1-60.',
          '2. Trilineage Competence: Demonstrating functional pluripotency by directing spontaneous embryoid body (EB) formation or directed monolayer differentiation into all three germ layers: Ectoderm (PAX6/Tubulin beta-3), Mesoderm (NCAM/Brachyury), and Endoderm (SOX17/FOXA2).',
          '3. Genomic Stability: Prolonged passaging frequently selects for recurrent chromosomal abnormalities (Trisomy 12, Trisomy 17, 20q11.21 duplication). G-banding or digital SNP karyotyping must confirm a normal 46,XX or 46,XY karyotype.'
        ],
        keyTakeaway: 'Never edit an uncharacterized iPSC line. Validate core pluripotency markers and karyotypic integrity every 10–15 passages.',
        benchTip: 'A quick 1-hour alkaline phosphatase (AP) enzymatic staining can confirm pluripotency before setting up a major editing experiment.',
        quiz: [
          {
            id: 'q1-3-1',
            question: 'Which trio of transcription factors forms the core transcriptional regulatory circuitry of pluripotency?',
            options: [
              'TP53, RB1, BRCA1',
              'OCT4, SOX2, NANOG',
              'MYOD, RUNX2, GATA4',
              'HBB, CFTR, DMD'
            ],
            correctIndex: 1,
            explanation: 'OCT4, SOX2, and NANOG co-occupy promoter and enhancer regions to activate stem cell genes and repress lineage-specific genes.'
          }
        ]
      }
    ]
  },
  {
    id: 'track-2',
    trackNumber: 2,
    title: 'The ASSURED CRISPR Design Methodology',
    subtitle: 'Dual-Guide Strategies, Silent PAM Blocking & Asymmetric ssODN Architecture',
    icon: 'Dna',
    color: 'from-cyan-500 to-blue-600',
    badgeName: 'CRISPR Architect',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Why Standard CRISPR Protocols Fail in hiPSCs',
        duration: '9 min',
        summary: 'Understanding the lethal p53 DNA damage response, low homologous recombination rates, and Cas9 re-cutting artifacts.',
        content: [
          'If you use standard plasmid transfection or generic CRISPR online calculators designed for cancer lines, hiPSC editing efficiency drops to near zero (<1% HDR, massive apoptosis).',
          'Why? Human pluripotent stem cells maintain hypersensitive p53-dependent surveillance. While a HEK293 cell easily survives a double-strand break (DSB), a single Cas9 cut in an iPSC triggers p21/PUMA transcription, causing cell-cycle arrest and rapid apoptotic death.',
          'Furthermore, even if the cell survives and executes Homology-Directed Repair (HDR) using your donor template, Cas9 often recognizes the target site again and re-cuts the newly repaired allele, introducing a destructive insertion or deletion (indel)!',
          'The ASSURED protocol was engineered specifically to solve these fundamental stem cell vulnerabilities through Ribonucleoprotein (RNP) transient kinetics, silent blocking mutations, and asymmetric donor design.'
        ],
        keyTakeaway: 'Pluripotent stem cells have active p53 checkpoints and low basal HDR machinery; precision editing requires suppressing re-cutting and transient RNP delivery.',
        benchTip: 'Never use lentiviral Cas9 or continuous plasmid expression in iPSCs; always deliver transient pre-assembled Cas9-sgRNA RNP complexes.',
        quiz: [
          {
            id: 'q2-1-1',
            question: 'What is the primary cause of massive cell death in hiPSCs following a Cas9 double-strand break?',
            options: [
              'Contamination from bacterial endotoxins',
              'Hyper-activation of the p53 DNA-damage response leading to PUMA-mediated apoptosis',
              'Exhaustion of glucose in the culture media',
              'Loss of E-cadherin expression'
            ],
            correctIndex: 1,
            explanation: 'Pluripotent stem cells have intact, hypersensitive p53 checkpoints that trigger apoptosis in response to double-strand breaks.'
          }
        ]
      },
      {
        id: 'lesson-2-2',
        title: 'The Silent PAM Block & Seed-Region Mutation Strategy',
        duration: '10 min',
        summary: 'How to introduce synonymous mutations in the ssODN template to prevent Cas9 re-cutting without altering protein coding or splicing.',
        content: [
          'When designing a single-stranded oligodeoxynucleotide (ssODN) for SNP correction or knock-in, the most critical step is ensuring the newly edited sequence is immune to Cas9 re-cleavage.',
          'Cas9 requires two elements to cut: 1) A Protospacer Adjacent Motif (5\'-NGG-3\' for SpCas9) on the non-target strand, and 2) Complementarity across the 20-nt guide RNA, especially the 8-10 base pair "seed region" immediately adjacent to the PAM.',
          'In ASSURED CRISPR Designer, every knock-in donor introduces two types of changes: 1) The desired disease therapeutic mutation, and 2) A synonymous (silent) change that mutates the NGG PAM (e.g. changing GGG to GGT) or changes 1-2 bases in the seed region.',
          'Because the mutation is silent, the translated amino acid sequence remains 100% identical to wild-type, but Cas9 can no longer bind or re-cleave the edited locus.'
        ],
        keyTakeaway: 'A silent PAM or seed block is non-negotiable for HDR in hiPSCs. Without it, Cas9 will destroy your corrected allele.',
        benchTip: 'Whenever possible, choose a silent mutation that also creates or destroys a restriction enzyme site (RFLP) for cheap, rapid bench screening.',
        quiz: [
          {
            id: 'q2-2-1',
            question: 'Why does the ASSURED CRISPR Designer introduce silent mutations into the ssODN donor template?',
            options: [
              'To increase the molecular weight of the donor oligonucleotide',
              'To prevent Cas9 from recognizing and re-cleaving the successfully edited allele',
              'To stimulate bacterial homologous recombination enzymes',
              'To increase mRNA translation speed by 50%'
            ],
            correctIndex: 1,
            explanation: 'Silent PAM or seed mutations prevent Cas9 from recognizing the edited allele, locking in the precision correction.'
          }
        ]
      },
      {
        id: 'lesson-2-3',
        title: 'Asymmetric ssODN Homology Arms & Splice Junction Safety',
        duration: '8 min',
        summary: 'Optimizing 5\' and 3\' arm lengths (36 nt vs 91 nt), strand orientation, and avoiding cryptic splice sites.',
        content: [
          'Biochemical studies by Richardson et al. and MDC optimization demonstrated that Cas9 releases the 3\' end of the non-target DNA strand first upon cleavage.',
          'By designing asymmetric single-stranded donor templates complementary to the non-target strand—specifically with 36 nucleotides on the PAM-distal arm and 91 nucleotides on the PAM-proximal arm (or vice versa)—HDR rates increase by 3- to 5-fold compared to symmetrical donors.',
          'Splice Assessment: In exons, any silent change must be vetted to prevent creating cryptic splice donor (GT) or acceptor (AG) motifs, or disrupting exonic splicing enhancers (ESEs).',
          'ASSURED Designer automatically verifies that all blocking changes stay outside critical splice junctions.'
        ],
        keyTakeaway: 'Asymmetric ssODN donors (e.g., 36 nt / 91 nt) dramatically enhance HDR donor hybridization and integration efficiency.',
        benchTip: 'Always order ssODNs with phosphorothioate (PTO) end-modifications (2 PTO bonds on each 5\' and 3\' end) to protect against intracellular exonuclease degradation.',
        quiz: [
          {
            id: 'q2-3-1',
            question: 'What is the purpose of adding phosphorothioate (PTO) linkages to the ends of an ssODN donor?',
            options: [
              'To make the oligonucleotide fluorescent under blue light',
              'To protect the single-stranded DNA from cellular exonuclease degradation',
              'To allow the ssODN to cross cell membranes without electroporation',
              'To recruit Cas9 directly to the repair template'
            ],
            correctIndex: 1,
            explanation: 'Phosphorothioate bonds replace a non-bridging oxygen atom with sulfur, making the ends resistant to cellular 3\' and 5\' exonucleases.'
          }
        ]
      }
    ]
  },
  {
    id: 'track-3',
    trackNumber: 3,
    title: 'The Virtual Wet-Lab & Frugal Bench',
    subtitle: 'From Electroporation & Apoptosis Rescue to Monoclonal Sub-Cloning',
    icon: 'FlaskConical',
    color: 'from-amber-500 to-orange-600',
    badgeName: 'Master of the Bench',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Pre-Nucleofection Cell Health & RNP Assembly',
        duration: '8 min',
        summary: 'Preparing exponential-phase hiPSCs (70-80% confluency), RNP molar ratios (1:1.2 to 1:2), and nucleofection buffer kinetics.',
        content: [
          'The single biggest predictor of editing success in iPSCs is the physiological state of the cells immediately prior to nucleofection.',
          'Cells must be in active exponential log-phase growth, exactly at 70–80% confluency. Never harvest under-confluent (<50%) or over-confluent (>85%) plates, as over-confluent cells exhibit repressed homologous recombination machinery and hyper-elevated p53 responsiveness.',
          'RNP Assembly Protocol: High-fidelity Cas9 protein (e.g. SpCas9-HiFi) is pre-complexed with synthetic single guide RNA (sgRNA) containing 2\'-O-methyl and 3\' phosphorothioate modifications.',
          'Incubate Cas9 protein with sgRNA at a 1:1.2 to 1:2 molar ratio at room temperature for 10–15 minutes in P3 Primary Cell Nucleofector Solution before adding the ssODN donor template. This ensures 100% of Cas9 is loaded with guide before contact with cellular DNA.'
        ],
        keyTakeaway: 'Form the RNP complex at room temperature prior to adding cells and ssODN. Confluency must strictly be between 70% and 80%.',
        benchTip: 'Pre-warm recovery plates with fresh mTeSR Plus and 10 uM Y-27632 (ROCK inhibitor) in a 37°C incubator at least 30 minutes before nucleofection.',
        quiz: [
          {
            id: 'q3-1-1',
            question: 'What is the ideal hiPSC confluency on the day of CRISPR nucleofection?',
            options: [
              '20-30% (sparse individual cells)',
              '70-80% (active exponential growth, packed colonies before touching)',
              '100% (completely confluent over-saturated monolayer)',
              'Confluency does not matter as long as cells are alive'
            ],
            correctIndex: 1,
            explanation: '70-80% confluency guarantees cells are in exponential phase with high HDR machinery and optimal membrane repair capability.'
          }
        ]
      },
      {
        id: 'lesson-3-2',
        title: 'Electroporation & Rescuing Apoptosis with ROCK Inhibitors',
        duration: '9 min',
        summary: 'Nucleofection pulse parameters (CB-150 / CA-137) and suppressing anoikis with Y-27632 or CloneR.',
        content: [
          'Human PSCs are prone to a specialized form of detachment-induced apoptosis called anoikis, mediated by the ROCK (Rho-associated protein kinase) signaling pathway.',
          'When hiPSCs are dissociated into single cells and subjected to a high-voltage electrical pulse (e.g., Lonza 4D-Nucleofector program CB-150 for high survival or CA-137 for maximum cleavage), ROCK hyperactivation triggers cytoskeletal collapse and cell death within hours.',
          'To guarantee cell survival, media must be supplemented with a selective ROCK inhibitor: 10 µM Y-27632 or 1x CloneR supplement immediately upon plating.',
          'Maintain ROCK inhibitor for the first 24–48 hours post-electroporation, then gradually withdraw it once small 4- to 8-cell colonies stabilize.'
        ],
        keyTakeaway: 'Without ROCK inhibitor (Y-27632 or CloneR), single-cell dissociation combined with electroporation causes >95% cell death.',
        benchTip: 'After the electrical pulse, allow cells to rest in the nucleofection cuvette at room temperature for 5-10 minutes before gently transferring them with a wide-bore pipette.',
        quiz: [
          {
            id: 'q3-2-1',
            question: 'Why is Y-27632 (ROCK inhibitor) added to hiPSC culture media after nucleofection?',
            options: [
              'To increase Cas9 translation inside the nucleus',
              'To prevent dissociation-induced apoptosis (anoikis) in single stem cells',
              'To clean bacterial contamination from the culture',
              'To induce immediate cardiomyocyte differentiation'
            ],
            correctIndex: 1,
            explanation: 'Y-27632 blocks ROCK signaling, which normally triggers blebbing and apoptosis when stem cell colonies are broken into single cells.'
          }
        ]
      },
      {
        id: 'lesson-3-3',
        title: 'Single-Cell Sub-Cloning: Frugal Limiting Dilution vs. Automated Sorting',
        duration: '10 min',
        summary: 'Comparing manual serial limiting dilution (96-well format) with $150K cell dispensers; ensuring true monoclonality.',
        content: [
          'Therapeutic disease modeling requires pure, isogenic monoclonal cell lines. If you sequence a bulk pool of edited cells, you get a confusing mixture of WT, heterozygous, homozygous, and indel alleles.',
          'High-Resource Facilities use automated single-cell dispensers (e.g., CellenION, Namocell) or FACS sorters to deposit exactly 1 cell per well into 96-well plates coated with Matrigel/Laminin.',
          'Frugal Bench Mode for Resource-Limited Labs: You do not need a $150,000 automated dispenser! You can perform precision Serial Limiting Dilution using standard multichannel pipettes.',
          'Formula: Dilute single-cell suspension to a density of 5 cells/mL in CloneR-supplemented medium, and plate 100 µL per well into a 96-well plate (achieving an average of 0.5 cells/well). By Poisson distribution, ~30–35 wells will contain a single cell, with <5% probability of multi-cell contamination.',
          'Colonies are tracked under a microscope on Day 2, 5, and 10 to confirm single-colony outgrowth before picking for genotyping.'
        ],
        keyTakeaway: 'Manual limiting dilution at 0.5 cells/well provides a high-fidelity, zero-cost alternative to automated cell sorters for global labs.',
        benchTip: 'Mark wells containing exactly one cell on Day 2; discard any wells that clearly show two distinct colonies merging.',
        quiz: [
          {
            id: 'q3-3-1',
            question: 'What target cell density per well should be plated during serial limiting dilution to minimize multi-cell contamination?',
            options: [
              '10 cells per well',
              '0.5 cells per well (1 cell per two wells)',
              '50 cells per well',
              '100 cells per well'
            ],
            correctIndex: 1,
            explanation: 'Plating at 0.5 cells per well ensures by Poisson distribution that the vast majority of positive wells originate from a single clone.'
          }
        ]
      }
    ]
  },
  {
    id: 'track-4',
    trackNumber: 4,
    title: 'Sanger QC, Deconvolution & Clone Calling',
    subtitle: 'From AB1 Chromatograms to Calling Homozygous, Heterozygous & Mosaic Clones',
    icon: 'Binary',
    color: 'from-purple-500 to-indigo-600',
    badgeName: 'Certified QC Analyst',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'Reading Sanger .ab1 Chromatograms & Trace Quality',
        duration: '7 min',
        summary: 'Understanding four-color fluorescence traces, signal-to-noise ratio, base calling quality scores, and PCR amplification primer placement.',
        content: [
          'Sanger sequencing remains the gold standard for clone validation due to its rapid turnaround, accessibility in every hospital and university, and low cost compared to next-gen sequencing.',
          'An ABIF (.ab1) file contains raw four-color electrophoretic fluorescence measurements: Adenine (green), Thymine (red), Cytosine (blue), and Guanine (black/yellow).',
          'Good Quality Trace Indicators: Uniform peak spacing, sharp Gaussian peaks, baseline signal-to-noise ratio >20:1, and clean single-peak traces in unedited control regions.',
          'Poor Quality Indicators: Broad overlapping smear peaks, dye blobs near the beginning of the read (<40 bp), or early signal drop-off (<200 bp). PCR primers must be designed at least 150–200 bp outside the cut site to ensure the target edit falls within high-confidence sequencing windows.'
        ],
        keyTakeaway: 'Always design sequencing primers 150-250 bp away from the edit site to ensure clean, high-confidence chromatogram peaks.',
        benchTip: 'Run both Forward and Reverse sequencing reactions on every candidate clone to definitively resolve strand-specific sequencing artifacts.',
        quiz: [
          {
            id: 'q4-1-1',
            question: 'How far upstream of the CRISPR target cut site should your forward Sanger PCR sequencing primer ideally bind?',
            options: [
              'Directly inside the 20-nt guide RNA sequence',
              '150 to 250 base pairs upstream of the cut site',
              '5,000 base pairs upstream',
              'Exactly at the PAM sequence'
            ],
            correctIndex: 1,
            explanation: 'Placing primers 150-250 bp away avoids the messy early dye-blob region and places the cut site right in the sharpest peak resolution window.'
          }
        ]
      },
      {
        id: 'lesson-4-2',
        title: 'Deconvolution Algorithms: Decomposing Mixed Peaks',
        duration: '9 min',
        summary: 'How Assured QC and ICE-like algorithms mathematically decompose mixed Sanger traces to calculate knock-in vs indel percentages.',
        content: [
          'When analyzing an edited clone or bulk cell pool, chromatograms downstream of the Cas9 cleavage site frequently become a confusing jumble of overlapping peaks.',
          'This happens because different alleles in the sample (or between homologous chromosomes) carry insertions, deletions, or nucleotide substitutions of varying lengths, causing the sequencing reads to shift out of phase.',
          'Assured QC uses Non-Negative Least Squares (NNLS) and dynamic trace alignment against an unedited control trace to mathematically deconvolute the mixed signal into its underlying constituent alleles.',
          'By comparing the deconvoluted trace against your ASSURED Design Report, the software quantifies the exact contribution of the wild-type allele, the intended knock-in allele (with silent blocks), and any unpredicted indel frameshifts.'
        ],
        keyTakeaway: 'Overlapping chromatogram peaks are not failed sequencing—they represent out-of-phase alleles that can be mathematically deconvoluted.',
        benchTip: 'Always upload an unedited parent control .ab1 file alongside your edited clone traces in Assured QC for high-precision alignment.',
        quiz: [
          {
            id: 'q4-2-1',
            question: 'What causes the sudden appearance of overlapping double-peaks downstream of a Cas9 cut site on a Sanger chromatogram?',
            options: [
              'Contamination with another researcher’s DNA',
              'A mixture of alleles (e.g. frameshift indel on one chromosome and WT or knock-in on the other) causing out-of-phase sequence reads',
              'Degradation of the capillary electrophoresis polymer',
              'Over-incubation of the sequencing primer'
            ],
            correctIndex: 1,
            explanation: 'When one allele has an insertion or deletion, the Sanger read shifts by that number of nucleotides, causing two distinct sequences to be read simultaneously.'
          }
        ]
      },
      {
        id: 'lesson-4-3',
        title: 'Calling Zygosity: Homozygous KI vs. Heterozygous vs. Mosaicism',
        duration: '9 min',
        summary: 'Classifying clones for disease modeling; avoiding mono-allelic edits with undetected indels on the second allele.',
        content: [
          'For recessive monogenic rare diseases (or when creating an isogenic rescue of a homozygous patient line), you need to correctly classify your 96-well candidate clones into four distinct categories:',
          '1. True Homozygous Knock-In (Ideal): Both maternal and paternal alleles contain the intended correction AND silent PAM blocks, with 100% clean single peaks and 0% indel signal.',
          '2. Heterozygous Edit (Carrier / Dominant Model): Exactly 50% signal for the knock-in allele and 50% for the wild-type allele.',
          '3. Compound Heterozygous / Knock-In + Indel (Hazardous!): One allele carries the desired knock-in, but the second allele carries an unexpected 1-bp or 2-bp indel knockout. Many automated tools incorrectly label this as "Heterozygous" if they don\'t perform rigorous deconvolution!',
          '4. Mosaic Clones: Three or more distinct alleles present, indicating the colony arose from more than one founding cell or editing occurred late after the first cell division. These must be rejected or re-sub-cloned.'
        ],
        keyTakeaway: 'Always verify both alleles. An apparent heterozygous clone might harbor a destructive knockout indel on the opposite chromosome.',
        benchTip: 'Assured QC flags compound heterozygotes and mosaics automatically—never expand a clone until its second allele is completely characterized.',
        quiz: [
          {
            id: 'q4-3-1',
            question: 'Why must you be cautious when an editing report labels a clone as "heterozygous"?',
            options: [
              'Because heterozygous clones are unable to divide',
              'Because the opposite allele may harbor an uncharacterized frameshift indel rather than true intact wild-type DNA',
              'Because heterozygous clones cannot be differentiated into neurons',
              'Because heterozygous cells lose pluripotency within 2 passages'
            ],
            correctIndex: 1,
            explanation: 'Many standard assays miss that the non-edited allele has a 1- or 2-bp deletion (compound heterozygote) rather than remaining clean wild-type.'
          }
        ]
      }
    ]
  }
];
