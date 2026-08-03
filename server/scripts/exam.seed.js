// Add to imports in seed.js
import mongoose from 'mongoose';
import Dotenv from 'dotenv';
import Exam from '../src/models/exam.js';
import { connectDB } from '../src/config/db.js';

Dotenv.config();
await connectDB();


try {
    await Exam.deleteMany({});
    await Exam.insertMany([
      { name: 'Half Yearly', term: 'Term 1' },
      { name: 'Annual', term: 'Term 2' }
    ]);
    console.log('Exams seeded successfully');
    process.exit();
} catch (error) {
    console.log('ERROR : Seeding Exam ', error);
    process.exit(1);
    
}
