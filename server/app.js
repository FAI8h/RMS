import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './src/routes/auth.routes.js';
// import studentRoutes from './src/routes/studentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
// app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('School Result Management System API is running...');
});

export default app;
