import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const MIME: Record<string, string> = {
  '.svg':   'image/svg+xml',
  '.png':   'image/png',
  '.jpg':   'image/jpeg',
  '.webp':  'image/webp',
  '.woff2': 'font/woff2',
};

export default defineConfig({
  base: '/Memory/',
  plugins: [{
    name: 'dev-public-under-base',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? '';
        if (!url.startsWith('/Memory/')) return next();
        const rel = url.slice('/Memory/'.length).split('?')[0];
        const filepath = path.join(process.cwd(), 'public', rel);
        try {
          if (fs.statSync(filepath).isFile()) {
            res.setHeader('Content-Type', MIME[path.extname(filepath)] ?? 'application/octet-stream');
            fs.createReadStream(filepath).pipe(res as NodeJS.WritableStream);
            return;
          }
        } catch { /* file not found, fall through */ }
        next();
      });
    },
  }],
});
