import {check, validationResult} from "express-validator";

let validatorParams = [
    check('email').isEmail(),
    check('contrasenia').isLength({ min: 8, max: 15})
];


function validator(req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validatorParams,
    validator
}