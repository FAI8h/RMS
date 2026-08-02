import app from './app.js';
import { connectDB } from './src/config/db.js';

export const startServer = async () => {
  await connectDB();

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
