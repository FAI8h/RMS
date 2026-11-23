import { ApiError } from "../utils/apiError.js";

//temp constants move to constants :-
const allowedRoles = ['Teacher', 'ClassTeacher'];

export class TeacherValidator {
    static async createTeacher(req,res, next) {
        const { name, accessCode, role } = req.body;
        const errors = [];

        if(!name){
            errors.push('Teacher name is required!');
        }
        if(!accessCode){
            errors.push('Access Code is required!');
        }
        if(!role){
            errors.push('a role is required!');
        }

        if (role && !allowedRoles.includes(role)){
            errors.push(`Invalid role : ${role}, allowed : ${allowedRoles}`);
        }

        if(errors.length){
            throw new ApiError(400, 'Teacher validation failed', errors);
        }
        next();
    }
    

    //? further create a seprate login for class teacher
};
