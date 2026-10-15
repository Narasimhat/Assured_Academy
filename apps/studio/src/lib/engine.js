import { runDesign, summarizeProcurementReadiness, collectProcurementReviewNotes } from '../../vendor/design/assured-crispr-designer/src/designEngine.js';
import { buildQcDesignSpec } from '../../vendor/design/assured-crispr-designer/src/qcExport.js';
import { validateDesignSpec } from '../../vendor/qc/src/designSpec.js';
export function validatedSpec(spec) {
 const check=validateDesignSpec(spec);
 if (!check.ok) throw new Error(`QC handoff: ${check.errors.join(' ')}`);
 return spec;
}
export function designProject(input) {
 if (!input.gene.trim()) throw new Error('Enter the gene symbol so the correct CDS can be selected.');
 if (!input.reference?.text) throw new Error('Add an annotated GenBank reference.');
 const organism=input.reference.text.match(/^\s+ORGANISM\s+([^\n]+)/m)?.[1]?.trim();
 if(organism&&organism!=='Homo sapiens')throw new Error('This release supports human reference designs. The uploaded record names '+organism+'.');
 if (input.type==='pm' && !input.mutation.trim()) throw new Error('Enter the amino-acid change, for example R176C.');
 if (!['pm','ko'].includes(input.type)) throw new Error('This workspace currently supports point mutations and knockouts.');
 const result=runDesign(input.type,input.reference.text,input.mutation,'',400,{expectedGene:input.gene.trim(),deliveryMethod:input.delivery});
 if (result?.err) throw new Error(result.err);
 const readiness=summarizeProcurementReadiness(result);
 const pairs=[];
 if(input.type==='pm') {
  for(const [index,donor] of (result.os || []).entries()) {
   const guideIndex=donor.gi ?? index;
   const guide=result.gs[guideIndex];
   if(!guide) throw new Error('The engine returned a donor without a matched guide.');
   // Export each actual experimental alternative separately, never pool donor models by default.
   const single={...result,gs:[guide],os:[{...donor,gi:0}],ss:(donor.silentMutations || []).map(m=>({...m,gi:1}))};
   const spec=validatedSpec(buildQcDesignSpec(single));
   pairs.push({label:`Alternative ${index+1}`,guide,donor,spec});
  }
 } else {
  pairs.push({label:'Two-guide knockout strategy',guides:result.gs,spec:validatedSpec(buildQcDesignSpec(result))});
 }
 if(!pairs.length) throw new Error('No matched guide–donor alternatives passed the engine. Review the reference and target.');
 const {gb,cds,...compact}=result;
 return {result:compact,pairs,readiness:{status:readiness.status,blockers:readiness.blockers,warnings:readiness.warnings,standingRequirements:readiness.standingRequirements,notes:collectProcurementReviewNotes(readiness)},reference:{gene:gb?.gene,transcript:gb?.transcriptId,issues:gb?.referenceIssues || []},computedAt:new Date().toISOString()};
}
