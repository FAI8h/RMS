import { Class } from "../models/class.js";
import { Section } from "../models/section.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

/**
 * @param{this controller holds both class and section logic for Demo}
 * 
 */

export const createClass = asyncHandler(async (req, res) => {
    const {cId} = req.validated;
    let name = `class ${cId}`;

    const newClass = await Class.create({
        name,
        numericLevel : cId
    });

    if(!newClass){
        throw new ApiError(500, 'Something went wrong. Try Creating Again..');
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            newClass,
            "OK"
        )
    );
});

export const removeClass = asyncHandler(async (req, res) => {
    const {cId} = req.validated;

    await Class.deleteOne({_id: cId});

    return res
    .status(201)
    .json(
        new ApiResponse(
            204,
            {},
            "OK"
        )
    );
});


//* ------------------------------- Sections --------------------------------- \\
export const createSection = asyncHandler(async (req, res) => {
    const {name, cId} = req.validated;

    const reqClass = await Class.findOne({_id: cId}).select('isActive');
    
    if(!reqClass){
        throw new ApiError(400, 'No Such Class Exists. Try Again with Valid Class!');
    }

    const sections = await Section.find({classId: cId}).select('name');
    
    for(let section of sections){
        if(section.name === name){
            throw new ApiError(400, 'Section already Exists.');
        }
    }

    const newSection = await Section.create({
        name,
        classId : cId
    });

    if(!newSection){
        throw new ApiError(500, 'Something went wrong. Try Creating Again..');
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            newSection.name,
            "OK"
        )
    );
});

export const getSections = asyncHandler(async (req, res) => {
    const {cId} = req.validated;
    
    const reqClass = await Class.findOne({_id: cId}).select('isActive');
    
    if(!reqClass){
        throw new ApiError(400, 'No Such Class Exists. Try Again with Valid Class!');
    }

    const sections = await Section.find({classId: cId}).sort({name: 1}).select('name');

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            sections,
            "OK"
        )
    );

})

