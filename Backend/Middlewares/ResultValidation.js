const Joi = require("joi");

const submissionSchema = Joi.object({
    rollNumber: Joi.string().required(),
    studentName:Joi.string().required(),
    quizModel: Joi.string().required(),
    answers: Joi.array().items(
        Joi.object({
            questionId: Joi.string().required(),
            selectedOption: Joi.string().allow(null, '')
        })
    ).required()
});

const validateSubmission = (req, res, next) => {
    const { error } = submissionSchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.log("Validation error details:", error.details);
        return res.status(400).json({
            error: "Validation failed",
            details: error.details.map((detail) => detail.message),
        });
    }
    next();
};

module.exports = validateSubmission;
