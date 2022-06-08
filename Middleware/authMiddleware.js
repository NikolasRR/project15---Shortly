import joi from "joi";

import db from "../database.js";

async function signUpDataVerification(req, res, next) {
    const signupSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required()
    });

    const validation = signupSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }

    next();

    // try {
    //     db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);

    //     next();
    // } catch (error) {
    //     res.sendStatus(500)
    // }
}

async function singInDataValidation(req, res, next) {

}

export { signUpDataVerification, singInDataValidation }