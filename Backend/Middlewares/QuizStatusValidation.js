const Joi = require("joi");

const quizModelSchema = Joi.object({
    quizModel: Joi.string().required().messages({
        'string.empty': 'Quiz model cannot be empty',
        'any.required': 'Quiz model is required'
    })
});

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