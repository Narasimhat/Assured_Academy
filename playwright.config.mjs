import {defineConfig} from '@playwright/test';
import fs from 'node:fs';
const installed='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export default defineConfig({testDir:'./test',testMatch:'**/*.spec.mjs',timeout:90000,workers:1,webServer:{command:'npm run preview',url:'http://127.0.0.1:5183',reuseExistingServer:!process.env.CI},use:{baseURL:'http://127.0.0.1:5183',launchOptions:{executablePath:process.env.ASSURED_CHROME_EXECUTABLE || (fs.existsSync(installed)?installed:undefined)},viewport:{width:1440,height:1000}}});
