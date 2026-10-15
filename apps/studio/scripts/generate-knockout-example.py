"""Deterministic sequence-only knockout exercise. Run from apps/studio; requires numpy."""
import sys,json,hashlib
from pathlib import Path
sys.dont_write_bytecode=True
sys.path.insert(0,str(Path('vendor/qc/scripts').resolve()))
from sim_ab1 import signals_from_alleles, amplitude_profile, write_ab1, BASES
import numpy as np
folder=Path('public/examples/knockout')
spec=json.loads((folder/'design.json').read_text());ref=spec['reference']['sequence']
a,b=sorted(g['cut'] for g in spec['guides']);edited=ref[:a]+ref[b:]
mixtures={'APOE_WT':[(ref,1.0)],'APOE_A01':[(edited,1.0)],'APOE_A02':[(ref,.5),(edited,.5)],'APOE_A03':[(ref,.8),(edited,.2)]}
# Use a common readable length; truncate WT coverage rather than inventing a deleted allele tail.
mixtures={name:[(seq[:len(edited)],fraction) for seq,fraction in alleles] for name,alleles in mixtures.items()}
truth={}
for i,(name,alleles) in enumerate(mixtures.items()):
 seed=300+i
 signals,composition=signals_from_alleles(alleles,amplitude_profile(max(len(seq) for seq,_ in alleles),seed=1),seed=seed)
 calls=''.join(BASES[int(np.argmax(row))] for row in composition)
 write_ab1(str(folder/(name+'.ab1')),calls,signals,seed=seed)
 truth[name]={'seed':seed,'alleles':[{'sequence':seq,'fraction':fraction} for seq,fraction in alleles]}
(folder/'truth.json').write_text(json.dumps({'kind':'simulated','description':'Known linear mixtures of the precise native two-guide deletion. Not a prediction of biological repair frequency or protein loss.','generator':'vendor/qc/scripts/sim_ab1.py','design_sha256':hashlib.sha256((folder/'design.json').read_bytes()).hexdigest(),'samples':truth},indent=2)+'\n')
