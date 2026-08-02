import dotenv from 'dotenv';

dotenv.config();

const { startServer } = await import('./index.js');

await startServer();
