import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accessCode: { type: String, required: true, unique: true }, // Given by Admin
  role: { type: String, default: 'Teacher' }
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);