import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {connectDB} from '../src/config/db.js'; // Adjust path if your structure requires
import Admin from '../src/models/admin.js';
import Teacher from '../src/models/teacher.js';

dotenv.config();
await connectDB();
console.log("env : ", process.env.MONGO_URI);


const seedData = async () => {
  try {
    await Admin.deleteMany({});
    await Teacher.deleteMany({});

    // Create Admin (Needs password)
    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash('admin123', salt);
    
    await Admin.create({
      name: 'School Principal',
      email: 'admin@school.com',
      password: adminPass,
      role: 'Admin'
    });

    // Create Teacher (No password needed)
    await Teacher.create({
      name: 'John',
      accessCode: 'TCH001',
      role: 'Teacher'
    });

    console.log('Admin seeded successfully!');
    console.log('admin_email : admin@school.com, password : admin123');
    console.log('teacher_name : John, accessCode : TCH001');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();