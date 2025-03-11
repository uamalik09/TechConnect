const Joi = require("joi");

// Define validation schema for quiz model parameter
const quizModelSchema = Joi.object({
    quizModel: Joi.string().required().messages({
        'string.empty': 'Quiz model cannot be empty',
        'any.required': 'Quiz model is required'
    })
});

// Middleware function for validation
const validateQuizModel = (req, res, next) => {
    const { error } = quizModelSchema.validate(req.params, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({
            error: "Validation failed",
            details: error.details.map((detail) => detail.message)
        });
    }
    next();
};

module.exports = { validateQuizModel };