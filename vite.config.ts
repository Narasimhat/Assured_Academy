import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sirv from 'sirv';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'academy-studio-development',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/studio') { res.statusCode = 302; res.setHeader('Location', '/studio/'); res.end(); return; }
        next();
      });
      server.middlewares.use('/studio', sirv(fileURLToPath(new URL('./apps/studio/dist', import.meta.url)), {dev: true, single: true}));
    },
  }],
  server: {
    port: 5173,
    open: false,
  },
});
