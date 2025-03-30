const Joi = require("joi");

const adminSignupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "Passwords do not match",
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: "Bad request", 
            errors: error.details.map(err => err.message) 
        });
    }
    next();
};

const adminLoginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: "Bad request", 
            errors: error.details.map(err => err.message) 
        });
    }
    next();
};

module.exports = { adminSignupValidation, adminLoginValidation };
