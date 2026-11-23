import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  name: { type: String, required: true, trim : true}, // e.g., "Half Yearly"
  term: { type: String}, // e.g., "Term 1"
  status: {type: String, enum: ['draft','open', 'closed'], default : 'draft'},
  academicYear : {type: String, required : true, trim : true},
  deletedAt:{
    type: Date,
    default: null,
    select: false
  }//create soft delete controller
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);