import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
import { seedDatabase } from './services/seed.service.js';
import { config } from './config/env.js';

async function startServer() {
  try {
    console.log('Initializing Vance Portfolio Full-Stack Application...');

    // 1. Connect Database (MongoDB Atlas / In-Process Engine)
    await connectDatabase();

    // 2. Run initial seed verification
    await seedDatabase();

    // 3. Create Express app with all REST routes
    const app = createApp();
    const PORT = config.port || 3000;

    // 4. Start listening on 0.0.0.0:3000 (Pure REST API Backend Service)
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`=======================================================`);
      console.log(`🚀 Vance Portfolio Server running at http://localhost:${PORT}`);
      console.log(`🛡️  MongoDB Status: Active & Connected via Mongoose`);
      console.log(`🔑 Admin Login: ${config.adminEmail}`);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error('Fatal Server Initialization Error:', err);
    process.exit(1);
  }
}

startServer();






















// import path from 'path';
// import { createApp } from './app.js';
// import { connectDatabase } from './config/database.js';
// import { seedDatabase } from './services/seed.service.js';
// import { config } from './config/env.js';
// import express from 'express';

// async function startServer() {
//   try {
//     console.log('Initializing Vance Portfolio Full-Stack Application...');

//     // 1. Connect Database (MongoDB Atlas / In-Process Engine)
//     await connectDatabase();

//     // 2. Run initial seed verification
//     await seedDatabase();

//     // 3. Create Express app with all REST routes
//     const app = createApp();
//     const PORT = config.port || 3000;

//     // 4. Vite middleware for development vs static build in production
//     // Fixed path to correctly point to 'frontend' outside the backend folder when running from backend directory
//     const frontendDir = path.resolve(process.cwd(), '../frontend');
//     if (process.env.NODE_ENV !== 'production') {
//       const { createServer: createViteServer } = await import('vite');
//       const vite = await createViteServer({
//         root: frontendDir,
//         configFile: path.resolve(frontendDir, 'vite.config.ts'),
//         server: { middlewareMode: true },
//         appType: 'spa',
//       });
//       app.use(vite.middlewares);
//     } else {
//       // Check ../frontend/dist first, fallback to dist
//       const fs = await import('fs');
//       let distPath = path.resolve(process.cwd(), '../frontend/dist');
//       if (!fs.existsSync(distPath)) {
//         distPath = path.resolve(process.cwd(), 'dist');
//       }
//       app.use(express.static(distPath));
//       app.get('*', (req, res) => {
//         res.sendFile(path.join(distPath, 'index.html'));
//       });
//     }

//     // 5. Start listening on 0.0.0.0:3000
//     app.listen(PORT, '0.0.0.0', () => {
//       console.log(`=======================================================`);
//       console.log(`🚀 Vance Portfolio Server running at http://localhost:${PORT}`);
//       console.log(`🛡️  MongoDB Status: Active & Connected via Mongoose`);
//       console.log(`🔑 Admin Login: ${config.adminEmail}`);
//       console.log(`=======================================================`);
//     });
//   } catch (err) {
//     console.error('Fatal Server Initialization Error:', err);
//     process.exit(1);
//   }
// }

// startServer();