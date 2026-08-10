import { ApiError } from "../utils/apiError.js";
import { calculateGrade } from "../utils/gradeCalculator.js";

export const resultValidator = (async (result, subject) => {
    const { maxTheoryMarks, maxPracticalMarks } = subject;

    const ops = [];
    let errors = {};
    let id = "Invalid Marks at row"
    for (let i = 0; i < result.lenght; i++){
        if (result[i].theoryMarks > maxTheoryMarks || result[i].practicalMarks > maxPracticalMarks) {
            errors.id = `${i}`;
        }
        ops.push({
            
        })
    }

});