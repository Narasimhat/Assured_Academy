import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {referenceApi} from './server/reference-api.mjs';
export default defineConfig({plugins:[react(),referenceApi()],css:{postcss:{plugins:[]}},build:{chunkSizeWarningLimit:750},server:{fs:{strict:true}}});
