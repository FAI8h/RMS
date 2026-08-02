import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admissionNumber: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true },
  class: { type: String, required: true }, // e.g., "10"
  section: { type: String, required: true } // e.g., "A"
}, { timestamps: true });

// Index for faster querying by class and section
studentSchema.index({ class: 1, section: 1 });

export default mongoose.model('Student', studentSchema);