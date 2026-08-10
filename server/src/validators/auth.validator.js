import { ApiError } from "../utils/apiError.js";

export class AuthValidator {
    static async adminLogin(req,res, next) {
        const { email, password } = req.body;

        if (!email && !password) {
            throw new ApiError(400,"email and password required");            
        }
        next();
    }
    
    static async teacherLogin(req, res, next) {
        const { name, accessCode } = req.body;
        if (!name && !accessCode) throw new ApiError(400, "name and AccessCode required");
        next();
    }

    //? further create a seprate login for class teacher
};
