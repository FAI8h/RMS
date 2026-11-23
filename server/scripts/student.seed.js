import dotenv from 'dotenv';
import {connectDB} from '../src/config/db.js'; // Adjust path if needed based on your new structure
import Student from '../src/models/student.js';

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    console.log('Clearing existing data...');
    await Student.deleteMany({});

    // 4. Seed Students (Creating 25 students for Class 10-A to test pagination)
    const studentsToInsert = [];
    for (let i = 1; i <= 25; i++) {
      studentsToInsert.push({
        name: `Student ${i}`,
        admissionNumber: `ADM10${String(i).padStart(3, '0')}`, // e.g., ADM10001
        rollNumber: `${i}`,
        class: '10',
        section: 'A'
      });
    }
    
    // Create 5 students for Class 10-B
    for (let i = 1; i <= 5; i++) {
      studentsToInsert.push({
        name: `Student B${i}`,
        admissionNumber: `ADM10B${String(i).padStart(2, '0')}`,
        rollNumber: `${i}`,
        class: '10',
        section: 'B'
      });
    }

    const students = await Student.insertMany(studentsToInsert);
    console.log(`Students seeded: ${students.length} total`);

    console.log('\n--- Seeding Complete! ---');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
