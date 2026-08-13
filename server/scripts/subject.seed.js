import mongoose from "mongoose";
import Subject from "../src/models/subject.js";
import Dotenv from "dotenv";
import { connectDB } from "../src/config/db.js";

Dotenv.config({
    path: '../.env'
});

await connectDB();

const seedData = async () => {
    try {
        console.log('Clearing existing data...');
        await Subject.deleteMany({});

        const subjects = await Subject.insertMany([
              { 
                name: 'Mathematics', 
                code: 'MATH10', 
                maxTheoryMarks: 80, 
                maxPracticalMarks: 20, 
                passTheoryMarks: 28, 
                passPracticalMarks: 7 
              },
              { 
                name: 'Science', 
                code: 'SCI10', 
                maxTheoryMarks: 80, 
                maxPracticalMarks: 20, 
                passTheoryMarks: 28, 
                passPracticalMarks: 7 
              },
              { 
                name: 'English-I (Language)', 
                code: 'ENG-1-10', 
                maxTheoryMarks: 80, 
                maxPracticalMarks: 20, 
                passTheoryMarks: 28, 
                passPracticalMarks: 7 
              },
              { 
                name: 'English-II (Literature)', 
                code: 'ENG-2-10', 
                maxTheoryMarks: 80, 
                maxPracticalMarks: 20, 
                passTheoryMarks: 28, 
                passPracticalMarks: 7 
              },
              { 
                name: 'Hindi-I (Language)', 
                code: 'HIN-1-10', 
                maxTheoryMarks: 80, 
                maxPracticalMarks: 20, 
                passTheoryMarks: 28, 
                passPracticalMarks: 7 
              },
              { 
                name: 'Hindi-II (Literature)', 
                code: 'HIN-2-10', 
                maxTheoryMarks: 80, 
                maxPracticalMarks: 20, 
                passTheoryMarks: 28, 
                passPracticalMarks: 7 
              },
              { 
                name: 'General Knowledge', 
                code: 'GK10', 
                maxTheoryMarks: 50, 
                maxPracticalMarks: 0, 
                passTheoryMarks: 20, 
                passPracticalMarks: 0 
              },
              { 
                name: 'Sanskrit', 
                code: 'SAN10', 
                maxTheoryMarks: 50, 
                maxPracticalMarks: 0, 
                passTheoryMarks: 20, 
                passPracticalMarks: 0 
              },
              { 
                name: 'Computer Applications', 
                code: 'COM10', 
                maxTheoryMarks: 50, 
                maxPracticalMarks: 0, 
                passTheoryMarks: 20, 
                passPracticalMarks: 0 
              },
              { 
                name: 'Social Studies', 
                code: 'SST10', 
                maxTheoryMarks: 80, 
                maxPracticalMarks: 20, 
                passTheoryMarks: 28, 
                passPracticalMarks: 7 
              },
              { 
                name: 'General Science', 
                code: 'GS10', 
                maxTheoryMarks: 80, 
                maxPracticalMarks: 20, 
                passTheoryMarks: 28, 
                passPracticalMarks: 7 
              },
            ]);
        
        console.log('\n--- Seeding Complete! ---');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();