import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Mathematics"
  code: { type: String, required: true, unique: true }, // e.g., "MATH101"
  maxTheoryMarks: { type: Number, required: true, default: 80 },
  maxPracticalMarks: { type: Number, required: true, default: 20 },
  passTheoryMarks: { type: Number, required: true, default: 28 },
  passPracticalMarks: { type: Number, required: true, default: 7 }
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);