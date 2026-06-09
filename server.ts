import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import app from './server/app.js';

async function startServer() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Setup development middleware vs production bundle static serving
  if (process.env.NODE_ENV !== 'production') {
    console.log("LOG: [ROYMEN] Booting development proxy mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log("LOG: [ROYMEN] Booting production static client-serving channels...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LOG: [ROYMEN] Full-stack store platform online tracking at: http://localhost:${PORT}`);
  });
}

startServer();
