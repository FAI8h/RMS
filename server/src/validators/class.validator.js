import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";

const validSections = ['A','B','C','D','E','F'];

export class ValidateClass{
    static createClass(req, res, next){
        const {clevel} = req.body;

        const num = parseStrictInteger(clevel);

        if(num === null || num < 1 || num > 12){
            throw new ApiError(400, `Invalid Class : ${clevel}`);
        }

        req.validated = { cId: num };
        next();
    }

    static removeClass(req,res,next){
        const {cId} = req.body;
        if(cId && validateMongoId(cId)){
            throw new ApiError(400, 'Invalid Class _id');
        }

        req.validated = {cId : cId};
        next();
    }

    static getSections(req,res,next){
        const {cId} = req.query;

        if(!cId){
            throw new ApiError(400, 'class Id is required')
        }

        if(cId && !validateMongoId(cId)){
            throw new ApiError(400, 'Invalid Class _id');
        }
        
        req.validated = {cId};
        next();
    };

    static createSection(req,res,next){
        if(!req.body){
            throw new ApiError(400, 'data need to be passed in the body.')
        }
        const {name, cId} = req.body;
        

        if(!validSections.includes(name)){
            throw new ApiError(400, `Invalid Section : ${name}, allowed names : ${validSections}`);
        }
        if(!cId){
            throw new ApiError(400, 'class Id is required')
        }

        if(cId && !validateMongoId(cId)){
            throw new ApiError(400, 'Invalid Class _id');
        }

        req.validated = {name, cId}
        next();
    }
}

const validateMongoId = (id) => mongoose.isValidObjectId(id);

function parseStrictInteger(str) {
    if (typeof str !== 'string') return null;

    str = str.trim();

    if (str === '') return null;

    const num = Number(str);

    return Number.isInteger(num) ? num : null;
};


