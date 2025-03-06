const Joi = require("joi");

// Define validation schema
const questionSchema = Joi.object({
    question: Joi.string().min(5).max(500).required(),
    option1: Joi.string().min(1).max(200).required(),
    option2: Joi.string().min(1).max(200).required(),
    option3: Joi.string().min(1).max(200).required(),
    option4: Joi.string().min(1).max(200).required(),
    correctAnswer: Joi.string()
        .valid(Joi.ref("option1"), Joi.ref("option2"), Joi.ref("option3"), Joi.ref("option4")) // Must match one of the options
        .required(),
});

// Middleware function for validation
const validateQuestion = (req, res, next) => {
    const { error } = questionSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            error: "Validation failed",
            details: error.details.map((detail) => detail.message),
        });
    }
    next();
};

module.exports = validateQuestion;
