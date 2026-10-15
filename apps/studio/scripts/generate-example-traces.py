"""Developer-only deterministic examples using the pinned QC trace generator (requires numpy)."""
import sys, json, hashlib
sys.dont_write_bytecode = True
from pathlib import Path
sys.path.insert(0,str(Path('vendor/qc/scripts').resolve()))
from sim_ab1 import signals_from_alleles, amplitude_profile, write_ab1, BASES
import numpy as np
for pair in (1,2):
    folder=Path(f'public/examples/pair-{pair}')
    spec=json.loads((folder/'design.json').read_text())
    ref=spec['reference']['sequence'];d=spec['donors'][0]
    intended=ref[:d['refStart']]+d['sequence']+ref[d['refEnd']:]
    blocking=list(intended)
    for marker in spec['markers']:
        if marker['role']=='intended': blocking[marker['pos']]=marker['ref']
    blocking=''.join(blocking)
    mixtures={'APOE_WT':[(ref,1.0)],'APOE_A01':[(intended,1.0)],'APOE_A02':[(ref,.5),(intended,.5)],'APOE_A03':[(intended,.5),(blocking,.5)]}
    truth={}
    for i,(name,alleles) in enumerate(mixtures.items()):
        seed=pair*100+i
        signals,composition=signals_from_alleles(alleles,amplitude_profile(len(ref),seed=1),seed=seed)
        calls=''.join(BASES[int(np.argmax(row))] for row in composition)
        write_ab1(str(folder/(name+'.ab1')),calls,signals,seed=seed)
        truth[name]={'seed':seed,'alleles':[{'sequence':seq,'fraction':fraction} for seq,fraction in alleles]}
    (folder/'truth.json').write_text(json.dumps({'kind':'simulated','description':'Known linear mixtures of the exact selected native design. No experimental validation is implied.','generator':'vendor/qc/scripts/sim_ab1.py','design_sha256':hashlib.sha256((folder/'design.json').read_bytes()).hexdigest(),'samples':truth},indent=2)+'\n')
print('Generated matched simulated reads for both APOE design alternatives.')
