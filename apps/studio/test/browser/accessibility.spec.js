import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('core screens have accessible names, landmarks, and readable contrast',async({page})=>{
 await page.goto('/');
 let checked=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(checked.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
 await page.getByRole('button',{name:'Design an edit',exact:true}).click();
 checked=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(checked.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
 await page.getByRole('button',{name:'Overview',exact:true}).click();
 await page.getByRole('button',{name:/Meet APOE R176C/}).click();
 await expect(page.getByRole('heading',{name:'APOE · R176C'})).toBeVisible();
 checked=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(checked.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
 await page.getByRole('button',{name:'Check reads',exact:true}).click();
 checked=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(checked.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
});
