import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";

const validStatus = ['draft','open','closed'];
const validTerms = ['Term 1','Term 2'];

export class ExamValidaotr{
    static async createExam(req,res,next){
        const {name, academicYear, term} = req.body;

        const errors = [];
        if(!name) errors.push('Exam name is Required!');
        if(!academicYear) errors.push('academicYear is Required!');
        if(!term) errors.push('term is Required!');

        if(term && !validTerms.includes(term)) errors.push(`Invalid Term : ${term}, allowed Term : ${validTerms}`);

        if(errors.length){
            throw new ApiError(400, 'Exam Validation Failed', errors);
        }
        req.validated = {
            name,
            academicYear,
            term
        }
        next();
    }

    static async updateStatus(req,res,next){
        const {status} = req.body;
        const {eId} = req.params;

        const errors = [];
        if(!eId) errors.push('Exam Id (eId) is Required!');
        if(eId && !mongoose.isValidObjectId(eId)) errors.push('Invalid Exam Id');
        if(!status) errors.push('status is required!');
        if(status && !validStatus.includes(status)) errors.push(`Invalid Status : ${status}, allowed Status ${validStatus}`);

        if(errors.length){
            throw new ApiError(400, 'EXam Validation Failed', errors);
        }
        req.validated = {
            eId,
            status
        }
        next();
    }
}
