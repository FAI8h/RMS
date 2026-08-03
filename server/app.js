import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from './src/routes/auth.routes.js';
import studentRoutes from './src/routes/student.routes.js';
import masterRoutes from './src/routes/master.routes.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api', masterRoutes);

app.get('/', (req, res) => {
  res.send('School Result Management System API is running...');
});

export default app;
