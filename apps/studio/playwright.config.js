import {defineConfig} from '@playwright/test';
import fs from 'node:fs';
const macChrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const chrome=process.env.ASSURED_CHROME_EXECUTABLE || (fs.existsSync(macChrome)?macChrome:undefined);
export default defineConfig({testDir:'./test/browser',timeout:60000,workers:1,use:{baseURL:'http://127.0.0.1:5180',viewport:{width:1440,height:1080},launchOptions:{executablePath:chrome,args:['--no-sandbox']}},reporter:'list'});
