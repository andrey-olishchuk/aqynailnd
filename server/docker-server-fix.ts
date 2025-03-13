
import path from 'path';
import fs from 'fs';
import { Express } from 'express';

export function configureStaticFiles(app: Express) {
  const publicPath = path.resolve(process.cwd(), 'dist/public');
  
  // Check if static assets exist
  if (!fs.existsSync(publicPath)) {
    console.error('Static assets directory not found at:', publicPath);
    return;
  }

  // Log files in the directory for debugging
  const files = fs.readdirSync(publicPath);
  console.log('Files in public directory:', files);
  
  // Special handling for index.html
  app.get('/', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Index file not found');
    }
  });

  // Handle assets directory specifically
  const assetsPath = path.join(publicPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    app.use('/assets', express.static(assetsPath));
    console.log('Assets directory exists at:', assetsPath);
    
    // Log all assets for debugging
    const assetFiles = fs.readdirSync(assetsPath, { recursive: true });
    console.log('Assets:', assetFiles);
  }
  
  // Ensure all routes without a specific handler redirect to index.html for SPA
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return next();
    }
    
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next();
    }
  });
}
