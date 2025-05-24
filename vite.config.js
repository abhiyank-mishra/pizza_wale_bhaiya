// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from 'express'
import { setupAPIHandlers } from './src/api/handlers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server',
      configureServer(server) {
        // Setup API routes using Express middleware
        server.middlewares.use((req, res, next) => {
          // Add CORS headers
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
          next();
        });
        
        // Create Express app and set up API handlers
        const app = express();
        app.use(express.json());
        
        // Set up API routes
        setupAPIHandlers(app);
        
        // Mount the Express app
        server.middlewares.use(app);
      },
    },
  ]
})