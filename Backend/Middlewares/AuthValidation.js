
const Joi = require("joi");

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string()
            .pattern(/^[a-zA-Z0-9._%+-]+@nitk\.edu\.in$/)
            .required()
            .messages({
                "string.pattern.base": "Email must be a valid NITK email (e.g., user@nitk.edu.in)",
            }),
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

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .pattern(/^[a-zA-Z0-9._%+-]+@nitk\.edu\.in$/)
            .required()
            .messages({
                "string.pattern.base": "Email must be a valid NITK email (e.g., user@nitk.edu.in)",
            }),
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

module.exports = { signupValidation, loginValidation };

