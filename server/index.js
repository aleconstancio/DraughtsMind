import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import matchesRouter from './routes/matches.js';
import bookRouter from './routes/book.js';
import { init } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Serve client static files
app.use(express.static(join(__dirname, '..', 'client')));

// API routes
app.use('/api/matches', matchesRouter);
app.use('/api/book', bookRouter);

const PORT = process.env.PORT || 3000;

init().then(() => {
  app.listen(PORT, () => {
    console.log(`DraughtsMind server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
