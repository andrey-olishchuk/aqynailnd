
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
    console.log('Assets directory exists, serving static files from:', assetsPath);
    app.use('/assets', (req, res, next) => {
      console.log('Serving asset:', req.path);
      next();
    });
  }
}
