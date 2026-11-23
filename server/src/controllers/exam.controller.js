import Exam from "../models/exam.js";
import asyncHandler from 'express-async-handler';
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createExam = asyncHandler(async (req, res) => {
    const {name, academicYear, term} = req.validated;

    const exam = await Exam.create({
        name,
        term,
        academicYear
    });

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            exam,
            'Exam Created'
        )
    )
    
});


export const updateExamStatus = asyncHandler(async (req, res) => {
    const {status, eId} = req.validated;//? eId -> Exam _id
    console.log("validated data : ", req.validated);
    
    const exam = await Exam.findOneAndUpdate({_id: eId}, {
        $set: {
            status
        }
        
    },
    {returnDocument: 'after'}
);

    if(!exam){
        throw new ApiError(500, 'Failed to update the status. Try Again');
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            exam,
            'OK'
        )
    )
});

