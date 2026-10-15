import {test,expect} from '@playwright/test';
import {createProject} from '../apps/studio/src/lib/project.js';

async function saved(page){await expect(page.getByText('Saved on this device',{exact:true})).toBeVisible();}
async function nav(page,name){await page.getByRole('navigation',{name:'Main navigation'}).getByRole('button',{name,exact:true}).click();}

test('one entry, two examples, persistent projects and export',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page).toHaveURL(/\/studio\//);
 await expect(page.getByRole('heading',{name:'Start with a question.'})).toBeVisible();
 await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('button')).toHaveCount(3);
 await page.getByRole('button',{name:'Explore APOE R176C',exact:true}).click();
 await expect(page.getByRole('heading',{name:'APOE · R176C',exact:true})).toBeVisible();
 await expect(page.getByRole('navigation',{name:'Project steps'})).toContainText('Question');
 await expect(page.getByRole('navigation',{name:'Project steps'})).toContainText('Evidence');
 await saved(page);
 await nav(page,'Explore');await page.getByRole('button',{name:'Explore APOE knockout',exact:true}).click();
 await expect(page.getByRole('heading',{name:'APOE · knockout',exact:true})).toBeVisible();await saved(page);
 await nav(page,'Projects');await expect(page.locator('.project-card')).toHaveCount(2);
 await page.getByRole('button',{name:/APOE R176C · worked example/}).click();
 await expect(page.getByRole('heading',{name:'APOE · R176C',exact:true})).toBeVisible();
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Export project',exact:true}).click();
 expect((await downloadPromise).suggestedFilename()).toMatch(/\.assured\.zip$/);await saved(page);
 await page.reload();await nav(page,'Projects');await expect(page.locator('.project-card')).toHaveCount(2);
 await page.getByRole('button',{name:/APOE knockout · worked example/}).click();
 await page.getByRole('button',{name:'Continue to evidence',exact:true}).click();
 await expect(page.getByRole('button',{name:'Analyze reads',exact:true})).toBeDisabled();
 for(const check of await page.getByRole('checkbox',{name:/Confirm pairing/}).all())await check.check();
 await page.getByRole('button',{name:'Analyze reads',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Evidence for your question.'})).toBeVisible({timeout:60000});
 await expect(page.getByText('Simulated example results',{exact:true})).toBeVisible();
 await saved(page);await nav(page,'Projects');await expect(page.locator('.project-card')).toHaveCount(2);
 await page.getByRole('button',{name:/APOE knockout · worked example/}).click();
 await expect(page.getByRole('heading',{name:'Evidence for your question.'})).toBeVisible();expect(errors).toEqual([]);
});

test('mobile has three choices, contextual learning and no legacy modules',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await expect(page.getByRole('heading',{name:'Start with a question.'})).toBeVisible();
 await nav(page,'Learn');await page.getByRole('textbox',{name:'Find a concept'}).fill('control');
 await page.getByRole('navigation',{name:'Learning topics'}).getByRole('button',{name:'Unedited control',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Unedited control',exact:true})).toBeVisible();
 await nav(page,'Explore');await page.getByRole('button',{name:'Start a project',exact:true}).click();
 await expect(page.getByRole('heading',{name:'What is your question?'})).toBeVisible();
 await page.getByRole('navigation',{name:'Project steps'}).getByRole('button',{name:/Evidence/}).click();
 await expect(page.getByText('Import an Assured QC design JSON',{exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Analyze reads',exact:true})).toBeDisabled();
 await expect(page.getByRole('button',{name:'Certified',exact:false})).toHaveCount(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('upgrades a version-one workspace without losing trace bytes',async({page})=>{
 const project=createProject();project.title='Existing project';project.input.gene='APOE';
 await page.route('**/studio/',route=>route.fulfill({contentType:'text/html',body:'<html><body>Preparing migration fixture</body></html>'}));
 await page.goto('/studio/');
 await page.evaluate(async p=>{await new Promise((resolve,reject)=>{const r=indexedDB.open('assured-studio-v1',1);r.onupgradeneeded=()=>r.result.createObjectStore('workspace');r.onsuccess=()=>{const db=r.result;const tx=db.transaction('workspace','readwrite');tx.objectStore('workspace').put({project:p,files:[{name:'control.ab1',buffer:new Uint8Array([1,2,3,4]).buffer}]},'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};r.onerror=()=>reject(r.error);});},project);
 await page.unroute('**/studio/');await page.goto('/studio/#projects');await page.reload();
 await expect(page.getByRole('button',{name:/Existing project/})).toBeVisible();
 await page.getByRole('button',{name:/Existing project/}).click();
 await expect(page.getByRole('heading',{name:'What is your question?'})).toBeVisible();
 await page.getByRole('textbox',{name:'Gene symbol',exact:true}).fill('MYD88');await saved(page);
 await nav(page,'Explore');await page.getByRole('button',{name:'Start a project',exact:true}).click();
 await page.getByRole('textbox',{name:'Gene symbol',exact:true}).fill('APOE');await saved(page);
 await nav(page,'Projects');await expect(page.locator('.project-card')).toHaveCount(2);
 const bytes=await page.evaluate(async id=>new Promise((resolve,reject)=>{const r=indexedDB.open('assured-studio-v1',2);r.onsuccess=()=>{const db=r.result;const q=db.transaction('projects').objectStore('projects').get(id);q.onsuccess=()=>{resolve(Array.from(new Uint8Array(q.result.files[0].buffer)));db.close();};q.onerror=()=>reject(q.error);};}),project.id);
 expect(bytes).toEqual([1,2,3,4]);
});

test('imported project is retained when starting another exploration',async({page})=>{
 const {exportBundle}=await import('../apps/studio/src/lib/storage.js');
 const project=createProject();project.title='Imported question';project.input.gene='MYD88';project.experiment.notes='Preserve this question.';
 const archive=await exportBundle(project,[]);
 await page.goto('/studio/#projects');
 await page.locator('input[accept=".zip"]').setInputFiles({name:'question.assured.zip',mimeType:'application/zip',buffer:Buffer.from(await archive.arrayBuffer())});
 await expect(page.getByRole('heading',{name:'What is your question?'})).toBeVisible();await saved(page);
 await nav(page,'Explore');await page.getByRole('button',{name:'Start a project',exact:true}).click();
 await page.getByRole('textbox',{name:'Gene symbol',exact:true}).fill('APOE');await saved(page);
 await nav(page,'Projects');await expect(page.locator('.project-card')).toHaveCount(2);
 await page.getByRole('button',{name:/Imported question/}).click();
 await expect(page.getByRole('textbox',{name:'Gene symbol',exact:true})).toHaveValue('MYD88');
 await expect(page.getByRole('textbox',{name:'What are you trying to understand? (optional)',exact:true})).toHaveValue('Preserve this question.');
});

test('public reference search and download connect to the design input',async({page})=>{
 const fs=await import('node:fs/promises');const text=await fs.readFile(new URL('../apps/studio/public/examples/apoe-reference.gb',import.meta.url),'utf8');
 await page.route('**/api/reference?**',route=>{const u=new URL(route.request().url());return route.fulfill({contentType:'application/json',body:JSON.stringify(u.searchParams.has('gene')?{records:[{accession:'NG_007084.2',title:'Human APOE RefSeqGene'}]}:{accession:'NG_007084.2',text,sourceUrl:'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=NG_007084.2&rettype=gbwithparts&retmode=text'})});});
 await page.goto('/studio/');await page.getByRole('button',{name:'Start a project',exact:true}).click();
 await page.getByRole('textbox',{name:'Gene symbol',exact:true}).fill('APOE');await page.getByRole('textbox',{name:'Amino-acid change',exact:true}).fill('R176C');
 await page.getByRole('button',{name:'Find in NCBI',exact:true}).click();
 await expect(page.getByRole('combobox',{name:'Choose a versioned genomic reference',exact:true})).toHaveValue('NG_007084.2');
 await page.getByRole('button',{name:'Use this reference',exact:true}).click();
 await expect(page.getByText('NG_007084.2',{exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Explore design',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Explore design',exact:true}).click();
 await expect(page.getByRole('heading',{name:'APOE · R176C',exact:true})).toBeVisible();
});
