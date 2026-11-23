import { ValidateClass } from "../../../src/validators/class.validator.js";

let req = {
    body:{clevel : '10'}
}

ValidateClass.createSection({body:{name:'A'}});
