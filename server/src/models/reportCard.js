import mongoose from 'mongoose';

const reportCardSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  exam: { type: String, required: true }, 
  coCurricular: [{
    activityName: { type: String }, // e.g., "Value Education"
    rating: { type: String }        // e.g., "A", "Good"
  }],
  personalAssessment: [{
    traitName: { type: String },    // e.g., "Punctuality"
    rating: { type: String }        
  }],
  remarks: { type: String, default: '' }, 
  finalResult: { type: String, default: 'Passed' }, 
  newSessionStartDate: { type: Date }
}, { timestamps: true });

reportCardSchema.index({ student: 1, exam: 1 }, { unique: true });

export default mongoose.model('ReportCard', reportCardSchema);