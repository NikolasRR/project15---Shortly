import joi from "joi";

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
}

async function singInDataValidation(req, res, next) {
    const signinSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });

    const validation = signinSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }

    next();
}

export { signUpDataVerification, singInDataValidation }