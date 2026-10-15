import {test,expect} from '@playwright/test';

test('Academy opens bundled Studio; example runs in its worker and exports a project',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.getByRole('heading',{name:'Your first question. Your next discovery.'})).toBeVisible();
 await page.getByRole('link',{name:'Open Assured Studio',exact:true}).click();
 await expect(page).toHaveURL(/\/studio\/$/);
 await page.getByRole('button',{name:/Meet APOE R176C/i}).first().click();
 await expect(page.getByRole('heading',{name:'APOE · R176C',exact:true})).toBeVisible();
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('button',{name:'Save project',exact:true}).click();
 expect((await downloadPromise).suggestedFilename()).toMatch(/\.zip$/);
 await expect(page.getByText('Saved on this device',{exact:true})).toBeVisible();
 await page.reload();
 await page.getByRole('button',{name:/Continue: APOE R176C/}).click();
 await expect(page.getByRole('heading',{name:'APOE · R176C',exact:true})).toBeVisible();
 await page.getByRole('link',{name:'Academy home'}).click();
 await expect(page.getByRole('heading',{name:'Your first question. Your next discovery.'})).toBeVisible();
 expect(errors).toEqual([]);
});

test('mobile newcomer can reach learning, teaching practice and Studio',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.getByRole('button',{name:'Try the teaching workbench'}).click();
 await expect(page.getByText('Teaching workbench.',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Academy home'}).click();
 await page.getByRole('button',{name:'Explore lessons',exact:true}).click();
 await expect(page.getByText('Teaching workbench.',{exact:true})).toHaveCount(0);
 await page.getByRole('button',{name:'Academy home'}).click();
 await page.getByRole('link',{name:'Start in Studio',exact:true}).click();
 await expect(page.getByRole('button',{name:'Save project',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
