import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        numericLevel :{
            type: Number,
        },
        isActive : {
            type: Boolean,
            default: true
        }
    }
    ,{timestamps: true}
);

export const Class = mongoose.model('Class',classSchema);
