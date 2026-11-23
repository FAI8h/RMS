import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            enum: ['A','B','C','D','E','F'],
            required: true,
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {timestamps: true}
);

export const Section = mongoose.model('Section',sectionSchema);

