import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  exam: { type: String, required: true }, // "Half Yearly" or "Annual"
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  theoryMarks: { type: Number, default: 0 },
  practicalMarks: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 }, 
  grade: { type: String, default: 'NA' }       
}, { timestamps: true });

// Prevent duplicate marks for the same student, exam, and subject
resultSchema.index({ student: 1, exam: 1, subject: 1 }, { unique: true });

export default mongoose.model('Result', resultSchema);