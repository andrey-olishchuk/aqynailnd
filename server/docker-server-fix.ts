import path from 'path';
import express from 'express';
import type { Express } from 'express';

/**
 * Configures static file serving for Docker environment 
 */
export function configureStaticFiles(app: Express) {
  console.log('Configuring static files for Docker environment');

  // Ensure static paths for production Docker environment
  const publicPath = path.resolve(__dirname, '../public');
  console.log(`Static files path: ${publicPath}`);

  // Configure static routes with fallback to index.html for SPA
  app.use(express.static(publicPath, { 
    maxAge: '1d',
    index: 'index.html' 
  }));

  // Handle SPA routing - all non-API routes serve index.html
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}