import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Half Yearly"
  term: { type: String } // e.g., "Term 1"
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);